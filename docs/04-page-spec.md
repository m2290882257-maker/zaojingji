# docs/04-page-spec.md

# 《藻井集》页面规格文档

## 1. 文档目的

本文档用于定义《藻井集》每个页面的内容结构、组件组成、交互行为、视觉要求、状态管理和开发验收标准。

Codex 开发时应优先按照本文档搭建页面，而不是自由发挥页面结构。

---

## 2. 页面列表

第一版网站包含以下页面与页面状态：

```text
01. 首页入口 /
02. 藻井总览 /atlas - overview 状态
03. 按朝代划分的藻井图鉴 /atlas - dynasty-index 状态
04. 选中朝代藻井图鉴 /atlas/:dynastyId
05. 具体藻井介绍 /work/:workId
06. 色彩提取模块 /work/:workId 内部 color 状态
07. 纹样结构模块 /work/:workId 内部 structure 状态
08. 视觉基因卡模块 /work/:workId 内部 gene 状态
```

说明：

色彩提取、纹样结构和视觉基因卡不必拆成独立路由，第一版建议放在具体藻井介绍页内部，通过 Tab 点击切换。

---

# Page 01：首页入口

## 3.1 页面名称

首页入口 / 沉浸式加载页

## 3.2 路由

```text
/
```

## 3.3 页面目标

通过“藻井上移显现”的交互方式，模拟用户抬头看见藻井的身体体验。

## 3.4 页面内容

### 必须包含

1. 黑色或低照度背景。
2. 藻井主图。
3. 操作提示文字。
4. 主标题《藻井集》。
5. 副标题。
6. 进入按钮。

### 建议文案

主标题：

```text
藻井集
```

副标题：

```text
面向设计转译的敦煌藻井视觉图鉴
```

提示文字：

```text
向上滑动，抬头看见藻井
```

按钮：

```text
进入图鉴
```

---

## 3.5 页面组件

```text
IntroPage
├── IntroBackground
├── CeilingRevealImage
├── GestureHint
├── IntroTitle
├── IntroSubtitle
└── EnterButton
```

---

## 3.6 组件说明

### IntroBackground

作用：

1. 提供黑色背景。
2. 建立低照度、沉浸式氛围。

要求：

1. 背景颜色接近纯黑。
2. 可以加入轻微噪点或暗纹。
3. 不要使用过亮渐变。

---

### CeilingRevealImage

作用：

1. 展示藻井图像。
2. 随用户滚动或鼠标上移而上移、显现或放大。

状态：

```ts
revealProgress: number; // 0 - 1
```

行为：

1. `revealProgress = 0` 时，藻井图像较暗或部分隐藏。
2. `revealProgress = 1` 时，藻井图像完整显现。
3. 显现过程应平滑。

---

### GestureHint

作用：

提示用户进行上滑或抬头动作。

要求：

1. 文案短。
2. 字体小。
3. 透明度低。
4. 不抢主视觉。

---

### EnterButton

作用：

进入藻井总览页面。

行为：

```text
点击
↓
navigate("/atlas")
```

---

## 3.7 交互要求

```text
页面加载
↓
用户滚动 / 鼠标上移
↓
藻井图像逐渐展开
↓
标题与按钮淡入
↓
点击按钮进入 /atlas
```

## 3.8 验收标准

1. 页面具有明确暗场氛围。
2. 用户操作后藻井图像发生可感知变化。
3. 标题和按钮出现时机自然。
4. 点击按钮可进入 `/atlas`。
5. 不依赖摄像头也能完成完整体验。

---

# Page 02：藻井总览页面

## 4.1 页面名称

总览页面

## 4.2 路由

```text
/atlas
```

## 4.3 页面状态

```ts
atlasView = "overview"
```

## 4.4 页面目标

展示《藻井集》的整体气质和核心入口，让用户从总览进入按朝代划分的藻井图鉴。

## 4.5 页面内容

### 必须包含

1. 页面标题。
2. 项目一句话说明。
3. 环形主视觉图鉴。
4. 进入朝代图鉴的点击入口。

