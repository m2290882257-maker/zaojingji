# 藻井集 Zaojing Atlas

> 面向设计转译的敦煌藻井视觉图鉴网站
> A visual atlas of Dunhuang caisson ceilings for cultural interpretation and design translation.

---

## 1. 项目简介

**《藻井集》** 是一个以敦煌藻井为核心内容的非遗 / 文化主题交互网站。

项目围绕一条完整路径展开：

```text
抬头观看
↓
进入藻井空间
↓
按朝代浏览图鉴
↓
选择单件藻井
↓
理解纹样结构
↓
提取文化色彩
↓
生成视觉基因卡
```

它不是普通的文博资料展示页，而是希望把藻井从“被观看的传统装饰”转化为：

```text
可学习
可解构
可取色
可转译
可用于设计创作的视觉文化资源
```

项目最终目标是让用户通过网页完成：

```text
观看藻井
↓
理解藻井
↓
拆解藻井
↓
提取藻井
↓
再造藻井
```

---

## 2. 项目定位

### 项目名称

```text
藻井集
```

### 项目副标题

```text
面向设计转译的敦煌藻井视觉图鉴
```

### 英文表达

```text
Zaojing Atlas
A Dunhuang Caisson Ceiling Atlas for Design Translation
```

### 课程背景

```text
《面向设计创新的人工智能基础》
方向 2：文化主题网站设计
```

### 作品形式

```text
交互网站原型
```

---

## 3. 核心概念

本项目的核心不是“展示敦煌图片”，而是建立一个从文化图像到设计资源的转译流程。

核心概念为：

```text
仰望 — 解构 — 读纹 — 拾色 — 再造
```

对应网站功能：

| 概念 | 页面 / 功能          |
| -- | ---------------- |
| 仰望 | 首页沉浸式入口，模拟抬头看见藻井 |
| 解构 | 朝代图鉴与单件作品浏览      |
| 读纹 | 纹样结构解剖与热点说明      |
| 拾色 | 藻井局部色彩提取与文化色卡    |
| 再造 | 生成藻井视觉基因卡        |

---

## 4. 当前 MVP 范围

第一版目标是完成一个**可运行、可演示、路径完整、视觉统一**的网站原型。

### MVP 必须完成

```text
1. 首页沉浸式入口
2. 鼠标 / 滚动触发藻井显现
3. 藻井总览页面
4. 按朝代划分的藻井图鉴
5. 选中朝代藻井图鉴
6. 单件藻井详情页
7. 色彩提取模块
8. 纹样结构解剖模块
9. 视觉基因卡生成模块
10. 基础返回、兜底与响应式
```

### 第一版暂不做

```text
1. 摄像头手势识别
2. 真实实时图片取色
3. 用户登录
4. 用户保存色卡
5. AI API 实时生成设计建议
6. 全 100 件藻井完整详情页
7. WebGL / 复杂 3D 洞窟建模
8. 后台管理系统
```

这些功能可以作为后续增强项，不影响第一版展示。

---

## 5. 第一版重点藻井内容

第一版重点选择 6 件代表性藻井作品：

```text
01. 北魏 · 莫高窟第251窟 · 莲花飞天平棋
02. 西魏 · 莫高窟第285窟 · 宝池莲花藻井
03. 隋代 · 莫高窟第407窟 · 三兔飞天藻井
04. 初唐 · 莫高窟第329窟 · 莲花飞天藻井
05. 盛唐 · 莫高窟第217窟 · 宝相花藻井
06. 元代 · 安西榆林窟第10窟 · 九佛回纹藻井
```

这些作品用于支撑第一版完整路径：

```text
朝代图鉴
↓
作品浏览
↓
单件介绍
↓
色彩提取
↓
纹样结构
↓
视觉基因卡
```

---

## 6. 用户路径

### 标准完整路径

