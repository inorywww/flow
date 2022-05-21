<template>
  <div id="menu-bar">
    <div class="menu" @mouseleave="show_sub_key = ''">
      <div class="item" v-for="menu in menu_list" :key="menu.desc">
        <el-dropdown @command="select" trigger="click" placement="bottom">
          <div class="el-dropdown-link btn">
            {{menu.desc}}
          </div>
          <el-dropdown-menu :class="{'is-mask': show_mask}" slot="dropdown" v-if="menu.sub_list && menu.sub_list.length > 0">
            <el-dropdown-item :command="item.key" v-for="item in menu.sub_list" :key="item.desc">
              <div class="mask" v-if="show_mask"></div>
              <div class="inner" @mouseenter="show_sub_key = item.key">
                <span>{{item.desc}}</span>
                <svg v-if="item.sub_list && item.sub_list.length > 0" t="1653111761916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11815" width="12" height="12"><path d="M734.414 534.103l-417.63 383.252c-12.207 11.203-31.185 10.388-42.387-1.82a30 30 0 0 1-7.897-20.283V128.748c0-16.568 13.431-30 30-30a30 30 0 0 1 20.284 7.897l417.63 383.252c12.207 11.202 13.022 30.18 1.82 42.387a30 30 0 0 1-1.82 1.82z" :fill="show_mask ? '#CCCCCC' : '#333333'" p-id="11816"></path></svg>
                <svg v-if="isShowGrid && item.key === 'showGrid'" t="1653137903937" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12690" width="16" height="16"><path d="M933.568 211.008c-27.072-28.096-71.232-28.096-98.304 0.128l-474.816 492.096L213.12 550.656c-27.2-28.16-71.232-28.16-98.432-0.064-27.008 28.096-27.008 73.664 0 101.952l196.864 203.904c27.008 28.096 71.104 28.096 98.304 0.128 0.512-0.576 0.704-1.344 1.216-1.92l522.56-541.632C960.64 284.8 960.64 239.232 933.568 211.008z" p-id="12691"></path></svg>
                <span class="sub-desc" v-if="item.sub_desc">{{item.sub_desc}}</span>
              </div>
              <div @mouseleave="show_sub_key = ''" class="sub-list" v-if="item.sub_list && item.sub_list.length > 0 && show_sub_key === item.key">
                <div class="sub-item" v-for="sub in item.sub_list" :key="sub.desc" @click="subSelect(item.key, sub.key)">{{sub.desc}}</div>
              </div>
              <div class="sub-list" v-if="item.key === 'backgroundColor' && show_sub_key === 'backgroundColor'">
                <sketch-picker class="color-picker" :value="backgroundColor" @input="(c) => changeBackgroundColor(c)"/>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span class="show-text">{{showText}}</span>
    </div>

    <el-dialog
      title="重命名"
      :visible.sync="renameDialogVisible"
      width="35%">
      <el-input v-model="renameVal" ref="rename-input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRename">确 定</el-button>
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
  </div>
</template>

<script>
import { editGraph, cloneFile } from '../../../api/index'
import { Sketch } from 'vue-color'

