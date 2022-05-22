<template>
  <div class="diagram-sidebar">
    <div class="detail-modal" :style="{'top': posY + 'px'}" v-if="detailCpt">
      <component :is="detailCpt"></component>
      <div class="name">{{detailName}}</div>
    </div>
    <div class="group" v-if="showTypes.includes('default')">
      <div class="title-box" @click="addShows('default')">
        <svg :class="{'open': shows.includes('default')}" t="1653205704909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="48683" width="16" height="16"><path d="M398.499 236.5l274.256 274.256-274.256 274.256z" p-id="48684"></path></svg>
        <h1 class="node-group-title">基础图形</h1>
      </div>
      <div class="node-group" v-if="shows.includes('default')" @mouseleave="detailCpt = ''">
        <div class="node-item" @mousedown="dragInNode('pro-text')" ref="icon-text" @mouseenter="showDetail('icon-text', '文字')">
          <icon-text class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-circle')" ref="icon-circle" @mouseenter="showDetail('icon-circle', '圆形')">
          <icon-circle class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-rect')" ref="icon-rect" @mouseenter="showDetail('icon-rect', '矩形')">
          <icon-rect class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('rect-radius')" ref="icon-rect-radius" @mouseenter="showDetail('icon-rect-radius', '圆角矩形')">
          <icon-rect-radius class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('triangle')" ref="icon-triangle" @mouseenter="showDetail('icon-triangle', '三角形')">
          <icon-triangle class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-ellipse')" ref="icon-ellipse" @mouseenter="showDetail('icon-ellipse', '椭圆形')">
          <icon-ellipse class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-diamond')" ref="icon-diamond" @mouseenter="showDetail('icon-diamond', '菱形')">
          <icon-diamond class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('cylinde')" ref="icon-cylinde" @mouseenter="showDetail('icon-cylinde', '圆柱体')">
          <icon-cylinde class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('parallelogram')" ref="icon-parallelogram" @mouseenter="showDetail('icon-parallelogram', '平行四边形')">
          <icon-parallelogram class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('star')" ref="icon-star" @mouseenter="showDetail('icon-star', '五角星')">
          <icon-star class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('left-arrow')" ref="icon-left-arrow" @mouseenter="showDetail('icon-left-arrow', '左箭头')">
          <icon-left-arrow class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('right-arrow')" ref="icon-right-arrow" @mouseenter="showDetail('icon-right-arrow', '右箭头')">
          <icon-right-arrow class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('horizontal-arrow')" ref="icon-horizontal-arrow" @mouseenter="showDetail('icon-horizontal-arrow', '左右箭头')">
          <icon-horizontal-arrow class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('up-arrow')" ref="icon-up-arrow" @mouseenter="showDetail('icon-up-arrow', '上箭头')">
          <icon-up-arrow class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('down-arrow')" ref="icon-down-arrow" @mouseenter="showDetail('icon-down-arrow', '下箭头')">
          <icon-down-arrow class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('vertical-arrow')" ref="icon-vertical-arrow" @mouseenter="showDetail('icon-vertical-arrow', '上下箭头')">
          <icon-vertical-arrow class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pentagon')" ref="icon-pentagon" @mouseenter="showDetail('icon-pentagon', '五边形')">
          <icon-pentagon class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('hexagon')" ref="icon-hexagon" @mouseenter="showDetail('icon-hexagon', '六边形')">
          <icon-hexagon class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('septagon')" ref="icon-septagon" @mouseenter="showDetail('icon-septagon', '七边形')">
          <icon-septagon class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('heptagon')" ref="icon-heptagon" @mouseenter="showDetail('icon-heptagon', '八边形')">
          <icon-heptagon class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('trapezoid')" ref="icon-trapezoid" @mouseenter="showDetail('icon-trapezoid', '梯形')">
          <icon-trapezoid class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('cross')" ref="icon-cross" @mouseenter="showDetail('icon-cross', '加号')">
          <icon-cross class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('minus')" ref="icon-minus" @mouseenter="showDetail('icon-minus', '减号')">
          <icon-minus class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('times')" ref="icon-times" @mouseenter="showDetail('icon-times', '乘号')">
          <icon-times class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('divide')" ref="icon-divide" @mouseenter="showDetail('icon-divide', '除号')">
          <icon-divide class="svg-node" />
        </div>
      </div>
    </div>
    <div class="group flow-chart" v-if="showTypes.includes('flowChart')">
      <div class="title-box" @click="addShows('flowChart')">
        <svg :class="{'open': shows.includes('flowChart')}" t="1653205704909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="48683" width="16" height="16"><path d="M398.499 236.5l274.256 274.256-274.256 274.256z" p-id="48684"></path></svg>
        <h1 class="node-group-title">FlowChart流程图</h1>
      </div>
      <div class="node-group" v-if="shows.includes('flowChart')" @mouseleave="detailCpt = ''">
        <div class="node-item" @mousedown="dragInNode('pro-rect')" ref="icon-rect-1" @mouseenter="showDetail('icon-rect-1', '流程')">
          <icon-rect-1 class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-diamond')" ref="icon-diamond-1" @mouseenter="showDetail('icon-diamond-1', '判定')">
          <icon-diamond-1 class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('rect-radius2')" ref="icon-rect-radius-1" @mouseenter="showDetail('icon-rect-radius-1', '开始/结束')">
          <icon-rect-radius-1 class="svg-node"/>
        </div>
        <div class="node-item" @mousedown="dragInNode('parallelogram')" ref="icon-parallelogram-1" @mouseenter="showDetail('icon-parallelogram-1', '数据')">
          <icon-parallelogram-1 class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('sub-process')" ref="sub-process" @mouseenter="showDetail('sub-process', '子流程')">
          <sub-process class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('ex-data')" ref="ex-data" @mouseenter="showDetail('ex-data', '外部数据')">
          <ex-data class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('inner-save')" ref="inner-save" @mouseenter="showDetail('inner-save', '内部存储')">
          <inner-save class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('queue-data')" ref="queue-data" @mouseenter="showDetail('queue-data', '队列数据')">
          <queue-data class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('artificial-input')" ref="artificial-input" @mouseenter="showDetail('artificial-input', '人工输入')">
          <artificial-input class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('card')" ref="card" @mouseenter="showDetail('card', '卡片')">
          <card class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('bands')" ref="bands" @mouseenter="showDetail('bands', '条带')">
          <bands class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('exhibit')" ref="exhibit" @mouseenter="showDetail('exhibit', '展示')">
          <exhibit class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('artificial-operation')" ref="artificial-operation" @mouseenter="showDetail('artificial-operation', '人工操作')">
          <artificial-operation class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('parallel-mode')" ref="parallel-mode" @mouseenter="showDetail('parallel-mode', '并行模式')">
          <parallel-mode class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-circle')" ref="page-import" @mouseenter="showDetail('page-import', '页面内引用')">
          <page-import class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('other-import')" ref="other-import" @mouseenter="showDetail('other-import', '跨页引用')">
          <other-import class="svg-node" />
        </div>
      </div>
    </div>
    <div class="group ER-Chart" v-if="showTypes.includes('ERChart')">
      <div class="title-box" @click="addShows('ERChart')">
        <svg :class="{'open': shows.includes('ERChart')}" t="1653205704909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="48683" width="16" height="16"><path d="M398.499 236.5l274.256 274.256-274.256 274.256z" p-id="48684"></path></svg>
        <h1 class="node-group-title">ER图</h1>
      </div>
      <div class="node-group" v-if="shows.includes('ERChart')" @mouseleave="detailCpt = ''">
        <div class="node-item" @mousedown="dragInNode('pro-rect')" ref="entity" @mouseenter="showDetail('entity', '实体')">
          <entity class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('derived-attribute')" ref="derived-attribute" @mouseenter="showDetail('derived-attribute', '派生属性')">
          <derived-attribute class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-ellipse')" ref="icon-ellipse-2" @mouseenter="showDetail('icon-ellipse-2', '键值属性')">
          <icon-ellipse-2 class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('db-entity')" ref="db-entity" @mouseenter="showDetail('db-entity', '多键属性')">
          <db-entity class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('weak-entity')" ref="weak-entity" @mouseenter="showDetail('weak-entity', '弱实体')">
          <weak-entity class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('pro-diamond')" ref="relation" @mouseenter="showDetail('relation', '关系')">
          <relation class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('weak-relation')" ref="weak-relation" @mouseenter="showDetail('weak-relation', '弱关系')">
          <weak-relation class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('prevail')" ref="prevail" @mouseenter="showDetail('prevail', '概化')">
          <prevail class="svg-node" />
        </div>
        <div class="node-item" @mousedown="dragInNode('all-prevail')" ref="all-prevail" @mouseenter="showDetail('all-prevail', '全部概化')">
          <all-prevail class="svg-node" />
        </div>

      </div>
    </div>
    <div class="group UML-Chart" v-if="showTypes.includes('UMLChart')">
      <div class="title-box" @click="addShows('UMLChart')">
        <svg :class="{'open': shows.includes('UMLChart')}" t="1653205704909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="48683" width="16" height="16"><path d="M398.499 236.5l274.256 274.256-274.256 274.256z" p-id="48684"></path></svg>
        <h1 class="node-group-title">UML图</h1>
      </div>
      <div class="node-group" v-if="shows.includes('UMLChart')" @mouseleave="detailCpt = ''">
        <div class="node-item" @mousedown="dragInNode('actor')" ref="icon-actor" @mouseenter="showDetail('icon-actor', '角色')">
          <icon-actor class="svg-node" />
        </div>
      </div>
    </div>
    <div class="btn new" @click="showDialog">
      <button>更多图形</button>
    </div>
    <el-dialog
      title="图形管理"
      :visible.sync="showMoreDialog"
      width="30%">
      <div class="inner-box">
        <el-checkbox-group class="type-list" v-model="addTypes">
          <el-checkbox label="default">基础图形</el-checkbox>
          <el-checkbox label="flowChart">FlowChart流程图</el-checkbox>
          <el-checkbox label="ERChart">实体关系图（E-R图）</el-checkbox>
          <el-checkbox label="UMLChart">UML图</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import IconCircle from '../icons/default/Circle.vue'
