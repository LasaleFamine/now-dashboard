<template>
  <div v-bind:class="spinnerWrapperClass + ' grid -center'">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: ['visible'],
  data() {
    return {};
  },
  computed: {
    spinnerWrapperClass() {
      const hide = this.visible ? '' : 'hide';
      return hide;
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
