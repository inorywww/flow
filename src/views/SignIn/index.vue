<template>
  <div id="sign-in">
    <div class="login-box">
      <div class="title">登录</div>
      <div class="tab-box">
        <div class="tab" v-for="(item, index) in ['账号密码登录', '手机验证登录']" :key="item" :class="{'active': index === activeIndex}" @click="activeIndex = index">{{item}}</div>
      </div>
      <div class="login-form" v-if="activeIndex === 0">
        <input type="text" v-model="account" placeholder="请输入邮箱或者手机号码">
        <input type="password" v-model="password" placeholder="请输入密码" style="margin-top: 12px">
      </div>
      <div class="login-form" v-else>
        <div class="input-box">
          <input type="text" v-model="account" placeholder="请输入手机号码">
        </div>
        <div class="input-box" style="margin-top: 12px">
          <input type="text" v-model="code" placeholder="请输入验证码">
          <div class="get-code" v-if="activeIndex === 1" @click="getCode">获取验证码</div>
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
import { isPoneAvailable, isPassword } from '../../utils/index'
import { signin, getCode, checkCode } from '../../api/users'

export default {
  name: 'sign-in',
  data () {
    return {
      activeIndex: 0,
      account: '',
      password: '',
      code: ''
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
          this.checkCode()
        }
      } else {
        this.$message.error('手机号格式输入有误！')
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
          this.$message.success('登录成功！即将跳转文件页')
          setTimeout(() => {
            this.$router.replace('diagrams')
          }, 2000)
        } else {
          this.$message.error('验证码错误！')
        }
      })
    },
    login () {
      signin({
        account: this.account,
        password: this.password
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('登录成功！即将跳转文件页')
          setTimeout(() => {
            this.$router.replace('diagrams')
          }, 2000)
        } else {
          this.$message.error('账号或密码错误！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#sign-in {
  width: 100%;
  height: calc(100% - 50px);
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