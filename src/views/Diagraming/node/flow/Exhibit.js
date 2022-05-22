import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 人工输入
class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
  }
}

class View extends RectNode.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    const svgAttr = {
      x: x - 1/2 * width,
      y: y - 1/2 * height,
      width,
      height,
    }
    const pathAAttrs = {
      ...style,
      d: 'm2.20115,34.45041l17.51045,-30.18968l70.04155,0c9.67082,0 17.51061,13.51636 17.51061,30.18968c0,16.67314 -7.83979,30.18968 -17.51061,30.18968l-70.04155,0l-17.51045,-30.18968z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 70' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'exhibit',
  view: View,
  model: Model
}