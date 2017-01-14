<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container">
      <alert :visible="showAlert" :type="typeAlert" :msg="msgAlert" v-on:hide-alert="_onHideAlert"></alert>
      <div class="form-group">
        <input v-on:keypress="_onSendToken" v-model="token" class="form-control" placeholder="Your token" type="password"/>
      </div>
      <spinner :visible="showSpinner"></spinner>
      <grid :items="deployments" v-on:confirm-delete="_onConfirmDelete" v-on:toggle-detail="_onToggleDetail"></grid>
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
    fetchFiles(index) {
      const uid = this.deployments[index].uid;
      this.toggleDeploySpinner(index);
      fetch(`${this.API_ENDPOINT}/${uid}/files?token=${this.token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            throw json;
          }
          this.setFiles(index, json);
          this.toggleDetail(index);
          this.toggleDeploySpinner(index);
        })
        .catch(err => {
          this.setAlert(true, 'error', err.error || err.message);
          this.toggleDeploySpinner(index);
        });
    },

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

    deleteDeploy(index) {
      const uid = this.deployments[index].uid;
      this.toggleDeploySpinner(index);
      fetch(`${this.API_ENDPOINT}/${uid}?token=${this.token}`, {
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
          this.removeDeploy(index);
          this.setAlert(true, 'success', 'Deploy deleted!');
          // this.toggleDeploySpinner(index);
        })
        .catch(err => {
          this.setAlert(true, 'error', err.error || err.message);
          this.toggleDeploySpinner(index);
        });
    },

    setDeployments(deployments) {
      const deps = deployments.map(deploy => {
        const dep = deploy;
        dep.showDetail = false;
        dep.showSpinner = false;
        dep.files = [];
        dep.created = this.parseDate(dep.created);
        dep.url = 'https://'.concat(dep.url);
        return dep;
      });

      this.deployments = deps;
    },

    setFiles(index, files) {
      const deps = this.deployments.map((deploy, i) => {
        const dep = deploy;
        if (index === i) {
          dep.files = files;
        }

        return dep;
      });

      this.deployments = deps;
    },

    removeDeploy(index) {
      const deployments = this.deployments.filter((deploy, i) => i !== index);
      this.deployments = deployments;
    },


    toggleDetail(index) {
      this.deployments[index].showDetail = !this.deployments[index].showDetail;
    },

    toggleDeploySpinner(index) {
      this.deployments[index].showSpinner = !this.deployments[index].showSpinner;
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

    _onConfirmDelete(index) {
      this.deleteDeploy(index);
    },

    _onHideAlert() {
      this.setAlert(false);
    },

    _onToggleDetail(index, showDetail) {
      if (showDetail) {
        this.toggleDetail(index);
        return false;
      }

      this.fetchFiles(index);
      return true;
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
