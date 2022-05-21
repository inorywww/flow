<template>
  <div id="account">
    <div class="tab">
      <svg t="1653023921816" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11629" width="20" height="20"><path d="M477.867 307.2V186.027c-10.24-51.2-52.907-20.48-52.907-20.48L139.947 414.72c-63.147 44.373-5.12 76.8-5.12 76.8l281.6 245.76c56.32 40.96 61.44-22.187 61.44-22.187V604.16C764.587 512 880.64 872.107 880.64 872.107c10.24 20.48 17.067 0 17.067 0C1008.64 332.8 477.867 307.2 477.867 307.2z" fill="#2c2c2c" p-id="11630"></path></svg>
      <span>我的文件</span>
    </div>
    <div class="container">
      <div class="line avatar">
        <span class="desc">头像</span>
        <img :src="user_info.avatar" alt="">
      </div>
      <div class="line nickname">
        <span class="desc">昵称</span>
        <el-input v-model="user_info.nickname"></el-input>
      </div>
      <div class="line phone">
        <span class="desc">手机</span>
        <el-input v-model="user_info.account"></el-input>
        <span class="btn">修改手机</span>
      </div>
      <div class="line password">
        <span class="desc">密码</span>
        <el-input v-model="user_info.password" type="password"></el-input>
        <span class="btn">修改密码</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/users'

export default {
  name: 'account',
  data () {
    return {
      user_info: {
        avatar: '',
        nickname: '',
        account: '',
        password: ''
      }
    }
  },
  created () {
    getUserInfo(this.$route.params.account).then(res => {
      if (res.status === 200) {
        this.user_info = res.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
#account {
  margin: 10px auto;
  .tab {
    display: flex;
    align-items: center;
    span {
      color: #666;
      font-size: 14px;
    }
    padding: 10px;
  }
  .container {
    width: 80%;
    margin: 0 auto;
    .line {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .desc {
        font-size: 13px;
        color: #555;
      }
      .el-input {
        width: 200px;
        margin: 0 12px 0 40px;
      }
      .btn {
        color: #4386f5;
        font-size: 12px;
      }
    }
  }
}
</style>