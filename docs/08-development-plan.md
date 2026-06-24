# docs/08-development-plan.md

# 《藻井集》Codex 分轮开发计划

## 1. 文档目的

本文档用于指导 Codex 分阶段开发《藻井集》网站。

开发原则是：

```text
不要一次性让 Codex 开发整个网站。
必须按阶段推进，每一轮只完成一个清晰目标。
每一轮完成后都要检查、运行、修复，再进入下一轮。
```

本项目页面与交互较复杂，包括：

1. 首页沉浸式藻井显现。
2. 总览页面。
3. 按朝代划分的藻井图鉴。
4. 选中朝代藻井图鉴。
5. 滚动自然展示与鼠标滑动点选。
6. 单件藻井详情页。
7. 色彩提取。
8. 纹样结构解剖。
9. 视觉基因卡生成。

因此，开发必须采用分轮推进方式。

---

## 2. 技术栈建议

第一版建议使用：

```text
React
Vite
TypeScript
React Router
Framer Motion
CSS Modules 或普通 CSS
```

如果项目已经创建，则不要重复创建项目，只在现有项目中继续开发。

推荐安装依赖：

```bash
npm install react-router-dom framer-motion
```

如果使用 Tailwind CSS，可以后续再加。第一版不强依赖 Tailwind，避免配置成本过高。

---

## 3. 总体开发顺序

Codex 应按以下顺序开发：

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

每一轮都应：

```text
1. 先阅读 docs 中相关文档。
2. 只完成当前轮任务。
3. 不主动扩展未要求功能。
4. 保证项目可以运行。
5. 输出本轮改动总结。
```

---

# Round 01：项目初始化与基础路由

## 目标

搭建项目基础结构，完成页面路由，不开发复杂视觉和交互。

## Codex Prompt

```text
请阅读 docs/00-project-brief.md、docs/01-product-requirements.md、docs/02-information-architecture.md、docs/03-interaction-flow.md 和 docs/04-page-spec.md。

现在开始 Round 01：项目初始化与基础路由。

目标：
1. 如果当前项目还不是 React + Vite + TypeScript，请创建或调整为 React + Vite + TypeScript 项目结构。
2. 安装并配置 react-router-dom。
3. 创建基础页面路由：
   - /
   - /atlas
   - /atlas/:dynastyId
   - /work/:workId
4. 创建以下页面文件：
   - src/routes/IntroPage.tsx
   - src/routes/AtlasPage.tsx
   - src/routes/SelectedDynastyPage.tsx
   - src/routes/WorkPage.tsx
5. 创建基础组件目录：
   - src/components/layout
   - src/components/intro
   - src/components/atlas
   - src/components/work
   - src/components/color
   - src/components/structure
6. 页面暂时只需要显示页面名称和基础导航，确保路由可以正常跳转。

注意：
- 不要现在开发复杂动效。
- 不要现在写完整数据。
- 不要把页面内容写死太多。
- 确保 npm run dev 可以运行。

完成后请输出：
1. 修改了哪些文件。
2. 当前路由如何测试。
3. 是否有报错。
```

## 验收标准

```text
- npm run dev 可以运行。
- / 可以打开首页占位页面。
- /atlas 可以打开总览占位页面。
- /atlas/early-tang 可以打开选中朝代占位页面。
- /work/early-tang-329-lotus-feitian 可以打开作品详情占位页面。
- 页面之间有基础跳转方式。
```

---

# Round 02：全局视觉系统与 CSS 变量

## 目标

建立黑底、米白文字、藻井文化色、卡片、按钮、标签、面板等基础视觉系统。

## Codex Prompt

