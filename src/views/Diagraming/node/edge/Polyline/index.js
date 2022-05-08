import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

import { Model } from './PolylineModel'
 // 折线
class CustomPolyline extends PolylineEdge { }

export default {
  type: 'fill-triangle-polyline',
  view: CustomPolyline,
  model: Model
}
