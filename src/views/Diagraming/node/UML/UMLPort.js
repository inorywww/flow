// import RectNode from '../basic/RectNode'
import { RectNode, RectNodeModel } from "@logicflow/core";
// 带圆角的矩形
class Model extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 30;
    this.height = 30;
    this.text.draggable = false
  }
}
export default {
  type: 'uml-port',
  view: RectNode,
  model: Model
}
