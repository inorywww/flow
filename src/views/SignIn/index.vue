<template>
  <div id="sign-in">
    <div class="login-box">
      <div class="title">登录</div>
      <div class="tab-box">
        <div class="tab" v-for="(item, index) in ['账号密码登录', '手机验证登录']" :key="item" :class="{'active': index === activeIndex}" @click="activeIndex = index">{{item}}</div>
      </div>
      <div class="login-form" v-if="activeIndex === 0">
        <input type="text" v-model="account" placeholder="请输入手机号码">
        <input type="password" v-model="password" placeholder="请输入密码" style="margin-top: 12px">
      </div>
      <div class="login-form" v-else>
        <div class="input-box">
          <input type="text" v-model="account" placeholder="请输入手机号码">
        </div>
        <div class="input-box" style="margin-top: 12px">
          <input type="text" v-model="code" placeholder="请输入验证码">
          <div class="get-code" v-if="activeIndex === 1" @click="getCode" :class="{cd: cd > 0}">
            {{cd > 0 ? `${cd}s后可重新获取` : '获取验证码'}}
          </div>
        </div>
      </div>
      <div class="login-btn" @click="check">立即登录</div>
      <div class="others">
        <span class="forget">忘记密码</span>
        <span class="to-signup" @click="toSignup">去注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, getToken } from "./js/auth";
import { isPoneAvailable, isPassword } from '../../utils/index'
import { signin, getCode, checkCode } from '../../api/users'
import { setRememberPassword, removeRememberPassword, getRememberPassword, setRememberTel, removeRememberTel, getRememberTel } from './js/remember'
export default {
  name: 'sign-in',
  data () {
    return {
      activeIndex: 0,
      account: '',
      password: '',
      code: '',
      cd: 0
    }
  },
  created () {
    const rememberTel = getRememberTel()
    const rememberPasword = getRememberPassword()
    if(rememberTel && rememberPasword){
      this.account = rememberTel
      this.password = rememberPasword
    }
  },
  methods: {
    toSignup () {
      this.$router.push('signup')
    },
    check () {
      if (isPoneAvailable(this.account)) {
        if (this.activeIndex == 0) {
          if (isPassword(this.password)) {
            this.login()
          } else {
            this.$message.error('密码格式错误')
          }
        } else {
          if (this.code.length === 6) {
            this.checkCode()
          } else {
            this.$message.error('正确填写验证码！')
          }
        }
      } else {
        this.$message.error('手机号格式输入有误！')
      }
    },
    getCode () {
      if (this.cd > 0) {
        return
      }
      if (isPoneAvailable(this.account)) {
        getCode(this.account).then(res => {
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
        account: this.account,
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
    login () {
      if (getToken()) {
        this.$message.error('当前已登陆，请先退出登录！')
        return
      }
      signin({
        account: this.account,
        password: this.password
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('登录成功！即将跳转文件页')
          this.setRemember()
          setToken(res.data.token)
          setTimeout(() => {
            this.$router.replace('diagrams')
          }, 2000)
        } else {
          this.$message.error('账号或密码错误！')
        }
      }).catch(err => {
        this.$message.error('账号或密码错误！')
      })
    },
    setRemember(){
      setRememberTel(this.account);
      setRememberPassword(this.password);
    },
  }
}
</script>

<style lang="less" scoped>
#sign-in {
  width: 100%;
  height: calc(100% - 64px);
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
  background-repeat: repeat;
  .login-box {
    background: #fff;
    box-sizing: border-box;
    padding: 40px 48px;
    text-align: center;
    width: 420px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    margin-top: -221px;
    left: 50%;
    margin-left: -228px;
    box-sizing: border-box;
    background: #f4f6fa;
    box-shadow: 0 0 16px 0 rgb(22 81 163 / 13%);
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
    .tab-box {
      display: flex;
      height: 30px;
      text-align: left;
      margin: 32px 0;
      .tab {
        font-size: 16px;
        cursor: pointer;
        font-family: "PingFang SC";
        height: 100%;
        font-weight: 400;
        color: #666;
        line-height: 24px;
        display: inline-block;
        position: relative;
        &:first-child {
          margin-right: 12px;
        }
        &.active {
          color: #333;
          font-weight: 700;
          &::after {
            content: "";
            height: 2px;
            width: 68px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%,0);
            background: #4386f5;
          }
        }
      }
    }
    .login-form {
      input {
        width: 100%;
        padding: 4px 25px;
        border-radius: 22px;
        border: solid 1px #ccc;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 42px;
        outline: 0;
        font-size: 14px;
        background-color: #fff;
      }
      .input-box {
        display: flex;
        align-items: center;
        .get-code {
          white-space: nowrap;
          color: #4386f5;
          text-decoration: underline;
          margin-left: 8px;
          cursor: pointer;
          &.cd {
            color: #CCC;
            text-decoration: unset;
            cursor: unset;
          }
        }
      }
    }
    .login-btn {
      background: #4386f5;
      color: #fff;
      height: 42px;
      line-height: 42px;
      width: 100%;
      border-radius: 26px;
      display: inline-block;
      cursor: pointer;
      margin-top: 12px;
    }
    .others {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      color: #7f7f7f;
      // text-align: left;
      font-size: 13px;
      height: 18px;
      .forget {
        font-size: inherit;
        text-decoration: none;
        color: #666;
        cursor: pointer;
      }
      .to-signup {
        color: #4386f5;
        cursor: pointer;
      }
    }
  }
}
</style>