<template>
  <div id="share-header">
    <div class="inner">
      <div class="left">
        <a class="home" href="/">INORYWW</a>
        <div class="name">{{name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'share-header',
  props: {
    name: {
      type: String,
      default: '未命名文件'
    }
  }

}
</script>

<style lang="less" scoped>
#share-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 12;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 3px 2px -2px rgb(200 200 200 / 15);
  height: 54px;
  background-color: #FFF;
  .inner {
    .left {
      display: flex;
      .home {
        margin: 0 20px;
        font-size: 1.3rem;
        font-family: 微软雅黑;
        font-weight: 800;
      }
    }
  }
}
</style>