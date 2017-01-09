<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container">
      <alert :visible="showAlert" :type="typeAlert" :msg="msgAlert"></alert>
      <div class="form-group">
        <input v-on:keypress="_onSendToken" v-model="token" class="form-control" placeholder="Your token" />
      </div>
      <grid :items="deployments"></grid>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import Alert from './components/Alert';
import Grid from './components/Grid';

export default {
  name: 'app',
  data() {
    return {
      API_ENDPOINT: 'http://localhost:5000/api/v1/deployments',
      token: '',
      deployments: [],

      showAlert: false,
      typeAlert: '',
      msgAlert: '',
    };
  },
  methods: {
    fetchDeployments(token) {
      fetch(`${this.API_ENDPOINT}?token=${token}`, {
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
        })
        .catch(err => {
          this.setAlert(true, 'error', err.error);
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

    _onSendToken(evt) {
      if (evt.keyCode === 13) {
        // Remove any alert
        this.setAlert(false);
        this.fetchDeployments(this.token);
        return true;
      }
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
    NavBar, Alert, Grid,
  },
};
</script>

<style>
</style>
