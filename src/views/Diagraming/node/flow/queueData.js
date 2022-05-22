import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
class QueueDataModel extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 95;
    this.height = 95;
  }
}

class QueueDataView extends RectNode.view {
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
    // const pathAAttrs = {
    //<ellipse stroke="#000" ry="35" rx="35" id="svg_15" cy="41" cx="38.83333" fill="#fff"/>
  // <line id="svg_16" y2="76" x2="83.66667" y1="76" x1="36.66667" stroke="#000" fill="none"/>
    // }
    const pathAAttrs1 = {
      ...style,
      rx: 35,
      ry: 35,
      cx: 38,
      cy: 41
    }
    const pathAAttrs2 = {
      ...style,
      x1: 36,
      y1: 76,
      x2: 83,
      y2: 76
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 85 85' }, [
      h('ellipse', {
        ...pathAAttrs1,
      }),
      h('line', {
        ...pathAAttrs2,
      }),
    ])
  }
}

export default {
  type: 'queue-data',
  view: QueueDataView,
  model: QueueDataModel
}