```text
请阅读 docs/06-visual-system.md。

现在开始 Round 02：全局视觉系统与 CSS 变量。

目标：
1. 创建 styles 目录：
   - src/styles/variables.css
   - src/styles/typography.css
   - src/styles/layout.css
   - src/styles/components.css
   - src/styles/motion.css
2. 在 main.tsx 或 App.tsx 中引入这些全局样式。
3. 根据 docs/06-visual-system.md 建立 CSS 变量：
   - 黑色背景
   - 米白文字
   - 朱砂红
   - 土红
   - 石青蓝
   - 石绿
   - 暗金
   - 分割线颜色
4. 设置 body 全局样式：
   - 黑色或近黑色背景
   - 米白文字
   - 平滑字体
   - 无默认 margin
5. 创建通用类：
   - page-shell
   - button-primary
   - button-secondary
   - back-button
   - card
   - panel
   - tag
   - pill-nav
   - image-frame
6. 当前页面占位内容也要应用这些基础样式，让页面整体进入《藻井集》的视觉气质。

注意：
- 不要使用大面积纯白背景。
- 不要使用霓虹、强金属、过度国潮风格。
- 不要现在开发复杂页面。
- 保证现有路由仍可运行。

完成后请输出：
1. 新增了哪些 CSS 文件。
2. 全局视觉变量在哪里。
3. 哪些页面已经应用基础样式。
```

## 验收标准

```text
- 全站背景为黑色或近黑色。
- 文字为米白或低透明米白。
- 按钮、卡片、标签、面板有统一样式。
- 页面不再是默认 Vite 风格。
- 页面视觉方向符合暗场、克制、文化图鉴感。
```

---

# Round 03：数据类型与数据层

## 目标

建立藻井数据类型、朝代数据、作品数据和工具函数。

## Codex Prompt

```text
请阅读 docs/05-data-schema.md。

现在开始 Round 03：数据类型与数据层。

目标：
1. 创建类型文件：
   - src/types/zhaojing.ts
2. 根据 docs/05-data-schema.md 定义以下类型：
   - SourceRef
   - Dynasty
   - Work
   - WorkImages
   - PaletteGroup
   - PaletteColor
   - PatternAnnotation
   - ColorHotspot
   - PatternHotspot
   - GeneCard
   - CatalogEntry
3. 创建数据文件：
   - src/data/dynasties.ts
   - src/data/works.ts
4. 录入第一版 6 个朝代数据：
   - northern-wei
   - western-wei
   - sui
   - early-tang
   - high-tang
   - yuan
5. 录入第一版 6 件重点藻井作品的基础数据：
   - northern-wei-251-lotus-feitian-pingqi
   - western-wei-285-baocchi-lotus
   - sui-407-three-hares-feitian
   - early-tang-329-lotus-feitian
   - high-tang-217-baoxianghua
   - yuan-yulin-10-nine-buddhas
6. 至少为 northern-wei-251-lotus-feitian-pingqi 补充完整 palettes、patterns、colorHotspots、patternHotspots 和 geneCard。
7. 创建工具函数：
   - src/utils/getDynastyById.ts
   - src/utils/getWorkById.ts
   - src/utils/getWorksByDynasty.ts
   - src/utils/getFeaturedWorks.ts

注意：
- 所有页面后续必须从 data 文件读取内容。
- 不要把藻井内容写死在组件里。
- 图片路径可以先使用占位路径，但字段必须完整。
- 如果某些 palettes 或 patterns 暂时没有内容，请使用空数组，不要省略字段。
- 保证 TypeScript 不报错。

完成后请输出：
1. 新增的数据类型。
2. 新增的数据文件。
3. 6 件重点作品的 id。
4. 工具函数如何使用。
```

## 验收标准

```text
- TypeScript 类型无明显报错。
- dynasties.ts 有 6 个朝代。
- works.ts 有 6 件作品。
- 至少 1 件作品拥有完整色卡、纹样和视觉基因卡数据。
- 工具函数可以被页面调用。
```

---

# Round 04：首页沉浸式入口

## 目标

开发首页“抬头看见藻井”的沉浸式入口。

## Codex Prompt

