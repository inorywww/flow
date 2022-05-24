import RectNode from '../basic/RectNode'

// 带圆角的矩形
class RectRadiusModel extends RectNode.model {
  setAttributes () {
    super.setAttributes()
    this.radius = 8
    this.width = 120
    this.height = 100
  }
}
export default {
  type: 'uml-container1',
  view: RectNode.view,
  model: RectRadiusModel
}
