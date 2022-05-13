<template>
  <div id="home">
    <LeftNav />
    <router-view />
  </div>
</template>

<script>
import LeftNav from '../../components/LeftNav.vue';
export default {
  name: 'home',
  components: { LeftNav }
}
</script>

<style lang="less" scoped>
#home {
  margin-top: 12px;
  display: flex;
}
</style>