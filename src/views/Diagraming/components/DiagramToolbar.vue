<template>
  <div class="toolbar">
    <div class="toolbar-item" @click="zoomIn()">
      <el-tooltip content="放大" placement="bottom">
        <zoom-in size="18" />
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="zoomOut()">
      <el-tooltip content="缩小" placement="bottom">
        <zoom-out size="18" />
      </el-tooltip>
    </div>
    <div class="divider"></div>

    <div class="toolbar-item" @click="undo()">
      <el-tooltip :class="{'disabled': !undoAble}" content="撤销（Ctrl+Z）" placement="bottom">
        <step-back size="18" />
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="redo()">
      <el-tooltip :class="{'disabled': !redoAble}" content="恢复（Ctrl+Y）" placement="bottom">
        <step-forward size="18" />
      </el-tooltip>
    </div>
    <div class="divider"></div>

    <el-tooltip style="max-width: 120px" class="tool-group" :class="{'disabled': !undoAble}" content="字体样式" placement="bottom">
      <el-select v-model="style.fontFamily" size="small" @change="changeFontFamily">
        <el-option
          v-for="(fontFamily, index) in fontFamilies"
          :value="fontFamily.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-tooltip>
    <div class="divider"></div>

    <el-tooltip style="max-width: 80px" content="字体大小(px)" placement="bottom">
      <el-input-number
        v-model="style.fontSize"
        controls-position="right"
        size="mini"
        @change="changeFontSize"
        :min="12"
        :max="30">
      </el-input-number>
    </el-tooltip>
    <div class="divider"></div>

    <div class="toolbar-item">
      <el-tooltip content="文本颜色" placement="bottom">
        <el-popover
          placement="top"
          width="220"
          trigger="click"
        >
          <sketch-picker :value="style.fontColor" @input="(c) => changeColorProperty(c, 'fontColor')"/>
          <color-text size="30" slot="reference" :color="style.fontColor"/>
        </el-popover>
      </el-tooltip>
    </div>

    <div class="toolbar-item">
      <el-tooltip content="填充颜色" placement="bottom" style="position: relative; top: 3px;">
        <el-popover
          placement="top"
          width="220"
          trigger="click"
        >
          <sketch-picker :value="fillColor" @input="(c) => changeColorProperty(c, 'backgroundColor')"/>
          <color-fill size="20" slot="reference"  :color="style.backgroundColor"/>
        </el-popover>
      </el-tooltip>
    </div>

    <div class="toolbar-item" @click="changeFontWeight" :class="{'selected': style.fontWeight === 'bold'}">
      <el-tooltip content="粗体（Ctrl+B）" placement="bottom" style="position: relative; top: 3px;">
        <icon-blod size="21" />
      </el-tooltip>
    </div>
    
    <div class="toolbar-item" @click="changeTextDecoration" :class="{'selected': style.textDecoration === 'underline'}">
      <el-tooltip content="下划线（Ctrl+U）" placement="bottom" style="position: relative; top: 3px;">
        <underline size="17" />
      </el-tooltip>
    </div>
    <div class="toolbar-item">
      <icon-line size="18" />
    </div>
    
    <!-- <div>
      <button @click="saveGraph">保存</button>
    </div> -->
    <div>
      <el-select v-model="linetype" size="mini" @change="changeLineType">
        <el-option
          v-for="item in lineOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import StepBack from '../icons/StepBack.vue'
import StepForward from '../icons/StepForward.vue'

import { Sketch } from 'vue-color'
import ColorFill from '../icons/ColorFill.vue'
import ColorText from '../icons/ColorText.vue'
import IconFont from '../icons/Font.vue'
import IconBlod from '../icons/Blod.vue'
import IconLine from '../icons/Line.vue'
import ZoomIn from '../icons/ZoomIn.vue'
import ZoomOut from '../icons/ZoomOut.vue'
import Underline from '../icons/Underline.vue'
import { shortStyles, borderStyles, fontFamilies } from '../constant'

