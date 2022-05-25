import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'
import { h } from '@logicflow/core'

import { Model } from './PolylineModel'
 // 折线
class CustomPolyline extends PolylineEdge {
  getArrow () {
    return 
  }
}
export default {
  type: 'none-shape-polyline',
  view: CustomPolyline,
  model: Model
}
