import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 135
    this.height = 105
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
      height: 80.6,
      width: 107.6,
      y: 5.6,
      x: 16,
      rx: 4,
      'stroke-width': 2,
    }
    const pathAAttrs1 = {
      ...style,
      height: 80.6,
      width: 107.6,
      y: 13.8,
      x: 6,
      rx: 4,
      fill: '#FFF',
      'stroke-width': 2,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 130 100' }, [
      h('rect', {
        ...pathAAttrs,
      }),
      h('rect', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'uml-db-class',
  view: View,
  model: Model
}