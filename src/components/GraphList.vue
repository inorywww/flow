<template>
  <div class="graph-list">
    <div class="graph" v-for="(item, index) in graphsList" :key="item.id + index" @click="toDetail(item.id)" @contextmenu.prevent="" @click.right="showMenu(index)" @mouseenter.stop="checkMouse(index)" @mouseleave.stop="checkMouse(index)">
      <div class="cover">
        <img :src="item.img" alt="">
      </div>
      <div class="name">{{item.name}}</div>
      <div class="menu-icon" v-if="menuIconIndex === index" @click.stop="menuIndex = index">
        <svg t="1652381027118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3870" width="18" height="18"><path d="M170.666667 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="3871"></path><path d="M170.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="3872"></path><path d="M170.666667 810.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="3873"></path><path d="M896 778.666667H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM362.666667 245.333333h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM896 480H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" p-id="3874"></path></svg>
      </div>
      <div class="menu" v-if="menuIndex === index" @click.stop="" @mouseleave="showSub = false">
        <div class="menu-item" v-for="(menu, menu_index) in menuItems" :key="menu.desc + menu_index" @click="menuClick(index, menu_index, item)" @mouseenter="showSub = menu.desc === '下载为...'">
          <img :src="menu.icon" alt="">
          <span>{{menu.desc}}</span>
          <div class="sub-list" v-if="menu.desc === '下载为...' && showSub">
            <div class="sub-item" v-for="subItem in downloadList" :key="subItem.desc" @click.stop="download(item, subItem)">{{subItem.desc}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="重命名"
      :visible.sync="renameDialogVisible"
      width="30%">
      <el-input v-model="renameVal" ref="rename-input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rename">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="克隆此文件"
      :visible.sync="cloneDialogVisible"
      width="35%">
      <el-input v-model="cloneVal" ref="clone-input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cloneDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClone">确 定</el-button>
      </span>
    </el-dialog>
    <ShareDialog v-if="showShare" :link="shareLink"></ShareDialog>

  </div>
  
</template>

<script>
import { delOne, editGraph, cloneFile } from '../api/index'
import { base64ToPng } from '../utils/index'
import { lfJson2Xml } from '@logicflow/extension';
import ShareDialog from './ShareDialog.vue'
import { cloneDeep } from 'lodash'
export default {
  components: { ShareDialog },
  props: {
    graphsList: {
      type: Array,
      default: () => {}
    },
    is_trash: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showShare: false,
      shareLink: '',
      cloneDialogVisible: false,
      menuItems: [
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/c36022e3f0cdfd12d8bca47d8acd61a7.png',
          desc: '浏览'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/a9ff17ab62d2a587a5d1c45d4047aedc.png',
          desc: '重命名'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/48a7ade22f541d4c1bfc3f791c48d8ad.png',
          desc: '分享'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/bf8304e576cb38c8df9683f9489a3a89.png',
          desc: '下载为...'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/e055b8140d76812c4909d800a1d5ed2e.png',
          desc: '克隆'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/12/04891d14a5ade3f4e5de081638c2b7b4.png',
          desc: '删除'
        },
      ],
      downloadList: [
        {
          desc: 'PNG图片文件（*.png）',
          key: 'png'
        },
        {
          desc: 'JPG图片文件（*.jpg',
          key: 'jpg'
        },
        {
          desc: 'LogicFlow文件（*.lf）',
          key: 'lf'
        },
        {
          desc: 'XML文件*.xml',
          key: 'xml'
        },
      ],
      showSub: false,
      menuIndex: -1,
      menuIconIndex: -1,
      selectItem: {},
      renameDialogVisible: false,
      renameVal: '',
      cloneVal: '',
      cloneFile: {}
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.menuIndex = -1
      this.menuIconIndex = -1
    })
    if (this.is_trash) {
      this.menuItems = [
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/25/a968bae9ab5c28165815002e676d9dd2.png',
          desc: '恢复'
        },
        {
          icon: 'https://imgheybox.max-c.com/oa/2022/05/25/6d362dac49067a1f3f4e17239a78abac.png',
          desc: '彻底删除'
        },
      ]
    }
  },
  methods: {
    checkMouse (index) {
      if (this.menuIndex === -1) {
        this.menuIconIndex = index
      }
    },
    showMenu (index) {
      this.menuIndex = index
      this.menuIconIndex = index
    },
    hover (item) {
      this.showSub = item.desc === '下载为...'
    },
    menuClick (index, menu_index, item) {
      this.selectItem = this.graphsList[index]
      if (this.is_trash) {
        switch (menu_index) {
          case 0:
            this.recover(index)
            break
          case 1:
            this.reallyDelOne(item.id, index)
            break
        }
      } else {
        switch (menu_index) {
          case 0:
            this.toDetail(item.id)
            break
          case 1:
            this.showRename(item, index)
            break
          case 2:
            this.share(item)
            break
          case 3:
            // this.download(item)
            break
          case 4:
            this.clone(item)
            break
          case 5:
            this.delOne(item.id, index)
            break
        }

      }
      this.menuIndex = -1
      this.menuIconIndex = -1
    },
    recover (index) {
      this.selectItem.is_del = 0
      editGraph(this.selectItem.id, this.selectItem).then(res => {
        if (res.status === 200) {
          this.selectItem = {}
          this.graphsList.splice(index, 1)
          this.$message({
            message: '恢复成功',
            type: 'success'
          });
        }
      })
    },
    reallyDelOne (id, index) {
      this.$confirm('该文件将被彻底删除，不可恢复?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOne(id, 1).then(res => {
          if (res.status == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.graphsList.splice(index, 1)
          }
        })
      })
    },
    showRename (item, index) {
      this.renameVal = item.name
      this.renameDialogVisible = true
      this.$nextTick(() => {
        this.$refs['rename-input'].focus()
      })
    },
    rename () {
      this.selectItem.name = this.renameVal
      editGraph(this.selectItem.id, this.selectItem).then(res => {
        if (res.status === 200) {
          this.selectItem = {}
          this.renameDialogVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    share (item) {
      this.shareLink = window.location.origin + '/view/' + item.id
      this.showShare = true
    },
    download (item, subItem) {
      this.menuIndex = -1
      this.menuIconIndex = -1
      if (subItem.key === 'png' || subItem.key === 'jpg') {
        base64ToPng(item.img, item.name, subItem.key)
      } else if (subItem.key === 'lf') {
        download(item.name + '.lf', JSON.stringify(item.info));
      } else {
        download(item.name + '.xml', lfJson2Xml(item.info));
      }
      function download(name, data) {
        var urlObject = window.URL || window.webkitURL || window;
        var downloadData = new Blob([data]);
        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(downloadData);
        save_link.download = name;
        fake_click(save_link);
      }
      function fake_click(obj) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        );
        obj.dispatchEvent(ev);
      }
    },
    clone (item) {
      this.cloneVal = item.name
      this.cloneFile = cloneDeep(item)
      this.cloneDialogVisible = true
    },
    confirmClone () {
      cloneFile(this.cloneFile.id, this.cloneVal).then(res => {
        if (res.status === 200) {
          this.$message.success('克隆成功！')
          this.$parent.graphsList.push(res.data.graph)
        } else {
          this.$message.error('克隆失败！')
        }
        this.cloneDialogVisible = false
      })
    },
    toDetail (id) {
      if (!this.is_trash) {
        this.$router.push('diagraming/' + id)
      }
    },
    delOne (id, index) {
      this.$confirm('该文件将移到回收站中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOne(id, 0).then(res => {
          if (res.status == 200) {
            this.$message({
              message: '移到回收站成功',
              type: 'success'
            });
            this.graphsList.splice(index, 1)
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.graph-list {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 16px 12px 12px;
  .graph {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(16.6667% - 16px);
    min-width: 130px;
    max-width: 200px;
    margin-left: 12px;
    transition: transform .4s;
    &:hover {
      transform: translateY(-4px);
      z-index: 20;
    }
    .cover {
      width: 100%;
      padding-bottom: 90%;
      height: 0;
      position: relative;
      background-color: #FFF;
      img {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
        border-bottom: 0;
      }
    }
    .name {
      margin-top: 4px;
      // outline: 1px solid #333;
    }
    .menu-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      right: -10px;
      top: -10px;
      background: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 24px;
      color: #333;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .menu {
      position: absolute;
      top: 26px;
      right: -39%;
      padding: 8px 0;
      min-width: 160px;
      background: #fff;
      z-index: 10;
      border: 1px solid #ddd;
      box-shadow: 0 1px 6px #ccc;
      border-radius: 3px;
      .menu-item {
        padding: 8px 12px;
        cursor: default;
        color: #444;
        line-height: 20px;
        position: relative;
        display: flex;
        align-items: center;
        &:hover {
          background: #f5f5f5;
          color: #000;
        }
        img {
          width: 20px;
          height: 20px;
          margin-right: 12px;
        }
        span {
          font-size: 13px;
        }
        .sub-list {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 1px solid #e5e5e5;
          .sub-item {
            line-height: 36px;
            padding: 0 16px;
            font-size: 14px;
            color: #606266;
            cursor: pointer;
            outline: 0;
            white-space: nowrap;
            background-color: #FFF;
            &:hover {
              background-color: #eee;
            }
          }
        }
      }
      &::before {
        position: absolute;
        left: 50%;
        margin-left: -8px;
        top: -16px;
        border: 8px solid transparent;
        border-bottom: 8px solid #ccc;
        content: "";
        width: 0;
        height: 0;
      }
      &::after {
        position: absolute;
        left: 50%;
        margin-left: -8px;
        top: -15px;
        border: 8px solid transparent;
        border-bottom: 8px solid #fff;
        content: "";
        width: 0;
        height: 0;
      }
    }
  }
}
</style>