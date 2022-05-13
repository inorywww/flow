<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: { Header }
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