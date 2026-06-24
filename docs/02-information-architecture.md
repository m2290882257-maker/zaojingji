# docs/02-information-architecture.md

# 《藻井集》信息架构文档

## 1. 信息架构总览

《藻井集》的信息架构围绕一条核心路径展开：

```text
首页入口
↓
藻井总览
↓
朝代图鉴
↓
单件藻井详情
↓
纹样结构分析
↓
色彩提取
↓
视觉基因卡生成
```

这条路径对应项目的设计逻辑：

```text
抬头观看
↓
进入空间
↓
按朝代浏览
↓
选择单件作品
↓
分层解构
↓
文化取色
↓
设计转译
```

---

## 2. 网站页面结构

第一版网站建议包含 4 个主页面和 1 个结果模块。

```text
/
首页入口

/atlas
藻井总览页面

/atlas/:dynastyId
单一朝代藻井图鉴页面

/work/:workId
具体藻井作品详情页面

/work/:workId#gene-card
视觉基因卡生成模块
```

说明：

第一版不建议拆出过多独立页面。
色彩提取、纹样结构解剖和视觉基因卡都可以放在 `/work/:workId` 详情页内部，通过 Tab 或滚动区块呈现。

这样可以降低开发复杂度，同时保证用户路径完整。

---

## 3. 页面路由表

| 路由                        | 页面名称  | 页面作用          | 主要内容                |
| ------------------------- | ----- | ------------- | ------------------- |
| `/`                       | 首页入口  | 模拟抬头观看藻井，进入网站 | 暗场背景、藻井上移动效、标题、进入按钮 |
| `/atlas`                  | 藻井总览  | 展示不同朝代入口      | 项目说明、朝代环形图鉴、朝代卡片    |
| `/atlas/:dynastyId`       | 朝代图鉴  | 展示某一朝代藻井作品    | 朝代介绍、作品卡片、返回按钮      |
| `/work/:workId`           | 作品详情  | 展示单件藻井的完整分析   | 概览、投射、色彩、结构、视觉基因卡   |
| `/work/:workId#gene-card` | 视觉基因卡 | 作为详情页内的结果区    | 色卡、纹样、结构、文化寓意、设计建议  |

---

## 4. 全站导航逻辑

### 4.1 主要导航层级

```text
首页
└── 藻井总览
    ├── 北朝藻井图鉴
    ├── 隋代藻井图鉴
    ├── 初唐藻井图鉴
    ├── 盛唐藻井图鉴
    ├── 中唐藻井图鉴
    ├── 晚唐藻井图鉴
    ├── 五代藻井图鉴
    ├── 宋代藻井图鉴
    ├── 西夏藻井图鉴
    └── 元代藻井图鉴
        └── 单件藻井作品详情
            ├── 概览
            ├── 投射
            ├── 色彩
            ├── 结构
            └── 视觉基因卡
```

---

## 5. 用户路径

### 5.1 标准路径

```text
用户打开网站
↓
看到黑色低照度页面
↓
滚动 / 鼠标上移 / 手势动作
↓
藻井图像上移展开
↓
标题《藻井集》出现
↓
点击“进入图鉴”
↓
进入 /atlas
↓
选择某个朝代
↓
进入 /atlas/:dynastyId
↓
浏览该朝代藻井卡片
↓
点击某个藻井作品
↓
进入 /work/:workId
↓
查看作品概览
↓
切换到“投射”
↓
切换到“色彩”
↓
点击局部颜色区域
↓
查看色卡说明
↓
切换到“结构”
↓
查看纹样解剖图
↓
点击“生成视觉基因卡”
↓
查看最终设计转译结果
```

---

### 5.2 快速浏览路径

适用于只想快速看图的用户：

```text
首页
↓
藻井总览
↓
选择朝代
↓
浏览图鉴卡片
↓
返回总览
```

---

### 5.3 设计取色路径

适用于设计师或设计学习者：

```text
首页
↓
藻井总览
↓
选择朝代
↓
选择具体藻井
↓
进入色彩模块
↓
点击局部纹样
↓
查看色卡、HEX、设计应用建议
↓
生成视觉基因卡
```

---

### 5.4 文化学习路径

