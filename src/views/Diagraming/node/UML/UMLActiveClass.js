import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 120
    this.height = 100
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
     * <ellipse stroke="#000" ry="43.21429" rx="43" id="svg_11" cy="50.625" cx="72.76786" stroke-width="2" fill="none"/>
      <path stroke="#000" id="svg_13" d="m5.35714,8.57143l0,83.92857" opacity="undefined" stroke-width="2" fill="none"/>
      <path id="svg_14" d="m29.35714,50.89286l-23,-0.17857" opacity="undefined" stroke-width="2" stroke="#000" fill="none"/>
     */
    const pathAAttrs = {
      ...style,
      height: 80.6,
      width: 107.6,
      y: 4.8,
      x: 6,
      rx: 4,
      'stroke-width': 2,
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm26.2,6.8l0,77.2',
      'stroke-width': 2,
    }
    const pathAAttrs2 = {
      ...style,
      d: 'm93.2,6.8l0,77.2',
      'stroke-width': 2,
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 90' }, [
      h('rect', {
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
  type: 'uml-active-class',
  view: View,
  model: Model
}