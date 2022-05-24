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
    const pathAAttrs = {
      ...style,
      rx: 55,
      ry: 55,
      cy: 69,
      cx: 58,
      'stroke-width': 2,
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm64.2,9.2l-6,4.7',
      'stroke-width': 2,
    }
    const pathAAttrs2 = {
      ...style,
      d: 'm58.4,14l5.6,4.4',
      'stroke-width': 2,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 130' }, [
      h('ellipse', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
      h('path', {
        ...pathAAttrs2,
      }),
    ])
  }
}

export default {
  type: 'uml-control',
  view: View,
  model: Model
}