适用于学生和文化爱好者：

```text
首页
↓
藻井总览
↓
选择朝代
↓
选择具体藻井
↓
阅读作品概览
↓
查看纹样结构解剖
↓
阅读文化寓意说明
↓
查看视觉基因卡总结
```

---

## 6. 页面内容结构

## 6.1 `/` 首页入口

### 页面目标

用“抬头看见藻井”的交互方式建立网站的核心体验。

### 页面内容

1. 黑色或低照度背景。
2. 藻井大图。
3. 引导文字。
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

引导文字：

```text
向上滑动，抬头看见藻井
```

或：

```text
Move upward to see the caisson ceiling.
```

按钮：

```text
进入图鉴
```

### 交互逻辑

```text
页面加载
↓
藻井图像位于上方或被遮挡
↓
用户滚动或移动鼠标
↓
藻井向上展开 / 显现
↓
标题和按钮淡入
↓
点击进入 /atlas
```

### 组件建议

```text
IntroPage
├── DarkBackground
├── CeilingRevealImage
├── GestureHint
├── ProjectTitle
└── EnterButton
```

---

## 6.2 `/atlas` 藻井总览页面

### 页面目标

展示项目整体内容，并提供按朝代进入藻井图鉴的入口。

### 页面内容

1. 页面标题。
2. 项目一句话说明。
3. 朝代环形图鉴或横向图鉴。
4. 朝代入口卡片。
5. 简短说明“从朝代进入，观察藻井视觉结构的变化”。

### 建议文案

标题：

```text
藻井图鉴
```

说明：

```text
从不同时代的藻井图像中，观察结构、纹样与色彩秩序的变化。
```

朝代入口：

```text
北朝
隋
初唐
盛唐
中唐
晚唐
五代
宋
西夏
元
```

### 交互逻辑

```text
进入 /atlas
↓
展示朝代图鉴
↓
用户 hover 某个朝代
↓
该朝代卡片放大或高亮
↓
用户点击
↓
进入 /atlas/:dynastyId
```

### 组件建议

```text
AtlasPage
├── PageHeader
├── ProjectIntroText
├── DynastyOrbit
│   └── DynastyCard[]
└── FooterHint
```

---

## 6.3 `/atlas/:dynastyId` 单一朝代图鉴页面

### 页面目标

展示某一朝代下的代表藻井作品，让用户选择具体作品。

### 页面内容

1. 当前朝代名称。
2. 当前朝代简介。
3. 当前朝代藻井视觉特征。
4. 藻井作品卡片列表。
5. 返回总览按钮。

### 示例页面

```text
/atlas/early-tang
```

页面标题：

```text
初唐藻井图鉴
```

说明：

```text
初唐藻井在结构秩序、色彩对比与纹样组织上呈现出更强的开放感与装饰性。
```

作品卡片内容：

```text
莲花飞天平棋
初唐｜莫高窟第 xxx 窟
关键词：莲花、飞天、三兔共耳、卷草纹、红蓝对比
```

### 交互逻辑

```text
进入朝代页面
↓
读取 dynastyId
↓
筛选该朝代作品
↓
渲染作品卡片
↓
用户 hover 卡片
↓
卡片放大 / 前移 / 高亮
↓
用户点击卡片
↓
进入 /work/:workId
```

### 组件建议

```text
DynastyPage
├── BackButton
├── DynastyHeader
├── DynastyDescription
├── WorkCardGallery
│   └── WorkCard[]
└── DynastyColorHint
```

---

## 6.4 `/work/:workId` 具体藻井作品详情页面

### 页面目标

让用户理解单件藻井的图像、空间、结构、色彩和文化语义，并生成视觉基因卡。

### 页面内部导航

详情页建议使用 Tab 或锚点导航：

```text
概览
投射
色彩
结构
生成
```

对应你设计图中的：

```text
首页 / 投射 / 色彩 / 结构
```

第一版可以做成顶部固定导航或右上角胶囊导航。

---

### 6.4.1 概览区

#### 内容

1. 藻井名称。
2. 朝代。
3. 洞窟编号。
4. 作品主图。
5. 简短介绍。
6. 关键词。
7. 代表纹样缩略图。

