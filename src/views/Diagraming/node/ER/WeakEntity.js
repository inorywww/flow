import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
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
      height: 73,
      width: 128,
      y: 6,
      x: 6,
      stroke: 'gray'
    }
    const pathAAttrs1 = {
      ...style,
      height: 61,
      width: 116,
      y: 12,
      x: 12,
      stroke: 'black'
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 85' }, [
      h('rect', {
        ...pathAAttrs,
      }),
      h('rect', {
        ...pathAAttrs1,
      })
    ])
  }
}

export default {
  type: 'weak-entity',
  view: View,
  model: Model
}