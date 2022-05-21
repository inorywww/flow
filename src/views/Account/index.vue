<template>
  <div id="account">
    <div class="tab" @click="toPage('/diagrams')">
      <svg t="1653023921816" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11629" width="20" height="20"><path d="M477.867 307.2V186.027c-10.24-51.2-52.907-20.48-52.907-20.48L139.947 414.72c-63.147 44.373-5.12 76.8-5.12 76.8l281.6 245.76c56.32 40.96 61.44-22.187 61.44-22.187V604.16C764.587 512 880.64 872.107 880.64 872.107c10.24 20.48 17.067 0 17.067 0C1008.64 332.8 477.867 307.2 477.867 307.2z" fill="#2c2c2c" p-id="11630"></path></svg>
      <span>我的文件</span>
    </div>
    <div class="container">
      <div class="left">
        <div class="line" style="margin-bottom: 30px">
          <div class="avatar">
            <img v-if="user_info.avatar" src="" alt="">
            <el-avatar v-else :style="`background: ${color}`"> {{user_info.nickname[0] || user_info.account[0]}} </el-avatar>
          </div>
          <div class="line-right">
            <div class="nickname">{{user_info.nickname || user_info.account}}</div>
            <div class="desc">这个家伙很懒，什么都没留下～</div>
          </div>
        </div>
        <div class="line line2">
          <div>手机号码：</div>
          <div class="desc">{{user_info.account}}</div>
        </div>
        <div class="line line2">
          <div>注册时间：</div>
          <div class="desc">{{formatTime(user_info.date)}}</div>
        </div>
        <div class="menu-list">
          <div class="menu" :class="{active: active == 0}" @click="active = 0">
            <svg t="1653161596859" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22063" width="20" height="20"><path d="M761.856 616.448c10.24-16.384 4.096-38.912-12.288-47.104-30.72-18.432-61.44-32.768-94.208-43.008 83.968-49.152 141.312-139.264 141.312-243.712C796.672 126.976 669.696 0 514.048 0c-155.648 0-282.624 126.976-282.624 280.576 0 100.352 53.248 188.416 131.072 237.568C159.744 577.536 10.24 765.952 10.24 989.184c0 18.432 16.384 34.816 34.816 34.816 20.48 0 36.864-16.384 36.864-34.816C81.92 757.76 268.288 569.344 499.712 569.344c75.776 0 149.504 20.48 215.04 59.392 16.384 10.24 36.864 4.096 47.104-12.288zM303.104 280.576c0-116.736 94.208-210.944 210.944-210.944S724.992 163.84 724.992 280.576c0 116.736-94.208 210.944-210.944 210.944s-210.944-94.208-210.944-210.944z m696.32 260.096c-20.48-18.432-53.248-14.336-75.776 10.24L641.024 862.208c-22.528 24.576-79.872 120.832-59.392 139.264 20.48 18.432 110.592-49.152 131.072-73.728l280.576-311.296c24.576-24.576 24.576-59.392 6.144-75.776z m0 0" p-id="22064"></path></svg>
            <span>资料编辑</span>
          </div>
          <div class="menu" :class="{active: active == 1}" @click="active = 1">
            <svg t="1653161626522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22901" width="20" height="20"><path d="M845.824 220.34432c-10.07616-9.29792-23.26528-13.94688-36.39296-13.94688-1.55648 0-2.33472 0-3.87072 0-0.77824 0-9.29792 0.77824-22.46656 0.77824-22.46656 0-65.04448-1.55648-106.06592-11.61216-52.67456-12.36992-113.84832-70.4512-131.66592-82.08384-8.4992-5.4272-19.3536-8.51968-29.42976-8.51968-10.05568 0-20.11136 3.09248-29.40928 8.51968-2.31424 1.55648-65.80224 67.35872-127.75424 82.08384-41.04192 10.05568-85.17632 11.61216-106.84416 11.61216-13.94688 0-22.44608-0.77824-23.22432-0.77824-0.77824 0-2.33472 0-3.09248 0-13.94688 0-26.33728 4.64896-36.39296 13.94688-10.83392 9.29792-17.01888 23.22432-17.01888 37.1712l0 128.512c0 473.88672 321.31072 535.01952 334.47936 537.35424 3.09248 0.77824 6.20544 0.77824 9.27744 0.77824 3.09248 0 6.22592 0 9.3184-0.77824 13.9264-2.33472 336.7936-63.488 336.7936-537.35424l0-128.512C862.06464 243.56864 855.83872 229.64224 845.824 220.34432L845.824 220.34432zM726.56896 403.8656 504.34048 619.08992c-1.55648 2.33472-3.09248 4.66944-5.4272 6.22592-6.20544 6.18496-14.70464 9.27744-23.22432 9.27744-8.54016 0-17.03936-3.09248-24.00256-9.27744-1.55648-1.55648-3.85024-3.87072-4.64896-6.22592l-119.23456-115.36384c-12.3904-12.3904-12.3904-31.72352 0-44.11392 12.36992-12.41088 33.28-12.41088 45.6704 0l102.21568 98.32448 205.18912-198.20544c13.18912-12.3904 33.28-12.3904 45.6704 0C739.71712 371.34336 739.71712 391.4752 726.56896 403.8656L726.56896 403.8656z" p-id="22902"></path></svg>
            <span>账号安全</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title-bar">
          <div class="title-left">
            <div class="title">{{active == 1 ? '账号安全' : '编辑资料'}}</div>
            <div class="desc">{{active == 1 ? '更新您的账户密码' : '更新你的个人资料'}}</div>
          </div>
          <div class="title-right" @click="click">
            保存更改
          </div>
        </div>
        <div class="inner-box" v-if="active == 0">
          <div class="title">个人信息</div>
          <div class="line">
            <div>头像</div>
            <div class="avatar">
              <img v-if="user_info.avatar" src="" alt="">
              <el-avatar v-else :style="`background: ${color}`"> {{user_info.nickname[0] || user_info.account[0]}} </el-avatar>
            </div>
          </div>
          <div class="line">
            <div>昵称</div>
            <el-input v-model="tempNickname"></el-input>
          </div>
          <div class="title" style="margin-top: 50px">联系信息</div>
          <div class="line">
            <div class="account">手机号码</div>
            <el-input v-model="tempAccount"></el-input>
          </div>
          <div class="line">
            <div class="验证码">验证码</div>
            <el-input v-model="code" style="max-width: 360px"></el-input>
            <div @click="getCode" class="code-btn" :class="{cd: cd > 0}">{{cd > 0 ? `${cd}s后重试` : '获取验证码'}}</div>
          </div>
        </div>
        <div class="inner-box" v-else>
          <div class="title">修改密码</div>
          <div class="line">
            <div>旧密码</div>
            <el-input type="password" v-model="oldPassword"></el-input>
          </div>
          <div class="line">
            <div>新密码</div>
            <el-input type="password" v-model="newPassword"></el-input>
          </div>
          <div class="line">
            <div>确认密码</div>
            <el-input type="password" v-model="newPasswordRe"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authToken } from '../../api/users'
