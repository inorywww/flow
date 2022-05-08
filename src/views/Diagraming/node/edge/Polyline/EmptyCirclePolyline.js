import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { h } from '@logicflow/core'

import { Model } from './PolylineModel'
 // 折线
class CustomPolyline extends PolylineEdge {
  getArrow () {
    const { endPoint } = this.props.model
    return h('circle', {
      cx: endPoint.x,
      cy: endPoint.y,
      r: 4,
      fill: 'none',
      stroke: '#333333',
      strokeWidth: 1,
    })
  }
}
export default {
  type: 'empty-circle-polyline',
  view: CustomPolyline,
  model: Model
}