### 建议标题

```text
藻井集
```

### 建议说明

```text
从藻井的空间结构、纹样秩序与文化色彩中，提取可用于当代设计创作的视觉基因。
```

### 建议按钮

```text
进入藻井图鉴
```

---

## 4.6 页面组件

```text
AtlasPage
├── AtlasOverview
│   ├── AtlasTitle
│   ├── AtlasIntroText
│   ├── OverviewOrbit
│   │   └── OverviewImageCard[]
│   └── EnterDynastyIndexButton
```

---

## 4.7 OverviewOrbit 组件

作用：

1. 展示环形图鉴。
2. 建立“总览”视觉记忆点。
3. 暗示后续内容将以图鉴方式展开。

要求：

1. 背景为黑色。
2. 图像卡片围绕中心形成环形。
3. 卡片可以轻微旋转或漂浮。
4. 中心可以放一句极短文字。
5. 不要让卡片过密导致视觉混乱。

---

## 4.8 页面交互

```text
用户进入 /atlas
↓
看到总览页面
↓
点击“进入藻井图鉴”
↓
切换到 dynasty-index 状态
```

开发实现：

```ts
setAtlasView("dynasty-index");
```

## 4.9 验收标准

1. 页面能清楚表达这是《藻井集》的总览。
2. 用户能通过点击进入朝代图鉴。
3. 页面不应像普通列表页。
4. 总览页面与首页在视觉气质上保持统一。

---

# Page 03：按朝代划分的藻井图鉴

## 5.1 页面名称

藻井图鉴 / 朝代图鉴入口

## 5.2 路由

```text
/atlas
```

## 5.3 页面状态

```ts
atlasView = "dynasty-index"
```

## 5.4 页面目标

展示按朝代划分的藻井分类入口，让用户点击选择某个朝代。

## 5.5 页面内容

### 必须包含

1. 返回总览按钮。
2. 页面标题。
3. 朝代说明文字。
4. 朝代卡片列表。
5. 当前 hover 朝代提示。

### 页面标题

```text
藻井图鉴
```

### 辅助说明

```text
选择一个朝代，观察藻井结构、纹样与色彩秩序的变化。
```

---

## 5.6 朝代卡片内容

每张朝代卡片包含：

1. 朝代名称。
2. 英文名称。
3. 代表图像。
4. 朝代简介。
5. 视觉关键词。
6. 主色提示。

示例：

```text
初唐
Early Tang

关键词：
莲花 / 飞天 / 红蓝对比 / 层级边饰
```

---

## 5.7 页面组件

```text
DynastyIndexView
├── BackToOverviewButton
├── DynastyIndexHeader
├── DynastyCardGallery
│   └── DynastyCard[]
└── DynastyHoverInfo
```

---

## 5.8 DynastyCard 组件

### Props

```ts
type DynastyCardProps = {
  id: string;
  name: string;
  englishName?: string;
  coverImage: string;
  description: string;
  keywords: string[];
  themeColors?: string[];
};
```

### 行为

1. hover 时卡片放大。
2. hover 时图片亮度提高。
3. hover 时显示关键词。
4. 点击后进入该朝代页面。

点击逻辑：

```ts
navigate(`/atlas/${dynasty.id}`);
```

---

## 5.9 页面交互

```text
总览页面
↓ 点击进入藻井图鉴
朝代图鉴页面
↓ 点击某一朝代
选中朝代藻井图鉴
```

## 5.10 验收标准

1. 用户能看到多个朝代入口。
2. 用户能通过点击进入具体朝代。
3. 朝代图鉴要有空间感，不只是普通网格。
4. hover 和点击反馈明确。
5. 返回总览按钮可用。

---

# Page 04：选中朝代藻井图鉴

## 6.1 页面名称

选中朝代藻井图鉴

## 6.2 路由

```text
/atlas/:dynastyId
```

示例：

```text
/atlas/early-tang
```

## 6.3 页面目标

展示某一选中朝代中的所有代表性藻井，并通过滚动和鼠标滑动点选，引导用户进入具体藻井介绍页。

