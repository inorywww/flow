import CircleNode from '../basic/CircleNode'

// 椭圆
class EllipseNewModel extends CircleNode.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.rx = 35
    this.ry = 60
  }
  getNodeStyle() {
    const style = super.getNodeStyle()
    return {...style}
  }
}
export default {
  type: 'uml-container',
  view: CircleNode.view,
  model: EllipseNewModel
}
