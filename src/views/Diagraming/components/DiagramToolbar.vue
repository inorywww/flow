<template>
  <div class="toolbar">
    <div class="toolbar-item" @click="zoomIn()">
      <el-tooltip content="放大">
        <zoom-in size="18" />
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="zoomOut()">
      <el-tooltip content="缩小">
        <zoom-out size="18" />
      </el-tooltip>
    </div>
    <div class="divider"></div>

    <div class="toolbar-item" @click="undo()">
      <el-tooltip :class="{'disabled': !undoAble}" content="撤销（Ctrl+Z）">
        <step-back size="18" />
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="redo()">
      <el-tooltip :class="{'disabled': !redoAble}" content="恢复（Ctrl+Y）">
        <step-forward size="18" />
      </el-tooltip>
    </div>
    <div class="divider"></div>

    <el-tooltip style="max-width: 120px" class="tool-group" :class="{'disabled': !undoAble}" content="字体样式">
      <el-select v-model="style.fontFamily" size="small" @change="changeFontFamily">
        <el-option
          v-for="(fontFamily, index) in fontFamilies"
          :value="fontFamily.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-tooltip>
    <div class="divider"></div>

    <el-tooltip style="max-width: 80px" content="字体大小(px)">
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

    <div class="toolbar-item" @click="changeFontWeight" :class="{'selected': style.fontWeight === 'bold'}">
      <el-tooltip content="粗体（Ctrl+B）" style="position: relative; top: 3px;">
        <icon-blod size="21" />
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="changeFontStyle" :class="{'selected': style.fontStyle === 'italic'}">
      <el-tooltip content="斜体（Ctrl+I）" style="position: relative; top: 2px;">
        <icon-bevel size="18"/>
      </el-tooltip>
    </div>
    <div class="toolbar-item" @click="changeTextDecoration" :class="{'selected': style.textDecoration === 'underline'}">
      <el-tooltip content="下划线（Ctrl+U）" style="position: relative; top: 3px;">
        <underline size="17" />
      </el-tooltip>
    </div>

    <div class="toolbar-item">
      <el-tooltip content="文本颜色">
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
    <el-tooltip content="终点" style="max-width: 100px; margin-left: 4px">
      <el-select v-model="aligntype" size="mini" @change="changeTextAlign">
        <el-option
          v-for="item in aligns"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          class="option-item"
        >
          <img :src="item.img">
        </el-option>
      </el-select>
    </el-tooltip>
    <div class="divider"></div>
    
    <!-- <div>
      <button @click="saveGraph">保存</button>
    </div> -->
    <div class="toolbar-item">
      <el-tooltip content="填充颜色" style="position: relative; top: 3px;">
        <el-popover
          width="220"
          trigger="click"
        >
          <sketch-picker :value="fillColor" @input="(c) => changeColorProperty(c, 'backgroundColor')"/>
          <color-fill size="22" slot="reference"  :color="style.backgroundColor"/>
        </el-popover>
      </el-tooltip>
    </div>
    <div class="toolbar-item">
      <el-tooltip content="线条颜色" style="position: relative; top: 2px;">
        <el-popover
          width="220"
          trigger="click"
        >
          <sketch-picker :value="fillColor" @input="(c) => changeColorProperty(c, 'borderColor')"/>
          <color-border size="30" slot="reference"  :color="style.borderColor"/>
        </el-popover>
      </el-tooltip>
    </div>
    <el-tooltip style="max-width: 100px" class="tool-group" content="线宽">
      <el-select v-model="style.borderWidth" size="small" @change="changeBorderWidth">
        <el-option v-for="item in borderWidthOptions" :key="item" :label="`${item}px`" :value="item"></el-option>
      </el-select>
    </el-tooltip>
    <el-tooltip style="max-width: 100px;margin-left: 4px" class="tool-group" content="线条样式">
      <el-select v-model="style.borderStyle" size="small" @change="selectBorder">
        <el-option value="hidden" label="不显示"></el-option>
        <el-option
          v-for="(border, index) in borderStyles"
          :value="border.value"
          :key="index"
        >
          <div class="border-style" :style="{'borderBottomStyle': border.value}"></div>
        </el-option>
      </el-select>
    </el-tooltip>
    <div class="divider"></div>
    <el-tooltip content="连线类型" style="max-width: 80px; margin-left: 4px">
      <el-select v-model="linetype.desc" size="mini" @change="changeLineType">
        <el-option
          v-for="item in lineOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          class="option-item"
        >
          <img :src="item.img">
        </el-option>
      </el-select>
    </el-tooltip>
    <el-tooltip content="终点" style="max-width: 120px; margin-left: 4px">
      <el-select v-model="pointtype.desc" size="mini" @change="changePoint">
        <el-option
          v-for="item in points"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          class="option-item"
        >
          <img :src="item.img">
        </el-option>
      </el-select>
    </el-tooltip>
    <el-tooltip content="下载">
      <div class="toolbar-item" @click="saveGraph">
        <svg t="1652168630584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="107196" width="20" height="20"><path d="M502.010485 765.939573c3.773953 3.719718 8.686846 5.573949 13.596669 5.573949 0.075725 0 0.151449-0.010233 0.227174-0.011256 0.329505 0.016373 0.654916 0.050142 0.988514 0.050142 0.706081 0 1.400906-0.042979 2.087545-0.116657 4.352121-0.366344 8.607028-2.190899 11.961426-5.496178l335.053985-330.166675c7.619538-7.509021 7.709589-19.773346 0.200568-27.393907s-19.774369-7.711636-27.39493-0.201591L536.193005 706.304358 536.193005 50.019207c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 657.032164-306.881342-302.44838c-7.618515-7.509021-19.883863-7.419993-27.393907 0.199545-7.509021 7.619538-7.419993 19.884886 0.199545 27.393907L502.010485 765.939573z" p-id="107197"></path><path d="M867.170139 711.020776c-10.698666 0-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 13.054317-10.620895 23.675212-23.676236 23.675212L205.182103 919.486668c-13.054317 0-23.676236-10.620895-23.676236-23.675212L181.505867 730.391962c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 34.416857 28.000728 62.416562 62.417585 62.416562l618.941638 0c34.417881 0 62.417585-27.999704 62.417585-62.416562L886.540302 730.391962C886.541325 719.693296 877.868805 711.020776 867.170139 711.020776z" p-id="107198"></path></svg>
      </div>
    </el-tooltip>
    <el-tooltip content="下载2">
      <div class="toolbar-item" @click="download">
        <svg t="1652168630584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="107196" width="20" height="20"><path d="M502.010485 765.939573c3.773953 3.719718 8.686846 5.573949 13.596669 5.573949 0.075725 0 0.151449-0.010233 0.227174-0.011256 0.329505 0.016373 0.654916 0.050142 0.988514 0.050142 0.706081 0 1.400906-0.042979 2.087545-0.116657 4.352121-0.366344 8.607028-2.190899 11.961426-5.496178l335.053985-330.166675c7.619538-7.509021 7.709589-19.773346 0.200568-27.393907s-19.774369-7.711636-27.39493-0.201591L536.193005 706.304358 536.193005 50.019207c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 657.032164-306.881342-302.44838c-7.618515-7.509021-19.883863-7.419993-27.393907 0.199545-7.509021 7.619538-7.419993 19.884886 0.199545 27.393907L502.010485 765.939573z" p-id="107197"></path><path d="M867.170139 711.020776c-10.698666 0-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 13.054317-10.620895 23.675212-23.676236 23.675212L205.182103 919.486668c-13.054317 0-23.676236-10.620895-23.676236-23.675212L181.505867 730.391962c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 34.416857 28.000728 62.416562 62.417585 62.416562l618.941638 0c34.417881 0 62.417585-27.999704 62.417585-62.416562L886.540302 730.391962C886.541325 719.693296 877.868805 711.020776 867.170139 711.020776z" p-id="107198"></path></svg>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import ZoomIn from '../icons/ZoomIn.vue' // 放大