export default {
  props: {
    lf: Object,
    activeEdges: Array,
    fillColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectionOpened: false,
      undoAble: false,
      redoAble: false,
      colors: '#345678',
      linetype: 'pro-polyline',
      lineOptions: [
        {
          value: 'pro-polyline',
          label: '折线'
        },
        {
          value: 'pro-line',
          label: '直线'
        },
        {
          value: 'pro-bezier',
          label: '曲线'
        }
      ],
      style: {
        backgroundColor: '#333333', // 填充色
        gradientColor: '', // 渐变色
        borderType: 0, // 线条类型
        borderColor: '', // 填充颜色
        borderWidth: 1, // 线条宽度
        borderStyle: '', // 线条类型
        fontSize: 12, // 文本大小
        fontColor: '#333333', // 文本颜色
        fontWeight: 'normal', // 文本加粗
        fontFamily: 'Arial', // 文本样式
        lineHeight: '', // 行高
        textAlign: '', // 对齐
        textDecoration: 'none', // 下划线
      },
      shortStyles,
      borderStyles,
      fontFamilies,
    }
  },
  mounted () {
    this.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.redoAble = redoAble
      this.$data.undoAble = undoAble
    })
  },
  methods: {
    changeFillColor (val) {
      this.$emit('changeNodeFillColor', val.hex)
    },
    saveGraph () {
      this.$emit('saveGraph')
    },
    zoomIn () {
      this.lf.zoom(true)
    },
    zoomOut () {
      this.lf.zoom(false)
    },
    undo () {
      
      if (this.$data.undoAble) {
        this.lf.undo()
      }
    },
    redo () {
      if (this.$data.redoAble) {
        this.lf.redo()
      }
    },
    changeColorProperty ({ rgba: { r, g, b, a } }, type) {
      if (this.disabled) {
        return
      }
      const color = `rgba(${r},${g},${b},${a})`
      this.style[type] = color
      this.$set(this.style, type, color)
      this.$emit('setStyle', {
        [type]: color
      })
    },
    changeFontFamily (val) {
      console.log(val);
      this.$emit('setStyle', {
        fontFamily: val
      })
    },
    changeFontSize (val) {
      this.$emit('setStyle', {
        fontSize: val
      })
    },
    changeTextDecoration () {
      this.style.textDecoration = this.style.textDecoration === 'underline' ? 'none' : 'underline'
      this.$emit('setStyle', {
        textDecoration: this.style.textDecoration
      })
    },
    changeFontWeight () {
      this.style.fontWeight = this.style.fontWeight === 'bold' ? 'normal' : 'bold'
      // if (this.style.fontWeight === 'bold') {
      //   this.style.fontWeight = 'normal'
      //   this.$emit('setStyle', {
      //     fontWeight: 'normal'
      //   })
      // } else {
      //   this.$emit('setStyle', {
      //     fontWeight: 'bold'
      //   })
      // }
      this.$emit('setStyle', {
          fontWeight: this.style.fontWeight
        })
    },
    changeLineType(value) {
      const {lf, activeEdges} = this.$props
      const {graphModel} = lf
      lf.setDefaultEdgeType(value)
      if(activeEdges && activeEdges.length > 0) {
        activeEdges.forEach(edge => {
          graphModel.changeEdgeType(edge.id, value)
        })
      }
    }
  },
  components: {
    ColorFill,
    ColorText,
    IconFont,
    IconBlod,
    IconLine,
    ZoomIn,
    ZoomOut,
    StepBack,
    StepForward,
    Underline, 
    SketchPicker: Sketch
  }
}
</script>

<style scoped lang="less">
.toolbar {
  height: 40px;
  width: 310px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  z-index: 10;
  .tool-group {
    display: flex;
  }
}
.el-tooltip {
  flex-shrink: 0;
}
.divider {
  min-width: 1px;
  height: 100%;
  background-color: #e5e5e5;
  margin: 0 16px;
}
.toolbar-item {
  width: 30px;
  height: 30px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin-right: 2px;
  &.selected {
    box-shadow: 0px 1px 1px rgb(0 0 0 / 10%);
    background-color: #eee;
    background-image: -webkit-linear-gradient(top,#eee,#e0e0e0);
    border-color: #CCC;
  }
  &.disabled {

  }
}
.toolbar-color-picker {
  width: 24px;
  height: 24px;
  margin: 8px 4px;
}
.selection-active {
  background: #33a3dc;
}
</style>
