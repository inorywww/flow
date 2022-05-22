import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 90
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
      transform: 'rotate(180 54.5776 57.0519)',
      d: 'm7.12593,87.62039l47.45165,-61.13703l47.45165,61.13703l-94.90329,0z'
    }
    const pathAAttrs1 = {
      ...style,
      y2: 10,
      x2: 30,
      y1: 26,
      x1: 30,
    }
    const pathAAttrs2 = {
      ...style,
      d: 'm54.65182,87.37258l-0.12658,17.21508'
    }
    const pathAAttrs3 = {
      ...style,
      d: 'm76.58134,26.2278l0,-16.57623'
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 110' }, [
      h('path', {
        ...pathAAttrs,
      }),
      h('line', {
        ...pathAAttrs1,
      }),
      h('path', {
        ...pathAAttrs2,
      }),
      h('path', {
        ...pathAAttrs3,
      }),
    ])
  }
}

export default {
  type: 'all-prevail',
  view: View,
  model: Model
}