```text
用户进入首页
↓
通过滚动或鼠标移动看到藻井显现
↓
点击进入藻井总览
↓
点击进入按朝代划分的藻井图鉴
↓
点击选择某一朝代
↓
滚动浏览该朝代代表性藻井
↓
鼠标滑动或点击选择具体藻井
↓
进入具体藻井详情页
↓
点击查看概览 / 投射 / 色彩 / 结构 / 生成
↓
生成藻井视觉基因卡
```

### 页面切换逻辑

```text
总览页面 → 按朝代划分的藻井图鉴：点击切换

按朝代划分的藻井图鉴 → 选中朝代藻井图鉴：点击切换

选中朝代藻井图鉴 → 具体藻井介绍：滚动自然展示，滚动到极限后鼠标滑动点选，保留直接点击兜底

具体藻井介绍后续模块：以点击 Tab 为主
```

---

## 7. 页面路由

建议第一版使用以下路由：

```text
/
首页入口

/atlas
藻井总览页面
包含 overview 与 dynasty-index 两种状态

/atlas/:dynastyId
选中朝代藻井图鉴页面

/work/:workId
具体藻井作品详情页面
包含概览、投射、色彩、结构、生成五个内部状态
```

示例：

```text
/atlas/early-tang

/work/early-tang-329-lotus-feitian

/work/northern-wei-251-lotus-feitian-pingqi
```

---

## 8. 技术栈

第一版推荐技术栈：

```text
React
Vite
TypeScript
React Router
Framer Motion
CSS Modules / 普通 CSS
```

推荐安装依赖：

```bash
npm install
npm install react-router-dom framer-motion
```

运行项目：

```bash
npm run dev
```

打包项目：

```bash
npm run build
```

预览打包结果：

```bash
npm run preview
```

---

## 9. 推荐项目结构

```text
src/
├── App.tsx
├── main.tsx
├── routes/
│   ├── IntroPage.tsx
│   ├── AtlasPage.tsx
│   ├── SelectedDynastyPage.tsx
│   └── WorkPage.tsx
├── components/
│   ├── layout/
│   │   ├── BackButton.tsx
│   │   └── ImageFallback.tsx
│   ├── intro/
│   │   ├── CeilingReveal.tsx
│   │   └── GestureHint.tsx
│   ├── atlas/
│   │   ├── OverviewOrbit.tsx
│   │   ├── DynastyIndexView.tsx
│   │   ├── DynastyCard.tsx
│   │   ├── SelectedDynastyHeader.tsx
│   │   ├── ScrollDrivenWorkGallery.tsx
│   │   └── WorkPreviewCard.tsx
│   ├── work/
│   │   ├── WorkTopNav.tsx
│   │   ├── WorkOverviewSection.tsx
│   │   ├── ProjectionSection.tsx
│   │   ├── ColorSection.tsx
│   │   ├── StructureSection.tsx
│   │   ├── GeneCardSection.tsx
│   │   └── VisualGeneCard.tsx
│   ├── color/
│   │   ├── ColorImageWithHotspots.tsx
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
├── types/
│   └── zhaojing.ts
├── utils/
│   ├── getDynastyById.ts
│   ├── getWorkById.ts
│   ├── getWorksByDynasty.ts
│   └── getFeaturedWorks.ts
└── styles/
    ├── variables.css
    ├── typography.css
    ├── layout.css
    ├── components.css
    └── motion.css
```

---

## 10. 数据原则

所有藻井内容必须从 `src/data/` 中读取。

不要在页面组件中硬编码作品信息。

### 正确方式

```tsx
const work = getWorkById(workId);

<h1>{work.title}</h1>
<p>{work.description}</p>
```

### 错误方式

```tsx
<h1>莲花飞天藻井</h1>
<p>该藻井以中心莲花为视觉核心……</p>
```

---

## 11. 数据来源与校验

本项目内容来源包括：

```text
1. 参考+藻井.md
   用于第一版 6 件重点藻井内容整理。

2. 敦煌历代精品藻井100图.pdf
   用于完整图鉴目录、图像来源与后续扩展。
```

