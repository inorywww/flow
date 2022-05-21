<template>
  <div id="app">
    <Header v-if="show_header"/>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: { Header },
  data () {
    return {
      show_header: true
    }
  },
  watch: {
  '$route' (to) {
      this.show_header = to.path.split('/')[1] !== 'diagraming'
    }
  },
}
</script>

<style>
body {
  background-color: #f4f4f4;
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
</style>