# docs/05-data-schema.md

# 《藻井集》数据结构文档

## 1. 文档目的

本文档用于定义《藻井集》网站的数据结构、数据来源、字段命名、资源管理方式和第一版种子数据。

Codex 开发时必须优先按照本文档建立数据层，避免把藻井内容直接写死在页面组件里。

本项目的数据结构需要同时支持两类内容：

1. **第一版重点展示数据：**
   来自 `参考+藻井.md` 中初步选择的 6 件代表藻井。

2. **后续扩展图鉴数据：**
   来自 `敦煌历代精品藻井100图.pdf` 的完整藻井目录与图像内容。

第一版开发不需要一次性录入 100 件藻井，但数据结构必须为后续扩展做好准备。

---

## 2. 数据来源说明

## 2.1 主要内容来源

### Source A：`参考+藻井.md`

用途：

1. 作为第一版 MVP 的核心内容来源。
2. 提供 6 件代表性藻井的名称、朝代、洞窟、目录编号、入选理由、时代背景、作品特点、藻井详解与文化说明。
3. 用于生成作品详情页、结构分析、色彩分析和视觉基因卡的初始文本。

第一版重点作品包括：

```text
01. 北魏 · 莫高窟第251窟 · 莲花飞天平棋 · 目录第3幅
02. 西魏 · 莫高窟第285窟 · 宝池莲花藻井 · 目录第10幅
03. 隋代 · 莫高窟第407窟 · 三兔飞天藻井 · 目录第41、42幅
04. 初唐 · 莫高窟第329窟 · 莲花飞天藻井 · 目录第54幅
05. 盛唐 · 莫高窟第217窟 · 宝相花藻井 · 目录第66幅
06. 元代 · 安西榆林窟第10窟 · 九佛回纹藻井 · 目录第103、104、105幅
```

---

### Source B：`敦煌历代精品藻井100图.pdf`

用途：

1. 作为完整图鉴来源。
2. 提供藻井目录、图版编号、朝代、洞窟编号和图像素材。
3. 支持后续扩展更多朝代、更多藻井作品。
4. 支持首页环形图鉴、朝代图鉴和完整作品库。

第一版中，该 PDF 不需要全部结构化录入。
但每个重点作品必须保留它在 PDF 中的目录编号，方便后续追溯和补图。

---

## 3. 数据层设计原则

## 3.1 内容与页面分离

所有藻井内容必须存放在 `src/data/` 中，不允许直接写死在页面组件里。

错误示例：

```tsx
<h1>莲花飞天平棋</h1>
<p>北魏是敦煌石窟的开创期之一……</p>
```

正确方式：

```tsx
const work = getWorkById(workId);

<h1>{work.title}</h1>
<p>{work.description}</p>
```

---

## 3.2 来源数据与转译数据分离

本项目中有两类文本：

1. **来源数据 source data：**
   来自文档、PDF、目录和人工整理内容。

2. **设计转译数据 derived data：**
   为网站体验重新压缩、改写、生成的内容，例如：

   * 一句话特征
   * 设计应用建议
   * 视觉基因卡文案
   * 色彩语义说明
   * 结构关键词

两者必须在数据结构中区分，避免把 AI 辅助生成内容误认为原始文献内容。

---

## 3.3 第一版使用预设数据

第一版不做真实图片取色，也不做 AI 实时生成。

第一版所有色卡、纹样说明、文化说明和设计建议都采用预设数据：

```text
用户点击色彩区域
↓
读取当前 work.palettes
↓
显示对应色卡
```

后续如果接入真实取色或 AI 生成，可以在现有数据结构上扩展。

---

## 3.4 所有数据必须可追溯

每个藻井作品必须包含 `sourceRefs` 字段，用于记录：

1. 来源文件。
2. 目录编号。
3. 原始名称。
4. 是否经过人工核验。
5. 是否属于第一版重点作品。

---

## 4. 推荐文件结构

建议数据文件按以下结构放置：

```text
src/
├── data/
│   ├── dynasties.ts
│   ├── works.ts
│   ├── catalog.ts
│   ├── palettes.ts
│   ├── patterns.ts
│   └── sourceRefs.ts
├── types/
│   └── zhaojing.ts
└── utils/
    ├── getWorkById.ts
    ├── getWorksByDynasty.ts
    └── getDynastyById.ts
```

说明：

第一版也可以先简化为：

```text
src/
├── data/
│   ├── dynasties.ts
│   └── works.ts
└── types/
    └── zhaojing.ts
```

但类型设计必须保留扩展能力。

---

## 5. 核心数据关系

整个网站的数据关系如下：

```text
Dynasty 朝代
↓
包含多个 Work 藻井作品
↓
每个 Work 包含：
- 基本信息
- 图像资源
- 结构纹样
- 色卡数据
- 文化说明
- 设计转译建议
- 视觉基因卡信息
```

数据关系示意：

```text
dynasties[]
  └── works[]
        ├── images[]
        ├── patterns[]
        ├── palettes[]
        ├── hotspots[]
        └── geneCard
```

---

## 6. TypeScript 类型定义

建议在 `src/types/zhaojing.ts` 中定义以下类型。

---

## 6.1 SourceRef 来源引用

用于记录每条数据来自哪里。

```ts
export type SourceType =
  | "selected-md"
  | "pdf-catalog"
  | "manual-analysis"
  | "ai-assisted"
  | "unknown";

export type VerificationStatus =
  | "draft"
  | "needs-verification"
  | "verified";

export type SourceRef = {
  sourceType: SourceType;

  /**
   * 来源文件名，例如：
   * 参考+藻井.md
   * 敦煌历代精品藻井100图.pdf
   */
  sourceName: string;

  /**
   * PDF 或图鉴中的目录编号。
   * 例如：3、10、[41, 42]、54、66、[103, 104, 105]
   */
  catalogNos?: number[];

  /**
   * 来源中的原始标题。
   */
  originalTitle?: string;

  /**
   * 来源说明。
   */
  note?: string;

  /**
   * 当前内容是否经过人工核验。
   */
  verificationStatus: VerificationStatus;
};
```

---

## 6.2 Dynasty 朝代数据

用于总览页、朝代图鉴页和作品筛选。

