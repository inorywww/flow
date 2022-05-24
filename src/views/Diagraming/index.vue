<template>
  <div class="diagram">
    <template v-if="!isView">
      <NavigationBar :user_info="{}" :file_name="graphData.name"></NavigationBar>
      <MenuBar :graphData="graphData" :lf="lf" :showText="showText"></MenuBar>
      <diagram-toolbar
        v-if="lf"
        :lf="lf"
        :activeEdges="activeEdges"
        @setStyle="setStyle"
      />
    </template>
    <ShareHeader v-else :name="graphData.name"></ShareHeader>
    <div class="diagram-main" :style="{height: isView ? '100%' : ''}">
      <diagram-sidebar class="diagram-sidebar" @dragInNode="dragInNode" v-if="!isView" :types="graphData.types" />
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
import { lfJson2Xml, lfXml2Json} from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import DiagramToolbar from './components/DiagramToolbar.vue'
import DiagramSidebar from './components/DiagramSidebar.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import NavigationBar from './components/NavigationBar.vue'
import MenuBar from './components/MenuBar.vue'
import ShareHeader from './components/ShareHeader.vue'
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
      lf: null,
      filename: '',
      activeNodes: [],
      activeEdges: [],
      properties: {},
      shortcuts: [],
      graphData: {
        types: []
      },
      lastSelectId: '',
      showText: '所有更改已保存',
      isView: false
    }
  },
  mounted () {
    this.isView = this.$route.name === 'view'
    this.getGraph()
    // const data = {
    //   nodes: [
    //     {
    //       type: "UML-all",
    //       x: 300,
    //       y: 100,
    //       properties: {
    //         name: "hello",
    //         body: "world"
    //       }
    //     }
    //   ],
    //   edges: []
    // }
    const data = {}
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
    setTimeout(() => {
      this.setStop()
    }, 1000)
    // document.addEventListener('keydown', (e) => {
    //   console.log(e.keyCode);
    //   if (this.activeNodes && this.activeNodes.length > 0) {
    //     this.activeNodes.forEach((item) => {
    //       console.log(item);
    //       this.lf.graphModel.updateAttributes(item.id, {
    //         x: item.x + 1
    //       });
    //     })
    //   }
    // })
  },
  methods: {
    initLogicFlow (data) {
      // 引入框选插件
      if (!this.isView) {
        LogicFlow.use(SelectionSelect) 
      }
      LogicFlow.use(Menu)
      LogicFlow.use(Snapshot)
      this.initKeyword()
      const lf = new LogicFlow({
        container: this.$refs.diagram,
        stopMoveGraph: !this.isView,
        metaKeyMultipleSelected: true,
        keyboard: {
          enabled: true,
          shortcuts: this.shortcuts
        },
        isSilentMode: this.isView,
        grid: {
          visible: false,
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
      lf.selectAll = () => {
        this.$nextTick(() => {
          const { nodes } = this.lf.getGraphData()
          nodes.forEach(({id}) => {
            this.lf.graphModel.selectNodeById(id, true)
          })
        })
      }
      this.initEvent(lf)
      if (!this.isView) {
        lf.openSelectionSelect();
      }
      lf.render(data)
      this.lf = lf
      if (!this.isView) {
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
            this.setStop()
            this.saveEditGraph()
          }, 500)
        })
      }
    },
    // 初始化右键菜单
    initMenu (lf) {
      const _this = this
      lf.extension.menu.addMenuConfig({
        nodeMenu: [
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
          {
            text: '全选',
            callback () {
              lf.selectAll()
            }
          },
        ],
      })
    },
    initKeyword () {
      // this.shortcuts = [{
      //   keys: ['command+a', 'ctrl+a'],
      //   callback: () => {
      //     this.lf.selectAll()
      //   }
      // }]
      // this.shortcuts = [{
      //   keys: ["backspace"],
      //   callback: () => {
      //     const r = window.confirm("确定要删除吗？");
      //     if (r) {
      //       const elements = lf.getSelectElements(true);
      //       lf.clearSelectElements();
      //       elements.edges.forEach((edge) => lf.deleteEdge(edge.id));
      //       elements.nodes.forEach((node) => lf.deleteNode(node.id));
      //     }
      //   }
      // }]
    },
    initEvent (lf) {
      lf.on("input:change", ({model, key, val}) => {
        const properties = lf.getProperties(model.id)
        properties[key] = val.replaceAll(' ', '')
        console.log(properties);
        // lf.setProperties(model.id, properties);
      })
    },
    getGraph () {
      getGraph(this.$route.params.id).then(res => {
        if (res.status === 200) {
          this.graphData = res.data[0]
          console.log(this.graphData);
          this.lf.addElements(this.graphData.info)
          this.$nextTick(() => {
            this.lf.history.undos = []
          })
        }
      })
    },
    setStop () {
      this.$nextTick(() => {
        const nodes = document.querySelectorAll('.edit-node')
        if (nodes && nodes.length > 0) {
          nodes.forEach(item => {
            item.addEventListener('keydown', e => {
              console.log('keydown');
              if (e.key === 'Backspace') {
                e.stopPropagation()
              }
            }, false)
          })
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
      data.info = this.lf.getGraphData()
      // data.info = JSON.stringify(this.lf.getGraphData())
      this.showText = '保存中...'
      this.lf.getSnapshotBase64().then(res => {
        data.img = res.data
      }).then(() => {
        editGraph(this.$route.params.id, data).then(res => {
          if (res.status === 200) {
            this.showText = '所有更改已保存'
          }
        }).catch(err => {
          this.showText = '所有更改已保存'
        })
      })
      
    },
    downloadImg (type = 'png') {
      if (type === 'png' || type === 'jpg') {
        this.lf.getSnapshot(this.graphData.name + '.' + type)
      } else if (type === 'lf') {
        download(this.graphData.name + '.lf', JSON.stringify(this.lf.getGraphData()));
      } else {
        download(this.graphData.name + '.xml', lfJson2Xml(this.lf.getGraphData()));
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
    saveBase64 () {
      this.lf.getSnapshotBase64().then(res => {
        console.log(res.data);
      })
    },
    getCanUndo () {
      return this.lf.history.undos.filter(item => item.nodes.length > 0 && item.edges.length > 0).length > 0
    },
  },
  components: {
    DiagramToolbar,
    DiagramSidebar,
    PropertyPanel,
    NavigationBar,
    MenuBar,
    ShareHeader,
  }
}
</script>

<style lang="less"> 
@import './styles/UML.less';
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #eee !important;
  color: #606266 !important;
}
.diagram {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.diagram-main {
  display: flex;
  width: 100%;
  height: calc(100% - 160px);
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