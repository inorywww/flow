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
      d: 'm6.99483,8.56914l96.83476,0l0,77.67036l-48.41741,19.41761l-48.4174,-19.41761l0.00006,-77.67036z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 110' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'other-import',
  view: View,
  model: Model
}