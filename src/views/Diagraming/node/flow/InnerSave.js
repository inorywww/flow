import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
class InnerSaveModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 160;
    this.height = 90;
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
      x: 3,
      y: 3,
      width: 145,
      height: 77,
    }
    const pathAAttrs2 = {
      ...style,
      x1: 3,
      y1: 19.66667,
      x2: 148,
      y2: 19.33333
    }
    const pathAAttrs3 = {
      ...style,
      x1: 24,
      y1: 3.6666,
      x2: 24,
      y2: 80
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 150 83' }, [
      h('rect', {
        ...pathAAttrs1,
      }),
      h('line', {
        ...pathAAttrs2,
      }),
      h('line', {
        ...pathAAttrs3,
      }),
    ])
  }
}

export default {
  type: 'inner-save',
  view: InnerSaveView,
  model: InnerSaveModel
}