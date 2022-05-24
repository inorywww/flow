import RectNode from '../basic/RectNode'

// 带圆角的矩形
class RectRadiusModel extends RectNode.model {
  setAttributes () {
    super.setAttributes()
    this.radius = 6
    this.width = 50
    this.height = 120
    this.text.editable = false
  }
}
export default {
  type: 'uml-active',
  view: RectNode.view,
  model: RectRadiusModel
}