```text
请阅读 docs/03-interaction-flow.md、docs/04-page-spec.md 和 docs/06-visual-system.md 中关于首页入口的部分。

现在开始 Round 04：首页沉浸式入口。

目标：
1. 开发 src/routes/IntroPage.tsx。
2. 创建组件：
   - src/components/intro/CeilingReveal.tsx
   - src/components/intro/GestureHint.tsx
3. 首页内容包括：
   - 黑色低照度背景
   - 藻井主图
   - 提示文字：向上滑动，抬头看见藻井
   - 标题：藻井集
   - 副标题：面向设计转译的敦煌藻井视觉图鉴
   - 按钮：进入图鉴
4. 使用鼠标滚动或鼠标移动控制藻井显现进度。
5. 第一版不接入摄像头识别。
6. 动效要求：
   - 藻井图像由暗到亮
   - 藻井图像缓慢上移或放大
   - 标题和按钮在 revealProgress 达到一定程度后淡入
7. 点击“进入图鉴”跳转到 /atlas。

注意：
- 不要做强发光。
- 不要使用复杂 WebGL。
- 不要加入摄像头功能。
- 确保没有图片时也有兜底占位。
- 保持页面安静、克制、有仪式感。

完成后请输出：
1. 首页交互如何触发。
2. 使用了哪些组件。
3. 如何进入 /atlas。
```

## 验收标准

```text
- / 首页有黑色暗场氛围。
- 用户滚动或移动鼠标后藻井图像显现。
- 标题《藻井集》自然淡入。
- 点击“进入图鉴”进入 /atlas。
- 首页不依赖摄像头也能运行。
```

---

# Round 05：藻井总览页与朝代图鉴切换

## 目标

开发 `/atlas` 页面中的两个状态：

```text
overview：总览页面
dynasty-index：按朝代划分的藻井图鉴
```

总览到朝代图鉴采用点击切换。

## Codex Prompt

```text
请阅读 docs/03-interaction-flow.md、docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于 /atlas 的部分。

现在开始 Round 05：藻井总览页与朝代图鉴切换。

目标：
1. 开发 src/routes/AtlasPage.tsx。
2. 在 AtlasPage 内部建立状态：
   - atlasView = "overview" | "dynasty-index"
3. overview 状态显示：
   - 标题：藻井集
   - 副标题：面向设计转译的敦煌藻井视觉图鉴
   - 简短说明
   - 环形图鉴主视觉
   - 按钮：进入藻井图鉴
4. 点击“进入藻井图鉴”后，不跳新路由，先切换 atlasView 为 "dynasty-index"。
5. dynasty-index 状态显示：
   - 标题：藻井图鉴
   - 说明：选择一个朝代，观察藻井结构、纹样与色彩秩序的变化。
   - 朝代卡片列表
6. 朝代卡片从 dynasties.ts 读取。
7. 每个朝代卡片显示：
   - 朝代名称
   - 英文名
   - 简介
   - 关键词
   - 主题色
   - 封面图占位
8. 点击某个朝代后跳转到 /atlas/:dynastyId。
9. 创建组件：
   - src/components/atlas/OverviewOrbit.tsx
   - src/components/atlas/DynastyCard.tsx
   - src/components/atlas/DynastyIndexView.tsx

注意：
- 总览到朝代图鉴必须是点击切换。
- 朝代图鉴到选中朝代图鉴也是点击切换。
- 不要做成普通文字列表。
- 允许第一版环形图鉴使用简化实现。
- 图片不存在时显示渐变占位或“图像整理中”。

完成后请输出：
1. AtlasPage 有哪些状态。
2. 总览如何切换到朝代图鉴。
3. 点击朝代如何跳转。
```

## 验收标准

```text
- /atlas 默认显示总览页面。
- 点击“进入藻井图鉴”后显示朝代图鉴。
- 朝代卡片来自 dynasties.ts。
- 点击初唐进入 /atlas/early-tang。
- 视觉上不是普通列表，而是图鉴入口。
```

---

# Round 06：选中朝代藻井图鉴

## 目标

开发 `/atlas/:dynastyId` 页面，展示某一朝代下所有代表性藻井。

## Codex Prompt

