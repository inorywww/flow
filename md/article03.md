# LogicFlow 边的绘制与交互
## 前言
流程图的边主要有三种：直线、折线、曲线 。如下图所示。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dbb3faa71f44ba3af2e25b6e113e6eb~tplv-k3u1fbpfcp-zoom-1.image" alt="直线示例图" style="width: 80%; margin-left: 10%"/>




## 直线  
两点确定一条直线，仅需要边的起点和终点即可绘制出直线，使用 `svg` 的`line`进行绘制。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ac015036f4b46a9b5ee9f91549e9d1f~tplv-k3u1fbpfcp-zoom-1.image" alt="直线应用" style="width: 50%; margin-left: 25%"/>

## 直角折线
直角折线使用 `svg` 中的 `polyline` 标签进行绘制，关键步骤是找出组成折线的点。考虑美观性，策略为边尽量不与节点的边产生交叉和重合。
首先假定使用节点上锚点 `Start` —> 锚点 `End` 进行连接，以下面的图为例介绍，如何计算直角折线路径的点。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb8328e73d21467ea5b595a37efb2dd2~tplv-k3u1fbpfcp-zoom-1.image" alt="直角折线" style="width: 40%; margin-left: 27%"/>

第一步：分别找到垂直于`Start`和`End`所在边框且距离为100的点，再计算出与 Start 所在节点边框距离为 100 的 SBbox，在 SBbox 上可以找到垂直于的 Start，且与其所在节点边框距离为 100 的点，这个点即为 Start 的下一个点，将其命名为 StartNext。同理可得点 EndPre。本次计算得到四个点，[Start, StartNext, EndPre, End]，这些点为路径确定经过的点。

<img src="/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419222019941.png" alt="image-20220419222019941" style="zoom:80%;" />

第二步：将包含 StartNext 和 EndPre 边的盒子命名为 CBox，包含 SBbox 和 CBox 的盒子命名为 SLBbox，包含 EBbox 和 CBox 的盒子命名为 ELBbox，取 SLBox 和 ELBox 四个角上的点，即图中蓝色的点，这些点为折线路径中可能经过的点。这一步得到的可能的点为【蓝色的点】

<img src="/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419223016549.png" alt="image-20220419223016549" style="zoom:85%;" />



第三步：找出 StartNext 和 EndPre 的中点，下图中绿点，找出中点X，Y 轴上直线与 LBbox、SLBbox、ELBbox 相交，且不在 SBbox 和 EBbox 中的点，即为图中紫色的点，这些点为折线路径中可能经过的点。这一步得到的可能的点为【紫色的点】

<img src="/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419223938687.png" alt="image-20220419223938687" style="zoom:80%;" />

第四步：将前面三步得到的点汇总，然后对相同坐标的点进行去重，将会得到如下图中红色的点，接下来就是求 StartNext 到 EndPre 的最优路径。

<img src="/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419224249741.png" alt="image-20220419224249741" style="zoom:78%;" />