## 6.4 页面内容

### 必须包含

1. 返回按钮。
2. 当前朝代名称。
3. 当前朝代简介。
4. 当前朝代视觉关键词。
5. 代表性藻井卡片组。
6. 滚动提示。
7. 到达末端后的点选提示。

### 示例标题

```text
初唐藻井图鉴
```

### 示例说明

```text
初唐藻井在结构秩序、色彩对比与纹样组织上呈现出开放而富于装饰性的视觉特征。
```

### 滚动提示

```text
滚动浏览该朝代的代表性藻井
```

### 点选提示

```text
移动鼠标，选择一件藻井作品
```

---

## 6.5 页面组件

```text
SelectedDynastyPage
├── BackToDynastyIndexButton
├── SelectedDynastyHeader
├── DynastyFeatureTags
├── ScrollDrivenWorkGallery
│   └── WorkPreviewCard[]
├── WorkSelectHint
└── ActiveWorkInfo
```

---

## 6.6 WorkPreviewCard 组件

每张藻井卡片包含：

1. 藻井名称。
2. 朝代。
3. 洞窟编号。
4. 主图。
5. 一句话特征。
6. 关键词。
7. 主色提示。

示例：

```text
莲花飞天平棋
初唐｜莫高窟第 xxx 窟

关键词：
莲花 / 飞天 / 三兔共耳 / 卷草纹 / 红蓝对比
```

---

## 6.7 ScrollDrivenWorkGallery 组件

### 作用

负责实现“滚动自然展示 → 滚动到极限 → 鼠标滑动点选”的核心交互。

### 状态

```ts
type GalleryMode = "intro" | "scrolling" | "scrollEnd" | "selecting";

type ScrollDrivenWorkGalleryState = {
  mode: GalleryMode;
  scrollProgress: number;
  activeWorkIndex: number;
  activeWorkId?: string;
};
```

---

## 6.8 滚动展示逻辑

用户进入页面后，通过滚动浏览卡片。

```text
scrollProgress = 0
↓
卡片较集中 / 较远
↓
用户滚动
↓
卡片逐渐展开
↓
scrollProgress = 1
↓
滚动到极限
```

视觉表现：

1. 卡片从集中到展开。
2. 卡片可以形成横向队列。
3. 卡片可以有轻微 3D 景深。
4. 当前视野中心的卡片更清晰。
5. 其他卡片透明度稍低。

---

## 6.9 鼠标滑动点选逻辑

当滚动到极限后：

```text
mode = "selecting"
```

此时鼠标水平移动控制当前选中的卡片。

```ts
const activeIndex = Math.floor(pointerX / window.innerWidth * works.length);
```

当前选中的卡片：

1. 放大。
2. 前移。
3. 亮度提高。
4. 显示作品名称与一句话说明。

用户点击当前卡片：

```ts
navigate(`/work/${activeWorkId}`);
```

---

## 6.10 兜底交互

为了保证展示稳定，必须提供兜底方案：

1. 卡片本身可以直接点击。
2. 左右箭头可以切换 activeWorkIndex。
3. 键盘左右键可以切换。
4. 移动端使用横向滑动和点击。

---

## 6.11 验收标准

1. 用户点击朝代后能进入该朝代图鉴。
2. 页面展示该朝代的多个代表性藻井。
3. 用户可以通过滚动自然浏览卡片。
4. 滚动到末端后，鼠标滑动可以改变当前选中卡片。
5. 点击卡片可以进入具体藻井介绍页。
6. 即使鼠标滑动点选效果不完美，也必须有直接点击卡片的兜底方式。

---

# Page 05：具体藻井介绍页

## 7.1 页面名称

具体藻井介绍页

## 7.2 路由

```text
/work/:workId
```

## 7.3 页面目标

展示单件藻井的基本信息、空间关系、色彩提取、纹样结构和视觉基因卡。

## 7.4 页面内容结构

详情页包含五个内部模块：

```text
概览
投射
色彩
结构
生成
```

## 7.5 默认状态