```text
请阅读 docs/03-interaction-flow.md、docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于“选中朝代藻井图鉴”的部分。

现在开始 Round 06：选中朝代藻井图鉴。

目标：
1. 开发 src/routes/SelectedDynastyPage.tsx。
2. 从 URL params 读取 dynastyId。
3. 使用 getDynastyById(dynastyId) 获取当前朝代。
4. 使用 getWorksByDynasty(dynastyId) 获取当前朝代的作品列表。
5. 页面内容包括：
   - 返回按钮：返回 /atlas
   - 当前朝代名称
   - 当前朝代英文名
   - 当前朝代简介
   - 当前朝代视觉关键词
   - 代表性藻井卡片组
   - 滚动提示：滚动浏览该朝代的代表性藻井
6. 创建组件：
   - src/components/atlas/SelectedDynastyHeader.tsx
   - src/components/atlas/WorkPreviewCard.tsx
   - src/components/atlas/ScrollDrivenWorkGallery.tsx
7. WorkPreviewCard 显示：
   - 作品名称
   - 朝代
   - 洞窟编号
   - 一句话特征
   - 关键词
   - 封面图
8. 当前轮只需要实现基础卡片展示和直接点击进入作品详情。
9. 点击作品卡片跳转到 /work/:workId。

注意：
- 这一轮先不要实现复杂滚动到末端后的鼠标滑动点选。
- 先保证当前朝代数据读取和作品卡片渲染正确。
- 如果该朝代没有作品，显示“该朝代作品正在整理中”。
- 图片缺失时显示占位。

完成后请输出：
1. dynastyId 如何读取。
2. works 如何筛选。
3. 点击作品如何进入详情页。
```

## 验收标准

```text
- /atlas/early-tang 可以显示初唐信息。
- 页面能显示初唐对应作品。
- 点击作品能进入 /work/early-tang-329-lotus-feitian。
- 返回按钮可用。
- 空数据有兜底显示。
```

---

# Round 07：滚动展示与鼠标滑动点选

## 目标

增强 `/atlas/:dynastyId` 页面，实现：

```text
滚动自然展示
↓
滚动到极限
↓
鼠标滑动点选
↓
点击进入具体作品
```

## Codex Prompt

```text
请阅读 docs/03-interaction-flow.md 和 docs/04-page-spec.md 中关于“滚动自然展示”和“鼠标滑动点选”的部分。

现在开始 Round 07：滚动展示与鼠标滑动点选。

目标：
1. 在 ScrollDrivenWorkGallery 组件中实现 galleryMode：
   - intro
   - scrolling
   - scrollEnd
   - selecting
2. 使用 scrollProgress 表示滚动进度，范围 0 到 1。
3. 滚动过程中：
   - 卡片从聚拢逐渐展开
   - 卡片之间拉开距离
   - 当前视野中心卡片更清晰
4. 当 scrollProgress 接近 1 时，进入 selecting 模式。
5. selecting 模式下：
   - 监听鼠标水平位置 pointerX
   - 根据 pointerX 映射 activeWorkIndex
   - 当前 active 卡片放大、高亮、前移
   - 其他卡片降低亮度
6. 点击当前 active 卡片后跳转到 /work/:workId。
7. 保留兜底方式：
   - 每张卡片仍可以直接点击
   - 左右按钮可以切换 activeWorkIndex
   - 键盘左右键可以切换 activeWorkIndex
8. 页面底部提示文案根据状态变化：
   - scrolling：滚动浏览该朝代的代表性藻井
   - selecting：移动鼠标，选择一件藻井作品

注意：
- 不要为了动效破坏可用性。
- 如果复杂滚动不好实现，优先保证兜底点击可用。
- 移动端可以直接横向滑动点击，不需要鼠标点选。
- 保证页面无明显卡顿。

完成后请输出：
1. galleryMode 如何变化。
2. activeWorkIndex 如何计算。
3. 有哪些兜底交互。
```

## 验收标准

```text
- 用户滚动时卡片有展开过程。
- 滚动到末端后出现“移动鼠标，选择一件藻井作品”。
- 鼠标水平移动可以改变高亮卡片。
- 点击高亮卡片进入详情页。
- 直接点击卡片也能进入详情页。
- 左右按钮或键盘切换可用。
```

---

# Round 08：具体藻井详情页基础结构

## 目标

开发 `/work/:workId` 的详情页基础结构和 Tab 切换。

## Codex Prompt

