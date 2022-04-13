<template>
  <div id="left-nav">
    <div class="new" @click="newFile">新建</div>
    <div class="item" @click="toPage('home')">我的文件</div>
    <div class="item" @click="toPage('history')">最近修改</div>
    <div class="item" @click="toPage('colla')">与我协作</div>
    <div class="item" @click="toPage('trash')">回收站</div>
  </div>
</template>

<script>
export default {
  name: 'leftNav',
  methods: {
    toPage (name) {
      this.$router.push(name)
    },
    newFile () {

    }
  }
}
</script>

<style scoped lang="less">

</style>