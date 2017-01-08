<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container">
      <input v-on:keypress="_onSendToken" v-model="token" class="form-control" placeholder="Your token" />
      {{token}}
    </div>
  </div>

</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'app',
  data() {
    return {
      API_ENDPOINT: '/api/v1/deployments',
      token: '',
    };
  },
  methods: {

    fetchDeployments(token) {
      fetch(`this.API_ENDPOINT?token=${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res)
        .catch(err => err);
    },
    _onSendToken(evt) {
      if (evt.keyCode === 13) {
        this.fetchDeployments(this.token);
        return true;
      }
      return true;
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style>
</style>