第五步：采用 [A*查找](https://baike.baidu.com/item/A%2A%E7%AE%97%E6%B3%95/215793?fr=aladdin) 结合 [曼哈顿距离](https://baike.baidu.com/item/%E6%9B%BC%E5%93%88%E9%A1%BF%E8%B7%9D%E7%A6%BB/743092?fr=aladdin)计算路径，得到如图所示路径。

<img src="/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419224509409.png" alt="image-20220419224509409" style="zoom:80%;" />

第六步：过滤同一直线上的中间节点，得到如下点，并连接成折线，至此折线路径部分绘制完成。

![image-20220419224838558](/Users/tanhaosheng/Library/Application Support/typora-user-images/image-20220419224838558.png)

### 位置调整

线段位置调整是根据移动位置，实时重新计算路径的方式实现的。步骤如下：  
第一步：根据移动坐标，计算出当前线段两个端点拖拽移动后的坐标。  
第二步：计算拖拽移动调整后，线段与节点外框的交点。   

- 如果移动前线段没有连接起点、终点，去掉线段会穿插在节点内部的部分，取整个节点离线段最近的点为交点。
- 如果移动前线段连接了起点, 判断线段端点是否在节点上，如果不在节点上，更换起点为线段与节点的交点。
- 如果移动前线段连接了终点, 判断线段端点是否在节点上，如果不在节点上，更换终点为线段与节点的交点。   

第三步：调整到对应外框的位置后，找到当前线段和图形的准确交点，更新路径。
以下图为矩形和圆形垂直向下调整为示例，调整效果如下。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d02a8273b1c24bf9852d2b6c85c213ba~tplv-k3u1fbpfcp-zoom-1.image" alt="折线调整" style="width: 80%; margin-left: 10%"/>

## 光滑曲线
由于svg 中 path 标签支持对于贝塞尔曲线的绘制，所以曲线是基于贝塞尔曲线实现的，贝塞尔曲线可以依据四个任意坐标的点绘制出的一条光滑曲线，通过控制曲线上的四个点（起点、终点以及两个相互分离的中间支点）来创建、编辑图形。可以通过移动两个支点的位置来进行曲线形状调整。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8196093d89a94ebf80b04615f69a9ac3~tplv-k3u1fbpfcp-zoom-1.image" alt="贝塞尔支点" style="width: 50%; margin-left: 25%"/>

为了绘制贝塞尔曲线，需要计算出控制曲线上的四个点，其中起点和终点是已知的，关键点是如何计算出 2 个中间支点，为了图的美观性，线与节点的边框最大程度不产生重合，以及计算复杂度，实现步骤如下：
第一步：计算出节点边框的相关坐标
- 中心点X坐标
- 中心点Y坐标
- 最大X轴坐标
- 最小X轴坐标
- 最大Y轴坐标
- 最小Y轴坐标

第二步：计算出节点距离节点边框 offset = 100 的外框的相关坐标，

- 中心点X坐标
- 中心点Y坐标
- 最大X轴坐标
- 最小X轴坐标
- 最大Y轴坐标
- 最小Y轴坐标

第三步：判断中心点与起点所在线段的方向（水平/垂直），在中心点与起点相同的方向上计算距离起点距离 offset = 100 对应的支点，这个支点就在第二步描述的节点外框上，以上图示例，根据其位置，取节点外框中的点（坐标为：x: 最大X轴坐标，y: 中心点Y坐标）为支点。同理可以计算出终点对应的支点。此方法与查找折线路径中 StartNext 和 EndPre 相同。
第四步：得到两个支点后，结合起点和终点，使用 path 标签进行绘制。
曲线绘制效果如下，其中蓝色圆形即为其支点，可以通过移动支点位置，调整线的形状。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10d9511ebca242b19aa6eab07fef773c~tplv-k3u1fbpfcp-zoom-1.image" alt="贝塞尔曲线调整" style="width: 60%; margin-left: 20%"/>

扩大贝塞尔曲线的选中区域，绘制相同位置的曲线，但是样式属性如下的贝塞尔曲线：

```js
strokeWidth="10"

stroke="transparent"

fill="none"
```
扩大区域是一个宽度增加 10 的贝塞尔曲线。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a33a44f4eb54282b41322c97711a76d~tplv-k3u1fbpfcp-zoom-1.image" alt="贝塞尔曲线调整" style="width: 30%; margin-left: 35%"/>

> 图中紫色为贝塞尔曲线扩大的可点区域  

## 箭头
流程图中箭头标明了流程节点的指向，在 LF 中直线、折线、曲线的箭头使用统一方案实现，在 LF 中的箭头本质是一个包含终点的三角形，其中终点是确定的，需要计算另外 2 点组成三角形。
- 找出边的末端切向量线段。  
直线：起点到终点的向量  
折线：折线中最后一个线段的向量  
曲线：曲线中一共有 4 个点，取终点对应的支点到终点的向量  
- 计算三角形另外 2 点  
以与终点相邻距离为10的点为垂点，计算垂直于向量与垂点距离为5的两点点，结果可以得到 3 个点组成三角形，即为箭头。如下如所示，箭头大小可以通过主题样式设置 offset 和 verticalLength 来进行宽高调整。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07015ed7ab3f457f96d32849f7ffc7ed~tplv-k3u1fbpfcp-zoom-1.image" alt="贝塞尔曲线调整" style="width: 50%; margin-left: 25%"/>

目前在LF中边仅支持单向箭头，且箭头样式仅为三角形，后续会继续丰富箭头的能力展现。

## 边的选中标识
边的选中是通过一个能够包含边的所有点的矩形进行标识的。通过计算出矩形坐标以及大小信息：x, y, width, height，然后进行渲染，这些选中标识与节点是在不同的 svg 图层中进行绘制的，LF 是基于 MVVM (具体可参考[滴滴开源 LogicFlow：专注流程可视化的前端框架](https://juejin.cn/post/6933413834682007560))，可以很方便的通过数据驱动进行分层渲染，同样节点的选中标识也是相似的分层方式实现，这样可以更加灵活的处理不同模式和条件下的渲染，同时下载图片时也方便进行选中标识图层的剔除，得到更加纯粹干净的图。直线、折线、曲线因其路径计算的差异，选中标识计算方法也有所不同。  

直线的计算逻辑如下：

- startPoint：起点
- endPoint：终点

```js
const x = (startPoint.x + endPoint.x) / 2;

const y = (startPoint.y + endPoint.y) / 2;

const width = Math.abs(startPoint.x - endPoint.x) + 10;

const height = Math.abs(startPoint.y - endPoint.y) + 10;
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0870da1e71384f0ba083a5ee2774c4f6~tplv-k3u1fbpfcp-zoom-1.image" alt="直线选中" style="width: 40%; margin-left: 30%"/>

折线的计算逻辑如下：  
- points：折线路径

```js
// bbox: 包含折线上所有点的box
const { points } = polyline;
const pointsList = points2PointsList(points);
const bbox = getBBoxOfPoints(pointsList, 8);
const { x, y, width, height, } = bbox; 
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb551bf439a54a86863ad92eedbfc9e0~tplv-k3u1fbpfcp-zoom-1.image" alt="折线选中" style="width: 40%; margin-left: 30%"/>

曲线的计算逻辑如下：
- pointsList：贝塞尔曲线上所有点 list，包含起点、终点、两个支点
- bbox: 包含贝塞尔曲线上所有点的 box


```js
const { path } = bezier;
const pointsList = getBezierPoints(path);
const bbox = getBBoxOfPoints(pointsList, 8);
const { x, y, width, height } = bbox; 
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37a99754710841f1a61cc958372744ce~tplv-k3u1fbpfcp-zoom-1.image" alt="贝塞尔曲线选中" style="width: 40%; margin-left: 30%"/>

## 边文案设置
边上设置文案可以丰富信息表达，在 LF 中可以通过双击边开启文案编辑，文案默认位置如下:

- 直线：中点。
- 折线：双击手动添加时为双击位置与折线距离最短的垂点，非双击添加默认为最长线段的中点。
- 曲线：起点、终点、两个控制点的X轴和Y轴坐标平均值。

当然文案位置也可以手动进行拖动调整。

## 样式调整
关于边的样式调整详细内容，可以查看官方文档介绍-[主题Theme](http://logic-flow.org/guide/advance/theme.html)。

## 最后
相信通过本文你对 Edge 的实现有一个大概的认知了，其实在做 LogicFlow 的过程中，我们遇到了很多非纯前端的问题，那就需要我们去重拾几何、算法这样的知识，如果你也对这方面非常感兴趣或者有研究，欢迎一起交流。目前，LogicFlow 用户群的人数已经 200+，大家都在讨论流程可视化/LowCode 相关实现，期待你的参与~


- 添加微信号进用户群：logic-flow