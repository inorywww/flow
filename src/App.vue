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
      this.show_header = (to.name !== 'diagraming' && to.name !== 'view')
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
  overflow-x: hidden;
}
.el-input {
  user-select: none;
}
.el-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lf-line-text > .lf-basic-shape {
  display: none !important;
}
.el-dialog__body .el-input {
  margin: 20px;
  max-width: 90%;
  text-align: center;
}
</style>