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
      rx: 50,
      ry: 50,
      cy: 55,
      cx: 60,
      'stroke-width': 2,

    }
    const pathAAttrs1 = {
      ...style,
      d: 'm7.67858,104.28571l102.32142,0',
      'stroke-width': 2,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 120' }, [
      h('ellipse', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'uml-entity',
  view: View,
  model: Model
}