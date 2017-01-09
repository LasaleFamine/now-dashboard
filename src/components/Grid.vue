<template>
  <div class="">
    <div v-for="item in items" class="items-table">
      <div class="grid -between">
        <div>{{ item.uid }}</div>
        <div>{{ item.name }}</div>
        <div><a v-bind:href="item.url" target="_blank">{{ computeUrlText(item.url) }}</a></div>
        <div>{{ item.created }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grid',
  props: ['items'],
  data() {
    return {
      test: 'ciao',
    };
  },
  methods: {
    computeUrlText(url) {
      return url.replace('https://', '').replace('.now.sh', '');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .items-table > div {
    padding: 10px;
  }
</style>