```text
请阅读 docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于“具体藻井介绍页”的部分。

现在开始 Round 08：具体藻井详情页基础结构。

目标：
1. 开发 src/routes/WorkPage.tsx。
2. 从 URL params 读取 workId。
3. 使用 getWorkById(workId) 获取当前作品。
4. 页面顶部或右上角创建 Tab 导航：
   - 概览
   - 投射
   - 色彩
   - 结构
   - 生成
5. 建立 activeTab 状态：
   - overview
   - projection
   - color
   - structure
   - gene
6. 默认 activeTab 为 overview。
7. 创建组件：
   - src/components/work/WorkTopNav.tsx
   - src/components/work/WorkOverviewSection.tsx
   - src/components/work/ProjectionSection.tsx
   - src/components/work/ColorSection.tsx
   - src/components/work/StructureSection.tsx
   - src/components/work/GeneCardSection.tsx
8. 本轮重点完成：
   - WorkPage 路由读取
   - WorkTopNav 切换
   - WorkOverviewSection 基础内容
   - ProjectionSection 占位内容
   - ColorSection 占位内容
   - StructureSection 占位内容
   - GeneCardSection 占位内容
9. WorkOverviewSection 显示：
   - 作品标题
   - 朝代
   - 洞窟编号
   - 目录编号
   - 作品简介
   - 关键词
   - 主图或图片占位
10. 如果 workId 不存在，显示“作品正在整理中”或 404 友好页面。

注意：
- 详情页后续交互以点击为主。
- 不要在这一轮开发完整色彩和结构模块。
- 页面内容必须来自 work 数据。
- 不要把作品文案写死在组件里。

完成后请输出：
1. activeTab 有哪些状态。
2. WorkOverviewSection 读取了哪些数据。
3. workId 不存在时如何处理。
```

## 验收标准

```text
- /work/:workId 可以打开详情页。
- 默认显示概览。
- Tab 点击可以切换到投射、色彩、结构、生成。
- 概览内容来自 works.ts。
- 作品不存在时不报错。
```

---

# Round 09：色彩提取模块

## 目标

开发详情页中的色彩提取模块。

## Codex Prompt

```text
请阅读 docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于“色彩提取模块”的部分。

现在开始 Round 09：色彩提取模块。

目标：
1. 完善 src/components/work/ColorSection.tsx。
2. 创建组件：
   - src/components/color/ColorImageWithHotspots.tsx
   - src/components/color/ColorHotspot.tsx
   - src/components/color/PalettePanel.tsx
   - src/components/color/ColorSwatch.tsx
3. ColorSection 从当前 work 读取：
   - work.images.colorAnalysis 或 work.images.main
   - work.colorHotspots
   - work.palettes
4. 默认选中第一个 paletteGroup。
5. 用户点击 ColorHotspot 后：
   - 设置 selectedPaletteGroupId
   - 高亮当前热点
   - PalettePanel 更新为对应色卡组
6. PalettePanel 显示：
   - 色组名称
   - 对应区域
   - 色组说明
   - 色块
   - 色名
   - HEX 色值
   - 色彩角色
   - 文化语义
   - 设计应用建议
7. 如果 work.palettes 为空，显示：
   - 该作品色卡正在整理中
8. 第一版不做真实图片取色。

注意：
- 色彩模块要像设计工具，不像普通说明文本。
- 色值要清楚。
- 热点位置使用百分比 x/y。
- 图片不存在时使用占位。
- 不要接入 AI API。

完成后请输出：
1. 色卡如何切换。
2. 热点如何定位。
3. 空色卡如何兜底。
```

## 验收标准

```text
- 点击“色彩” Tab 可以看到色彩模块。
- 如果作品有 palettes，可以显示色卡。
- 点击热点可以切换色卡组。
- HEX 色值清楚显示。
- palettes 为空时页面不报错。
```

---

# Round 10：纹样结构解剖模块

## 目标

开发详情页中的纹样结构解剖模块。

## Codex Prompt

