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
      d: 'm5.17075,9.63067l0,0c0,3.41156 11.27782,6.17718 25.18972,6.17718c13.91189,0 25.18971,-2.76562 25.18971,-6.17718l0,0c0,-3.41156 11.27782,-6.17718 25.18972,-6.17718c13.9119,0 25.18971,2.76562 25.18971,6.17718l0,49.4174c0,-3.41156 -11.27781,-6.17718 -25.18971,-6.17718c-13.9119,0 -25.18972,2.76562 -25.18972,6.17718c0,3.41156 -11.27782,6.17717 -25.18971,6.17717c-13.9119,0 -25.18972,-2.76562 -25.18972,-6.17717l0,-49.4174z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 70' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'bands',
  view: View,
  model: Model
}