```ts
activeTab = "overview"
```

## 7.6 页面组件

```text
WorkPage
├── WorkTopNav
├── WorkOverviewSection
├── ProjectionSection
├── ColorSection
├── StructureSection
└── GeneCardSection
```

说明：

第一版可以只显示当前 activeTab 对应模块，也可以让模块滚动排列，并通过点击导航锚点定位。

为了更符合“后面页面基本以点击为主”的要求，推荐第一版使用 Tab 切换：

```text
点击 Tab
↓
切换模块
```

---

## 7.7 WorkTopNav 组件

### 内容

```text
概览 / 投射 / 色彩 / 结构 / 生成
```

### 行为

1. 点击 Tab 切换 activeTab。
2. 当前 Tab 高亮。
3. 切换时模块淡入。
4. 保持右上角或顶部固定位置。

### 状态

```ts
type WorkTab = "overview" | "projection" | "color" | "structure" | "gene";
```

---

# Page 05-1：作品概览模块

## 8.1 模块名称

WorkOverviewSection

## 8.2 对应状态

```ts
activeTab = "overview"
```

## 8.3 模块目标

让用户快速了解当前藻井是什么、属于哪个朝代、有什么代表性视觉特征。

## 8.4 内容

1. 藻井名称。
2. 朝代。
3. 洞窟编号。
4. 作品主图。
5. 简短介绍。
6. 关键词。
7. 代表纹样缩略图。

## 8.5 示例内容结构

```text
莲花飞天平棋

初唐｜莫高窟第 xxx 窟

该藻井以中心莲花为视觉核心，结合飞天、卷草纹与层级边饰，构成具有宗教象征与装饰秩序的顶部空间图像。

关键词：
莲花 / 飞天 / 三兔共耳 / 卷草纹 / 红蓝对比
```

## 8.6 组件结构

```text
WorkOverviewSection
├── WorkTitle
├── WorkMeta
├── WorkHeroImage
├── WorkDescription
├── KeywordList
└── PatternPreviewList
```

## 8.7 验收标准

1. 用户能明确知道当前作品名称。
2. 用户能知道朝代和洞窟信息。
3. 用户能通过关键词快速理解作品特征。
4. 页面不应堆砌长篇文字。

---

# Page 05-2：空间投射模块

## 9.1 模块名称

ProjectionSection

## 9.2 对应状态

```ts
activeTab = "projection"
```

## 9.3 模块目标

表现藻井作为顶部空间装饰的观看关系，呼应首页“抬头看见藻井”的身体化观看逻辑。

## 9.4 内容

1. 藻井投射图。
2. 空间透视展示。
3. 简短说明文字。

## 9.5 建议文案

```text
藻井并非普通平面图案，而是位于建筑顶部的空间图像。观看它时，身体需要抬头，视线从地面转向顶部中心。
```

## 9.6 组件结构

```text
ProjectionSection
├── PerspectiveImage
├── ProjectionDescription
└── LightParallaxLayer
```

## 9.7 交互

1. 鼠标移动时图像可轻微倾斜。
2. 鼠标移动时产生轻微视差。
3. 不做过度强烈的 3D 效果。

## 9.8 验收标准

1. 用户能感受到藻井的空间属性。
2. 投射效果不影响阅读。
3. 页面视觉与首页入口形成呼应。

---

# Page 05-3：色彩提取模块

## 10.1 模块名称

ColorSection

## 10.2 对应状态

```ts
activeTab = "color"
```

## 10.3 模块目标

将藻井中的局部色彩转化为可用于设计创作的文化语义色卡。

## 10.4 页面内容

1. 藻井局部图或色彩分析图。
2. 色彩热点。
3. 色卡面板。
4. 色彩说明。
5. 文化寓意。
6. 设计应用建议。

## 10.5 页面组件

```text
ColorSection
├── ColorImageWithHotspots
│   └── ColorHotspot[]
├── PalettePanel
│   └── ColorSwatch[]
├── ColorMeaningText
└── DesignUsageText
```

---

## 10.6 ColorHotspot 组件

