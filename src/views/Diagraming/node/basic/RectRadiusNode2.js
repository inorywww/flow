import RectNode from './RectNode'

// 带圆角的矩形
class RectRadiusModel extends RectNode.model {
  setAttributes () {
    super.setAttributes()
    this.radius = 25
    this.width = 100
    this.height = 60
  }
}
export default {
  type: 'rect-radius2',
  view: RectNode.view,
  model: RectRadiusModel
}
