<template>
  <div id="header" class="flex justify-between items-center">
    <div class="left">Home</div>
    <div class="nav">
      <div class="nav-item" @click="toPage('diagrams')">个人</div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    toPage (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style scoped lang="less">
#header {
  height: 50px;
  padding: 0 40px;
  background: #FFF;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 3px 2px -2px rgb(200 200 200 / 15%);
}
</style>