### Props

```ts
type ColorHotspotProps = {
  id: string;
  x: number;
  y: number;
  paletteGroupId: string;
};
```

### 行为

1. 点击热点。
2. 设置当前选中的 paletteGroup。
3. 高亮热点。
4. 更新色卡面板。

点击逻辑：

```ts
setSelectedPaletteGroupId(paletteGroupId);
```

---

## 10.7 PalettePanel 组件

展示当前选中色组。

每个颜色包含：

1. 色名。
2. HEX 色值。
3. 色彩角色。
4. 文化说明。
5. 设计应用建议。

示例：

```text
朱砂红
#B92126
主色

强化藻井中的热烈、庄重与装饰性。
适合用于主视觉标题、包装强调色、节庆类文创视觉。
```

---

## 10.8 交互流程

```text
进入色彩模块
↓
默认显示第一组色卡
↓
用户点击局部色彩热点
↓
色卡面板更新
↓
用户查看色值、文化说明和设计建议
```

## 10.9 MVP 说明

第一版使用预设色卡数据，不做真实图像取色。

## 10.10 验收标准

1. 用户可以点击色彩热点。
2. 色卡面板能根据点击更新。
3. 色卡包含 HEX 色值。
4. 色卡不是普通颜色列表，而是带文化说明与设计建议。
5. 页面应具有设计工具感。

---

# Page 05-4：纹样结构模块

## 11.1 模块名称

StructureSection

## 11.2 对应状态

```ts
activeTab = "structure"
```

## 11.3 模块目标

帮助用户理解藻井的结构层级、纹样构成和文化含义。

## 11.4 页面内容

1. 纹样结构解剖图。
2. 标注点。
3. 纹样说明面板。
4. 结构关键词。
5. 设计转译建议。

## 11.5 页面组件

```text
StructureSection
├── AnatomyImage
├── PatternMarkerLayer
│   └── PatternMarker[]
├── PatternInfoPanel
└── StructureKeywordList
```

---

## 11.6 PatternMarker 组件

### Props

```ts
type PatternMarkerProps = {
  id: string;
  name: string;
  x: number;
  y: number;
};
```

### 行为

1. hover 时显示纹样名称。
2. 点击时设置当前选中的纹样。
3. 当前纹样区域高亮。
4. 说明面板更新。

点击逻辑：

```ts
setSelectedPatternId(pattern.id);
```

---

## 11.7 可标注纹样类型

根据当前项目内容，第一版可支持以下标注类型：

```text
中心莲花
三兔共耳
飞天队列
卷草纹
方井结构
边饰纹样
层级构成
色彩秩序
```

## 11.8 PatternInfoPanel 内容

每个纹样说明包含：

1. 纹样名称。
2. 所在区域。
3. 视觉特征。
4. 文化寓意。
5. 设计转译方向。

示例：

```text
中心莲花

位置：
藻井中心

视觉特征：
位于图像中心，是整个藻井视觉秩序的核心。

文化寓意：
莲花常与清净、净土和宗教空间象征相关。

设计转译：
可作为现代视觉系统中的中心图形、徽章或主视觉纹样。
```

---

## 11.9 交互流程

```text
进入结构模块
↓
默认显示整体结构解剖图
↓
用户点击某个纹样标注
↓
该区域高亮
↓
说明面板更新
```

## 11.10 验收标准

1. 纹样标注位置清晰。
2. 点击标注后说明内容更新。
3. 用户能理解藻井由多个层级和纹样共同构成。
4. 说明文字简洁，不做论文式长段落。

---

# Page 05-5：视觉基因卡模块

## 12.1 模块名称

GeneCardSection

## 12.2 对应状态

```ts
activeTab = "gene"
```

## 12.3 模块目标

生成当前藻井的最终设计转译结果，形成网站闭环。

## 12.4 页面内容

1. 生成按钮。
2. 视觉基因卡。
3. 当前藻井主图缩略图。
4. 色卡。
5. 纹样关键词。
6. 结构关键词。
7. 文化寓意。
8. 设计应用建议。

