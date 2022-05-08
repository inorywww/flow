class CustomPolyline extends PolylineEdge {
  getArrow() {
    const { endPoint } = this.props.model
    return h('circle', {
      cx: endPoint.x,
      cy: endPoint.y,
      r: 4,
      fill: 'red'
    })
  }
}