```ts
export type Dynasty = {
  /**
   * 朝代 ID，用于路由。
   * 示例：northern-wei / western-wei / sui / early-tang / high-tang / yuan
   */
  id: string;

  /**
   * 中文名称。
   */
  name: string;

  /**
   * 英文名称。
   */
  englishName?: string;

  /**
   * 朝代顺序，用于排序。
   */
  order: number;

  /**
   * 时间范围，可粗略填写。
   */
  period?: string;

  /**
   * 朝代简介。
   */
  description: string;

  /**
   * 该朝代藻井的视觉特征。
   */
  visualFeatures: string[];

  /**
   * 朝代关键词。
   */
  keywords: string[];

  /**
   * 朝代封面图。
   */
  coverImage: string;

  /**
   * 朝代主题色。
   */
  themeColors: string[];

  /**
   * 该朝代在第一版中是否重点展示。
   */
  isFeatured: boolean;
};
```

---

## 6.3 Work 藻井作品数据

用于单件藻井作品卡片、详情页、色彩页、结构页和视觉基因卡。

```ts
export type Work = {
  /**
   * 作品唯一 ID，用于路由。
   */
  id: string;

  /**
   * 作品中文标题。
   */
  title: string;

  /**
   * 英文标题，可后续补充。
   */
  englishTitle?: string;

  /**
   * 所属朝代 ID。
   */
  dynastyId: string;

  /**
   * 所属朝代中文名。
   */
  dynastyName: string;

  /**
   * 洞窟编号。
   */
  caveNumber: string;

  /**
   * 地点，例如：莫高窟、安西榆林窟。
   */
  site: string;

  /**
   * 图鉴目录编号。
   */
  catalogNos: number[];

  /**
   * 是否为第一版重点作品。
   */
  isFeatured: boolean;

  /**
   * 是否在首页或总览页高亮。
   */
  isHero?: boolean;

  /**
   * 一句话视觉特征，用于作品卡片。
   */
  shortFeature: string;

  /**
   * 作品简介，用于详情页概览。
   */
  description: string;

  /**
   * 入选理由，用于开发/内容管理，也可在页面中展示。
   */
  selectionReason?: string;

  /**
   * 时代背景，用于详情页。
   */
  historicalContext?: string;

  /**
   * 作品特点。
   */
  features: string[];

  /**
   * 藻井详解。
   */
  analysis: string[];

  /**
   * 标签。
   */
  keywords: string[];

  /**
   * 结构关键词。
   */
  structureKeywords: string[];

  /**
   * 视觉关键词。
   */
  visualKeywords: string[];

  /**
   * 文化寓意。
   */
  culturalMeaning: string;

  /**
   * 设计应用建议。
   */
  designUsage: string[];

  /**
   * 图像资源。
   */
  images: WorkImages;

  /**
   * 色卡数据。
   */
  palettes: PaletteGroup[];

  /**
   * 纹样结构标注。
   */
  patterns: PatternAnnotation[];

  /**
   * 色彩热点。
   */
  colorHotspots: ColorHotspot[];

  /**
   * 结构热点。
   */
  patternHotspots: PatternHotspot[];

  /**
   * 视觉基因卡。
   */
  geneCard: GeneCard;

  /**
   * 来源引用。
   */
  sourceRefs: SourceRef[];
};
```

---

## 6.4 WorkImages 图像资源

```ts
export type WorkImages = {
  /**
   * 卡片封面图。
   */
  cover: string;

  /**
   * 详情页主图。
   */
  main: string;

  /**
   * 空间投射图。
   */
  projection?: string;

  /**
   * 色彩分析图。
   */
  colorAnalysis?: string;

  /**
   * 结构解剖图。
   */
  structureAnalysis?: string;

  /**
   * 局部纹样图。
   */
  details?: string[];

  /**
   * 原始 PDF 或图鉴图像来源路径。
   */
  sourceImage?: string;
};
```

建议资源路径：

```text
public/
└── assets/
    └── works/
        ├── northern-wei-251-lotus-feitian/
        │   ├── cover.jpg
        │   ├── main.jpg
        │   ├── color.jpg
        │   └── structure.jpg
        ├── western-wei-285-baocchi-lotus/
        ├── sui-407-three-hares/
        ├── early-tang-329-lotus-feitian/
        ├── high-tang-217-baoxianghua/
        └── yuan-yulin-10-nine-buddhas/
```

---

## 6.5 PaletteGroup 色卡组

用于色彩提取模块和视觉基因卡。

```ts
export type PaletteGroup = {
  /**
   * 色卡组 ID。
   */
  id: string;

  /**
   * 色卡组名称。
   */
  name: string;

  /**
   * 对应藻井区域。
   */
  region: string;

  /**
   * 色卡组说明。
   */
  description: string;

  /**
   * 色彩列表。
   */
  colors: PaletteColor[];

  /**
   * 是否为默认展示色卡。
   */
  isDefault?: boolean;
};
```

---

## 6.6 PaletteColor 单个颜色

```ts
export type ColorRole =
  | "主色"
  | "辅助色"
  | "强调色"
  | "背景色"
  | "线条色"
  | "过渡色";

export type PaletteColor = {
  /**
   * 中文色名。
   */
  name: string;

  /**
   * HEX 色值。
   * 第一版可先使用近似值，后续通过真实取色校正。
   */
  hex: string;

  /**
   * 色彩角色。
   */
  role: ColorRole;

  /**
   * 对应纹样或区域。
   */
  region?: string;

  /**
   * 色彩视觉说明。
   */
  visualMeaning: string;

  /**
   * 文化语义说明。
   */
  culturalMeaning?: string;

  /**
   * 设计应用建议。
   */
  designUsage?: string;
};
```

注意：

第一版色值可以先采用人工近似，不必完全精确。
后续如果做真实取色，需要新增字段：

```ts
sampledHex?: string;
sampleMethod?: "manual" | "color-thief" | "canvas" | "ai-assisted";
```

---

## 6.7 PatternAnnotation 纹样标注

用于结构解剖模块。

```ts
export type PatternAnnotation = {
  /**
   * 纹样 ID。
   */
  id: string;

  /**
   * 纹样名称。
   */
  name: string;

  /**
   * 所在区域。
   */
  region: string;

  /**
   * 视觉特征。
   */
  visualFeature: string;

  /**
   * 文化寓意。
   */
  culturalMeaning: string;

  /**
   * 设计转译建议。
   */
  designTranslation: string;

  /**
   * 相关关键词。
   */
  keywords: string[];
};
```

---

## 6.8 Hotspot 热点数据

### 色彩热点

用于色彩模块中点击局部区域更新色卡。

```ts
export type ColorHotspot = {
  id: string;

  /**
   * 热点名称。
   */
  label: string;

  /**
   * 百分比定位，x/y 范围为 0-100。
   */
  x: number;
  y: number;

  /**
   * 热点大小。
   */
  size?: number;

  /**
   * 对应色卡组。
   */
  paletteGroupId: string;
};
```

