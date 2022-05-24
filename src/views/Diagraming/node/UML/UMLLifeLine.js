import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 160
    this.height = 160
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
      height: 35,
      width: 108,
      y: 6,
      x: 6,
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm57.8,43.4l-0.2,72.6',
      'stroke-dasharray': "4, 4",
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 120' }, [
      h('rect', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'uml-life-line',
  view: View,
  model: Model
}