<template>
  <div v-on:click="_onClickAlert" v-bind:class="alertWrapperClass">
    <div v-bind:class="alertClass">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: ['msg', 'type', 'visible'],
  data() {
    return {};
  },
  computed: {
    alertClass() {
      let alert = 'alert alert-error';
      if (this.type === 'success') {
        alert = 'alert alert-success';
      } else if (this.type === 'info') {
        alert = 'alert alert-info';
      }
      return alert;
    },

    alertWrapperClass() {
      const hide = this.visible ? '' : 'hide';
      return hide;
    },
  },
  methods: {
    _onClickAlert() {
      this.$emit('hide-alert');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hide {
    display: none;
  }
</style>
