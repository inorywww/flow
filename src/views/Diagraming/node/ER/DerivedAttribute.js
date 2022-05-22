import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 160;
    this.height = 90;
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
      'stroke-dasharray': '2,2',
      ry: 36,
      rx: 66,
      cy: 39,
      cx: 70,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 80' }, [
      h('ellipse', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'derived-attribute',
  view: View,
  model: Model
}