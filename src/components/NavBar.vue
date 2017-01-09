<template>
  <header>
    <nav class="grid -between">

      <div class="nav-center">
        {{msg}}
      </div>

      <!-- <ul>
        <li><a href="asd">Test</a></li>
      </ul> -->
    </nav>
  </heaer>
</template>

<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      msg: 'Welcome to your Now dashboard',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    margin: auto;
    padding: 30px 1rem;
    position: relative;
    max-width: 70rem;
  }

  nav {
    text-transform: uppercase;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    display: inline-block;
    padding-left: 0;
  }

  ul > li:after {
    content: ''
  }

  li > a {
    padding: 10px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 400;

    color: #999;
    text-decoration: none;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
    border-bottom: 0;
  }

  a:hover {
    color: #FFF;
    background-color: transparent;
  }
</style>