```text
请阅读 docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于“纹样结构模块”的部分。

现在开始 Round 10：纹样结构解剖模块。

目标：
1. 完善 src/components/work/StructureSection.tsx。
2. 创建组件：
   - src/components/structure/AnatomyImage.tsx
   - src/components/structure/PatternMarker.tsx
   - src/components/structure/PatternInfoPanel.tsx
3. StructureSection 从当前 work 读取：
   - work.images.structureAnalysis 或 work.images.main
   - work.patterns
   - work.patternHotspots
   - work.structureKeywords
4. 默认选中第一个 pattern。
5. 用户点击 PatternMarker 后：
   - 设置 selectedPatternId
   - 高亮当前标注点
   - PatternInfoPanel 更新为对应纹样说明
6. PatternInfoPanel 显示：
   - 纹样名称
   - 所在区域
   - 视觉特征
   - 文化寓意
   - 设计转译建议
   - 关键词
7. 如果 work.patterns 为空，显示：
   - 该作品纹样结构正在整理中

注意：
- 标注点不要太大，不要遮挡图像主体。
- 不要使用荧光色。
- 第一版标注数量控制在 4 到 8 个以内。
- 图片不存在时使用占位。
- 页面要像“解剖图”，但不要变成拥挤教材图。

完成后请输出：
1. 纹样标注如何切换。
2. PatternInfoPanel 显示哪些字段。
3. 空 patterns 如何兜底。
```

## 验收标准

```text
- 点击“结构” Tab 可以看到结构模块。
- 如果作品有 patterns，可以显示标注点。
- 点击标注点可以更新说明面板。
- 结构关键词清楚展示。
- patterns 为空时页面不报错。
```

---

# Round 11：视觉基因卡模块

## 目标

开发详情页中的视觉基因卡生成模块。

## Codex Prompt

```text
请阅读 docs/04-page-spec.md、docs/05-data-schema.md 和 docs/06-visual-system.md 中关于“视觉基因卡”的部分。

现在开始 Round 11：视觉基因卡模块。

目标：
1. 完善 src/components/work/GeneCardSection.tsx。
2. 创建组件：
   - src/components/work/VisualGeneCard.tsx
3. GeneCardSection 从当前 work 读取：
   - work.title
   - work.dynastyName
   - work.caveNumber
   - work.catalogNos
   - work.images.cover 或 work.images.main
   - work.geneCard
   - work.palettes
   - work.patterns
4. 页面初始显示按钮：
   - 生成藻井视觉基因卡
5. 点击按钮后：
   - 设置 isGeneCardGenerated = true
   - VisualGeneCard 淡入显示
6. VisualGeneCard 显示：
   - 藻井视觉基因卡
   - 作品名称
   - 朝代
   - 洞窟编号
   - 目录编号
   - 主图缩略图
   - 主色卡
   - 纹样关键词
   - 结构关键词
   - 文化关键词
   - 设计应用场景
   - 设计转译说明
7. 如果 palettes 为空，则只显示 geneCard 中已有关键词与说明。
8. 第一版不做导出 PNG，不做登录，不做保存。

注意：
- 视觉基因卡要像最终成果，不像普通总结。
- 卡片视觉要有档案感、设计工具感、文化质感。
- 所有内容必须从当前 work 数据读取。
- 不要接入 AI API。

完成后请输出：
1. 视觉基因卡从哪些字段生成。
2. 点击按钮后状态如何变化。
3. palettes 为空时如何显示。
```

## 验收标准

```text
- 点击“生成” Tab 可以看到生成模块。
- 点击按钮后出现视觉基因卡。
- 卡片内容与当前作品一致。
- 卡片包含色彩、纹样、结构、文化、设计应用。
- 不依赖 AI API 也能运行。
```

---

# Round 12：全局返回、兜底与响应式

## 目标

完善全站返回路径、空数据兜底、图片兜底和基础响应式。

## Codex Prompt

```text
请阅读 docs/04-page-spec.md 和 docs/06-visual-system.md 中关于“返回按钮、响应式、兜底”的部分。

现在开始 Round 12：全局返回、兜底与响应式。

目标：
1. 创建或完善全局 BackButton 组件：
   - src/components/layout/BackButton.tsx
2. 完善页面返回路径：
   - /atlas/:dynastyId 返回 /atlas
   - /work/:workId 返回对应 /atlas/:dynastyId
   - /atlas 的 dynasty-index 状态可以返回 overview 状态
3. 完善图片兜底组件：
   - src/components/layout/ImageFallback.tsx
   或在 ImageCard 中处理图片加载失败。
4. 完善空数据兜底：
   - 无朝代
   - 无作品
   - 无色卡
   - 无纹样
   - 无 geneCard
5. 加入基础响应式：
   - 桌面端保持左右布局
   - 平板端减少卡片尺寸
   - 移动端改为上下布局
   - Tab 横向滚动
   - 朝代卡片可横向滑动
6. 加入 prefers-reduced-motion 支持。
7. 检查全站文字是否溢出。
8. 检查所有按钮 hover 和 focus 状态。

注意：
- 移动端第一版只需可浏览，不必完整还原鼠标点选。
- 不要重写已经完成的核心页面。
- 不要新增复杂功能。
- 重点保证稳定和可展示。

完成后请输出：
1. 哪些地方加了兜底。
2. 返回路径如何设计。
3. 响应式做了哪些调整。
```

