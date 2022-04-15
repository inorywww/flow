import { h } from "@logicflow/core"
import { RectResize } from "@logicflow/extension"

class TriangleModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 70
    this.height = 60
  }
  getNodeStyle() {
    const style = super.getNodeStyle()
    // style.fill = "#f1a131"
    style.strokeWidth = 1
    return style
  }
}

class TriangleView extends RectResize.view {
  getResizeShape () {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    const pointList = [
      [x, y - .5 * height],
      [x + .5 * width, y + .5 * height],
      [x - .5 * width, y + .5 * height],
    ]
    const points = pointList.map((item) => {
      return `${item[0]}, ${item[1]}`
    })
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: points.join(" ")
    }

    return h("g", {}, [h("polygon", { ...attrs })])
  }
}

export default {
  type: "resizable-triangle",
  view: TriangleView,
  model: TriangleModel
}