### 纹样热点

用于结构模块中点击局部纹样更新说明。

```ts
export type PatternHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  size?: number;
  patternId: string;
};
```

---

## 6.9 GeneCard 视觉基因卡

用于最终生成模块。

```ts
export type GeneCard = {
  /**
   * 视觉基因卡标题。
   */
  title: string;

  /**
   * 总结性短句。
   */
  summary: string;

  /**
   * 主要色卡组 ID。
   */
  paletteGroupIds: string[];

  /**
   * 主要纹样 ID。
   */
  patternIds: string[];

  /**
   * 结构关键词。
   */
  structureKeywords: string[];

  /**
   * 文化关键词。
   */
  culturalKeywords: string[];

  /**
   * 设计应用场景。
   */
  designScenarios: string[];

  /**
   * 用于卡片底部的设计转译说明。
   */
  designTranslationText: string;
};
```

---

## 7. CatalogEntry 完整图鉴轻量数据

`敦煌历代精品藻井100图.pdf` 中的完整 100 件藻井，后续可以先录入为轻量目录数据。

不需要每一件都写完整详情，只需要支持图鉴浏览。

```ts
export type CatalogEntry = {
  id: string;

  /**
   * 图鉴目录编号。
   */
  catalogNo: number;

  /**
   * 原始标题。
   */
  title: string;

  /**
   * 所属地点。
   */
  site: string;

  /**
   * 洞窟编号。
   */
  caveNumber: string;

  /**
   * 朝代。
   */
  dynastyName: string;

  /**
   * 对应朝代 ID。
   */
  dynastyId: string;

  /**
   * 图像路径。
   */
  image: string;

  /**
   * 是否已经升级为完整 Work 数据。
   */
  hasDetailedWork: boolean;

  /**
   * 如果已经升级为 Work，则关联 workId。
   */
  workId?: string;

  /**
   * 来源。
   */
  sourceRefs: SourceRef[];
};
```

用途：

```text
完整图鉴 catalog[]
↓
用户点击某件作品
↓
如果 hasDetailedWork = true
   进入 /work/:workId
否则
   显示 Coming Soon / 仅图鉴预览
```

---

## 8. 第一版朝代数据

建议第一版在 `src/data/dynasties.ts` 中创建以下朝代数据。

```ts
import type { Dynasty } from "../types/zhaojing";

export const dynasties: Dynasty[] = [
  {
    id: "northern-wei",
    name: "北魏",
    englishName: "Northern Wei",
    order: 1,
    period: "386-534",
    description:
      "北魏是敦煌石窟艺术的重要开创期之一，藻井和平棋图案多以莲花、忍冬、飞天为主，结构古朴，线条粗犷，体现早期佛教艺术与中原装饰传统的融合。",
    visualFeatures: ["平棋结构", "莲花中心", "飞天环绕", "忍冬纹", "土红底色", "石青石绿"],
    keywords: ["古朴", "早期敦煌", "中原融合", "中心塔柱窟"],
    coverImage: "/assets/dynasties/northern-wei.jpg",
    themeColors: ["#8F2D24", "#1F6E9E", "#2F7E5D", "#D8B36A"],
    isFeatured: true
  },
  {
    id: "western-wei",
    name: "西魏",
    englishName: "Western Wei",
    order: 2,
    period: "535-557",
    description:
      "西魏时期藻井从仿木建筑结构逐渐转向华盖式装饰，出现更明显的织物、垂幔和流苏想象，体现中西图像与多重信仰的并置。",
    visualFeatures: ["华盖式藻井", "三重方井", "水涡纹", "覆瓣莲花", "垂幔流苏"],
    keywords: ["华盖", "文化融合", "宝池", "净土意象"],
    coverImage: "/assets/dynasties/western-wei.jpg",
    themeColors: ["#2F7E73", "#224C8F", "#8B2C2C", "#E8D9B0"],
    isFeatured: true
  },
  {
    id: "sui",
    name: "隋",
    englishName: "Sui",
    order: 3,
    period: "581-618",
    description:
      "隋代是敦煌藻井由早期疏朗结构走向繁复华丽的重要转型期，三兔共耳等具有强烈旋转感和智慧性的纹样成为代表。",
    visualFeatures: ["三兔共耳", "飞天环绕", "多层边饰", "旋转构图", "明快色彩"],
    keywords: ["转型", "循环", "三兔", "丝路传播"],
    coverImage: "/assets/dynasties/sui.jpg",
    themeColors: ["#B7332A", "#244C9A", "#2F8B6B", "#F1C46B"],
    isFeatured: true
  },
  {
    id: "early-tang",
    name: "初唐",
    englishName: "Early Tang",
    order: 4,
    period: "618-712",
    description:
      "初唐藻井进入成熟阶段，华盖式装饰更加完整，飞天姿态自由舒展，色彩热烈明快，体现唐代上升期的开放气象。",
    visualFeatures: ["莲花团花", "自由飞天", "蓝天背景", "卷草边饰", "锦绣华盖"],
    keywords: ["华美", "成熟", "飞天", "锦绣"],
    coverImage: "/assets/dynasties/early-tang.jpg",
    themeColors: ["#B92E2A", "#2557A4", "#F07B3F", "#E6C277"],
    isFeatured: true
  },
  {
    id: "high-tang",
    name: "盛唐",
    englishName: "High Tang",
    order: 5,
    period: "713-766",
    description:
      "盛唐藻井图案更加繁复华丽，宝相花成为重要纹样，构图饱满，色彩浓郁，体现盛唐装饰艺术的圆满、富丽与理想化。",
    visualFeatures: ["宝相花", "倒斗层次", "复杂幔围", "卷草纹", "富丽色彩"],
    keywords: ["宝相花", "繁丽", "圆满", "盛唐气象"],
    coverImage: "/assets/dynasties/high-tang.jpg",
    themeColors: ["#7F241F", "#1F6B63", "#C7A24C", "#F2E4C7"],
    isFeatured: true
  },
  {
    id: "yuan",
    name: "元",
    englishName: "Yuan",
    order: 6,
    period: "1271-1368",
    description:
      "元代藻井受到藏传佛教密宗影响，图像由外向的极乐世界转向内向的精神宇宙，曼荼罗式结构、九佛、回纹等成为重要特征。",
    visualFeatures: ["九佛", "曼荼罗结构", "回纹边饰", "密教秩序", "红绿对比"],
    keywords: ["密宗", "坛城", "九佛", "神秘"],
    coverImage: "/assets/dynasties/yuan.jpg",
    themeColors: ["#A32924", "#2B7D55", "#C9A646", "#E8E0C6"],
    isFeatured: true
  }
];
```

