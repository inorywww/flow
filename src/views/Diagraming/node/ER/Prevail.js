import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

// 五角星
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
    /**
     * <path transform="rotate(179.732 54.5776 57.0519)" stroke="#000" id="svg_23" d="m7.12593,87.62039l47.45165,-61.13703l47.45165,61.13703l-94.90329,0z" fill="#fff"/>
      <path id="svg_28" d="m54.65182,87.37258l-0.12658,17.21508" opacity="undefined" stroke="#000" fill="none"/>
      <path id="svg_29" d="m55.31565,26.48096l0,-16.57623" opacity="undefined" stroke="#000" fill="none"/>
     */
    const pathAAttrs = {
      ...style,
      transform: 'rotate(180 54.5776 57.0519)',
      d: 'm7.12593,87.62039l47.45165,-61.13703l47.45165,61.13703l-94.90329,0z'
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm54.65182,87.37258l-0.12658,17.21508'
    }
    const pathAAttrs2 = {
      ...style,
      d: 'm55.31565,26.48096l0,-16.57623'
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 110 110' }, [
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
      h('path', {
        ...pathAAttrs2,
      }),
    ])
  }
}

export default {
  type: 'prevail',
  view: View,
  model: Model
}