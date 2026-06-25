# docs/09-codex-prompts.md

# 《藻井集》Codex 开发 Prompt 指令库

## 1. 使用说明

本文档用于在 Codex 中分轮开发《藻井集》网站。

使用方式：

```text
每次只复制一轮 Prompt 给 Codex。
等待 Codex 完成并检查运行结果。
确认没有明显报错后，再进入下一轮。
不要一次性复制全部 Prompt。
```

每轮开始前，都可以先复制“通用约束 Prompt”，再复制对应轮次 Prompt。

---

# 2. 通用约束 Prompt

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
10. 每轮完成后请说明：
   - 修改了哪些文件
   - 如何运行和测试
   - 是否有报错
   - 还有哪些 TODO
```

---

# 3. Round 01 Prompt：项目初始化与基础路由

```text
请阅读以下文档：

- docs/00-project-brief.md
- docs/01-product-requirements.md
- docs/02-information-architecture.md
- docs/03-interaction-flow.md
- docs/04-page-spec.md

现在开始 Round 01：项目初始化与基础路由。

目标：

1. 如果当前项目还不是 React + Vite + TypeScript，请创建或调整为 React + Vite + TypeScript 项目结构。
2. 安装并配置 react-router-dom。
3. 创建基础页面路由：
   - /
   - /atlas
   - /atlas/:dynastyId
   - /work/:workId
4. 创建页面文件：
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
6. 页面暂时只需要显示页面名称、简短占位内容和基础导航。
7. 确保以下路径能打开：
   - /
   - /atlas
   - /atlas/early-tang
   - /work/early-tang-329-lotus-feitian

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

---

# 4. Round 02 Prompt：全局视觉系统与 CSS 变量

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

---

# 5. Round 03 Prompt：数据类型与数据层

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
6. 至少为 northern-wei-251-lotus-feitian-pingqi 补充完整：
   - palettes
   - patterns
   - colorHotspots
   - patternHotspots
   - geneCard
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

---

# 6. Round 04 Prompt：首页沉浸式入口

```text
请阅读以下文档中关于首页入口的部分：

- docs/03-interaction-flow.md
- docs/04-page-spec.md
- docs/06-visual-system.md

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

---

# 7. Round 05 Prompt：藻井总览页与朝代图鉴切换

```text
请阅读以下文档中关于 /atlas 的部分：

- docs/03-interaction-flow.md
- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 8. Round 06 Prompt：选中朝代藻井图鉴

```text
请阅读以下文档中关于“选中朝代藻井图鉴”的部分：

- docs/03-interaction-flow.md
- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 9. Round 07 Prompt：滚动展示与鼠标滑动点选

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

---

# 10. Round 08 Prompt：具体藻井详情页基础结构

```text
请阅读以下文档中关于“具体藻井介绍页”的部分：

- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 11. Round 09 Prompt：色彩提取模块

```text
请阅读以下文档中关于“色彩提取模块”的部分：

- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 12. Round 10 Prompt：纹样结构解剖模块

```text
请阅读以下文档中关于“纹样结构模块”的部分：

- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 13. Round 11 Prompt：视觉基因卡模块

```text
请阅读以下文档中关于“视觉基因卡”的部分：

- docs/04-page-spec.md
- docs/05-data-schema.md
- docs/06-visual-system.md

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

---

# 14. Round 12 Prompt：全局返回、兜底与响应式

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

---

# 15. Round 13 Prompt：测试、修复与最终整理

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

---

# 16. 修复专用 Prompt

如果某一轮之后项目报错，可以使用这个 Prompt。

```text
当前项目出现报错。请只做修复，不要新增功能。

请完成：

1. 阅读终端报错和浏览器控制台报错。
2. 找出导致项目无法运行的最小问题。
3. 修复 TypeScript、import、路由、数据字段或组件引用错误。
4. 不要重构整个项目。
5. 不要改变已经完成的页面结构和交互逻辑。
6. 修复后确认 npm run dev 可以正常运行。

完成后请输出：

1. 报错原因。
2. 修改了哪些文件。
3. 如何验证已经修复。
```

---

# 17. 图片素材接入 Prompt

当你整理好图片素材后，可以使用这个 Prompt。

```text
现在需要接入藻井图片素材。

请根据现有 src/data/works.ts 中的 images 字段，整理 public/assets/works/ 下的图片路径。

要求：

1. 不要改变 Work 的 id。
2. 不要改变已有数据结构。
3. 为每件作品建立文件夹：
   - northern-wei-251-lotus-feitian-pingqi
   - western-wei-285-baocchi-lotus
   - sui-407-three-hares-feitian
   - early-tang-329-lotus-feitian
   - high-tang-217-baoxianghua
   - yuan-yulin-10-nine-buddhas
4. 每个文件夹中优先支持：
   - cover.jpg
   - main.jpg
   - color.jpg
   - structure.jpg
5. 更新 works.ts 中的图片路径，确保页面可以读取。
6. 如果某些图片暂时缺失，保留兜底，不要让页面报错。

完成后请输出：

