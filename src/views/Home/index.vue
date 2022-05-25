<template>
  <div id="home">
    <div class="title-box">
      <div class="title">
        绘制流程图其实很容易
      </div>
      <div class="desc">
        一款专业强大的作图工具，是创建流程图最简单的工具。
      </div>
    </div>
    <div class="btn">
      <span @click="click" class="text" :class="{'to-file': isLogin}">{{isLogin ? '进入我的文件' : '免费注册'}}</span>
    </div>
    <div class="img-box">
      <img src="./images/img1.jpeg" alt="">
    </div>
    <div class="section" v-for="item in sections" :key="item.title">
      <div class="left">
        <img :src="item.img" alt="">
      </div>
      <div class="right">
        <div class="title">{{item.title}}</div>
        <div class="desc">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "../SignIn/js/auth";

export default {
  name: 'home',
  data () {
    return {
      isLogin: getToken(),
      sections: [
        {
          img: 'https://uploads-ssl.webflow.com/6184b461a39ff13bfb8c0556/618b5aa56f9d88fbf98ca492_create-node-gif.gif',
          title: '拖动即可创建',
          desc: '只需拖动即可创建新图形，助力您工作学习。绘制流程图只需要拖动即可。'
        },
        {
          img: 'https://uploads-ssl.webflow.com/6184b461a39ff13bfb8c0556/618b5aa56f9d88fbf98ca492_create-node-gif.gif',
          title: '多格式导入导出',
          desc: '支持多种格式导入导出，高清图片、LF文件、XML等多种文件格式。'
        },
        {
          img: 'https://uploads-ssl.webflow.com/6184b461a39ff13bfb8c0556/618b5aa56f9d88fbf98ca492_create-node-gif.gif',
          title: '多种图形工具',
          desc: '支持流程图、E-R图、UML图等多种专业图形绘制。'
        },
        {
          img: 'https://uploads-ssl.webflow.com/6184b461a39ff13bfb8c0556/618b5aa56f9d88fbf98ca492_create-node-gif.gif',
          title: '简单直观的界面',
          desc: '为了更方便绘制流程图，删除了很多非必要的功能。'
        },

      ]
    }
  },
  created () {

  },
  methods: {
    click () {
      this.$router.push(this.isLogin ? '/diagrams': '/signin')
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: scroll;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
  background-repeat: repeat;
  .title-box {
    margin: 10vh auto 0;
    text-align: center;
    .title {
      font-size: 70px;
      line-height: 1em;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .desc {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: #6c7d8f;
      margin-bottom: 63px;
    }
  }
  .btn {
    display: flex;
    .text {
      background-color: #0ed340;
      color: #fff;
      text-align: left;
      margin: 0 auto;
      padding: 14px 40px;
      border-radius: 8px;
      cursor: pointer;
      &.to-file {
        background-color: #067bef;
      }
    }
  }
  .img-box {
    position: relative;
    margin: 60px auto 80px;
    width: 80%;
    height: 0;
    padding-bottom: 45%;
    position: relative;
    border-radius: 8px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 7px 28px 0 rgb(0 0 0 / 15%);
      display: block;
      border-radius: 8px;
    }
  }
  .section {
    background-color: #ebebeb;
    padding: 50px;
    border-radius: 20px;
    margin: 0 8% 72px;
    display: flex;
    align-items: center;
    &:nth-child(odd) {
      .left {
        order: 1;
        margin-right: 0;
      }
      .right {
        margin-right: 20px;
        text-align: right;
      }
    }
    .left {
      margin-right: 20px;
      width: 50%;
      height: 0;
      padding-bottom: 28%;
      position: relative;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      .title {
        font-size: 35px;
        line-height: 1em;
        font-weight: 600;
        margin-bottom: 12px;
      }
      .desc {
        font-size: 16px;
        font-weight: 400;
        color: #6c7d8f;
      }
    }
  }
}
</style>