#### 示例结构

```text
莲花飞天平棋
初唐｜莫高窟第 xxx 窟

该藻井以中心莲花为视觉核心，结合飞天、卷草纹与层级边饰，构成具有宗教象征与装饰秩序的顶部空间图像。
```

#### 组件建议

```text
WorkOverview
├── WorkTitle
├── WorkMeta
├── WorkImage
├── WorkDescription
└── KeywordList
```

---

### 6.4.2 投射区

#### 内容

1. 藻井图像以空间投射方式展示。
2. 可模拟藻井置于顶部空间或倾斜透视的视觉效果。
3. 说明藻井与观看身体之间的关系。

#### 交互逻辑

```text
用户进入投射 Tab
↓
藻井图像以倾斜透视方式出现
↓
鼠标移动时产生轻微视差
↓
用户感受到“仰视观看”的空间关系
```

#### 组件建议

```text
ProjectionSection
├── PerspectiveImage
├── SpatialDescription
└── ParallaxInteraction
```

---

### 6.4.3 色彩区

#### 内容

1. 藻井图像或局部纹样图。
2. 可点击色点或局部区域。
3. 色卡展示区。
4. 色值、色名、色彩说明、文化寓意、设计应用建议。

#### 交互逻辑

```text
用户进入色彩 Tab
↓
看到藻井图像和色彩提取区
↓
点击某个颜色点或纹样区域
↓
右侧 / 下方更新色卡
↓
展示颜色信息和设计说明
```

#### 色卡内容

每个色块应包含：

```text
色名
HEX 色值
色彩角色
所在区域
文化说明
设计应用建议
```

#### 组件建议

```text
ColorSection
├── ColorImageWithHotspots
│   └── ColorHotspot[]
├── PalettePanel
│   └── ColorSwatch[]
└── ColorMeaningText
```

---

### 6.4.4 结构区

#### 内容

1. 藻井结构解剖图。
2. 纹样分层说明。
3. 标注点。
4. 纹样文化寓意。
5. 结构关系说明。

#### 纹样标注类型

根据你目前的设想，可以包含：

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

#### 交互逻辑

```text
用户进入结构 Tab
↓
看到纹样解剖图
↓
点击标注点
↓
显示该区域说明
↓
用户理解藻井结构和文化语义
```

#### 组件建议

```text
StructureSection
├── AnatomyImage
├── AnnotationLayer
│   └── PatternMarker[]
└── PatternInfoPanel
```

---

### 6.4.5 视觉基因卡区

#### 内容

视觉基因卡是详情页的最终输出模块。

卡片包含：

1. 藻井名称。
2. 朝代。
3. 洞窟编号。
4. 主图缩略图。
5. 主色卡。
6. HEX 色值。
7. 纹样关键词。
8. 结构关键词。
9. 文化寓意。
10. 设计应用建议。

#### 交互逻辑

```text
用户点击“生成视觉基因卡”
↓
页面读取当前 workId 对应数据
↓
生成卡片
↓
用户查看完整结果
```

#### 组件建议

```text
GeneCardSection
├── GenerateButton
└── VisualGeneCard
    ├── WorkMeta
    ├── Thumbnail
    ├── PaletteList
    ├── PatternKeywords
    ├── StructureKeywords
    ├── CulturalMeaning
    └── DesignUsage
```

---

## 7. 数据信息架构

项目需要至少三类核心数据。

```text
dynasties
works
palettes
```

---

## 7.1 Dynasty 数据结构

用于朝代图鉴入口和朝代页面。

```ts
type Dynasty = {
  id: string;
  name: string;
  englishName?: string;
  period?: string;
  description: string;
  visualFeatures: string[];
  keywords: string[];
  coverImage: string;
  themeColors?: string[];
};
```

示例：

```ts
{
  id: "early-tang",
  name: "初唐",
  englishName: "Early Tang",
  period: "618-712",
  description: "初唐藻井在结构秩序、色彩对比与纹样组织上呈现出开放而富于装饰性的视觉特征。",
  visualFeatures: ["莲花中心", "飞天纹样", "红蓝对比", "层级边饰"],
  keywords: ["莲花", "飞天", "卷草纹", "平棋"],
  coverImage: "/assets/dynasties/early-tang.jpg",
  themeColors: ["#B92126", "#244C9A", "#F07B3F"]
}
```

