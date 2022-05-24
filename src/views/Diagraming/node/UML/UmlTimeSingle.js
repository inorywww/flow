import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 110
    this.height = 100
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
    const pathAAttrs1 = {
      ...style,
      d: 'm6.94911,8.936l105.39989,0l-52.69994,46.3l52.69994,46.3l-105.4,0l52.70005,-46.3l-52.69994,-46.3z',
      'stroke-width': 2,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 110' }, [
      h('path', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'uml-time-single',
  view: View,
  model: Model
}