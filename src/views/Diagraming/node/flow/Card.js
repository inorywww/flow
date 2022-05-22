import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 人工输入
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
      d: 'm7.02412,23.4222l19.7247,-19.34691l77.59497,0l0,62.02518l-96.95305,0l-0.36662,-42.67827z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 70' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'card',
  view: View,
  model: Model
}