---

## 7.2 Work 数据结构

用于单件藻井作品页面。

```ts
type Work = {
  id: string;
  title: string;
  dynastyId: string;
  dynastyName: string;
  caveNumber: string;
  description: string;
  shortFeature: string;
  keywords: string[];
  coverImage: string;
  detailImage: string;
  projectionImage?: string;
  structureImage?: string;
  paletteImage?: string;
  patterns: Pattern[];
  palettes: PaletteGroup[];
  structureKeywords: string[];
  culturalMeaning: string;
  designUsage: string[];
};
```

示例：

```ts
{
  id: "lotus-feitian-pingqi",
  title: "莲花飞天平棋",
  dynastyId: "early-tang",
  dynastyName: "初唐",
  caveNumber: "莫高窟第 xxx 窟",
  description: "该藻井以中心莲花为视觉核心，结合飞天、卷草纹与层级边饰，构成具有宗教象征与装饰秩序的顶部空间图像。",
  shortFeature: "以中心莲花与飞天纹样构成具有秩序感的顶部装饰空间。",
  keywords: ["莲花", "飞天", "三兔共耳", "卷草纹", "红蓝对比"],
  coverImage: "/assets/works/lotus-feitian-cover.jpg",
  detailImage: "/assets/works/lotus-feitian-detail.jpg",
  projectionImage: "/assets/works/lotus-feitian-projection.jpg",
  structureImage: "/assets/works/lotus-feitian-structure.jpg",
  paletteImage: "/assets/works/lotus-feitian-palette.jpg",
  patterns: [],
  palettes: [],
  structureKeywords: ["中心构图", "方井结构", "层级边饰", "径向秩序"],
  culturalMeaning: "中心莲花象征净土秩序，飞天纹样强化天界流动感，层级边饰构成从中心向外扩展的空间秩序。",
  designUsage: ["文创包装", "展览视觉", "服饰纹样", "数字界面主题色"]
}
```

---

## 7.3 Pattern 数据结构

用于纹样结构解剖。

```ts
type Pattern = {
  id: string;
  name: string;
  region: string;
  description: string;
  culturalMeaning: string;
  designTranslation: string;
  position: {
    x: number;
    y: number;
  };
};
```

示例：

```ts
{
  id: "central-lotus",
  name: "中心莲花",
  region: "藻井中心",
  description: "位于藻井中心位置，是视觉秩序的核心。",
  culturalMeaning: "莲花常与清净、净土和宗教空间象征相关。",
  designTranslation: "可作为现代视觉系统中的中心图形、徽章或主视觉纹样。",
  position: {
    x: 50,
    y: 50
  }
}
```

---

## 7.4 Palette 数据结构

用于色卡提取和视觉基因卡。

```ts
type PaletteGroup = {
  id: string;
  name: string;
  region: string;
  description: string;
  colors: PaletteColor[];
};
```

```ts
type PaletteColor = {
  name: string;
  hex: string;
  role: "主色" | "辅助色" | "强调色" | "背景色";
  meaning: string;
  designUsage: string;
};
```

示例：

```ts
{
  id: "main-border-colors",
  name: "边饰纹样色组",
  region: "边饰纹样",
  description: "该色组主要来自藻井边饰区域，形成强烈的红蓝对比与装饰节奏。",
  colors: [
    {
      name: "朱砂红",
      hex: "#B92126",
      role: "主色",
      meaning: "强化热烈、庄重和宗教装饰性。",
      designUsage: "适合用于主视觉标题、包装强调色和节庆类视觉。"
    },
    {
      name: "石青蓝",
      hex: "#244C9A",
      role: "辅助色",
      meaning: "形成冷暖对比，增强空间深度。",
      designUsage: "适合用于背景色、界面深色主题和辅助图形。"
    }
  ]
}
```

---

## 8. 组件信息架构

建议项目组件结构如下：

