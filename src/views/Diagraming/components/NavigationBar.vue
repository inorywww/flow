<template>
  <div id="navigation-bar">
    <div class="bar-inner">
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
        <el-dropdown v-if="isLogin" @command="selectMenu">
          <div class="el-dropdown-link btn">
            <svg t="1649849383146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1615" width="32" height="32"><path d="M819.2 729.088V757.76c0 33.792-27.648 61.44-61.44 61.44H266.24c-33.792 0-61.44-27.648-61.44-61.44v-28.672c0-74.752 87.04-119.808 168.96-155.648 3.072-1.024 5.12-2.048 8.192-4.096 6.144-3.072 13.312-3.072 19.456 1.024C434.176 591.872 472.064 604.16 512 604.16c39.936 0 77.824-12.288 110.592-32.768 6.144-4.096 13.312-4.096 19.456-1.024 3.072 1.024 5.12 2.048 8.192 4.096 81.92 34.816 168.96 79.872 168.96 154.624z" p-id="1616"></path><path d="M359.424 373.76a168.96 152.576 90 1 0 305.152 0 168.96 152.576 90 1 0-305.152 0Z" p-id="1617"></path></svg>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="diagrams" class="item">
              <svg t="1653153095524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18976" width="20" height="20"><path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z" p-id="18977"></path></svg>
              <span>个人文件</span>
            </el-dropdown-item>
            <el-dropdown-item command="account" class="item">
              <svg t="1653153126524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20545" width="20" height="20"><path d="M691.2 569.6c81.067-55.467 134.4-149.333 134.4-256C825.6 140.8 684.8 0 512 0S200.533 140.8 200.533 311.467c0 106.666 53.334 200.533 134.4 256C151.467 640 23.467 817.067 23.467 1024h87.466c0-204.8 155.734-375.467 354.134-398.933 2.133 0 55.466-4.267 100.266 0h4.267c194.133 27.733 343.467 194.133 343.467 396.8h89.6C1000.533 817.067 872.533 640 691.2 569.6zM512 546.133c-130.133 0-234.667-104.533-234.667-234.666C277.333 181.333 381.867 76.8 512 76.8c130.133 0 234.667 104.533 234.667 234.667 0 130.133-104.534 234.666-234.667 234.666z" p-id="20546"></path></svg>
              <span>账户中心</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout" class="item">
              <svg t="1653152917383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16654" width="20" height="20"><path d="M413.538462 955.076923v-59.076923c0-15.753846-13.784615-29.538462-29.538462-29.538462h-196.923077c-15.753846 0-29.538462-13.784615-29.538461-29.538461v-649.846154C157.538462 171.323077 171.323077 157.538462 187.076923 157.538462h196.923077c15.753846 0 29.538462-13.784615 29.538462-29.538462v-59.076923c0-15.753846-13.784615-29.538462-29.538462-29.538462H118.153846C74.830769 39.384615 39.384615 74.830769 39.384615 118.153846v787.692308c0 43.323077 35.446154 78.769231 78.769231 78.769231h265.846154c15.753846 0 29.538462-13.784615 29.538462-29.538462zM976.738462 531.692308c11.815385-11.815385 11.815385-29.538462 0-41.353846L710.892308 224.492308c-11.815385-11.815385-29.538462-11.815385-41.353846 0l-41.353847 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l110.276923 110.276923c11.815385 11.815385 3.938462 33.476923-13.784615 33.476923H305.230769c-15.753846 0-29.538462 11.815385-29.538461 27.569231v59.076923c0 15.753846 13.784615 31.507692 29.538461 31.507692h417.476923c17.723077 0 25.6 21.661538 13.784616 33.476923l-110.276923 110.276923c-11.815385 11.815385-11.815385 29.538462 0 41.353847l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L976.738462 531.692308z" p-id="16655"></path></svg>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <ShareDialog v-if="showShare" :link="shareLink"></ShareDialog>
  </div>
</template>

<script>
import ShareDialog from '../../../components/ShareDIalog.vue'
import { removeToken, getToken } from '../../SignIn/js/auth'

export default {
  components: { ShareDialog },
  props: {
    file_name: {
      type: String,
      default: '未命名文件'
    },
    user_info: {
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
      showShare: false,
      shareLink: '',
      isLogin: false
    }
  },
  created () {
    this.isLogin = getToken()
    if (!this.isLogin) {
      this.$message.error('当前未登录！')
      setTimeout(() => {
        this.$router.replace('/signin')
      }, 1000)
    }
  },
  methods: {
    share () {
      console.log(this.$route);
      this.shareLink = window.location.origin + '/view/' + this.$route.params.id
      this.showShare = true
    },
    select (type) {
      this.$parent.downloadImg(type)
    },
    selectMenu (val) {
      if (val === 'logout') {
        removeToken()
        this.$message.success('已退出登录')
        setTimeout(() => {
          this.$router.replace('/signin')
        }, 2000)
      } else {
        this.$router.push('/' + val)
      }
    },
    toFile () {
      this.$router.push('/diagrams')
    },
  }
}
</script>

<style lang="less" scoped>
.el-dropdown-menu__item {
  display: flex !important;
  align-items: center;
  svg {
    margin-right: 20px;
  }
}
#navigation-bar {
  padding: 12px 16px;
  .bar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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