import ZoomOut from '../icons/ZoomOut.vue' // 缩小

import StepBack from '../icons/StepBack.vue' // 后退
import StepForward from '../icons/StepForward.vue' // 前进

import { Sketch } from 'vue-color'

import IconBlod from '../icons/Blod.vue' // 粗体
import IconBevel from '../icons/Bevel.vue' // 斜体
import Underline from '../icons/Underline.vue' // 下划线
import ColorText from '../icons/ColorText.vue' // 字体颜色

import ColorFill from '../icons/ColorFill.vue' // 填充颜色
import ColorBorder from '../icons/ColorBorder.vue' // 边框颜色
import BorderWidth from '../icons/BorderWidth.vue' // 边框宽度
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
      linetype: {
        type: 'polyline',
        desc: '折线'
      },
      lineOptions: [
        {
          value: 'polyline',
          label: '折线',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/44aa9f1b8a73a20101477a3e66cb019b.png'
        },
        {
          value: 'line',
          label: '直线',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/93d4af78d3c27123ee589522ce2ef679.png'
        },
        {
          value: 'bezier',
          label: '曲线',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/634de3c2f8b97ab97a92548d6819d5be.png'
        }
      ],
      points: [
        {
          value: 'fill-triangle',
          label: '实心三角形',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/3771aa4e120bd6532b65a9ae5d124ad2.png'
        },
        {
          value: 'empty-triangle',
          label: '空心三角形',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/1765e52dbeb17a7f69cc03476a7ccefc.png'
        },
        {
          value: 'fill-circle',
          label: '实心圆',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/88fea179071427cc44f51e73482c792c.png'
        },
        {
          value: 'empty-circle',
          label: '空心圆',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/d49afae19e9de64d5c31fed599213cab.png'
        },
        {
          value: 'fill-diamond',
          label: '实心菱形',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/07544758628bd2ddca51da0bac752f54.png'
        },
        {
          value: 'empty-diamond',
          label: '空心菱形',
          img: 'https://imgheybox.max-c.com/oa/2022/05/08/3ded572d005b457aa399563aee974a23.png'
        },
      ],
      pointtype: {
        type: 'fill-triangle',
        desc: '实心三角形'
      },
      aligns: [
        {
          value: 'left',
          label: '左对齐',
          img: 'https://imgheybox.max-c.com/oa/2022/05/10/9889de3db8cfd2e1ab03d7e6ee6559e7.png'
        },
        {
          value: 'center',
          label: '居中对齐',
          img: 'https://imgheybox.max-c.com/oa/2022/05/10/94dff53e6a31f8bf9310ca855d4fdf7d.png'
        },
        {
          value: 'right',
          label: '右对齐',
          img: 'https://imgheybox.max-c.com/oa/2022/05/10/4a2a7f659ceb1cc6bbfb52d9e728d77f.png'
        },
      ],
      aligntype: 'center',
      borderWidthOptions: Array(11).fill().map((_, i) => i),
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
        fontStyle: 'normal', // 斜体
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
      this.$parent.downloadImg()
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
    selectBorder (val) {
      this.$emit('setStyle', {
        borderStyle: val
      })
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
    changeTextAlign (val) {
      this.$emit('setStyle', {
        textAlign: val
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
      this.$emit('setStyle', {
        fontWeight: this.style.fontWeight
      })
    },
    changeFontStyle () {
      this.style.fontStyle = this.style.fontStyle === 'italic' ? 'normal' : 'italic'
      this.$emit('setStyle', {
        fontStyle: this.style.fontStyle
      })
    },
    changeBorderWidth (val) {
      this.$emit('setStyle', {
        borderWidth: val
      })
    },
    changeLineType(value) {
      console.log(this.pointtype.type + '-' + value);
      const { lf, activeEdges } = this.$props
      const { graphModel } = lf
      lf.setDefaultEdgeType(value)
      this.linetype.type = value
      if(activeEdges && activeEdges.length > 0) {
        activeEdges.forEach(edge => {
          graphModel.changeEdgeType(edge.id, value)
        })
      }
    },
    changePoint (value) {
      if (value) {
        this.pointtype.type = value
        console.log(value + '-' + this.linetype.type);
        const { lf, activeEdges } = this.$props
        const { graphModel } = lf
        if(activeEdges && activeEdges.length > 0) {
          activeEdges.forEach(edge => {
            graphModel.changeEdgeType(edge.id, value + '-' + this.linetype.type)
          })
        }
      }
    },
    download () {
      this.$parent.editGraph()
    }
    // saveGraph () {
    //   const data = this.lf.getGraphData()
    //   this.download(this.filename, JSON.stringify(data))
    // },
    // download (filename, text) {
    //   window.sessionStorage.setItem(filename, text)
    //   const element = document.createElement('a')
    //   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    //   element.setAttribute('download', filename)
    //   element.style.display = 'none'
    //   document.body.appendChild(element)
    //   element.click()
    //   document.body.removeChild(element)
    // }
  },
  components: {
    ColorFill,
    ColorText,
    ColorBorder,
    IconBlod,
    IconBevel,
    ZoomIn,
    ZoomOut,
    StepBack,
    StepForward,
    Underline,
    BorderWidth,
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
.option-item {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px; 
    height: 20px;
  }
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
.border-style {
  width: 150px;
  height: 0px;
  margin-top: 18px;
  border-bottom-width: 1px;
  border-bottom-color: black;
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