1. 每件作品当前对应的图片路径。
2. 哪些图片仍然缺失。
3. 页面中如何验证图片已经显示。
```

---

# 18. 内容校对 Prompt

当你需要校对藻井文本内容时，可以使用这个 Prompt。

```text
现在需要校对《藻井集》的藻井文本内容。

请检查 src/data/works.ts 中 6 件重点作品的数据文本：

1. 不要改变数据结构。
2. 不要删除 sourceRefs。
3. 检查以下字段是否表达清晰：
   - shortFeature
   - description
   - selectionReason
   - historicalContext
   - features
   - analysis
   - culturalMeaning
   - designUsage
   - geneCard
4. 文案风格要求：
   - 简洁
   - 面向设计学习者
   - 不写成论文腔
   - 不堆砌形容词
   - 保留文化信息与设计转译逻辑
5. 如果发现需要人工核验的历史信息，请添加 TODO 注释，不要编造。
6. 保持 TypeScript 格式正确。

完成后请输出：

1. 修改了哪些作品。
2. 哪些字段需要人工核验。
3. 是否有可能存在事实风险。
```

---

# 19. 视觉微调 Prompt

如果页面已经能跑，但视觉不够好，可以使用这个 Prompt。

```text
现在进行视觉微调，不新增功能。

请阅读 docs/06-visual-system.md，并检查当前页面视觉是否符合《藻井集》的方向。

调整目标：

1. 全站保持黑底、米白文字、低照度文化图鉴感。
2. 首页更有“抬头看见藻井”的仪式感。
3. 总览页更像图鉴入口，不像普通列表。
4. 朝代卡片更有悬浮和档案感。
5. 详情页更清晰，文字不堆叠。
6. 色彩模块更像设计工具。
7. 结构模块更像纹样解剖图。
8. 视觉基因卡更像最终成果卡。

注意：

- 不要加入霓虹、强金属、赛博朋克、过度国潮风。
- 不要大面积使用金色。
- 不要破坏现有数据结构。
- 不要新增复杂 3D 或 WebGL。
- 只修改 CSS 和必要的组件 className。

完成后请输出：

1. 调整了哪些视觉问题。
2. 修改了哪些文件。
3. 是否影响原有交互。
```

---

# 20. 最终检查 Prompt

项目完成前，使用这个 Prompt 做最后一轮总检。

```text
请对《藻井集》项目做最终检查。

检查目标：

1. 项目能否正常运行。
2. 是否存在 TypeScript 报错。
3. 是否存在明显 console 报错。
4. 路由是否完整：
   - /
   - /atlas
   - /atlas/:dynastyId
   - /work/:workId
5. 用户路径是否完整：
   - 首页抬头看见藻井
   - 进入总览
   - 进入朝代图鉴
   - 选择朝代
   - 浏览选中朝代藻井
   - 进入具体藻井详情
   - 查看概览
   - 查看投射
   - 查看色彩
   - 查看结构
   - 生成视觉基因卡
6. 数据是否来自 src/data。
7. 视觉是否符合 docs/06-visual-system.md。
8. 是否有图片缺失兜底。
9. 是否有空数据兜底。
10. README 是否说明了如何运行。

请只做必要修复，不新增功能。

完成后请输出：

1. 最终检查结果。
2. 修复内容。
3. 仍未完成但不影响展示的 TODO。
4. 运行方式。
```

---

# 21. 实际使用建议

建议开发时按以下顺序复制：

```text
第一天：
通用约束 Prompt
Round 01
Round 02
Round 03

第二天：
通用约束 Prompt
Round 04
Round 05
Round 06

第三天：
通用约束 Prompt
Round 07
Round 08
Round 09

第四天：
通用约束 Prompt
Round 10
Round 11
Round 12
Round 13
```

如果某一轮报错，先用：

```text
修复专用 Prompt
```

不要直接进入下一轮。

---

# 22. 最小可展示版本

如果时间不够，至少完成：

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

可以暂时弱化：

```text
Round 07：复杂滚动和鼠标滑动点选
Round 12：完整响应式
```

但必须保留：

```text
首页
总览
朝代图鉴
作品详情
色彩模块
结构模块
视觉基因卡
```

这样即使动效没完全完成，项目仍然能讲通。

---

## 读取参考资料与素材

```txt
请先阅读 docs/10-reference-materials.md，并检查 E:\Cursor_Projects\zaojingji\asset 与 F:\EV录屏\非遗网站。具体藻井介绍页之前的所有流程需要参考 https://inkwell.tech/ 的滚动叙事、阶段推进和鼠标状态交互，但不要复制其品牌、文案、图像或业务内容。实现时仍以《藻井集》的黑底金色、敦煌藻井、文化取色和视觉转译为核心。
```

## 搭建开发目录

```txt
请在 E:\Cursor_Projects\zaojingji 中搭建 React + Vite + TypeScript 项目需要的目录结构。先只创建目录和占位文件，不写复杂页面逻辑。目录需要覆盖 src/routes、src/components、src/data、src/types、src/utils、src/styles、public/assets，并保留 asset 作为用户提供样式素材的来源目录。
```
