import { h } from "@logicflow/core";
import { EllipseResize } from "@logicflow/extension";

class ResizableEllipseModel extends EllipseResize.model {
  // setAttributes() {
  //   this.text.editable = false;
  // }
  initNodeData(data) {
    super.initNodeData(data);
    console.log(this);
    this.rx = 30
    this.ry = 30
    // this.width = 80;
    // this.height = 40;
    // this.maxWidth = 300;
    // this.maxHeight = 300;
    // this.text.draggable = true;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    // style.fill = "#f1a131";
    style.strokeWidth = 1;
    return style;
  }
}
class ResizableEllipseView extends EllipseResize.view {
  // getLabelShape () {
  //   const { model } = this.props;
  //   const { x, y } = model
  //   return h(
  //     'text',
  //     {
  //       fill: '#000000',
  //       fontSize: 12,
  //       x: x - 12,
  //       y: y + 4,
  //       width: 50,
  //       height: 25
  //     },
  //     'Start'
  //   )
  // }
  // getResizeShape () {
  //   const { model } = this.props;
  //   const {
  //     x,
  //     y,
  //     r,
  //     fill,
  //     stroke,
  //     strokeWidth
  //   } = model
  //   return h(
  //     'g', { },
  //     [
  //       h(
  //         'circle',
  //         {
  //           cx: x,
  //           cy: y,
  //           r,
  //           fill,
  //           stroke,
  //           strokeWidth
  //         }
  //       ),
  //       this.getLabelShape()
  //     ]
  //   )
  // }
}

export default {
  type: "resizable-ellipse",
  view: ResizableEllipseView,
  model: ResizableEllipseModel
};
