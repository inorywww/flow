import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
class ExDataModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
  }
}

class ExDataView extends RectNode.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    console.log(style);
    const svgAttr = {
      x: x - 1/2 * width,
      y: y - 1/2 * height,
      width,
      height,
    }
    const pathAAttrs = {
      ...style,
      d: 'm25.25924,6.64629l112.23557,0c-12.3972,0 -22.44711,15.89663 -22.44711,35.50611c0,19.60948 10.04991,35.5061 22.44711,35.5061l-112.23557,0l0,0c-12.3972,0 -22.44711,-15.89663 -22.44711,-35.5061c0,-19.60948 10.04991,-35.50611 22.44711,-35.50611z'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 85' }, [
      h('path', {
        ...pathAAttrs,
      })
    ])
  }
}

export default {
  type: 'ex-data',
  view: ExDataView,
  model: ExDataModel
}