## 验收标准

```text
- 所有页面都有返回方式。
- 图片缺失不导致页面崩溃。
- 空数据有友好提示。
- 移动端可以基础浏览。
- Tab 不会挤出屏幕。
- 动效可被系统减少动态效果设置关闭。
```

---

# Round 13：测试、修复与最终整理

## 目标

进行全站测试、修复报错、整理代码，确保网站可以用于课程展示。

## Codex Prompt

```text
现在开始 Round 13：测试、修复与最终整理。

请完整检查当前项目。

目标：
1. 运行 TypeScript 检查。
2. 运行 npm run dev，检查页面是否可以打开。
3. 检查以下路径：
   - /
   - /atlas
   - /atlas/early-tang
   - /work/early-tang-329-lotus-feitian
   - /work/northern-wei-251-lotus-feitian-pingqi
4. 检查完整用户路径：
   - 首页
   - 进入总览
   - 进入朝代图鉴
   - 选择朝代
   - 浏览该朝代藻井
   - 选择具体藻井
   - 查看概览
   - 查看投射
   - 查看色彩
   - 查看结构
   - 生成视觉基因卡
5. 修复所有明显报错。
6. 删除未使用 import。
7. 删除无用 console.log。
8. 检查 TypeScript 类型错误。
9. 检查数据空值。
10. 整理 README 中的运行方式。

注意：
- 不要新增大功能。
- 不要改变核心交互逻辑。
- 只做测试、修复、整理。
- 如果发现某个功能未完成，请列出待办，不要临时乱写大段代码。

完成后请输出：
1. 测试了哪些路径。
2. 修复了哪些问题。
3. 当前仍有哪些 TODO。
4. 如何运行项目。
```

## 验收标准

```text
- npm install 后可以运行。
- npm run dev 可以打开。
- 主路径无明显报错。
- 首页到视觉基因卡的完整路径可走通。
- 代码结构清晰。
- 数据与组件分离。
- 可以用于课程汇报演示。
```

---

## 4. 推荐开发节奏

建议实际开发时不要一天内把所有轮次都塞给 Codex。

推荐节奏：

```text
第一阶段：
Round 01 - Round 03
目标：项目骨架 + 视觉系统 + 数据层

第二阶段：
Round 04 - Round 07
目标：首页 + 图鉴主流程

第三阶段：
Round 08 - Round 11
目标：详情页 + 色彩 + 结构 + 视觉基因卡

第四阶段：
Round 12 - Round 13
目标：兜底 + 响应式 + 测试整理
```

每一阶段完成后，都应手动运行项目并截图检查。

---

## 5. 每轮开发后的人工检查清单

每一轮结束后，人工检查以下问题：

```text
1. npm run dev 是否还能运行？
2. 页面是否白屏？
3. 控制台是否有明显报错？
4. 当前轮目标是否完成？
5. Codex 是否偷偷开发了不属于本轮的功能？
6. 页面内容是否写死在组件里？
7. 数据是否仍然来自 data 文件？
8. 视觉是否仍然符合黑底、克制、文化图鉴感？
9. 是否出现过度国潮、霓虹、金属 3D 风？
10. 是否需要在进入下一轮前先修复？
```

---

## 6. Codex 通用约束 Prompt

如果某一轮开始前需要提醒 Codex，可以先粘贴以下通用约束：

