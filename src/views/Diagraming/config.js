export const nodeList = [
  // {
  //   text: '开始',
  //   type: 'start',
  //   class: 'node-start'
  // },
  {
    text: '矩形',
    type: 'resizable-rect',
    class: 'icon-rect'
  },
  {
    text: '菱形',
    type: 'resizable-diamond',
    class: 'icon-diamond'
  },
  {
    text: '圆形',
    type: 'resizable-ellipse',
    class: 'icon-ellipse'
  },
  {
    text: '六边形',
    type: 'resizable-hexagon',
    class: 'icon-hexagon'
  },
  {
    text: '三角形',
    type: 'resizable-triangle',
    class: 'icon-triangle'
  },
];

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: '开始',
    class: 'bpmn-start'
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    class: 'bpmn-end'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '网关',
    class: 'bpmn-exclusiveGateway'
  },
  {
    type: 'bpmn:userTask',
    text: '用户',
    class: 'bpmn-user'
  },
  
]