import IconRect from '../icons/default/Rect.vue'
import IconRect1 from '../icons/flowChart/Rect.vue'
import Entity from '../icons/flowChart/Rect.vue'
import IconRectRadius from '../icons/default/RectRadius.vue'
import IconRectRadius1 from '../icons/flowChart/RectRadius.vue'
import IconActor from '../icons/UML/Actor.vue'
import IconCylinde from '../icons/default/Cylinde.vue'
import IconDiamond from '../icons/default/Diamond.vue'
import IconDiamond1 from '../icons/flowChart/Diamond.vue'
import Relation from '../icons/flowChart/Diamond.vue'
import IconEllipse from '../icons/default/Ellipse.vue'
import IconEllipse2 from '../icons/default/Ellipse.vue'
import IconParallelogram from '../icons/default/Parallelogram.vue'
import IconParallelogram1 from '../icons/default/Parallelogram.vue'
import IconText from '../icons/default/Text.vue'
import IconTriangle from '../icons/default/Triangle.vue'
import IconLeftArrow from '../icons/default/LeftArrow.vue'
import IconRightArrow from '../icons/default/RightArrow.vue'
import IconHorizontalArrow from '../icons/default/HorizontalArrow.vue'
import IconUpArrow from '../icons/default/UpArrow.vue'
import IconDownArrow from '../icons/default/DownArrow.vue'
import IconVerticalArrow from '../icons/default/VerticalArrow.vue'
import IconPentagon from '../icons/default/Pentagon.vue'
import IconHexagon from '../icons/default/Hexagon.vue'
import IconSeptagon from '../icons/default/Septagon.vue'
import IconHeptagon from '../icons/default/Heptagon.vue'
import IconTrapezoid from '../icons/default/Trapezoid.vue'
import IconCross from '../icons/default/Cross.vue'
import IconMinus from '../icons/default/Minus.vue'
import IconTimes from '../icons/default/Times.vue'
import IconDivide from '../icons/default/Divide.vue'
import IconStar from '../icons/default/Star.vue'

