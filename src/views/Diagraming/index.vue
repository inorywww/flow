<template>
  <div class="diagram">
    <diagram-toolbar
      v-if="lf"
      :lf="lf"
      :activeEdges="activeEdges"
      @setStyle="setStyle"
    />
    <div class="diagram-main">
      <diagram-sidebar class="diagram-sidebar" @dragInNode="dragInNode" />
      <div class="diagram-container" ref="container">
        <div class="diagram-wrapper">
          <div class="lf-diagram" ref="diagram"></div>
        </div>
      </div>
    </div>
    <!-- 右侧属性面板 -->
    <!-- <PropertyPanel
      class="diagram-panel"
      v-if="activeNodes.length>0 || activeEdges.length > 0"
      :onlyEdge="activeNodes.length === 0"
      :elementsStyle="properties"
      @setStyle="setStyle"
      @setZIndex="setZIndex"
    /> -->
  </div>
</template>

<script>
import LogicFlow from '@logicflow/core'
import { SelectionSelect } from '@logicflow/extension'
import { Menu } from '@logicflow/extension'
// import { Snapshot } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import DiagramToolbar from './components/DiagramToolbar.vue'
import DiagramSidebar from './components/DiagramSidebar.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import { registerCustomElement } from './node'
import { getGraph, editGraph } from '../../api/index'
import { Snapshot } from './utils/snapshot'
export default {
  name: 'Diagram',
  data () {
    return {
      sidebarWidth: 200,
      diagramWidth: 0,
      diagramHeight: 0,
      lf: '',
      filename: '',
      activeNodes: [],
      activeEdges: [],
      properties: {},
      graphData: {}
    }
  },
  mounted () {
    this.getGraph()
    let data = ''
    if (window.location.search) {
      const query = window.location.search.substring(1).split('&').reduce((map, kv) => {
        const [key, value] = kv.split('=')
        map[key] = value
        return map
      }, {})
      this.filename = query.filename
      const d = window.sessionStorage.getItem(this.filename)
      if (d) {
        data = JSON.parse(d)
      }
    }
    this.initLogicFlow(data)
  },
  methods: {
    initLogicFlow (data) {
      // 引入框选插件
      LogicFlow.use(SelectionSelect)
      LogicFlow.use(Menu)
      LogicFlow.use(Snapshot)
      const lf = new LogicFlow({
        container: this.$refs.diagram,
        overlapMode: 1,
        autoWrap: true,
        metaKeyMultipleSelected: true,
        keyboard: {
          enabled: true
        },
        grid: {
          visible: false,
          size: 5
        },
        background: {
          backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")',
          backgroundRepeat: 'repeat'
        }
      })
      this.initMenu(lf)
      lf.setTheme(
        {
          baseEdge: { strokeWidth: 1 },
          baseNode: { strokeWidth: 1 },
          nodeText: { overflowMode: 'autoWrap', lineHeight: 1.5 },
          edgeText: { overflowMode: 'autoWrap', lineHeight: 1.5 }
        }
      )
      // 注册自定义元素
      registerCustomElement(lf)
      lf.setDefaultEdgeType('fill-triangle-polyline')
      lf.render(data)
      this.lf = lf
      this.lf.on('selection:selected, node:click, blank:click, edge:click', () => {
        this.$nextTick(() => {
          const { nodes, edges } = this.lf.getSelectElements()
          this.activeNodes = nodes
          this.activeEdges = edges
          this.getProperty()
        })
      })
      this.lf.on('history:change', () => {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.saveEditGraph()
        }, 500)
      })
      this.lf.on('blank:click', () => {
        console.log('blank:click');
      })
      this.lf.on('node:contextmenu', obj => {
        console.log(obj);
      })
    },
    // 初始化右键菜单
    initMenu (lf) {
      const _this = this
      lf.extension.menu.addMenuConfig({
        nodeMenu: [
          // {
          //   text: '上移一层',
          //   callback () {
          //     _this.setZIndex('top')
          //   }
          // },
          // {
          //   text: '下移一层',
          //   callback () {
          //     _this.setZIndex('bottom')
          //   }
          // },
          {
            text: '置于顶层',
            callback () {
              _this.setZIndex('top')
            }
          },
          {
            text: '置于底层',
            callback () {
              _this.setZIndex('bottom')
            }
          },
          {
            text: '剪切',
            callback (node) {
              lf.cloneNode(node.id)
              lf.deleteNode(node.id)
            },
          },
        ],
        edgeMenu: [
          {
            text: '属性',
            callback (edge) {
              alert(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`
              );
            },
          },
        ],
        graphMenu: [
          {
            text: '分享',
            callback () {
              alert('分享成功！');
            }
          },
        ],
      })
    },
    getGraph () {
      getGraph(this.$route.params.id).then(res => {
        if (res.status === 200) {
          this.graphData = res.data[0]
          this.lf.addElements(JSON.parse(this.graphData.info))
        }
      })
    },
    // 获取可以进行设置的属性
    getProperty () {
      let properties = {}
      const { nodes, edges } = this.lf.getSelectElements()
      nodes.forEach(node => {
        properties = { ...properties, ...node.properties }
      })
      edges.forEach(edge => {
        properties = { ...properties, ...edge.properties }
      })
      this.properties = properties
      return properties
    },
    // 拖动节点到画布
    dragInNode (type) {
      this.lf.dnd.startDrag({
        type
      })
    },
    // 设置节点样式
    setStyle (item) {
      this.activeNodes.forEach(({ id }) => {
        this.lf.setProperties(id, item)
      })
      this.activeEdges.forEach(({ id }) => {
        this.lf.setProperties(id, item)
      })
      this.getProperty()
    },
    // 设置zindex
    setZIndex (type) {
      this.activeNodes.forEach(({ id }) => {
        this.lf.setElementZIndex(id, type)
      })
      this.activeEdges.forEach(({ id }) => {
        this.lf.setElementZIndex(id, type)
      })
    },
    saveEditGraph () {
      const data = this.graphData
      data.info = JSON.stringify(this.lf.getGraphData())
      this.lf.getSnapshotBase64().then(res => {
        data.img = res.data
      }).then(() => {
        editGraph(this.$route.params.id, data).then(res => {
          if (res.status === 200) {
            console.log(res.data);
          }
        })
      })
      
    },
    downloadImg () {
      this.lf.getSnapshot(this.graphData.name + '.png')
    },
    saveBase64 () {
      this.lf.getSnapshotBase64().then(res => {
        console.log(res.data);
      })
    },
  },
  components: {
    DiagramToolbar,
    DiagramSidebar,
    PropertyPanel
  }
}
</script>

<style scoped>
.diagram {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.diagram-main {
  display: flex;
  width: 100%;
  height: 100%;
}
.diagram-sidebar {
  width: 185px;
  height: calc(100% - 40px);
  border-right: 1px solid #dadce0;
  padding: 10px;
}
.diagram-panel {
  width: 300px;
  background: #fff;
  height: calc(100% - 40px);
  position: absolute;
  right: 0px;
  top: 40px;
  border-left: 1px solid #dadce0;
}
.diagram-container {
  flex: 1;
}
/* 由于背景图和gird不对齐，需要css处理一下 */
.diagram /deep/ .lf-background {
  left: -9px;
}
.diagram-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.lf-diagram {
  box-shadow: 0px 0px 4px #838284;
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  background: white;
  border-left: 1px solid #e8e8e8;
}
::-webkit-scrollbar-thumb {
  border-width: 1px;
  border-style: solid;
  border-color: #fff;
  border-radius: 6px;
  background: #c9c9c9;
}
::-webkit-scrollbar-thumb:hover {
  background: #b5b5b5;
}
</style>