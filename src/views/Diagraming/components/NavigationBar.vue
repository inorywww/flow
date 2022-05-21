<template>
  <div id="navigation-bar">
    <div class="left">
      <svg @click="toFile" t="1653023921816" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11629" width="20" height="20"><path d="M477.867 307.2V186.027c-10.24-51.2-52.907-20.48-52.907-20.48L139.947 414.72c-63.147 44.373-5.12 76.8-5.12 76.8l281.6 245.76c56.32 40.96 61.44-22.187 61.44-22.187V604.16C764.587 512 880.64 872.107 880.64 872.107c10.24 20.48 17.067 0 17.067 0C1008.64 332.8 477.867 307.2 477.867 307.2z" fill="#2c2c2c" p-id="11630"></path></svg>
      <div class="name">
        {{file_name}}

      </div>
    </div>
    <div class="right">
      <div class="list">
        <el-dropdown @command="select">
          <div class="el-dropdown-link btn">
            下载
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="png">PNG图片文件（*.png）</el-dropdown-item>
            <el-dropdown-item command="jpg">JPG图片文件（*.jpg）</el-dropdown-item>
            <el-dropdown-item command="lf">LogicFlow文件（*.lf）</el-dropdown-item>
            <el-dropdown-item command="xml">XML文件（*.xml）</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="btn share" @click="share">分享</div>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">{{user_info.name}}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">我的文件</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file_name: {
      type: String,
      default: '未命名文件'
    },
    user_info: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    share () {

    },
    select (type) {
      this.$parent.downloadImg(type)
    },
    toFile () {
      this.$router.push('/diagrams')
    },
  }
}
</script>

<style lang="less" scoped>

#navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  .left,.right {
    display: flex;
    align-items: center;
  }
  .left {
    svg {
      margin-right: 8px;
      cursor: pointer;
    }
  }
  .right {
    .list {
      display: flex;
      .btn {
        padding: 0 12px;
        box-shadow: 0px 1px 1px rgb(0 0 0 / 10%);
        background-color: #F8F8F8;
        background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
        height: 26px;
        line-height: 26px;
        min-width: 20px;
        text-align: center;
        border: 1px solid #c6c6c6;
        border-radius: 2px;
        font-size: 13px;
        color: #333;
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          background-color: #f3f3f3;
          background-image: -webkit-linear-gradient(top, #f8f8f8, #e8e8e8);
        }
      }
    }
  }
}
</style>