---

## 9. 第一版重点作品数据

建议第一版在 `src/data/works.ts` 中创建 6 件重点作品。

以下是数据种子结构。
其中图片路径、HEX 色值和热点坐标可以先作为占位，后续根据实际素材校正。

---

## 9.1 北魏 · 莫高窟第251窟 · 莲花飞天平棋

```ts
{
  id: "northern-wei-251-lotus-feitian-pingqi",
  title: "莲花飞天平棋",
  englishTitle: "Lotus and Flying Apsaras Pingqi Ceiling",
  dynastyId: "northern-wei",
  dynastyName: "北魏",
  caveNumber: "莫高窟第251窟",
  site: "莫高窟",
  catalogNos: [3],
  isFeatured: true,
  isHero: true,

  shortFeature:
    "早期敦煌平棋装饰的典型样本，以方中套圆、莲花中心与飞天环绕构成质朴有力的顶部空间。",

  description:
    "该平棋以莲花为中心，四周环绕飞天、忍冬纹与火焰纹，体现北魏时期敦煌藻井古朴雄健、冷暖对比鲜明的早期风貌。",

  selectionReason:
    "它是北魏中心塔柱窟平棋装饰的典型样本，完整保留了早期敦煌藻井的原始风貌。",

  historicalContext:
    "北魏时期敦煌石窟艺术处于开创阶段，佛教艺术正从模仿西域样式逐渐转向融合中原审美。第251窟的平棋以中国传统木构天花样式为基础，结合莲花、飞天、忍冬纹等佛教图像，体现文化过渡期的艺术特征。",

  features: [
    "结构形式为平棋，呈棋盘状方格天井。",
    "核心图案为覆瓣莲花，花瓣层叠，中心有莲蓬。",
    "四角绘飞天，姿态简洁而富有动感。",
    "边饰包含忍冬纹与火焰纹，线条粗犷有力。",
    "色彩以土红、石青、石绿为主，冷暖对比强烈。"
  ],

  analysis: [
    "整体构图为方中套圆，以方形格建立秩序，以圆形莲花制造旋转感。",
    "中心莲花呈放射状展开，象征净土与生命轮回。",
    "飞天围绕莲花飞翔，形成对佛的礼赞供养。",
    "土红底色与石青、石绿形成冷暖对比，增强早期敦煌艺术的粗犷与神秘感。"
  ],

  keywords: ["北魏", "平棋", "莲花", "飞天", "忍冬纹", "火焰纹", "方中套圆"],
  structureKeywords: ["平棋结构", "方中套圆", "中心莲花", "飞天环绕", "边饰分区"],
  visualKeywords: ["古朴", "粗犷", "旋转", "冷暖对比", "早期敦煌"],

  culturalMeaning:
    "莲花象征净土与生命轮回，飞天象征礼赞供养，方中套圆的构图则在建筑秩序与宗教想象之间建立平衡。",

  designUsage: [
    "适合用于具有历史感的文创包装。",
    "适合提取方中套圆结构用于徽章、海报和界面主视觉。",
    "适合将土红、石青、石绿组合转译为古朴厚重的文化色彩系统。"
  ],

  images: {
    cover: "/assets/works/northern-wei-251-lotus-feitian-pingqi/cover.jpg",
    main: "/assets/works/northern-wei-251-lotus-feitian-pingqi/main.jpg",
    colorAnalysis: "/assets/works/northern-wei-251-lotus-feitian-pingqi/color.jpg",
    structureAnalysis: "/assets/works/northern-wei-251-lotus-feitian-pingqi/structure.jpg"
  },

  palettes: [
    {
      id: "earth-red-cool-contrast",
      name: "土红冷色对比",
      region: "整体底色与莲花飞天区域",
      description: "以土红为底，配合石青、石绿和白色，形成早期敦煌壁画常见的冷暖对比。",
      isDefault: true,
      colors: [
        {
          name: "土红",
          hex: "#8F2D24",
          role: "主色",
          region: "背景与边饰",
          visualMeaning: "营造温暖、沉稳、厚重的宗教氛围。",
          culturalMeaning: "体现早期壁画质朴雄健的视觉气质。",
          designUsage: "适合用于文化类主视觉背景和包装底色。"
        },
        {
          name: "石青",
          hex: "#1F6E9E",
          role: "辅助色",
          region: "莲花、飞天与纹样",
          visualMeaning: "与土红形成冷暖对比，增强图像清晰度。",
          designUsage: "适合用于标题辅助色、图形描边和界面强调。"
        },
        {
          name: "石绿",
          hex: "#2F7E5D",
          role: "辅助色",
          region: "纹样与装饰带",
          visualMeaning: "增加矿物颜料的清冷质感。",
          designUsage: "适合用于文化色卡中的中性色调节。"
        }
      ]
    }
  ],

  patterns: [
    {
      id: "central-lotus",
      name: "中心莲花",
      region: "藻井中心",
      visualFeature: "莲花放射状展开，形成旋转感。",
      culturalMeaning: "象征净土、生命轮回和精神中心。",
      designTranslation: "可转译为中心徽章、放射状主视觉或界面核心图形。",
      keywords: ["莲花", "中心", "放射", "净土"]
    },
    {
      id: "flying-apsaras",
      name: "飞天",
      region: "莲花四周",
      visualFeature: "飞天围绕莲花飞翔，姿态简洁而有动势。",
      culturalMeaning: "象征礼赞供养与天界空间。",
      designTranslation: "可提取为动态线条、环绕构图或插画角色动势。",
      keywords: ["飞天", "环绕", "礼赞", "动势"]
    }
  ],

  colorHotspots: [
    { id: "hotspot-bg-red", label: "土红底色", x: 18, y: 55, size: 20, paletteGroupId: "earth-red-cool-contrast" }
  ],

  patternHotspots: [
    { id: "pattern-central-lotus", label: "中心莲花", x: 50, y: 50, size: 18, patternId: "central-lotus" },
    { id: "pattern-flying-apsaras", label: "飞天", x: 25, y: 25, size: 16, patternId: "flying-apsaras" }
  ],

  geneCard: {
    title: "莲花飞天平棋视觉基因卡",
    summary: "以方中套圆的秩序结构，组织莲花、飞天与矿物色彩的早期敦煌视觉样本。",
    paletteGroupIds: ["earth-red-cool-contrast"],
    patternIds: ["central-lotus", "flying-apsaras"],
    structureKeywords: ["平棋结构", "方中套圆", "中心莲花", "飞天环绕"],
    culturalKeywords: ["净土", "礼赞", "生命轮回", "早期敦煌"],
    designScenarios: ["文创包装", "展览海报", "徽章设计", "数字界面主题色"],
    designTranslationText:
      "该作品适合提取方中套圆的稳定结构、中心莲花的精神核心和土红—石青—石绿的矿物色彩组合，转译为具有历史厚度的视觉系统。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [3],
      originalTitle: "北魏 · 莫高窟第251窟 · 莲花飞天平棋",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [3],
      originalTitle: "莲花飞天平棋",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

## 9.2 其他五件重点作品的最小数据

为避免第一版数据过重，其他五件作品可以先建立完整字段但内容略简，后续逐步补齐。

---

### 西魏 · 莫高窟第285窟 · 宝池莲花藻井

```ts
{
  id: "western-wei-285-baocchi-lotus",
  title: "宝池莲花藻井",
  englishTitle: "Lotus in Treasure Pond Caisson Ceiling",
  dynastyId: "western-wei",
  dynastyName: "西魏",
  caveNumber: "莫高窟第285窟",
  site: "莫高窟",
  catalogNos: [10],
  isFeatured: true,

  shortFeature:
    "从仿木结构转向华盖式藻井的重要样本，以水涡纹、覆瓣莲花、垂幔与流苏模拟织物华盖。",

  description:
    "该藻井以宝池水面和莲花为中心，外部层层环绕忍冬纹、火焰纹、垂幔和彩铃，体现西魏时期藻井由建筑构件向独立装饰艺术转化的关键阶段。",

  selectionReason:
    "这是莫高窟第一个彻底模拟织物华盖的藻井，也是莫高窟早期有确切纪年的重要洞窟代表。",

  features: [
    "华盖式藻井。",
    "中心为绿色水涡纹地与覆瓣莲花。",
    "四周边框绘忍冬纹与火焰纹。",
    "外围绘三角垂帐纹和彩铃。",
    "色彩以石青、石绿、土红和白色为主。"
  ],

  analysis: [
    "中心宝池水面强化净土意象。",
    "三重方井套叠形成向中心聚合的空间秩序。",
    "垂幔与流苏让藻井产生织物华盖般的悬挂感。"
  ],

  keywords: ["西魏", "宝池", "莲花", "华盖", "水涡纹", "垂幔", "流苏"],
  structureKeywords: ["三重方井", "华盖式结构", "中心宝池", "外围垂幔"],
  visualKeywords: ["清丽", "流动", "华盖", "文化融合"],

  culturalMeaning:
    "宝池与莲花共同构成净土世界的象征，垂幔与流苏则将建筑顶部转化为具有仪式感的天界华盖。",

  designUsage: [
    "适合用于展览空间导视和沉浸式顶部视觉。",
    "适合提取水涡纹与莲花结合的流动图形。",
    "适合用于清雅、冷色调的文化视觉系统。"
  ],

  images: {
    cover: "/assets/works/western-wei-285-baocchi-lotus/cover.jpg",
    main: "/assets/works/western-wei-285-baocchi-lotus/main.jpg",
    colorAnalysis: "/assets/works/western-wei-285-baocchi-lotus/color.jpg",
    structureAnalysis: "/assets/works/western-wei-285-baocchi-lotus/structure.jpg"
  },

  palettes: [],
  patterns: [],
  colorHotspots: [],
  patternHotspots: [],

  geneCard: {
    title: "宝池莲花藻井视觉基因卡",
    summary: "以宝池、莲花与垂幔构成从建筑结构向织物华盖转化的视觉样本。",
    paletteGroupIds: [],
    patternIds: [],
    structureKeywords: ["三重方井", "华盖", "宝池", "垂幔"],
    culturalKeywords: ["净土", "融合", "华盖", "仪式"],
    designScenarios: ["展览视觉", "空间投影", "文创包装", "数字界面背景"],
    designTranslationText:
      "该作品适合提取宝池水涡纹的流动感、三重方井的层叠秩序和华盖垂幔的仪式性，转译为具有空间悬浮感的设计语言。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [10],
      originalTitle: "西魏 · 莫高窟第285窟 · 宝池莲花藻井",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [10],
      originalTitle: "宝池莲花藻井",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

### 隋代 · 莫高窟第407窟 · 三兔飞天藻井

```ts
{
  id: "sui-407-three-hares-feitian",
  title: "三兔飞天藻井",
  englishTitle: "Three Hares and Flying Apsaras Caisson Ceiling",
  dynastyId: "sui",
  dynastyName: "隋",
  caveNumber: "莫高窟第407窟",
  site: "莫高窟",
  catalogNos: [41, 42],
  isFeatured: true,

  shortFeature:
    "以三兔共耳为核心的敦煌标志性藻井，通过旋转构图和飞天环绕形成循环往复的视觉动势。",

  description:
    "该藻井中心为三兔共耳图案，外层有飞天、莲花和多层边饰环绕，结构繁密而富有旋转感，是敦煌最具识别度和国际传播性的视觉符号之一。",

  selectionReason:
    "三兔共耳是敦煌最著名、最具国际影响力的图案之一，第407窟版本完整且精美。",

  features: [
    "核心图案为三兔共耳。",
    "三只兔子以等边三角形构图相互追逐。",
    "飞天环绕莲花外侧。",
    "莲花采用侧视角度绘制。",
    "多层几何纹、联珠纹和垂幔向外展开。"
  ],

  analysis: [
    "三兔共耳通过共享耳朵形成视觉悖论与循环结构。",
    "兔子的奔跑方向制造强烈旋转感。",
    "外圈飞天进一步强化中心动势。",
    "层层边饰将中心旋转转化为稳定的空间秩序。"
  ],

  keywords: ["隋", "三兔共耳", "飞天", "莲花", "循环", "旋转", "丝路传播"],
  structureKeywords: ["中心旋转", "等边三角构图", "飞天环绕", "多层边饰"],
  visualKeywords: ["奇思", "循环", "动势", "智慧图案"],

  culturalMeaning:
    "三兔共耳寓意循环、轮回与生生不息，也是丝绸之路图像传播和文明互鉴的代表性符号。",

  designUsage: [
    "适合用于动态图形、循环动画和交互标识。",
    "适合用于文化 IP 图形符号开发。",
    "适合用于以旋转、循环、共生为主题的视觉系统。"
  ],

  images: {
    cover: "/assets/works/sui-407-three-hares-feitian/cover.jpg",
    main: "/assets/works/sui-407-three-hares-feitian/main.jpg",
    colorAnalysis: "/assets/works/sui-407-three-hares-feitian/color.jpg",
    structureAnalysis: "/assets/works/sui-407-three-hares-feitian/structure.jpg"
  },

  palettes: [],
  patterns: [],
  colorHotspots: [],
  patternHotspots: [],

  geneCard: {
    title: "三兔飞天藻井视觉基因卡",
    summary: "以三兔共耳的循环结构和飞天环绕的旋转动势构成敦煌最具传播性的视觉符号。",
    paletteGroupIds: [],
    patternIds: [],
    structureKeywords: ["三兔共耳", "等边三角", "中心旋转", "飞天环绕"],
    culturalKeywords: ["循环", "轮回", "共生", "文明互鉴"],
    designScenarios: ["动态图形", "文化 IP", "品牌标识", "互动装置视觉"],
    designTranslationText:
      "该作品适合将三兔共耳的循环逻辑转译为动态图标、交互反馈、品牌符号或生成式图形系统。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [41, 42],
      originalTitle: "隋代 · 莫高窟第407窟 · 三兔飞天藻井",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [41, 42],
      originalTitle: "三兔飞天藻井",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

### 初唐 · 莫高窟第329窟 · 莲花飞天藻井

```ts
{
  id: "early-tang-329-lotus-feitian",
  title: "莲花飞天藻井",
  englishTitle: "Lotus and Flying Apsaras Caisson Ceiling",
  dynastyId: "early-tang",
  dynastyName: "初唐",
  caveNumber: "莫高窟第329窟",
  site: "莫高窟",
  catalogNos: [54],
  isFeatured: true,

  shortFeature:
    "初唐藻井成熟期代表，以巨大的莲花团花、蓝天飞天与层层边饰构成明丽华美的锦绣华盖。",

  description:
    "该藻井中心绘五彩莲花团花，四周飞天在蓝天流云中环绕飞行，边饰层层递进，体现初唐藻井由建筑构件转向锦绣华盖的成熟形态。",

  selectionReason:
    "这是莫高窟现存最精美的藻井之一，也是初唐藻井成熟的重要标志。",

  features: [
    "中心为五彩莲花团花。",
    "飞天在蓝天流云中环绕飞行。",
    "边饰包含卷草纹、方格纹、联珠纹和垂角幔帷。",
    "色彩以深红、浅红、赭石、黄丹为主，配以石青、石绿。",
    "整体效果热烈明快。"
  ],

  analysis: [
    "转轮莲花形成强烈的中心性和法轮流转感。",
    "飞天姿态自由舒展，呈现唐代开放气象。",
    "蓝天背景增强顶部空间的天界想象。",
    "垂幔边饰使藻井具有倒悬华盖的效果。"
  ],

  keywords: ["初唐", "莲花", "飞天", "蓝天", "华盖", "法轮", "卷草纹"],
  structureKeywords: ["中心莲花", "四披飞天", "层级边饰", "锦绣华盖"],
  visualKeywords: ["华美", "明快", "自由", "成熟"],

  culturalMeaning:
    "中心莲花与法轮意象象征佛法流转，飞天与蓝天背景共同建构出自由舒展的天界空间。",

  designUsage: [
    "适合用于高饱和文化视觉系统。",
    "适合提取莲花团花作为主视觉图形。",
    "适合用于服饰纹样、展陈视觉和数字界面主题。"
  ],

  images: {
    cover: "/assets/works/early-tang-329-lotus-feitian/cover.jpg",
    main: "/assets/works/early-tang-329-lotus-feitian/main.jpg",
    colorAnalysis: "/assets/works/early-tang-329-lotus-feitian/color.jpg",
    structureAnalysis: "/assets/works/early-tang-329-lotus-feitian/structure.jpg"
  },

  palettes: [],
  patterns: [],
  colorHotspots: [],
  patternHotspots: [],

  geneCard: {
    title: "莲花飞天藻井视觉基因卡",
    summary: "以莲花团花、蓝天飞天与层层垂幔构成初唐成熟期的锦绣华盖视觉样本。",
    paletteGroupIds: [],
    patternIds: [],
    structureKeywords: ["中心莲花", "飞天环绕", "蓝天背景", "层层边饰"],
    culturalKeywords: ["法轮", "净土", "自由", "唐代气象"],
    designScenarios: ["服饰纹样", "展览视觉", "文创包装", "界面主题色"],
    designTranslationText:
      "该作品适合提取中心莲花的主视觉力量、飞天的流动动势和高饱和红蓝对比，转译为明快华丽的设计系统。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [54],
      originalTitle: "初唐 · 莫高窟第329窟 · 莲花飞天藻井",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [54],
      originalTitle: "莲花飞天藻井",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

### 盛唐 · 莫高窟第217窟 · 宝相花藻井

```ts
{
  id: "high-tang-217-baoxianghua",
  title: "宝相花藻井",
  englishTitle: "Baoxiang Flower Caisson Ceiling",
  dynastyId: "high-tang",
  dynastyName: "盛唐",
  caveNumber: "莫高窟第217窟",
  site: "莫高窟",
  catalogNos: [66],
  isFeatured: true,

  shortFeature:
    "盛唐宝相花纹样的代表作品，以饱满的理想之花、复杂边饰和浓郁色彩体现盛唐装饰艺术的圆满与繁丽。",

  description:
    "该藻井中心为宝相花纹样，花瓣层层展开，边饰包含卷草纹、团花边饰、鳞形纹和垂幔，体现盛唐藻井井心缩小、倒斗层次增多、幔围复杂的典型特点。",

  selectionReason:
    "宝相花是唐代图案艺术的重要成就，第217窟宝相花藻井被视为盛唐前期具有代表性的藻井之一。",

  features: [
    "中心为宝相花纹样。",
    "花瓣由桃形瓣、叶形瓣、云形瓣层层套联。",
    "边饰包含小白珠、缠枝石榴卷草、团花边饰、鳞形纹和三角纹垂幔。",
    "结构体现井心缩小、倒斗层次增多、幔围复杂。",
    "色彩以石绿、石青、朱砂、金色为主。"
  ],

  analysis: [
    "宝相花不是现实花卉，而是多种花叶特征的理想化组合。",
    "层层花瓣形成对称放射结构，体现盛唐审美中的圆满与秩序。",
    "大面积青绿与赭红形成暖底冷花的对比。",
    "复杂边饰强化了藻井作为华丽顶部空间的装饰性。"
  ],

  keywords: ["盛唐", "宝相花", "卷草纹", "团花", "垂幔", "富丽", "圆满"],
  structureKeywords: ["中心宝相花", "倒斗层次", "复杂幔围", "放射结构"],
  visualKeywords: ["繁丽", "饱满", "庄重", "理想化"],

  culturalMeaning:
    "宝相花融合莲花、牡丹、石榴等多种植物意象，象征庄严、洁净、圆满和盛世理想。",

  designUsage: [
    "适合用于高端文创包装。",
    "适合提取宝相花作为品牌主图形。",
    "适合用于服饰纹样、展览主视觉和传统色彩系统。"
  ],

  images: {
    cover: "/assets/works/high-tang-217-baoxianghua/cover.jpg",
    main: "/assets/works/high-tang-217-baoxianghua/main.jpg",
    colorAnalysis: "/assets/works/high-tang-217-baoxianghua/color.jpg",
    structureAnalysis: "/assets/works/high-tang-217-baoxianghua/structure.jpg"
  },

  palettes: [],
  patterns: [],
  colorHotspots: [],
  patternHotspots: [],

  geneCard: {
    title: "宝相花藻井视觉基因卡",
    summary: "以宝相花的理想化植物结构和盛唐繁丽色彩构成圆满、富丽的视觉系统。",
    paletteGroupIds: [],
    patternIds: [],
    structureKeywords: ["宝相花", "放射结构", "倒斗层次", "复杂边饰"],
    culturalKeywords: ["圆满", "庄严", "盛世", "理想之花"],
    designScenarios: ["品牌主图形", "高端文创", "服饰纹样", "展陈视觉"],
    designTranslationText:
      "该作品适合提取宝相花的饱满放射结构、复杂边饰和暖底冷花的色彩关系，转译为具有盛唐气象的高完成度视觉系统。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [66],
      originalTitle: "盛唐 · 莫高窟第217窟 · 宝相花藻井",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [66],
      originalTitle: "宝相花藻井",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

### 元代 · 安西榆林窟第10窟 · 九佛回纹藻井

```ts
{
  id: "yuan-yulin-10-nine-buddhas",
  title: "九佛回纹藻井",
  englishTitle: "Nine Buddhas and Leiwen Caisson Ceiling",
  dynastyId: "yuan",
  dynastyName: "元",
  caveNumber: "安西榆林窟第10窟",
  site: "安西榆林窟",
  catalogNos: [103, 104, 105],
  isFeatured: true,

  shortFeature:
    "敦煌晚期密教藻井代表，以九佛、回纹和曼荼罗式结构构成内向、精细、神秘的精神宇宙。",

  description:
    "该藻井中心及四壁绘九尊佛像，形成类似曼荼罗的宇宙秩序，周围以繁密回纹、卷草纹和几何边饰组织空间，是元代藏传佛教密宗艺术在敦煌地区的重要代表。",

  selectionReason:
    "元代是敦煌造窟的尾声，榆林窟第10窟九佛回纹藻井集中体现了藏传佛教密宗艺术与敦煌晚期装饰风格。",

  features: [
    "核心图案为九佛。",
    "整体结构具有曼荼罗式秩序。",
    "四周大量使用回纹和卷草纹。",
    "覆斗形顶中包含方井结构。",
    "色彩以朱砂红、石绿和金色为主，红绿对比强烈。"
  ],

  analysis: [
    "九佛呈九宫格秩序，象征佛国世界的中心与方位关系。",
    "回纹边饰形成循环往复的几何秩序。",
    "密集纹样使空间由外向的飞天世界转向内省的精神宇宙。",
    "红绿对比和金色点缀增强神秘感与仪式性。"
  ],

  keywords: ["元代", "榆林窟", "九佛", "回纹", "曼荼罗", "密宗", "坛城"],
  structureKeywords: ["九宫格", "曼荼罗结构", "回纹边饰", "覆斗形顶"],
  visualKeywords: ["神秘", "精细", "内向", "密集", "仪式感"],

  culturalMeaning:
    "九佛与曼荼罗结构象征密教宇宙秩序，回纹的循环结构强化了修行观想中的精神路径。",

  designUsage: [
    "适合用于神秘感强的展陈视觉。",
    "适合提取九宫格秩序用于信息架构设计。",
    "适合用于需要仪式感和秩序感的文化视觉系统。"
  ],

  images: {
    cover: "/assets/works/yuan-yulin-10-nine-buddhas/cover.jpg",
    main: "/assets/works/yuan-yulin-10-nine-buddhas/main.jpg",
    colorAnalysis: "/assets/works/yuan-yulin-10-nine-buddhas/color.jpg",
    structureAnalysis: "/assets/works/yuan-yulin-10-nine-buddhas/structure.jpg"
  },

  palettes: [],
  patterns: [],
  colorHotspots: [],
  patternHotspots: [],

  geneCard: {
    title: "九佛回纹藻井视觉基因卡",
    summary: "以九佛、回纹和曼荼罗秩序构成敦煌晚期密教视觉系统。",
    paletteGroupIds: [],
    patternIds: [],
    structureKeywords: ["九佛", "九宫格", "曼荼罗", "回纹"],
    culturalKeywords: ["密宗", "坛城", "观想", "宇宙秩序"],
    designScenarios: ["展陈视觉", "信息架构图形", "文化海报", "沉浸式空间视觉"],
    designTranslationText:
      "该作品适合提取九宫格秩序、回纹循环路径和红绿金的仪式性色彩，转译为具有神秘感和结构感的视觉系统。"
  },

  sourceRefs: [
    {
      sourceType: "selected-md",
      sourceName: "参考+藻井.md",
      catalogNos: [103, 104, 105],
      originalTitle: "元代 · 安西榆林窟第10窟 · 九佛回纹藻井",
      note: "第一版重点选择作品。",
      verificationStatus: "needs-verification"
    },
    {
      sourceType: "pdf-catalog",
      sourceName: "敦煌历代精品藻井100图.pdf",
      catalogNos: [103, 104, 105],
      originalTitle: "九佛回纹藻井",
      verificationStatus: "needs-verification"
    }
  ]
}
```

---

## 10. 完整 100 图图鉴的扩展策略

第一版不要直接录入 100 件完整作品，否则开发和内容校对压力过大。

推荐分三层扩展。

---

## 10.1 第一层：轻量目录

只录入：

```ts
catalogNo
title
dynastyName
dynastyId
site
caveNumber
image
```

用于总览页和朝代图鉴展示。

---

## 10.2 第二层：重点作品

选择其中 6 件作为完整 Work 数据：

```text
251 窟
285 窟
407 窟
329 窟
217 窟
榆林窟第10窟
```

这些作品进入完整详情页。

---

## 10.3 第三层：后续扩展作品

后续可继续补充：

```text
中唐
晚唐
五代
宋
西夏
其他榆林窟藻井
```

每次新增一件完整作品，只需要新增一个 `Work` 对象，不需要重写页面。

---

## 11. 数据命名规范

## 11.1 ID 命名规则

统一使用小写英文和短横线：

```text
dynasty-cave-title
```

示例：

```text
northern-wei-251-lotus-feitian-pingqi
western-wei-285-baocchi-lotus
sui-407-three-hares-feitian
early-tang-329-lotus-feitian
high-tang-217-baoxianghua
yuan-yulin-10-nine-buddhas
```

---

## 11.2 图片命名规则

```text
cover.jpg
main.jpg
projection.jpg
color.jpg
structure.jpg
detail-01.jpg
detail-02.jpg
```

示例：

```text
/assets/works/sui-407-three-hares-feitian/main.jpg
/assets/works/sui-407-three-hares-feitian/color.jpg
/assets/works/sui-407-three-hares-feitian/structure.jpg
```

---

## 12. 工具函数要求

Codex 需要实现以下工具函数。

---

## 12.1 根据 ID 获取作品

```ts
export function getWorkById(workId: string): Work | undefined {
  return works.find((work) => work.id === workId);
}
```

---

## 12.2 根据朝代获取作品

```ts
export function getWorksByDynasty(dynastyId: string): Work[] {
  return works.filter((work) => work.dynastyId === dynastyId);
}
```

---

## 12.3 根据 ID 获取朝代

```ts
export function getDynastyById(dynastyId: string): Dynasty | undefined {
  return dynasties.find((dynasty) => dynasty.id === dynastyId);
}
```

---

## 12.4 获取第一版重点作品

```ts
export function getFeaturedWorks(): Work[] {
  return works.filter((work) => work.isFeatured);
}
```

---

## 12.5 获取首页主视觉作品

```ts
export function getHeroWorks(): Work[] {
  return works.filter((work) => work.isHero || work.isFeatured);
}
```

---

## 13. 页面调用数据方式

## 13.1 `/atlas` 总览页面

使用：

```ts
const featuredWorks = getFeaturedWorks();
const dynasties = getFeaturedDynasties();
```

用途：

1. 环形图鉴卡片。
2. 朝代入口卡片。
3. 首页视觉素材。

---

## 13.2 `/atlas/:dynastyId` 选中朝代图鉴

使用：

```ts
const dynasty = getDynastyById(dynastyId);
const works = getWorksByDynasty(dynastyId);
```

用途：

1. 展示当前朝代信息。
2. 展示该朝代作品卡片。
3. 鼠标滑动点选具体作品。

---

## 13.3 `/work/:workId` 作品详情页

使用：

```ts
const work = getWorkById(workId);
```

用途：

1. 概览模块读取 `work.title`、`work.description`、`work.features`。
2. 投射模块读取 `work.images.projection`。
3. 色彩模块读取 `work.palettes` 和 `work.colorHotspots`。
4. 结构模块读取 `work.patterns` 和 `work.patternHotspots`。
5. 视觉基因卡读取 `work.geneCard`。

---

## 14. 数据校验规则

Codex 开发时应加入基础校验，避免页面空白。

---

## 14.1 Work 必填字段

每个 Work 至少必须包含：

```ts
id
title
dynastyId
dynastyName
caveNumber
site
catalogNos
shortFeature
description
keywords
images.cover
images.main
sourceRefs
```

---

## 14.2 Palette 可为空

第一版中，除重点展示作品外，`palettes` 可以为空数组。

但页面必须做兜底：

```text
如果 work.palettes.length === 0
显示：该作品色卡正在整理中
```

---

## 14.3 Pattern 可为空

同理，`patterns` 可以为空数组。

页面兜底：

```text
如果 work.patterns.length === 0
显示：该作品纹样结构正在整理中
```

---

## 14.4 图片缺失兜底

如果图片路径暂时不存在，页面显示：

```text
图像素材整理中
```

不能因为图片缺失导致页面报错。

---

## 15. 第一版数据完成标准

第一版至少需要完成：

```text
6 个 Dynasty 数据
6 个 Work 数据
每个 Work 有基础信息
至少 1 个 Work 有完整 palettes
至少 1 个 Work 有完整 patterns
每个 Work 有 geneCard
```

建议优先完整打磨：

```text
北魏 · 莫高窟第251窟 · 莲花飞天平棋
或
初唐 · 莫高窟第329窟 · 莲花飞天藻井
```

原因：

1. 二者图像结构清晰。
2. 适合做结构解剖。
3. 色彩关系明显。
4. 能很好展示“观看—解构—取色—再造”的完整路径。

---

## 16. 后续可扩展字段

未来如果接入 AI 或真实取色，可以扩展以下字段。

---

## 16.1 AI 生成设计建议

```ts
aiDesignPrompts?: {
  scenario: string;
  prompt: string;
  result?: string;
}[];
```

---

## 16.2 真实取色数据

```ts
sampledColors?: {
  hex: string;
  sourceImage: string;
  sampleArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  method: "canvas" | "color-thief" | "vibrant-js";
}[];
```

---

## 16.3 用户保存数据

```ts
userGeneratedCards?: {
  id: string;
  workId: string;
  selectedPaletteGroupIds: string[];
  selectedPatternIds: string[];
  createdAt: string;
};
```

---

## 17. Codex 开发提醒

1. 先创建类型，再创建数据。
2. 不要先写复杂页面。
3. 不要把内容写死到组件里。
4. 所有页面都从 `works.ts` 和 `dynasties.ts` 读取。
5. 色卡和纹样热点先用预设数据。
6. 坐标可以先粗略，后续根据真实图片微调。
7. PDF 中的 100 图先作为扩展来源，不要第一版全部录入。
8. 重点保证 6 件代表作品的数据完整性。
9. 视觉基因卡必须从当前作品数据生成。
10. 所有来源字段都要保留，方便后续人工核验。

---

## 18. 数据结构总结

《藻井集》的数据层可以概括为：

```text
Dynasty：朝代入口
↓
CatalogEntry：完整图鉴轻量目录
↓
Work：重点藻井作品
↓
PatternAnnotation：纹样结构
↓
PaletteGroup：文化色卡
↓
GeneCard：设计转译结果
```

第一版的目标不是录入全部资料，而是先让 6 件代表性藻井形成完整闭环：

```text
作品信息
↓
图像展示
↓
结构分析
↓
色彩提取
↓
文化说明
↓
视觉基因卡
```

这样后续新增藻井时，只需要继续补充数据对象，不需要重新设计页面架构。
