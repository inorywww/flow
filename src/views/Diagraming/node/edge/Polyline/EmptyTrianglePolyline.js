import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { h } from '@logicflow/core'

import { Model } from './PolylineModel'
 // 折线
class CustomPolyline extends PolylineEdge {
  getArrow () {
    const { endPoint } = this.props.model
    const x = endPoint.x
    const y = endPoint.y
    const width = 8
    const height = 8
    return h('polygon', { 
      width,
      height,
      x: x - 8,
      y,
      fill: 'none',
      stroke: '#333333',
      strokeWidth: 1,
      points: [
        [x - width, y + height / 2],
        [x - width, y - height / 2],
        [x, y]
      ]
    })
  }
}

export default {
  type: 'empty-triangle-polyline',
  view: CustomPolyline,
  model: Model
}