```text
src/
├── App.tsx
├── main.tsx
├── routes/
│   ├── IntroPage.tsx
│   ├── AtlasPage.tsx
│   ├── DynastyPage.tsx
│   └── WorkPage.tsx
├── components/
│   ├── layout/
│   │   ├── PageShell.tsx
│   │   ├── TopNav.tsx
│   │   └── BackButton.tsx
│   ├── intro/
│   │   ├── CeilingReveal.tsx
│   │   └── GestureHint.tsx
│   ├── atlas/
│   │   ├── DynastyOrbit.tsx
│   │   ├── DynastyCard.tsx
│   │   └── WorkCardGallery.tsx
│   ├── work/
│   │   ├── WorkOverview.tsx
│   │   ├── ProjectionSection.tsx
│   │   ├── ColorSection.tsx
│   │   ├── StructureSection.tsx
│   │   └── GeneCardSection.tsx
│   ├── color/
│   │   ├── ColorHotspot.tsx
│   │   ├── PalettePanel.tsx
│   │   └── ColorSwatch.tsx
│   └── structure/
│       ├── AnatomyImage.tsx
│       ├── PatternMarker.tsx
│       └── PatternInfoPanel.tsx
├── data/
│   ├── dynasties.ts
│   └── works.ts
├── assets/
│   ├── intro/
│   ├── dynasties/
│   └── works/
└── styles/
    └── globals.css
```

---

## 9. 页面状态与交互状态

### 9.1 首页状态

```ts
type IntroState = {
  revealProgress: number;
  hasEntered: boolean;
};
```

说明：

* `revealProgress` 控制藻井展开程度。
* `hasEntered` 判断是否进入图鉴页面。

---

### 9.2 朝代页面状态

```ts
type DynastyPageState = {
  selectedDynastyId: string;
  hoveredWorkId?: string;
};
```

说明：

* `selectedDynastyId` 来自路由。
* `hoveredWorkId` 用于卡片 hover 动效。

---

### 9.3 作品详情页状态

```ts
type WorkPageState = {
  activeTab: "overview" | "projection" | "color" | "structure" | "gene";
  selectedPaletteGroupId?: string;
  selectedPatternId?: string;
  isGeneCardGenerated: boolean;
};
```

说明：

* `activeTab` 控制详情页当前模块。
* `selectedPaletteGroupId` 控制当前展示哪组色卡。
* `selectedPatternId` 控制当前展示哪个纹样说明。
* `isGeneCardGenerated` 控制视觉基因卡显示状态。

---

## 10. 第一版内容数量建议

为了保证开发完成度，第一版建议控制内容规模。

### 10.1 朝代数量

可以展示完整朝代入口，但不必每个朝代都有大量作品。

建议：

1. 总览页展示 8-10 个朝代入口。
2. 第一版重点完成 1-2 个朝代。
3. 其他朝代可以作为 “coming soon” 或只展示封面。

---

### 10.2 藻井作品数量

建议第一版重点完成：

```text
3-5 个代表藻井作品
```

其中至少 1 个作品需要完整拥有：

1. 作品介绍。
2. 投射展示。
3. 色彩提取。
4. 结构解剖。
5. 视觉基因卡。

这样既能展示系统完整性，又不会造成内容生产压力过大。

---

## 11. Codex 开发注意事项

1. 不要先做摄像头识别。
2. 不要先做真实图片取色。
3. 先搭建完整路由和页面结构。
4. 所有内容必须从 data 文件读取。
5. 页面视觉优先保证黑色背景、卡片质感、低照度氛围。
6. 首页动效要轻，不要影响加载速度。
7. 详情页 Tab 逻辑要清晰。
8. 色卡和纹样说明先使用预设数据。
9. 视觉基因卡根据当前作品数据生成。
10. 后续再逐步增加真实 AI 功能。

---

## 12. 信息架构总结

《藻井集》的信息架构可以总结为：

```text
一个入口：
抬头看见藻井

两个浏览层级：
朝代总览
单一朝代图鉴

三个分析维度：
空间投射
色彩提取
纹样结构

一个最终输出：
藻井视觉基因卡
```

它的核心不是堆叠文化资料，而是建立一条可被用户理解、操作和复用的文化设计转译路径。
