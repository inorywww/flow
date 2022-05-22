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
      ry: 36,
      rx: 64,
      cy: 39,
      cx: 70,
    }
    const pathAAttrs1 = {
      ...style,
      ry: 30,
      rx: 59,
      cy: 38,
      cx: 70,
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 80' }, [
      h('ellipse', {
        ...pathAAttrs,
      }),
      h('ellipse', {
        ...pathAAttrs1,
      })
    ])
  }
}

export default {
  type: 'db-entity',
  view: View,
  model: Model
}