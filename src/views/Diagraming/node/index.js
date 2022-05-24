// 基础图形
import CircleNode from './basic/CircleNode'
import RectNode from './basic/RectNode'
import RectRadiusNode from './basic/RectRadiusNode'
import RectRadiusNode2 from './basic/RectRadiusNode2'
import EllipseNode from './basic/EllipseNode'
import TextNode from './basic/TextNode'
import DiamondNode from './basic/DiamondNode'
// path绘制的个性化图形
import CylindeNode from './path/CylindeNode'
import TriangleNode from './path/TriangleNode'
import ParallelogramNode from './path/ParallelogramNode'
import ActorNode from './path/ActorNode'
import StarNode from './path/Star'
import PentagonNode from './path/PentagonNode'
import HexagonNode from './path/HexagonNode'
import SeptagonNode from './path/SeptagonNode'
import HeptagonNode from './path/HeptagonNode'
import TrapezoidNode from './path/TrapezoidNode'
import CrossNode from './path/CrossNode'
import MinusNode from './path/MinusNode'
import TimesNode from './path/TimesNode'
import DivideNode from './path/DivideNode'
// 多边形绘制的箭头
import LeftArrow from './arrow/LeftArrow'
import RightArrow from './arrow/RightArrow'
import HorizontalArrow from './arrow/HorizontalArrowNode'
import UpArrow from './arrow/UpArrowNode'
import DownArrow from './arrow/DownArrowNode'
import VerticalArrow from './arrow/VerticalArrowNode'
// image绘制图片节点
import ImageSetting from './image/Setting'
import ImageUser from './image/User'
import ImageCloud from './image/Cloud'
// image绘制左上角icon节点
import IconMessage from './icon/Message'
// 注册边
import FillTrianglePolyline from './edge/Polyline/index'
import EmptyTrianglePolyline from './edge/Polyline/EmptyTrianglePolyline'
import FillCirclePolyline from './edge/Polyline/FillCirclePolyline'
import EmptyCirclePolyline from './edge/Polyline/EmptyCirclePolyline'
import FillDiamondPolyline from './edge/Polyline/FillDiamondPolyline'
import EmptyDiamondPolyline from './edge/Polyline/EmptyDiamondPolyline'
import Line from './edge/Line/index'
import Bezier from './edge/Bezier/index'

// 流程图
import subProcess from './flow/SubProcess'
import exData from './flow/ExData'
import innerSave from './flow/InnerSave'
import queueData from './flow/queueData'

//ER
import DerivedAttribute from './ER/DerivedAttribute'
import DbEntity from './ER/DbEntity'
import WeakEntity from './ER/WeakEntity'
import WeakRelation from './ER/WeakRelation'
import Prevail from './ER/Prevail'
import AllPrevail from './ER/AllPrevail'
import ArtificialInput from './flow/ArtificialInput'
import Card from './flow/Card'
import Bands from './flow/Bands'
import Exhibit from './flow/Exhibit'
import ArtificialOperation from './flow/ArtificialOperation'
import ParallelMode from './flow/ParallelMode'
import otherImport from './flow/otherImport'

//UML
import UMLBag from './UML/UML-bag'
import UMLCombination from './UML/UML-combination'
import UMLAnno from './UML/UML-anno'
import UMLContainer from './UML/UML-container'
import UMLContainer1 from './UML/UML-container1'
import UMLEntity from './UML/UML-entity'
import UMLControl from './UML/UML-control'
import UMLBind from './UML/UML-bind'

export const registerCustomElement = (lf) => {
  // 注册基础图形
  lf.register(CircleNode)
  lf.register(RectNode)
  lf.register(RectRadiusNode)
  lf.register(RectRadiusNode2)
  lf.register(EllipseNode)
  lf.register(DiamondNode)
  lf.register(TextNode)
  // 注册path绘制的个性化图形
  lf.register(CylindeNode)
  lf.register(TriangleNode)
  lf.register(ParallelogramNode)
  lf.register(ActorNode)
  lf.register(StarNode)
  lf.register(PentagonNode)
  lf.register(HexagonNode)
  lf.register(SeptagonNode)
  lf.register(HeptagonNode)
  lf.register(TrapezoidNode)
  lf.register(CrossNode)
  lf.register(MinusNode)
  lf.register(TimesNode)
  lf.register(DivideNode)
  // 注册多边形绘制的箭头
  lf.register(LeftArrow)
  lf.register(RightArrow)
  lf.register(HorizontalArrow)
  lf.register(UpArrow)
  lf.register(DownArrow)
  lf.register(VerticalArrow)
  // 注册image绘制图片节点
  lf.register(ImageSetting)
  lf.register(ImageUser)
  lf.register(ImageCloud)
  // 注册image绘制左上角icon节点
  lf.register(IconMessage)
  // 注册边
  lf.register(FillTrianglePolyline)
  lf.register(EmptyTrianglePolyline)
  lf.register(FillCirclePolyline)
  lf.register(EmptyCirclePolyline)
  lf.register(FillDiamondPolyline)
  lf.register(EmptyDiamondPolyline)
  lf.register(Line)
  lf.register(Bezier)



  lf.register(subProcess)
  lf.register(exData)
  lf.register(innerSave)
  lf.register(queueData)

  lf.register(DerivedAttribute)
  lf.register(DbEntity)
  lf.register(WeakEntity)
  lf.register(WeakRelation)
  lf.register(Prevail)
  lf.register(AllPrevail)
  lf.register(ArtificialInput)
  lf.register(Card)
  lf.register(Bands)
  lf.register(Exhibit)
  lf.register(ArtificialOperation)
  lf.register(ParallelMode)
  lf.register(otherImport)

  
  lf.register(UMLBag)
  lf.register(UMLCombination)
  lf.register(UMLAnno)
  lf.register(UMLContainer)
  lf.register(UMLContainer1)
  lf.register(UMLEntity)
  lf.register(UMLControl)
  lf.register(UMLBind)


}

