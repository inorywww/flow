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
      d: 'm4.4594,24.91738l101.0754,-19.50786l0,56.58191l-101.39175,0l0.31635,-37.07405z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 70' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'artificial-input',
  view: View,
  model: Model
}