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
      d: 'm12.73807,42.32394l57.91095,-39.62l57.91108,39.62l-57.91108,39.62l-57.91095,-39.62z'
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm19.95321,42.13407l50.69582,-34.24029l50.69593,34.24029l-50.69593,34.24029l-50.69582,-34.24029z'
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 85' }, [
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'weak-relation',
  view: View,
  model: Model
}