import { getToken } from '../SignIn/js/auth'
import { getCode, checkCode, editUserInfo } from '../../api/users'
import { isPoneAvailable, isPassword } from '../../utils/index'

import moment from 'moment'
export default {
  name: 'account',
  data () {
    return {
      user_info: {
        avatar: '',
        nickname: '',
        account: '',
        password: ''
      },
      code: '',
      color: this.getRandomColor(),
      cd: 0,
      tempNickname: '',
      tempAccount: '',
      active: 0,
      oldPassword: '',
      newPassword: '',
      newPasswordRe: '',
    }
  },
  created () {
    if (!getToken()) {
      this.$message.error('当前未登录！')
      setTimeout(() => {
        this.toPage('/signin')
      }, 1000)
    } else {
      authToken().then(res => {
        if (res.status === 200) {
          this.user_info = res.data
          this.tempNickname = this.user_info.nickname
          this.tempAccount = this.user_info.account
        }
      })
    }
  },
  methods: {
    toPage (val) {
      this.$router.push(val)
    },
    click () {
      if (this.active == 0) {
        this.saveEdit()
      } else {
        this.checkPwd()
      }
    },
    save () {
      editUserInfo(this.user_info).then(res => {
        if (res.status === 200) {
          this.$message.success('编辑成功！')
        } else {
          this.$message.error('编辑失败')
        }
      }).catch(() => {
        this.$message.error('编辑失败')
      })
    },
    saveEdit () {
      this.user_info.nickname = this.tempNickname
      this.user_info.account = this.tempAccount
      this.save()
    },
    getCode () {
      if (this.user_info.account === this.tempAccount) {
        this.$message.error('手机号一致，无需改变！')
        return
      }
      if (this.cd > 0) {
        return
      }
      if (isPoneAvailable(this.tempAccount)) {
        getCode(this.tempAccount).then(res => {
          if (res.status === 200) {
            this.$message.success('验证码发送成功，请注意查收')
            this.cd = 120
            this.timer =  setInterval(() => {
              this.cd --
              if (this.cd === 0) {
                clearInterval(this.timer)
              }
            }, 1000)
          }
        })
      } else {
        this.$message.error('手机号输入有误！')
      }
    },
    checkCode () {
      checkCode({
        account: this.user_info.account,
        code: this.code
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('登录成功！即将跳转文件页')
          
          setTimeout(() => {
            this.$router.replace('diagrams')
          }, 2000)
        } else {
          this.$message.error('验证码错误！')
        }
      }).catch(err => {
        this.$message.error('验证码错误！')
      })
    },
    checkPwd () {
      if (this.oldPassword !== this.user_info.password) {
        this.$message.error('旧密码错误！')
        return
      } else if (this.newPassword !== this.newPasswordRe) {
        this.$message.error('两次密码不匹配！')
        return
      } else if (!this.newPassword) {
        this.$message.error('请输入新密码！')
        return
      }
      else {
        this.user_info.password = this.newPassword
        this.save()
      }
    },
    getRandomColor(){
      const r = Math.floor(Math.random()*255);
      const g = Math.floor(Math.random()*255);
      const b = Math.floor(Math.random()*255);
      return `rgba(${r},${g},${b},0.8`
    },
    formatTime (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  max-width: 450px;
}
.el-avatar {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
#account {
  margin: 10px auto;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
  background-repeat: repeat;
  height: calc(100vh - 80px);
  .tab {
    display: flex;
    align-items: center;
    margin-left: 24px;
    cursor: pointer;
    span {
      color: #666;
      font-size: 14px;
    }
    padding: 10px;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    min-height: 70vh;
    display: flex;
    .left,.right {
      background-color: #FFF;
      border-radius: 12px;
    }
    .left {
      width: 30%;
      padding: 20px 30px;
      margin-right: 24px;
      .line {
        display: flex;
        align-items: center;
        &.line2 {
          justify-content: space-between;
        }
        .avatar {
          width: 100px;
          height: 100px;
          margin-right: 10%;
        }
      }
      .menu-list {
        margin-top: 30px;
        .menu {
          display: flex;
          align-items: center;
          padding: 12px 8px;
          background-color: #fff;
          cursor: pointer;
          &.active {
            background-color: #eee;
            color: #606266;
          }
          &:hover {
            background-color: #eee;
            color: #606266;
          }
          svg {
            margin-right: 20px;
          }
        }
      }
    }
    .right {
      flex: 1;
      width: 0;
      .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
        border-bottom: 1px solid #e5e5e5;
        .title-left {
          .title {
            color: #6993FF;
          }
        }
        .title-right {
          background: #4386f5;
          color: #fff;
          padding: 8px 12px;
          border-radius: 8px;
          display: inline-block;
          cursor: pointer;
          font-size: 13px;
        }
      }
      .inner-box {
        padding: 20px 20%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        .title {
          font-weight: bold;
          font-size: 20px;
          margin-left: 40px;
          margin-bottom: 30px;
        }
        .line {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          div {
            &:nth-child(1) {
              margin-right: 18px;
              min-width: 60px;
              white-space: nowrap;
            };
          }
          .code-btn {
            background: #4386f5;
            color: #fff;
            padding: 10px 16px;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            font-size: 13px;
            white-space: nowrap;
          }
        }
      }
    }
    .desc {
      font-size: 13px;
      color: #555;
    }
  }
}
</style>