## 12.5 页面组件

```text
GeneCardSection
├── GenerateGeneCardButton
└── VisualGeneCard
    ├── GeneCardHeader
    ├── WorkThumbnail
    ├── PaletteList
    ├── PatternKeywordList
    ├── StructureKeywordList
    ├── CulturalMeaningBlock
    └── DesignUsageBlock
```

---

## 12.6 GenerateGeneCardButton

### 文案

```text
生成藻井视觉基因卡
```

### 点击行为

```ts
setIsGeneCardGenerated(true);
```

---

## 12.7 VisualGeneCard 内容结构

```text
藻井视觉基因卡

莲花飞天平棋
初唐｜莫高窟第 xxx 窟

主色：
朱砂红 #B92126
石青蓝 #244C9A
暖橙 #F07B3F
米白 #F2D2A2

纹样关键词：
莲花 / 飞天 / 三兔共耳 / 卷草纹

结构关键词：
中心构图 / 方井结构 / 层级边饰 / 径向秩序

文化寓意：
中心莲花象征净土秩序，飞天纹样强化天界流动感，层级边饰构成从中心向外扩展的空间秩序。

设计应用：
适合用于文创包装、展览视觉、服饰纹样、数字界面主题色。
```

---

## 12.8 MVP 说明

第一版视觉基因卡从当前作品数据中读取内容并渲染。

不需要：

1. AI 实时生成。
2. 用户保存。
3. 图片导出。
4. 登录系统。

可以后续再增加导出 PNG 功能。

## 12.9 验收标准

1. 点击按钮后卡片出现。
2. 卡片内容与当前藻井一致。
3. 卡片视觉完成度高。
4. 卡片体现“色彩 + 纹样 + 结构 + 文化 + 应用”的综合结果。
5. 卡片不是普通色卡，而是设计转译成果。

---

# 13. 全局视觉规格

## 13.1 背景

1. 主背景：黑色或近黑色。
2. 辅助背景：深灰、低透明度灰。
3. 不使用大面积纯白背景。
4. 保持暗场、沉浸、安静。

## 13.2 文字

建议层级：

1. 页面大标题：中文，较大字号。
2. 副标题：中等字号。
3. 说明文字：小字号，低对比。
4. 标签文字：更小字号，可使用胶囊样式。

## 13.3 色彩

整体色彩从藻井图像中提取，避免强行国潮化。

建议使用：

1. 黑色。
2. 暗金色。
3. 米白色。
4. 朱砂红。
5. 石青蓝。
6. 暖橙色。

## 13.4 动效

动效原则：

1. 缓慢。
2. 克制。
3. 空间感。
4. 不炫技。
5. 不影响阅读。

适合使用：

1. fade in。
2. translateY。
3. scale。
4. rotateY。
5. parallax。
6. opacity transition。

不适合使用：

1. 强闪烁。
2. 霓虹发光。
3. 快速弹跳。
4. 过度粒子。
5. 游戏化爆炸效果。

---

# 14. 全局组件建议

## 14.1 返回按钮

用于：

1. 朝代图鉴返回总览。
2. 选中朝代图鉴返回朝代图鉴。
3. 具体藻井详情返回选中朝代图鉴。

组件：

```text
BackButton
```

要求：

1. 位置稳定。
2. 样式低调。
3. hover 有反馈。

---

## 14.2 胶囊导航

用于详情页 Tab。

组件：

```text
PillNav
```

内容：

```text
概览 / 投射 / 色彩 / 结构 / 生成
```

要求：

1. 当前项高亮。
2. 点击反馈明确。
3. 与黑色背景协调。

---

## 14.3 图像卡片

用于朝代卡片和藻井作品卡片。

组件：

```text
ImageCard
```

状态：

1. default。
2. hover。
3. active。
4. selected。

视觉变化：

1. default：较暗。
2. hover：亮度提高。
3. active：放大、前移。
4. selected：加边框或光晕，但不要太亮。

---

# 15. 响应式规则

## 15.1 桌面端

优先适配桌面端。

