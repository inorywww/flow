import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 人工输入
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
      d: 'm27.47923,85.84876l-20.43191,-82.40454l95.59431,0l-21.4443,81.89899l-53.71811,0.50555z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 90' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'artificial-operation',
  view: View,
  model: Model
}