注意：

```text
所有涉及真实历史、洞窟编号、年代、纹样解释和文化含义的内容，都需要人工核验。

AI 可以辅助整理和压缩文本，但不能把未核验内容当作最终事实。
```

在数据结构中，每件作品都应保留：

```text
sourceRefs
catalogNos
verificationStatus
```

---

## 12. 视觉风格

全站视觉关键词：

```text
暗场
仰视
悬浮
图鉴
解构
取色
转译
克制
文化感
设计工具感
```

### 推荐视觉方向

```text
黑色 / 近黑色背景
米白文字
小面积暗金点缀
藻井原图作为主要色彩来源
卡片悬浮
轻微景深
克制动效
低照度文化图鉴感
```

### 禁止方向

```text
大面积纯白背景
过度国潮
霓虹风
金属 3D 字
强发光
赛博朋克 HUD
复杂粒子动效
廉价弹跳动画
```

视觉系统请优先参考：

```text
docs/06-visual-system.md
```

---

## 13. 交互原则

全站交互应服务于四个动作：

```text
看见
浏览
解构
再造
```

具体原则：

```text
1. 先身体，后知识。
   用户先通过“抬头看见藻井”进入体验，再阅读内容。

2. 先图鉴，后单件。
   用户先看到朝代和作品群，再进入具体分析。

3. 先浏览，后点选。
   选中朝代页面先滚动浏览，再选择具体藻井。

4. 先理解，后生成。
   用户先查看结构、色彩和纹样，再生成视觉基因卡。

5. 交互要克制。
   不做过度游戏化和炫技动效。
```

交互流程请优先参考：

```text
docs/03-interaction-flow.md
```

页面规格请优先参考：

```text
docs/04-page-spec.md
```

---

## 14. Docs 阅读顺序

开发前请按以下顺序阅读文档：

```text
docs/00-project-brief.md
docs/01-product-requirements.md
docs/02-information-architecture.md
docs/03-interaction-flow.md
docs/04-page-spec.md
docs/05-data-schema.md
docs/06-visual-system.md
docs/08-development-plan.md
docs/09-codex-prompts.md
```

### 每份文档的作用

| 文档                               | 作用               |
| -------------------------------- | ---------------- |
| `00-project-brief.md`            | 项目总说明            |
| `01-product-requirements.md`     | 产品需求与 MVP 范围     |
| `02-information-architecture.md` | 信息架构、页面结构与路由     |
| `03-interaction-flow.md`         | 页面切换与交互路径        |
| `04-page-spec.md`                | 每个页面的具体规格        |
| `05-data-schema.md`              | 数据类型、字段与种子数据     |
| `06-visual-system.md`            | 视觉风格、颜色、字体、动效    |
| `08-development-plan.md`         | 分轮开发计划           |
| `09-codex-prompts.md`            | 可复制给 Codex 的开发指令 |

---

## 15. Codex 开发规则

给 Codex 开发时，必须遵守：

```text
1. 不要一次性开发整个网站。
2. 每次只完成一个 Round。
3. 每轮完成后先运行项目并检查。
4. 不要主动新增未要求功能。
5. 不要接入摄像头、AI API、真实取色或登录系统。
6. 不要把内容写死在组件里。
7. 页面必须读取 src/data 中的数据。
8. 视觉必须遵守 docs/06-visual-system.md。
9. 交互必须遵守 docs/03-interaction-flow.md。
10. 页面必须有空数据和图片缺失兜底。
```

推荐使用：

```text
docs/09-codex-prompts.md
```

逐轮复制 Prompt 给 Codex。

---

## 16. 推荐开发顺序