export default {
  components: { SketchPicker: Sketch },
  props: {
    graphData: {
      type: Object,
      default: () => {}
    },
    showText: {
      type: String,
      default: ''
    },
    lf: {
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
      backgroundColor: '',
      redoAble: false,
      undoAble: false,
      show_mask: false,
      renameDialogVisible: false,
      renameVal: '',
      cloneDialogVisible: false,
      cloneVal: '',
      menu_list: [
        {
          desc: '文件',
          sub_list: [
            {
              desc: '重命名文件',
              key: 'rename'
            },
            {
              desc: '克隆此文件',
              key: 'clone'
            },
            {
              desc: '下载为...',
              key: 'download-sub',
              sub_list: [
                {
                  desc: 'PNG图片文件（*.png）',
                  key: 'png'
                },
                {
                  desc: 'JPN图片文件（*.jpg',
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
              ]
            },
            {
              desc: '关闭',
              key: 'close',
            },
          ]
        },
        {
          desc: '编辑',
          sub_list: [
            {
              desc: '撤销',
              key: 'undo',
              sub_desc: 'Ctrl+Z'
            },
            {
              desc: '恢复',
              key: 'redo',
              sub_desc: 'Ctrl+Y'
            },
            {
              desc: '剪切',
              key: 'cut',
              sub_desc: 'Ctrl+X'
            },
            {
              desc: '复制',
              key: 'copy',
              sub_desc: 'Ctrl+C'
            },
            {
              desc: '粘贴',
              key: 'paste',
              sub_desc: 'Ctrl+V'
            },
            {
              desc: '全选',
              key: 'selectAll',
              sub_desc: 'Ctrl+A'
            },
            {
              desc: '删除',
              key: 'delete',
              sub_desc: 'Delete/Backspace'
            },
          ]
        },
        {
          desc: '视图',
          sub_list: [
            {
              desc: '放大',
              key: 'zoomIn'
            },
            {
              desc: '缩小',
              key: 'zoomOut'
            },
            {
              desc: '25%',
              key: 'zoom25'
            },
            {
              desc: '50%',
              key: 'zoom50'
            },
            {
              desc: '75%',
              key: 'zoom75'
            },
            {
              desc: '100%',
              key: 'resetZoom'
            },
            {
              desc: '重置缩放',
              key: 'resetZoom'
            },
          ]
        },
        {
          desc: '页面',
          sub_list: [
            {
              desc: '背景颜色',
              key: 'backgroundColor',
            },
            {
              desc: '显示网格',
              key: 'showGrid',
            },
            {
              desc: '网格大小',
              key: 'GridSize',
              sub_list: [
                {
                  desc: '小',
                  key: 'setGridSmall'
                },
                {
                  desc: '正常',
                  key: 'setGridNormal'
                },
                {
                  desc: '大',
                  key: 'setGridBig'
                },
                {
                  desc: '很大',
                  key: 'setGridVeryBig'
                },
              ]
            },
          ]
        }
      ],
      show_sub_key: '',
      activeNodes: [],
      activeEdges: [],
      isShowGrid: true,
    }
  },
  mounted () {
    setTimeout(() => {
      this.lf.on('history:change', ({ data: { undoAble, redoAble, redos } }) => {
        this.redoAble = redoAble
        this.undoAble = undoAble
      })
    }, 200)
  },
  methods: {
    mouseenter (key) {
      this.show_sub_key = key
    },
    select (key) {
      if (!key.includes('-sub') && key !== 'backgroundColor') {
        this[key]()
      }
    },
    subSelect (fkey, key) {
      if (fkey === 'download-sub') {
        this.$parent.downloadImg(key)
      }
    },
    rename () {
      this.renameVal = this.graphData.name
      this.renameDialogVisible = true
      this.$refs['rename-input'].focus()
    },
    confirmRename () {
      this.graphData.name = this.renameVal
      editGraph(this.graphData.id, this.graphData).then(res => {
        if (res.status === 200) {
          this.renameDialogVisible = false
          // this.$parent.graphData.name = this.renameVal
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    clone () {
      this.cloneVal = this.graphData.name
      this.cloneDialogVisible = true
      this.$refs['clone-input'].focus()
    },
    confirmClone () {
      cloneFile(this.graphData.id, this.cloneVal).then(res => {
        if (res.status === 200) {
          this.$message.success('克隆成功！')
        } else {
          this.$message.error('克隆失败！')
        }
        this.cloneDialogVisible = false
      })
    },
    close () {
      this.$router.push('/diagrams')
    },
    undo () {
      if (this.undoAble) {
        this.lf.undo()
      }
    },
    redo () {
      if (this.redoAble) {
        this.lf.redo()
      }
    },
    cut () {
      this.getSelect().then(() => {
        this.activeNodes.forEach(({ id }) => {
          this.lf.cloneNode(id)
          this.lf.deleteNode(id)
        })
      })
    },
    copy () {
      this.getSelect().then(() => {
        this.activeNodes.forEach(({ id }) => {
          this.lf.cloneNode(id)
        })
      })
    },
    paste () {
      // this.getSelect().then(() => {
      //   this.activeNodes.forEach(({ id }) => {
      //     this.lf.cloneNode(id)
      //   })
      // })
      console.log(this.$parent.lastSelectId);
      // if (this.$parent.lastSelectId) {
      //   this.lf.cloneNode(this.$parent.lastSelectId)
      // }
    },
    selectAll () {
      this.lf.selectAll()
    },
    delete () {
      this.getSelect().then(() => {
        this.activeNodes.forEach(({id}) => {
          this.lf.deleteNode(id)
        })
      })
    },
    zoomIn () {
      this.lf.zoom(true)
    },
    zoomOut () {
      this.lf.zoom(false)
    },
    zoom25 () {
      this.lf.zoom(.25)
    },
    zoom50 () {
      this.lf.zoom(.5)
    },
    zoom75 () {
      this.lf.zoom(.75)
    },
    resetZoom () {
      this.lf.resetZoom()
    },
    getSelect () {
      return new Promise (resolve => {
        this.$nextTick(() => {
          const { nodes, edges } = this.lf.getSelectElements()
          this.activeNodes = nodes
          this.activeEdges = edges
          resolve(1)
        })
      })
    },
    showGrid () {
      this.isShowGrid = !this.isShowGrid
      document.querySelector('.lf-background').setAttribute('style', `display: ${this.isShowGrid ? 'block' : 'none'}`)
    },
    changeBackgroundColor (c) {
      document.querySelector('.lf-graph').setAttribute('style', `background-color: ${c.hex}`)
    },
    

  }
}
</script>

<style lang="less" scoped>
#menu-bar {
  padding: 0 32px 8px;
  border-bottom: 1px solid #e5e5e5;
  .menu {
    display: flex;
    align-items: center;
    .item {
      padding: 3px 12px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
.show-text {
  margin-left: 20px;
  margin-top: 4px;
  color: #777;
  font-size: 12px;
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
.el-dropdown-menu {
  min-width: 160px;
}
.is-mask {
  span {
    color: #ccc;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.color-picker {
  transform: translateY(20%) !important;
}
.el-dropdown-menu__item {
  position: relative;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sub-desc {
      font-size: 12px;
      color: #CCC;
      margin-left: 20px;
    }
  }
}
.el-dialog {
  min-width: 450px !important;
}
</style>