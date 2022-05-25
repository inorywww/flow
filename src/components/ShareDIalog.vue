<template>
  <div class="share-dialog">  
    <el-dialog
      title="分享"
      :visible.sync="show"
      @close="close"
      width="700px">
      <div class="inner-box1">
        <div class="left">
          <div class="item">生成浏览链接</div>
        </div>
        <div class="right">
          <div class="desc">创建浏览链接，分享给别人后，可以通过此链接来安全地浏览您的文件</div>
          <div class="input-box">
            <el-input readonly="readonly" class="link" v-model="link"></el-input>
            <div class="copy" @click="copy" :data-clipboard-text="link">
              <svg t="1653147783533" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13522" width="20" height="20"><path d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z" p-id="13523"></path><path d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z" p-id="13524"></path><path d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z" p-id="13525"></path><path d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z" p-id="13526"></path><path d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z" p-id="13527"></path></svg>
            </div>
          </div>
          <!-- <div class="password">添加密码</div> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  name: 'share-dialog',
  components: { Clipboard },
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: true,
    }
  },
  methods: {
    copy () {
      var clipboard = new Clipboard('.copy');
      clipboard.on('success', e => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.warning("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy()
      })
    },
    close () {
      this.$parent.showShare = false
    }
  },
}
</script>

<style lang="less">
.el-dialog__body {
  border-top: 1px solid #e5e5e5 !important;
  padding: 0;
}
.inner-box1 {
  // display: flex;
  width: 60%;
  margin: 0 auto;
  .left {
    border-right: 1px solid #e5e5e5;
    padding-right: 10px;
    padding-top: 10px;
    position: relative;
    padding-bottom: 20px;
    .item {
      padding: 10px;
      border-left: 3px solid #4386f5;
      color: #4386f5;
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
    padding-top: 20px;
    .desc {
      font-size: 1.17em;
      font-weight: bold;
      color: #777;
      font-size: 15px;
    }
    .input-box {
      display: flex;
      align-items: center;
      margin: 20px 30px 20px 0;
      .link {

      }
      .copy {
        padding: 9px;
        border: 1px solid #dbdbdb;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>