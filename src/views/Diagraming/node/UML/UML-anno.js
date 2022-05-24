import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 200
    this.height = 120
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
      d: 'm2.5,4.10714l123.92857,0.17857'
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm2.67857,3.92857l0.35714,72.39286'
    }
    const pathAAttrs2 = {
      ...style,
      d: 'm3.21429,76.25l131.78571,-0.71429'
    }
    const pathAAttrs3 = {
      ...style,
      d: 'm126.16304,13.19697l0,-8.57143l8.21428,8.57143l-8.21428,0z'
    }
    const pathAAttrs4 = {
      ...style,
      d: 'm135,13.57143l0,62.14286'
    }
    
    return h('svg', {  ...svgAttr, viewBox: '0 0 140 80' }, [
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
      h('path', {
        ...pathAAttrs2,
      }),
      h('path', {
        ...pathAAttrs3,
      }),
      h('path', {
        ...pathAAttrs4,
      })
    ])
  }
}

export default {
  type: 'uml-anno',
  view: View,
  model: Model
}