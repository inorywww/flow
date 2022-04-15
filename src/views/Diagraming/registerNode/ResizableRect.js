import { h } from "@logicflow/core";
import { RectResize } from "@logicflow/extension";

class ResizableRectModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 40;
    this.maxWidth = 300;
    this.maxHeight = 300;
    this.text.draggable = true;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeWidth = 1;
    return style;
  }
  getResizeOutlineStyle() {
    const style = super.getResizeOutlineStyle();
    style.stroke = "transparent";
    return style;
  }
}
class ResizableRectView extends RectResize.view {
  // getLabelShape () {
  //   const { model } = this.props;
  //   const { x, y, width, height } = model;
  //   // const style = model.getNodeStyle();
  //   return h(
  //     "svg",
  //     {
  //       x: x - width / 2 + 5,
  //       y: y - height / 2 + 5,
  //       width: 30,
  //       height: 30,
  //       viewBox: "0 0 1274 1024"
  //     },
  //   );
  // }
  // getResizeShape () {
  //   const { model } = this.props;
  //   const { x, y, width, height, radius, properties } = model;
  //   const style = model.getNodeStyle();
  //   return h("g", {}, [
  //     h("rect", {
  //       ...style,
  //       x: x - width / 2,
  //       y: y - height / 2,
  //       rx: radius,
  //       ry: radius,
  //       width,
  //       height
  //     }),
  //     this.getLabelShape()
  //   ]);
  // }
}

export default {
  type: "resizable-rect",
  view: ResizableRectView,
  model: ResizableRectModel
}