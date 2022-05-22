import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class InnerSaveModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 120
    this.height = 100
  }
}

class InnerSaveView extends RectNode.view {
  getResizeShape () {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    const svgAttr = {
      x: x - 1/2 * width,
      y: y - 1/2 * height,
      width,
      height,
    }
    const pathAAttrs1 = {
      ...style,
      y2: 10,
      x2: 105,
      y1: 10,
      x1: 4
    }
    const pathAAttrs2 = {
      ...style,
      y2: 80,
      x2: 105,
      y1: 80,
      x1: 4
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 90' }, [
      h('line', {
        ...pathAAttrs1,
      }),
      h('line', {
        ...pathAAttrs2,
      }),
    ])
  }
}

export default {
  type: 'parallel-mode',
  view: InnerSaveView,
  model: InnerSaveModel
}