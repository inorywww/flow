import { h } from '@logicflow/core'
import RectNode from '../basic/RectNode'

class Model extends RectNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 60
    this.height = 60
    this.text.editable = false
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
      d: 'm5.134,32.35844l26.81486,-26.47544l28.48501,28.12421l28.48501,-28.12421l26.81511,26.47544l-28.48502,28.12444l28.48502,28.12444l-26.81511,26.47568l-28.48501,-28.12445l-28.48501,28.12445l-26.81486,-26.47568l28.48478,-28.12444l-28.48478,-28.12444z',
      fill: '#333'
    }
    const pathAAttrs1 = {
      ...style,
      d: 'm183.483,71.80784l0.36183,-0.36183l0.38437,0.38437l0.38437,-0.38437l0.36184,0.36183l-0.38437,0.38437l0.38437,0.38437l-0.36184,0.36184l-0.38437,-0.38437l-0.38437,0.38437l-0.36183,-0.36184l0.38437,-0.38437l-0.38437,-0.38437z',
      fill: '#333'
    }
    return h('svg', {  ...svgAttr, viewBox: '0 0 120 120' }, [
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathAAttrs1,
      }),
    ])
  }
}

export default {
  type: 'uml-delete',
  view: View,
  model: Model
}