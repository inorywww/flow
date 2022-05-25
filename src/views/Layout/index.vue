<template>
  <div id="container">
    <LeftNav v-if="!isHome"/>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import LeftNav from '../../components/LeftNav.vue';
export default {
  components: { LeftNav },
  data () {
    return {
      isHome: false
    }
  },
  created () {
    this.isHome = this.$route.name === 'home'
  },
  watch: {
    '$route' (to) {
      this.isHome = to.name === 'home'
    }
  },
}
</script>

<style lang="less" scoped>
#container {
  margin-top: 64px;
  display: flex;
}
</style>