```text
Round 01：项目初始化与基础路由
Round 02：全局视觉系统与 CSS 变量
Round 03：数据类型与数据层
Round 04：首页沉浸式入口
Round 05：藻井总览页与朝代图鉴切换
Round 06：选中朝代藻井图鉴
Round 07：滚动展示与鼠标滑动点选
Round 08：具体藻井详情页基础结构
Round 09：色彩提取模块
Round 10：纹样结构解剖模块
Round 11：视觉基因卡模块
Round 12：全局返回、兜底与响应式
Round 13：测试、修复与最终整理
```

如果时间紧，可以先完成：

```text
Round 01
Round 02
Round 03
Round 04
Round 05
Round 06
Round 08
Round 09
Round 10
Round 11
```

暂时弱化：

```text
Round 07：复杂滚动和鼠标滑动点选
Round 12：完整响应式
```

但必须保证：

```text
首页
总览
朝代图鉴
作品详情
色彩模块
结构模块
视觉基因卡
```

可以走通。

---

## 17. 运行方式

安装依赖：

```bash
npm install
```

开发运行：

```bash
npm run dev
```

构建：

```bash
npm run build
```

预览：

```bash
npm run preview
```

---

## 18. 测试路径

开发过程中至少检查以下路径：

```text
/
首页入口

/atlas
藻井总览页面

/atlas/early-tang
初唐藻井图鉴

/atlas/northern-wei
北魏藻井图鉴

/work/early-tang-329-lotus-feitian
初唐第329窟莲花飞天藻井详情页

/work/northern-wei-251-lotus-feitian-pingqi
北魏第251窟莲花飞天平棋详情页
```

---

## 19. 最终验收标准

项目完成后，应满足以下标准：

```text
1. 网站可以正常运行。
2. 首页到视觉基因卡的完整路径可以走通。
3. 页面视觉统一。
4. 数据与组件分离。
5. 所有主要页面有返回路径。
6. 图片缺失时不崩溃。
7. 空数据时有友好提示。
8. 色彩模块可以展示文化色卡。
9. 结构模块可以展示纹样标注。
10. 视觉基因卡可以根据当前作品数据生成。
11. 第一版不依赖摄像头、AI API、真实取色也能展示。
12. 项目能清楚讲出“观看—解构—取色—再造”的逻辑。
```

---

## 20. 当前待办

### 必做

```text
[ ] 搭建 React + Vite + TypeScript 项目
[ ] 配置 React Router
[ ] 建立 docs 对应的 src 目录结构
[ ] 建立视觉 CSS 变量
[ ] 建立 dynasties.ts 和 works.ts
[ ] 完成首页入口
[ ] 完成 /atlas 总览与朝代图鉴
[ ] 完成 /atlas/:dynastyId 页面
[ ] 完成 /work/:workId 页面
[ ] 完成色彩模块
[ ] 完成结构模块
[ ] 完成视觉基因卡模块
```

### 后续增强

```text
[ ] 摄像头手势识别
[ ] 真实图片取色
[ ] 视觉基因卡导出 PNG
[ ] 更多藻井作品录入
[ ] AI 生成设计建议
[ ] 用户保存色卡
[ ] 多藻井对比
```

---

## 21. 项目完成后的讲述逻辑

答辩或展示时，可以这样讲：

```text
《藻井集》不是一个普通的敦煌图片展示网站，
而是一个以设计转译为目标的藻井视觉图鉴。

我把藻井的体验路径拆成：
仰望、解构、读纹、拾色、再造。

用户先通过“抬头看见藻井”的入口进入网站，
再按朝代浏览不同阶段的藻井图像，
选择单件作品后，可以查看它的空间投射、纹样结构和色彩关系，
最后生成一张包含色卡、纹样、结构、文化寓意和设计应用建议的视觉基因卡。

所以这个项目的重点不是简单展示非遗内容，
而是把传统图像转化为当代设计可以继续使用的视觉资源。
```

---

## 22. 项目一句话总结

```text
《藻井集》让敦煌藻井不只是被观看，而是被理解、被拆解、被提取，并重新进入当代设计创作。
```