因为该项目主要用于课程展示和作品集展示，大屏效果更重要。

## 15.2 平板端

1. 保留主要页面。
2. 卡片可以横向滑动。
3. 减少复杂景深动效。

## 15.3 移动端

移动端第一版只需保证可浏览。

调整规则：

1. 首页上滑触发藻井显现。
2. 总览页改为纵向卡片。
3. 朝代图鉴改为横向滑动。
4. 选中朝代图鉴直接滑动卡片点击。
5. 详情页 Tab 可横向滚动。
6. 色彩与结构模块上下排列。

---

# 16. 开发顺序建议

建议 Codex 按以下顺序开发：

```text
1. 搭建 React + Vite + TypeScript 项目
2. 创建基础路由
3. 创建全局样式与暗场视觉系统
4. 创建 data/dynasties.ts 和 data/works.ts
5. 开发首页入口
6. 开发 /atlas 总览状态
7. 开发 /atlas 朝代图鉴状态
8. 开发 /atlas/:dynastyId 选中朝代图鉴
9. 开发 /work/:workId 详情页
10. 开发色彩模块
11. 开发结构模块
12. 开发视觉基因卡模块
13. 补充动效与响应式
```

---

# 17. 第一版页面验收清单

## 首页

* [ ] 黑色背景完成。
* [ ] 藻井图像可随滚动或鼠标上移显现。
* [ ] 标题《藻井集》出现。
* [ ] 点击按钮进入 `/atlas`。

## 总览页面

* [ ] 有环形或总览图鉴视觉。
* [ ] 有项目说明。
* [ ] 点击进入朝代图鉴。

## 朝代图鉴页面

* [ ] 展示多个朝代。
* [ ] 点击朝代进入对应页面。
* [ ] hover 有反馈。

## 选中朝代图鉴

* [ ] 展示当前朝代信息。
* [ ] 展示多个代表藻井。
* [ ] 滚动可以自然浏览。
* [ ] 滚动到末端可以选择具体作品。
* [ ] 点击作品进入详情页。

## 作品详情页

* [ ] 默认显示概览。
* [ ] Tab 可点击切换。
* [ ] 投射模块可展示空间关系。
* [ ] 色彩模块可点击热点并更新色卡。
* [ ] 结构模块可点击纹样标注并更新说明。
* [ ] 生成模块可生成视觉基因卡。

## 全局

* [ ] 视觉风格统一。
* [ ] 数据从 data 文件读取。
* [ ] 页面之间可以返回。
* [ ] 无明显报错。
* [ ] 第一版不依赖摄像头和真实取色也能完整展示。

---

# 18. 权威页面映射修正

后续开发必须优先遵守 `docs/11-authoritative-flow-correction.md`。如果本文件前文与该文档冲突，以 `docs/11-authoritative-flow-correction.md` 为准。

## 18.1 首页 `/`

对应视觉稿：`04加载页4(3).svg`

主交互修正为：

```text
滚动推进 revealProgress
↓
藻井显现
↓
继续向下滚动
↓
navigate("/atlas")
```

“进入图鉴”按钮保留为兜底入口，但不是主路径。

## 18.2 `/atlas` overview 状态

对应视觉稿：`05总览页面(1).svg`

该状态应展示多张藻井作品卡片或藻井图像占位。它不是朝代图鉴页面。

点击任意总览藻井卡片后：

```ts
setAtlasView("dynasty-index");
```

## 18.3 `/atlas` dynasty-index 状态

对应视觉稿：`06藻井图鉴（朝代）(1).svg`

该状态才展示按朝代划分的入口。朝代数据必须来自 `src/data/dynasties.ts`。

点击朝代后：

```ts
navigate(`/atlas/${dynasty.id}`);
```

## 18.4 `/atlas/:dynastyId`

对应视觉稿：`07选中朝代藻井图鉴(1).svg`

该页面展示某个朝代下的代表藻井作品。Round 06 先实现基础列表与点击进入作品详情，Round 07 再实现滚动浏览和鼠标滑动点选。