```text
请严格遵守以下约束：

1. 不要一次性开发整个网站。
2. 只完成当前轮次要求的任务。
3. 不要主动新增未要求功能。
4. 不要接入摄像头、AI API、真实取色或登录系统，除非当前轮明确要求。
5. 所有藻井内容必须从 src/data 中读取，不要写死在组件中。
6. 页面视觉必须遵守 docs/06-visual-system.md。
7. 交互逻辑必须遵守 docs/03-interaction-flow.md。
8. 页面结构必须遵守 docs/04-page-spec.md。
9. 数据结构必须遵守 docs/05-data-schema.md。
10. 每轮完成后请说明改动文件、测试方式和仍存在的问题。
```

---

## 7. 开发完成后的最终目标

完成以上轮次后，网站应能实现以下完整路径：

```text
用户进入首页
↓
通过滚动或鼠标移动看到藻井显现
↓
点击进入藻井总览
↓
点击进入按朝代划分的藻井图鉴
↓
点击选择一个朝代
↓
滚动浏览该朝代代表性藻井
↓
鼠标滑动或点击选择具体藻井
↓
进入具体藻井详情页
↓
点击查看概览、投射、色彩、结构
↓
点击生成视觉基因卡
↓
获得可用于设计创作的藻井视觉转译结果
```

第一版完成的判断标准不是“功能越多越好”，而是：

```text
路径完整
视觉统一
交互清楚
数据可扩展
内容可追溯
答辩讲得通
```

---

# Round 00.5：参考资料落盘与开发目录搭建

## 目标
在正式开发前，记录外部参考、本地录屏、本地样式素材路径，并创建网页开发所需目录结构。

## 已确认参考
- 外部参考网站：`https://inkwell.tech/`
- 参考范围：进入具体藻井介绍页 `/work/:workId` 之前的所有页面流程。
- 本地录屏路径：`F:\EV录屏\非遗网站`
- 网页样式素材路径：`E:\Cursor_Projects\zaojingji\asset`

## 开发目录要求
项目需要具备：
```text
src/
  routes/
  components/
  data/
  types/
  utils/
  styles/
  hooks/
  lib/
public/
  assets/
```

## 开发注意
Round 04 到 Round 07 需要优先参考 `docs/10-reference-materials.md`，确保首页、总览、朝代图鉴和选中朝代图鉴具有滚动叙事与阶段推进效果。

---

## Round 04 - Round 07 权威修正

后续开发必须优先遵守 `docs/11-authoritative-flow-correction.md`。如果本文件前文与该文档冲突，以 `docs/11-authoritative-flow-correction.md` 为准。

### Round 04 修正：首页沉浸式入口

对应视觉稿：`04加载页4(3).svg`

目标修正：

1. 首页布局贴近 `04加载页4(3).svg`。
2. 主标题使用 `asset/title/title.svg`。
3. 用户滚动推进藻井显现。
4. 当显现完成并继续向下滚动时，进入 `/atlas`。
5. “进入图鉴”按钮保留为兜底，但不作为主路径。

### Round 05 修正：总览页与朝代图鉴切换

对应视觉稿：

```text
overview -> 05总览页面(1).svg
dynasty-index -> 06藻井图鉴（朝代）(1).svg
```

目标修正：

1. `/atlas` 默认显示 `overview`。
2. `overview` 展示多张藻井作品卡片或图像占位，不展示朝代卡片。
3. 点击 `overview` 中的藻井卡片后，切换到 `dynasty-index`。
4. `dynasty-index` 才从 `dynasties.ts` 读取并展示朝代卡片。
5. 点击朝代后进入 `/atlas/:dynastyId`。

### Round 06 修正：选中朝代藻井图鉴

对应视觉稿：`07选中朝代藻井图鉴(1).svg`

目标修正：

1. `/atlas/:dynastyId` 读取当前朝代。
2. 展示当前朝代下的藻井作品。
3. 本轮只实现基础展示与点击进入 `/work/:workId`。
4. 不在 Round 06 实现复杂滚动末端鼠标点选。

### Round 07 修正：滚动展示与鼠标滑动点选

目标修正：

1. 在 `/atlas/:dynastyId` 中增强作品卡片浏览。
2. 实现滚动自然展示。
3. 滚动到末端后进入鼠标滑动点选。
4. 保留直接点击卡片进入详情的兜底方式。
