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
      token: '',
    };
  },
  methods: {

    fetchDeployments() {

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
