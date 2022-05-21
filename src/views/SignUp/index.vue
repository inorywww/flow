<template>
  <div id="sign-up">
    <div class="login-box">
      <div class="title">注册账号</div>
      <div class="input-box">
        <input type="text" v-model="account" placeholder="请输入手机号码">
      </div>
      <div class="input-box">
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="input-box">
        <input type="text" v-model="code" placeholder="请输入验证码">
        <div class="get-code" @click="getCode">获取验证码</div>
      </div>
      <div class="login-btn" @click="check">立即注册</div>
      <div class="others">
        <span class="txt">已有账号？</span>
        <span class="to-signin" @click="toLogin">去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { isPoneAvailable, isPassword } from '../../utils/index'
import { getCode, checkCode, register } from '../../api/users'
export default {
  name: 'sign-up',
  data () {
    return {
      account: '',
      password: '',
      code: ''
    }
  },
  methods: {
    
    check () {
      if (isPoneAvailable(this.account) && isPassword(this.password) && this.code.length == 6) {
        this.checkCode()
      } else if (!isPoneAvailable(this.account)) {
        this.$message.error('手机号输入有误！')
      } else if (!isPassword(this.password)) {
        this.$message.error('密码6-16位由数字和字母组成')
      } else if (this.code.length != 6) {
        this.$message.error('验证码为6位纯数字')
      }
    },
    getCode () {
      if (isPoneAvailable(this.account)) {
        getCode(this.account).then(res => {
          if (res.status === 200) {
            this.$message.success('验证码发送成功，请注意查收')
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
          this.register()
        } else {
          this.$message.error('验证码错误！')
        }
      })
    },
    register () {
      register({
        account: this.account,
        password: this.password
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('账号创建成功，即将跳转到文件页')
          setTimeout(() => {
            this.$router.replace('diagrams')
          }, 2000)
        }
      })
    },
    toLogin () {
      this.$router.replace('signin')
    }
  }

}
</script>

<style lang="less" scoped>
#sign-up {
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
      margin-top: 12px;
      .get-code {
        white-space: nowrap;
        color: #4386f5;
        text-decoration: underline;
        margin-left: 8px;
        cursor: pointer;
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
      justify-content: flex-end;
      margin-top: 12px;
      margin-right: 4px;
      color: #7f7f7f;
      font-size: 13px;
      height: 18px;
      .txt {
        font-size: inherit;
        text-decoration: none;
        color: #666;
        cursor: pointer;
      }
      .to-signin {
        color: #4386f5;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>