import SubProcess from '../icons/flowChart/SubProcess.vue'
import ExData from '../icons/flowChart/ExData.vue'
import InnerSave from '../icons/flowChart/InnerSave.vue'
import QueueData from '../icons/flowChart/QueueData.vue'
import ArtificialInput from '../icons/flowChart/ArtificialInput.vue'
import Card from '../icons/flowChart/Card.vue'
import Bands from '../icons/flowChart/Bands.vue'
import Exhibit from '../icons/flowChart/Exhibit.vue'
import ArtificialOperation from '../icons/flowChart/ArtificialOperation.vue'
import ParallelMode from '../icons/flowChart/ParallelMode.vue'
import PageImport from '../icons/default/Circle.vue'
import OtherImport from '../icons/flowChart/OtherImport.vue'


// er
import DerivedAttribute from '../icons/ER/DerivedAttribute.vue'
import DbEntity from '../icons/ER/DbEntity.vue'
import WeakEntity from '../icons/ER/WeakEntity.vue'
import WeakRelation from '../icons/ER/WeakRelation.vue'
import Prevail from '../icons/ER/Prevail.vue'
import AllPrevail from '../icons/ER/AllPrevail.vue'

export default {
  name: 'DiagramSidebar',
  props: {
    types: {
      type: Array,
      default: () => {}
    },
  },
  data () {
    return {
      // showTypes: [],
      shows: [],
      showMoreDialog: false,
      addTypes: [],
      detailCpt: '',
      detailName: '',
      posY: '',
    }
  },
  computed: {
    showTypes () {
      return this.types
    }
  },
  mounted () {
    setTimeout(() => {
      
    }, 2000)
  },
  methods: {
    showDetail (cpt, name) {
      this.detailCpt = cpt
      this.detailName = name
      this.posY = this.$refs[cpt].getBoundingClientRect().y
    },
    dragInNode (type) {
      this.$emit('dragInNode', type)
    },
    addShows (val) {
      const index = this.shows.indexOf(val)
      if (index === -1) {
        this.shows.push(val)
      } else {
        this.shows.splice(index, 1)
      }
    },
    showDialog () {
      this.showMoreDialog = true
      this.addTypes = this.showTypes
    },
    confirm () {
      this.showMoreDialog = false
      this.$parent.graphData.types = this.addTypes
      this.$parent.saveEditGraph()
    } 
  },
  components: {
    IconCircle,
    IconRect,
    IconRectRadius,
    IconActor,
    IconCylinde,
    IconDiamond,
    IconEllipse,
    IconParallelogram,
    IconText,
    IconTriangle,
    IconRightArrow,
    IconLeftArrow,
    IconHorizontalArrow,
    IconUpArrow,
    IconDownArrow,
    IconVerticalArrow,
    IconPentagon,
    IconHexagon,
    IconSeptagon,
    IconHeptagon,
    IconTrapezoid,
    IconCross,
    IconMinus,
    IconTimes,
    IconDivide,
    IconStar,
    IconRect1,
    IconDiamond1,
    IconRectRadius1,
    IconParallelogram1,

    SubProcess,
    ExData,
    InnerSave,
    QueueData,
    ArtificialInput,
    Card,
    Bands,
    Exhibit,
    ArtificialOperation,
    ParallelMode,
    PageImport,
    OtherImport,

    DerivedAttribute,
    Entity,
    IconEllipse2,
    DbEntity,
    WeakEntity,
    Relation,
    WeakRelation,
    Prevail,
    AllPrevail,
  }
}
</script>

<style lang="less" scoped>
.diagram-sidebar {
  user-select: none;
  position: relative;
}
.el-checkbox {
  padding: 6px 0;
}
.group {
  .title-box {
    display: flex;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px solid #e5e5e5;
    .open {
      transform: rotate(90deg);
    }
  }
}
.node-group-title {
  margin: 0;
  font-size: 14px;
  display: block;
  
  line-height: 30px;
}
.node-item {
  width: 35px;
  height: 35px;
  margin-right: 5px;
  display: inline-block;
}
.detail-modal {
  position: fixed;
  left: 200px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  z-index: 100;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
  transform: translateY(-40%);
}
.node-group {
  border-bottom: 1px solid #e5e5e5;
  padding-top: 12px;
}
.type-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.svg-node {
  left: 1px;
  top: 1px;
  width: 32px;
  height: 30px;
  display: block;
  position: relative;
  overflow: hidden;
}
.image-node, .icon-node {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 10px;
  cursor: pointer;
}
.new {
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 120px;
  line-height: 30px;
  text-align: center;
  background-color: #4386f5;
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
  caret-color: transparent;
  transform: translateX(-50%);
  font-size: 14px;
}
</style>
