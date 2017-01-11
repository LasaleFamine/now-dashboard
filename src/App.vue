<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container">
      <alert :visible="showAlert" :type="typeAlert" :msg="msgAlert" v-on:hide-alert="_onHideAlert"></alert>
      <div class="form-group">
        <input v-on:keypress="_onSendToken" v-model="token" class="form-control" placeholder="Your token" type="password"/>
      </div>
      <spinner :visible="showSpinner"></spinner>
      <grid :items="deployments" v-on:confirm-delete="_onConfirmDelete" ></grid>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import Alert from './components/Alert';
import Grid from './components/Grid';
import Spinner from './components/Spinner';

export default {
  name: 'app',
  data() {
    return {
      API_ENDPOINT: '/api/v1/deployments',
      token: '',
      deployments: [],

      showSpinner: false,
      showAlert: false,
      typeAlert: '',
      msgAlert: '',
    };
  },
  methods: {
    fetchDeployments() {
      this.showSpinner = true;
      fetch(`${this.API_ENDPOINT}?token=${this.token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            throw json;
          }
          this.setDeployments(json.deployments);
          this.showSpinner = false;
        })
        .catch(err => {
          this.setAlert(true, 'error', err.error || err.message);
          this.showSpinner = false;
        });
    },

    deleteDeploy(id) {
      this.showSpinner = true;
      fetch(`${this.API_ENDPOINT}/${id}?token=${this.token}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            throw json;
          }
          this.removeDeploy(id);
          this.setAlert(true, 'success', 'Deploy deleted!');
          this.showSpinner = false;
        })
        .catch(err => {
          this.setAlert(true, 'error', err.error || err.message);
          this.showSpinner = false;
        });
    },

    setDeployments(deployments) {
      const deps = deployments.map(deploy => {
        const dep = deploy;
        dep.created = this.parseDate(dep.created);
        dep.url = 'https://'.concat(dep.url);
        return dep;
      });

      this.deployments = deps;
    },

    removeDeploy(id) {
      const deployments = this.deployments.filter(deploy => deploy.uid !== id);
      this.deployments = deployments;
    },

    _onSendToken(evt) {
      if (evt.keyCode === 13) {
        // Remove any alert
        this.setAlert(false);
        this.fetchDeployments();
        return true;
      }
      return true;
    },

    _onConfirmDelete(id) {
      this.deleteDeploy(id);
    },

    _onHideAlert() {
      this.setAlert(false);
    },

    parseDate(created) {
      const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December',
      ];

      const fullDate = new Date(parseInt(created, 10));
      const date = `${monthNames[fullDate.getMonth()]}/${fullDate.getDate()}/${fullDate.getFullYear()} ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return date;
    },

    setAlert(show, type, msg) {
      this.showAlert = show;
      this.typeAlert = type || null;
      this.msgAlert = msg || null;
    },
  },
  components: {
    NavBar, Alert, Grid, Spinner,
  },
};
</script>

<style>
</style>
