<template>
  <div class="diagram">
    <diagram-toolbar
      v-if="lf"
      :lf="lf"
      :activeEdges="activeEdges"
      @changeNodeFillColor="changeNodeFill"
      @saveGraph="saveGraph"
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
import { Snapshot } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import DiagramToolbar from './components/DiagramToolbar.vue'
import DiagramSidebar from './components/DiagramSidebar.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import { registerCustomElement } from './node'
import { getGraph, editGraph } from '../../api/index'
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
        }
      })
    },
    editGraph () {
      const data = this.graphData
      data.info = JSON.stringify(this.lf.getGraphData())
      console.log(data);
      editGraph(this.$route.params.id, data).then(res => {
        if (res.status === 200) {
          console.log(res.data);
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
    dragInNode (type) {
      this.lf.dnd.startDrag({
        type
      })
    },
    changeNodeFill (color) {
      const { nodes } = this.lf.graphModel.getSelectElements()
      nodes.forEach(({ id }) => {
        this.lf.setProperties(id, {
          fill: color
        })
      })
    },
    setStyle (item) {
      this.activeNodes.forEach(({ id }) => {
        this.lf.setProperties(id, item)
      })
      this.activeEdges.forEach(({ id }) => {
        this.lf.setProperties(id, item)
      })
      this.getProperty()
    },
    setZIndex (type) {
      this.activeNodes.forEach(({ id }) => {
        this.lf.setElementZIndex(id, type)
      })
      this.activeEdges.forEach(({ id }) => {
        this.lf.setElementZIndex(id, type)
      })
    },
    downloadImg () {
      // const lf = new LogicFlow({
      //   container: this.$refs.diagram,
      // })
      // this.lf.getSnapshot()
      // this.lf.extension.snapshot.getSnapshot()
      console.log(this.lf.getSnapshot);
      const styleSheets = document.styleSheets;
      let rules = ''
      for (var i2 = 0; i2 < styleSheets.length; i2++) {
      var sheet = styleSheets[i2];
      console.log(sheet);
      for (var j2 = 0; j2 < sheet.cssRules.length; j2++) {
        rules += sheet.cssRules[j2].cssText;
      }
    }
    },
    saveGraph () {
      const data = this.lf.getGraphData()
      console.log(JSON.stringify(data));
      this.$http.get()
      // const str = '{"nodes":[{"id":"fa629f2c-0413-420c-8e9b-11aeffe8a71b","type":"rect-radius","x":330,"y":230,"properties":{},"zIndex":1013},{"id":"780dbd3b-3f5d-4487-a580-d8bb1f24a9bd","type":"rect-radius","x":525,"y":260,"properties":{},"zIndex":1015}],"edges":[{"id":"38b94e62-f25e-44d9-a2ec-6cf1a04a6f13","type":"fill-triangle-polyline","sourceNodeId":"fa629f2c-0413-420c-8e9b-11aeffe8a71b","targetNodeId":"780dbd3b-3f5d-4487-a580-d8bb1f24a9bd","startPoint":{"x":330,"y":190},"endPoint":{"x":525,"y":220},"properties":{},"zIndex":1016,"pointsList":[{"x":330,"y":190},{"x":330,"y":160},{"x":525,"y":160},{"x":525,"y":220}]},{"id":"c3444865-580d-4201-9d53-3ffadb56728a","type":"fill-triangle-polyline","sourceNodeId":"fa629f2c-0413-420c-8e9b-11aeffe8a71b","targetNodeId":"780dbd3b-3f5d-4487-a580-d8bb1f24a9bd","startPoint":{"x":380,"y":230},"endPoint":{"x":575,"y":260},"properties":{},"zIndex":1017,"pointsList":[{"x":380,"y":230},{"x":410,"y":230},{"x":410,"y":320},{"x":605,"y":320},{"x":605,"y":260},{"x":575,"y":260}]}]}'
      // this.lf.addElements(JSON.parse(str))
      // this.download(this.filename, JSON.stringify(data))
    },
    download (filename, text) {
      window.sessionStorage.setItem(filename, text)
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
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