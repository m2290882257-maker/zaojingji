# docs/06-visual-system.md

# 《藻井集》视觉系统文档

## 1. 文档目的

本文档用于定义《藻井集》网站的整体视觉气质、色彩系统、字体层级、页面布局、组件样式、动效风格和前端实现规范。

Codex 开发时应优先遵守本文档，避免页面出现以下问题：

1. 变成普通文博资料展示页。
2. 变成过度国潮化、霓虹化、商业海报化的页面。
3. 变成过度炫技但无法阅读的 3D 网站。
4. 页面之间风格不统一。
5. 色卡、纹样、视觉基因卡缺少设计工具感。

本项目的视觉关键词是：

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

---

## 2. 项目视觉定位

《藻井集》不是传统博物馆网站，也不是单纯的敦煌图像展示网站。

它的视觉定位是：

```text
一个面向设计转译的敦煌藻井视觉图鉴网站。
```

它需要同时具备三种气质：

## 2.1 文化图鉴感

用户应感受到这些藻井来自真实的历史图像系统，而不是随意生成的装饰图案。

视觉表现：

1. 深色背景。
2. 图像居中展示。
3. 保留图鉴、目录、档案感。
4. 页面有清晰的朝代、洞窟、名称信息。
5. 不做过度娱乐化包装。

---

## 2.2 空间沉浸感

藻井本身是顶部空间图像，观看方式不是正面浏览，而是“抬头仰视”。

视觉表现：

1. 首页通过上滑或鼠标上移动作模拟“抬头看见藻井”。
2. 图像可以有轻微透视、上移、放大、悬浮。
3. 页面背景保持暗场，减少环境干扰。
4. 图鉴卡片可以以环形、层叠、景深方式出现。
5. 详情页中的“投射”模块需要呼应顶部空间观看。

---

## 2.3 设计工具感

本项目的目标不是只讲文化知识，而是把藻井转译为可用于设计创作的视觉资源。

视觉表现：

1. 色卡模块需要像设计工具。
2. 纹样结构模块需要像视觉解剖图。
3. 视觉基因卡需要像一张可复用的设计档案卡。
4. 页面中应出现清晰的色值、关键词、结构标签、应用建议。
5. 视觉基因卡应比普通文本卡片更完整、更像设计成果。

---

## 3. 总体视觉原则

## 3.1 以黑色作为主场景

全站主背景以黑色和近黑色为主。

原因：

1. 黑色能够强化藻井图像的发光感和悬浮感。
2. 黑色可以减少页面噪音，让纹样和色彩成为视觉中心。
3. 黑色更接近洞窟、暗场、仰视的观看氛围。
4. 黑色能承接你当前视觉稿中的整体方向。

禁止：

1. 大面积纯白背景。
2. 大面积米黄色纸纹背景。
3. 大面积红金国潮背景。
4. 过度复杂的敦煌纹样铺底。

---

## 3.2 以藻井原色作为强调色

页面的强调色不应凭空设定，而应从藻井图像中提取。

第一版主色系统来自 6 件重点藻井中的典型颜色：

```text
土红
朱砂红
赭石橙
石青蓝
石绿
暗金
米白
炭黑
```

页面颜色应看起来像从壁画中“长出来”，而不是套了一个通用国潮模板。

---

## 3.3 信息层级要清楚

虽然网站有沉浸感，但不能牺牲可读性。

页面必须保持：

1. 标题清楚。
2. 朝代与洞窟信息清楚。
3. 当前页面位置清楚。
4. 可点击区域清楚。
5. 色卡、纹样、结构说明清楚。

---

## 3.4 动效克制

动效用于表达“抬头、展开、悬浮、解构”，不是为了炫技。

适合的动效：

1. 缓慢淡入。
2. 轻微位移。
3. 轻微放大。
4. 轻微旋转。
5. 轻微视差。
6. 滚动驱动的展开。
7. 卡片景深变化。

不适合的动效：

1. 快速弹跳。
2. 强烈闪烁。
3. 霓虹爆闪。
4. 大量粒子喷射。
5. 过度故障风。
6. 过度赛博朋克风。
7. 过度 3D 翻转导致看不清图像。

---

## 4. 视觉关键词系统

全站视觉可以概括为五组关键词。

---

## 4.1 空间关键词

```text
仰视
顶部
悬浮
深空
环形
层叠
远近
景深
```

用于：

1. 首页加载页。
2. 藻井总览页。
3. 朝代图鉴页。
4. 选中朝代图鉴页。

---

## 4.2 图鉴关键词

```text
目录
档案
编号
朝代
洞窟
卡片
索引
标注
```

用于：

1. 朝代图鉴。
2. 作品卡片。
3. 作品详情页。
4. 视觉基因卡。

---

## 4.3 解构关键词

```text
结构层
纹样层
色彩层
文化层
设计层
热点
标注
切片
```

用于：

1. 纹样结构模块。
2. 色彩提取模块。
3. 视觉基因卡模块。

---

## 4.4 色彩关键词

```text
矿物色
壁画色
土红
石青
石绿
赭石
暗金
米白
```

用于：

1. 全站 CSS 变量。
2. 色卡模块。
3. 朝代主题色。
4. 视觉基因卡。

---

## 4.5 情绪关键词

```text
安静
神秘
厚重
清晰
克制
可探索
可学习
可再造
```

用于指导全站体验节奏。

---

## 5. 色彩系统

## 5.1 基础背景色

建议建立以下 CSS 变量：

```css
:root {
  --color-bg-black: #050505;
  --color-bg-deep: #090807;
  --color-bg-panel: #11100e;
  --color-bg-card: #161411;
  --color-bg-soft: #1e1b17;

  --color-text-primary: #f2ead8;
  --color-text-secondary: rgba(242, 234, 216, 0.72);
  --color-text-muted: rgba(242, 234, 216, 0.46);
  --color-text-disabled: rgba(242, 234, 216, 0.28);

  --color-line-subtle: rgba(242, 234, 216, 0.12);
  --color-line-strong: rgba(242, 234, 216, 0.28);
}
```

说明：

1. 背景不要使用绝对纯黑 `#000000` 作为唯一背景。
2. 可以在纯黑基础上加入极轻微暖色，避免页面过冷。
3. 文字不要使用纯白，应使用米白或灰米白。
4. 分割线透明度要低，避免把页面切得太碎。

---

## 5.2 藻井文化色

建议建立以下文化色变量：

```css
:root {
  --color-earth-red: #8f2d24;
  --color-cinnabar: #b72e2a;
  --color-vermilion: #d84a2b;
  --color-ochre-orange: #e57735;
  --color-warm-gold: #c9a24c;
  --color-muted-gold: #9f7b3a;

  --color-stone-blue: #2557a4;
  --color-deep-blue: #15376f;
  --color-stone-green: #2f7e5d;
  --color-jade-green: #5f9a7a;

  --color-rice-white: #f2ead8;
  --color-aged-white: #d8c7a3;
}
```

---

## 5.3 全站主色比例

建议比例：

```text
黑色 / 深灰：70%
米白文字：10%
藻井图像本身：15%
强调色：5%
```

不要把红、蓝、绿等藻井颜色大面积铺满页面。

这些颜色主要用于：

1. 按钮 hover。
2. 标签。
3. 色卡。
4. 当前状态高亮。
5. 卡片边框。
6. 小面积装饰线。

---

## 5.4 朝代主题色

每个朝代可以有自己的主题色，但不能破坏全站统一。

```css
:root {
  --dynasty-northern-wei-main: #8f2d24;
  --dynasty-northern-wei-accent: #1f6e9e;

  --dynasty-western-wei-main: #2f7e73;
  --dynasty-western-wei-accent: #8b2c2c;

  --dynasty-sui-main: #b7332a;
  --dynasty-sui-accent: #244c9a;

  --dynasty-early-tang-main: #b92e2a;
  --dynasty-early-tang-accent: #2557a4;

  --dynasty-high-tang-main: #7f241f;
  --dynasty-high-tang-accent: #c9a24c;

  --dynasty-yuan-main: #a32924;
  --dynasty-yuan-accent: #2b7d55;
}
```

使用方式：

1. 朝代卡片 hover 边框。
2. 当前朝代标题下划线。
3. 当前朝代标签。
4. 当前朝代图鉴进度条。
5. 视觉基因卡中的朝代标识。

---

## 5.5 色彩使用禁忌

禁止：

1. 大面积金色背景。
2. 强金属质感。
3. 霓虹红蓝撞色。
4. 高饱和纯色按钮堆满页面。
5. 随意使用紫色、荧光绿、赛博蓝。
6. 把所有文字都做成金色。

推荐：

1. 黑底。
2. 米白文字。
3. 小面积暗金线条。
4. 小面积朱砂红强调。
5. 色卡区域集中展示藻井色。
6. 图像本身承担主要色彩。

---

## 6. 字体系统

## 6.1 字体策略

网站字体应在“现代可读”和“文化气质”之间平衡。

不要使用过于书法化的字体作为正文。
书法感可以用于标题图像或 Logo，但不能用于大段阅读内容。

---

## 6.2 中文字体建议

优先级：

```css
font-family:
  "Noto Serif SC",
  "Source Han Serif SC",
  "Songti SC",
  "SimSun",
  serif;
```

适合用于：

1. 大标题。
2. 作品名称。
3. 朝代名称。
4. 视觉基因卡标题。

正文可以使用：

```css
font-family:
  "Noto Sans SC",
  "Source Han Sans SC",
  "PingFang SC",
  "Microsoft YaHei",
  sans-serif;
```

适合用于：

1. 正文说明。
2. 标签。
3. 按钮。
4. 数据字段。
5. 色值和结构说明。

---

## 6.3 英文字体建议

英文和数字建议使用：

```css
font-family:
  "Inter",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

用于：

1. 英文副标题。
2. HEX 色值。
3. 路由提示。
4. 小标签。
5. 编号。

---

## 6.4 标题层级

```css
.display-title {
  font-size: clamp(56px, 8vw, 128px);
  line-height: 0.95;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.page-title {
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.section-title {
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.2;
  letter-spacing: 0.04em;
  font-weight: 500;
}

.card-title {
  font-size: 20px;
  line-height: 1.3;
  letter-spacing: 0.03em;
  font-weight: 500;
}
```

---

## 6.5 正文层级

```css
.body-large {
  font-size: 18px;
  line-height: 1.9;
}

.body-normal {
  font-size: 15px;
  line-height: 1.8;
}

.body-small {
  font-size: 13px;
  line-height: 1.6;
}

.caption {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

---

## 6.6 字体使用禁忌

禁止：

1. 全站使用书法字体。
2. 正文使用难读的仿宋、隶书、篆书。
3. 所有标题都加粗到很重。
4. 字距过大导致阅读困难。
5. 英文全部使用花体。
6. 色值、编号使用宋体。

---

## 7. 页面布局系统

## 7.1 全局容器

建议使用以下页面宽度：

```css
.page-shell {
  width: min(100% - 48px, 1440px);
  margin: 0 auto;
}
```

大屏页面可以允许视觉元素突破容器，但文本内容应保持在可读宽度内。

---

## 7.2 页面安全边距

桌面端：

```css
--page-padding-x: 48px;
--page-padding-y: 40px;
```

平板端：

```css
--page-padding-x: 32px;
--page-padding-y: 32px;
```

移动端：

```css
--page-padding-x: 20px;
--page-padding-y: 24px;
```

---

## 7.3 文字最大宽度

正文段落最大宽度：

```css
.text-column {
  max-width: 680px;
}
```

说明：

1. 文化说明不要铺满整屏。
2. 一行文字太长会削弱阅读体验。
3. 详情页左文右图时，文本列建议 420px 到 560px。

---

## 7.4 页面基础布局

全站主要使用三种布局。

### A. 沉浸式居中布局

用于：

1. 首页入口。
2. 总览页面。
3. 环形图鉴。

特点：

```text
画面中心留白
图像环绕或悬浮
文字少
空间感强
```

---

### B. 左文右图布局

用于：

1. 具体藻井概览。
2. 空间投射页。
3. 作品介绍页。

特点：

```text
左侧：标题、朝代、洞窟、说明
右侧：藻井图像或投射图
```

---

### C. 工具面板布局

用于：

1. 色彩提取。
2. 纹样结构。
3. 视觉基因卡。

特点：

```text
左侧：图像/热点
右侧：信息面板/色卡/结构说明
```

---

## 8. 首页视觉规范

## 8.1 页面气质

首页是“抬头看见藻井”的身体入口。

视觉气质：

```text
黑暗
安静
缓慢
像从洞窟底部抬头看见顶部图像
```

---

## 8.2 初始状态

1. 背景为黑色。
2. 藻井主图位于画面上方或中央偏上。
3. 初始透明度较低。
4. 标题暂时不抢先出现。
5. 页面只显示一条轻提示：

```text
向上滑动，抬头看见藻井
```

---

## 8.3 显现状态

用户滚动或鼠标向上移动时：

1. 藻井图像缓慢上移。
2. 藻井图像由暗变亮。
3. 图像可以轻微放大。
4. 背景保持黑色。
5. 标题《藻井集》淡入。
6. 副标题和进入按钮随后出现。

---

## 8.4 首页标题

标题：

```text
藻井集
```

样式建议：

```css
.intro-title {
  font-family: "Noto Serif SC", "Source Han Serif SC", serif;
  font-size: clamp(64px, 10vw, 150px);
  letter-spacing: 0.18em;
  font-weight: 500;
  color: var(--color-rice-white);
  text-shadow: 0 0 24px rgba(201, 162, 76, 0.18);
}
```

注意：

1. 不要做强发光。
2. 不要做金属 3D 字。
3. 可以有轻微暗金色阴影。
4. 标题应像“浮现”，不是“弹出”。

---

## 8.5 进入按钮

按钮文案：

```text
进入图鉴
```

样式：

```css
.enter-button {
  border: 1px solid rgba(242, 234, 216, 0.28);
  background: rgba(242, 234, 216, 0.04);
  color: var(--color-rice-white);
  border-radius: 999px;
  padding: 12px 28px;
  backdrop-filter: blur(12px);
  transition: all 0.35s ease;
}

.enter-button:hover {
  border-color: rgba(201, 162, 76, 0.72);
  background: rgba(201, 162, 76, 0.12);
  transform: translateY(-2px);
}
```

---

## 9. 总览页面视觉规范

## 9.1 页面目标

总览页面要让用户知道：

```text
这里是一个可以进入、浏览、选择、解构藻井的图鉴系统。
```

---

## 9.2 环形图鉴视觉

环形图鉴是总览页面的核心视觉。

要求：

1. 黑色背景。
2. 多张藻井卡片围绕中心排列。
3. 卡片大小不必完全一致。
4. 卡片可以有轻微旋转角度。
5. 中央保留一段短句或留白。
6. 鼠标 hover 时，环形可以轻微旋转或暂停。
7. 当前 hover 卡片可以稍微放大。

---

## 9.3 环形图鉴 CSS 思路

```css
.orbit-stage {
  position: relative;
  width: min(70vw, 760px);
  aspect-ratio: 1;
  margin: 0 auto;
  perspective: 1200px;
}

.orbit-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 96px;
  border-radius: 12px;
  overflow: hidden;
  transform-origin: center center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
  transition: transform 0.35s ease, opacity 0.35s ease;
}
```

第一版不要求做复杂真实 3D。
可以用绝对定位 + transform 生成环形。

---

## 9.4 中央文字

可使用：

```text
From ceiling patterns to visual design genes.
```

或：

```text
抬头看见藻井，拆解一座天花中的视觉秩序。
```

要求：

1. 字号小。
2. 透明度低。
3. 不要抢卡片图像。

---

## 10. 朝代图鉴视觉规范

## 10.1 页面目标

朝代图鉴要呈现“时间中的藻井变化”。

不是普通按钮列表，而是一个可选择的视觉索引。

---

## 10.2 朝代卡片样式

每张朝代卡片包含：

1. 朝代名称。
2. 英文名。
3. 代表藻井图。
4. 关键词。
5. 主色提示。
6. 简短说明。

---

## 10.3 卡片视觉

```css
.dynasty-card {
  position: relative;
  width: 280px;
  height: 380px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(242, 234, 216, 0.04);
  border: 1px solid rgba(242, 234, 216, 0.12);
  transition: transform 0.45s ease, border-color 0.45s ease, opacity 0.45s ease;
}

.dynasty-card:hover {
  transform: translateY(-10px) scale(1.03);
  border-color: rgba(201, 162, 76, 0.55);
}
```

---

## 10.4 图像处理

朝代卡片中的图像应：

1. 保持原图比例。
2. 不强行拉伸。
3. 默认略暗。
4. hover 时提高亮度。
5. 可以加轻微渐变遮罩，保证文字可读。

```css
.card-image {
  filter: brightness(0.72) saturate(0.92);
  transition: filter 0.45s ease, transform 0.45s ease;
}

.dynasty-card:hover .card-image {
  filter: brightness(1) saturate(1.05);
  transform: scale(1.06);
}
```

---

## 10.5 朝代时间轴感

可以在朝代图鉴页顶部或底部加入很细的时间线：

```text
北魏 —— 西魏 —— 隋 —— 初唐 —— 盛唐 —— 元
```

样式：

1. 细线。
2. 低透明度。
3. 当前 hover 朝代点亮。
4. 不要做成传统时间轴课件风格。

---

## 11. 选中朝代图鉴视觉规范

## 11.1 页面目标

用户选择朝代后，进入该朝代的代表性藻井图鉴。

这里的视觉重点是：

```text
滚动浏览
↓
卡片展开
↓
鼠标滑动点选
```

---

## 11.2 页面布局

建议采用黑底大舞台：

```text
左上：返回按钮
顶部：朝代名称 + 简介
中部：作品卡片组
底部：滚动 / 点选提示
```

---

## 11.3 滚动展开卡片

卡片初始可以较集中，随着滚动逐渐展开。

视觉状态：

```text
scrollProgress = 0
卡片聚拢，像一组档案被叠在一起

scrollProgress = 0.5
卡片展开，出现明显前后层次

scrollProgress = 1
卡片形成可选择的横向阵列
```

---

## 11.4 当前卡片状态

当前 active 卡片应：

1. 放大。
2. 亮度提高。
3. Z 轴前移。
4. 显示作品名称。
5. 显示一句话特征。

其他卡片应：

1. 降低亮度。
2. 稍微缩小。
3. 保持可见。
4. 不要完全消失。

---

## 11.5 卡片样式

```css
.work-preview-card {
  width: 220px;
  height: 300px;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(242, 234, 216, 0.05);
  border: 1px solid rgba(242, 234, 216, 0.12);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.52);
  transform-style: preserve-3d;
  transition: transform 0.45s ease, filter 0.45s ease, opacity 0.45s ease;
}

.work-preview-card.is-active {
  transform: translateZ(80px) scale(1.12);
  filter: brightness(1.05) saturate(1.05);
  border-color: rgba(201, 162, 76, 0.6);
}

.work-preview-card.is-muted {
  opacity: 0.48;
  filter: brightness(0.72) saturate(0.8);
}
```

---

## 11.6 提示文字

滚动阶段：

```text
滚动浏览该朝代的代表性藻井
```

点选阶段：

```text
移动鼠标，选择一件藻井作品
```

提示样式：

```css
.interaction-hint {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(242, 234, 216, 0.42);
}
```

---

## 12. 作品详情页视觉规范

## 12.1 页面目标

详情页需要从沉浸式浏览转向清晰的知识与设计解构。

页面气质应从：

```text
空间沉浸
```

转向：

```text
视觉分析工具
```

但仍然保持黑底和文化感。

---

## 12.2 顶部导航

详情页右上角或顶部使用胶囊导航：

```text
概览 / 投射 / 色彩 / 结构 / 生成
```

样式：

```css
.pill-nav {
  display: flex;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(242, 234, 216, 0.06);
  border: 1px solid rgba(242, 234, 216, 0.12);
  backdrop-filter: blur(16px);
}

.pill-nav-item {
  border-radius: 999px;
  padding: 8px 16px;
  color: rgba(242, 234, 216, 0.58);
  transition: all 0.28s ease;
}

.pill-nav-item.is-active {
  color: var(--color-bg-black);
  background: var(--color-rice-white);
}
```

---

## 12.3 详情页概览模块

布局：

```text
左侧：
作品名称
朝代 / 洞窟 / 目录编号
一句话说明
关键词标签

右侧：
藻井主图
```

作品主图要求：

1. 不要铺满全屏。
2. 保持完整构图。
3. 加轻微暗金边框或淡淡阴影。
4. 可以轻微倾斜或悬浮。
5. 不要加厚重相框。

---

## 12.4 作品信息样式

```css
.work-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: rgba(242, 234, 216, 0.56);
  font-size: 13px;
}

.keyword-chip {
  border: 1px solid rgba(242, 234, 216, 0.14);
  background: rgba(242, 234, 216, 0.05);
  color: rgba(242, 234, 216, 0.76);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
}
```

---

## 13. 投射模块视觉规范

## 13.1 模块目标

投射模块要说明：

```text
藻井不是普通平面图案，而是顶部空间图像。
```

---

## 13.2 视觉方式

可以使用以下方式之一：

1. 透视倾斜的藻井图。
2. 洞窟顶部示意图。
3. 藻井图像从平面到顶部空间的轻微变形。
4. 鼠标移动时轻微视差。
5. 暗场中一束柔光照向藻井。

---

## 13.3 视觉风格

1. 保持安静。
2. 不做科幻 HUD。
3. 不做强烈网格地面。
4. 不做 3D 建模过度炫技。
5. 重点是“观看关系”，不是“空间建模”。

---

## 14. 色彩提取模块视觉规范

## 14.1 模块目标

色彩提取模块要像一个文化色彩工具。

用户应该感觉到：

```text
我点击的是藻井局部，
得到的是可用于设计的色彩基因。
```

---

## 14.2 页面布局

推荐布局：

```text
左侧：藻井图像 / 局部图 / 色彩热点
右侧：色卡面板 / 色值 / 文化说明 / 设计建议
```

---

## 14.3 色彩热点

热点样式：

```css
.color-hotspot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(242, 234, 216, 0.88);
  background: currentColor;
  box-shadow:
    0 0 0 6px rgba(242, 234, 216, 0.12),
    0 0 28px rgba(201, 162, 76, 0.28);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.color-hotspot:hover {
  transform: scale(1.18);
}
```

---

## 14.4 色卡面板

色卡面板应像设计工具，不像普通说明卡。

```css
.palette-panel {
  border-radius: 28px;
  background: rgba(242, 234, 216, 0.06);
  border: 1px solid rgba(242, 234, 216, 0.12);
  padding: 28px;
  backdrop-filter: blur(18px);
}

.color-swatch-row {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(242, 234, 216, 0.08);
}

.color-block {
  width: 72px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(242, 234, 216, 0.14);
}
```

---

## 14.5 色值呈现

HEX 色值必须清楚。

```css
.hex-code {
  font-family: "Inter", monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: rgba(242, 234, 216, 0.58);
}
```

---

## 14.6 色卡内容顺序

每组色卡应按以下顺序显示：

```text
色组名称
对应区域
色块列表
色值
色彩角色
文化语义
设计应用建议
```

---

## 15. 纹样结构模块视觉规范

## 15.1 模块目标

纹样结构模块要让用户理解：

```text
藻井不是一张漂亮图案，
而是由中心、边饰、飞天、莲花、垂幔、回纹等层级共同组织出的视觉秩序。
```

---

## 15.2 页面布局

推荐布局：

```text
左侧：纹样解剖图
右侧：纹样说明面板
```

---

## 15.3 标注线

标注线应简洁，不要像教材图过度拥挤。

```css
.pattern-marker {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(242, 234, 216, 0.72);
  background: rgba(5, 5, 5, 0.42);
  backdrop-filter: blur(8px);
  color: var(--color-rice-white);
  cursor: pointer;
  transition: all 0.28s ease;
}

.pattern-marker:hover,
.pattern-marker.is-active {
  background: rgba(201, 162, 76, 0.22);
  border-color: rgba(201, 162, 76, 0.9);
  transform: scale(1.12);
}
```

---

## 15.4 纹样信息面板

```css
.pattern-info-panel {
  border-radius: 28px;
  background: rgba(242, 234, 216, 0.055);
  border: 1px solid rgba(242, 234, 216, 0.12);
  padding: 28px;
}

.pattern-name {
  font-family: "Noto Serif SC", serif;
  font-size: 28px;
  color: var(--color-rice-white);
}

.pattern-region {
  font-size: 12px;
  color: rgba(242, 234, 216, 0.48);
}
```

---

## 15.5 结构图视觉要求

1. 可以使用图像叠加半透明层。
2. 当前选中区域可加柔和描边。
3. 不要使用高亮荧光色。
4. 不要让标注遮挡纹样主体。
5. 标签数量第一版控制在 4 到 8 个。

---

## 16. 视觉基因卡视觉规范

## 16.1 模块目标

视觉基因卡是整个网站的最终成果。

它不是普通总结，而是将：

```text
藻井图像
色彩
纹样
结构
文化寓意
设计建议
```

整合成一张可读、可展示、可继续扩展的设计转译卡。

---

## 16.2 卡片气质

视觉基因卡应具备：

```text
档案感
设计工具感
文化质感
完整度
可保存感
```

即使第一版不做下载功能，也要让用户感觉它像一个最终产物。

---

## 16.3 卡片布局

推荐结构：

```text
顶部：
藻井视觉基因卡 / 朝代 / 洞窟编号

中部左侧：
藻井缩略图

中部右侧：
主色卡

下部：
纹样关键词
结构关键词
文化寓意
设计应用建议
```

---

## 16.4 卡片样式

```css
.gene-card {
  width: min(100%, 920px);
  border-radius: 32px;
  padding: 32px;
  background:
    linear-gradient(135deg, rgba(242, 234, 216, 0.1), rgba(242, 234, 216, 0.035)),
    rgba(12, 10, 8, 0.92);
  border: 1px solid rgba(201, 162, 76, 0.28);
  box-shadow:
    0 40px 120px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.gene-card-title {
  font-family: "Noto Serif SC", serif;
  font-size: 32px;
  letter-spacing: 0.04em;
}

.gene-card-meta {
  font-size: 12px;
  color: rgba(242, 234, 216, 0.52);
  letter-spacing: 0.08em;
}
```

---

## 16.5 色卡条样式

```css
.gene-palette {
  display: flex;
  height: 72px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(242, 234, 216, 0.12);
}

.gene-palette-color {
  flex: 1;
}
```

---

## 16.6 关键词样式

```css
.gene-keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.gene-keyword {
  border-radius: 999px;
  padding: 6px 12px;
  background: rgba(242, 234, 216, 0.06);
  border: 1px solid rgba(242, 234, 216, 0.12);
  color: rgba(242, 234, 216, 0.78);
  font-size: 12px;
}
```

---

## 17. 图像处理规范

## 17.1 保留图像完整性

藻井图像不能被随意裁切到失去结构。

尤其是：

1. 中心莲花。
2. 四角飞天。
3. 外层垂幔。
4. 回纹边饰。
5. 宝相花边饰。
6. 三兔共耳中心。

如果必须裁切，应优先保留中心结构与最具代表性的纹样。

---

## 17.2 图像亮度

黑底页面中图像容易显得太刺眼，因此建议：

默认：

```css
filter: brightness(0.88) saturate(0.96);
```

hover 或 active：

```css
filter: brightness(1) saturate(1.05);
```

---

## 17.3 图像边框

建议使用极细边框：

```css
.image-frame {
  border: 1px solid rgba(242, 234, 216, 0.14);
  border-radius: 24px;
  overflow: hidden;
}
```

不要使用：

1. 厚金边。
2. 仿古相框。
3. 复杂花纹框。
4. 木纹框。

---

## 17.4 图像阴影

```css
.image-shadow {
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.55),
    0 0 40px rgba(201, 162, 76, 0.08);
}
```

阴影应像图像浮在暗场中，不要像电商卡片。

---

## 18. 按钮系统

## 18.1 主按钮

用于：

1. 进入图鉴。
2. 生成视觉基因卡。
3. 查看作品。

```css
.button-primary {
  border-radius: 999px;
  padding: 12px 24px;
  background: var(--color-rice-white);
  color: var(--color-bg-black);
  border: 1px solid rgba(242, 234, 216, 0.8);
  font-size: 14px;
  transition: all 0.28s ease;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(242, 234, 216, 0.16);
}
```

---

## 18.2 次级按钮

用于：

1. 返回。
2. 查看更多。
3. 切换。
4. 重置。

```css
.button-secondary {
  border-radius: 999px;
  padding: 10px 20px;
  background: rgba(242, 234, 216, 0.05);
  color: var(--color-rice-white);
  border: 1px solid rgba(242, 234, 216, 0.14);
  transition: all 0.28s ease;
}

.button-secondary:hover {
  background: rgba(242, 234, 216, 0.1);
  border-color: rgba(242, 234, 216, 0.32);
}
```

---

## 18.3 返回按钮

返回按钮应低调但明确。

建议样式：

```css
.back-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(242, 234, 216, 0.14);
  background: rgba(242, 234, 216, 0.06);
  color: var(--color-rice-white);
  backdrop-filter: blur(12px);
}
```

图标：

```text
←
```

或使用简单返回图标。

不要使用过大的按钮，不要遮挡主视觉。

---

## 19. 标签系统

标签用于：

1. 朝代关键词。
2. 视觉关键词。
3. 纹样关键词。
4. 结构关键词。
5. 文化关键词。

```css
.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1;
  color: rgba(242, 234, 216, 0.72);
  background: rgba(242, 234, 216, 0.055);
  border: 1px solid rgba(242, 234, 216, 0.1);
}
```

当前选中标签：

```css
.tag.is-active {
  color: var(--color-bg-black);
  background: var(--color-rice-white);
}
```

---

## 20. 动效系统

## 20.1 动效节奏

统一使用较慢、较柔和的动效。

```css
:root {
  --motion-fast: 180ms;
  --motion-normal: 320ms;
  --motion-slow: 680ms;
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 20.2 页面切换动效

建议页面切换：

```css
.page-enter {
  opacity: 0;
  transform: translateY(16px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity var(--motion-slow) var(--ease-soft),
    transform var(--motion-slow) var(--ease-soft);
}
```

---

## 20.3 卡片 hover

```css
.interactive-card {
  transition:
    transform var(--motion-normal) var(--ease-soft),
    border-color var(--motion-normal) var(--ease-soft),
    filter var(--motion-normal) var(--ease-soft);
}

.interactive-card:hover {
  transform: translateY(-6px);
}
```

---

## 20.4 滚动动效

选中朝代图鉴中的滚动动效应符合：

```text
滚动驱动卡片展开
不是滚动触发大量跳变
```

建议使用：

1. `framer-motion`
2. `useScroll`
3. `useTransform`
4. CSS transform
5. opacity

第一版如果不用 framer-motion，也可以用原生 scroll listener。

---

## 20.5 动效禁忌

禁止：

1. 页面切换时大幅旋转。
2. 卡片飞出屏幕。
3. 所有元素同时动。
4. 每个按钮都有强弹跳。
5. 频繁使用模糊到清晰导致阅读疲劳。
6. 动效时间过短导致廉价感。

---

## 21. 组件视觉规范

## 21.1 Card 通用卡片

```css
.card {
  border-radius: 24px;
  background: rgba(242, 234, 216, 0.05);
  border: 1px solid rgba(242, 234, 216, 0.12);
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.36);
}
```

---

## 21.2 Panel 信息面板

```css
.panel {
  border-radius: 28px;
  background: rgba(242, 234, 216, 0.055);
  border: 1px solid rgba(242, 234, 216, 0.12);
  backdrop-filter: blur(18px);
  padding: 28px;
}
```

---

## 21.3 Divider 分割线

```css
.divider {
  height: 1px;
  background: rgba(242, 234, 216, 0.1);
}
```

---

## 21.4 Tooltip 提示

```css
.tooltip {
  border-radius: 12px;
  padding: 8px 10px;
  background: rgba(5, 5, 5, 0.88);
  border: 1px solid rgba(242, 234, 216, 0.14);
  color: var(--color-rice-white);
  font-size: 12px;
  backdrop-filter: blur(12px);
}
```

---

## 22. 响应式视觉规范

## 22.1 桌面端优先

第一版优先适配桌面端，因为：

1. 课程展示大概率使用电脑。
2. 图鉴卡片和空间动效更适合大屏。
3. 色彩、结构、视觉基因卡需要较大信息面板。

---

## 22.2 平板端

调整方式：

1. 卡片尺寸缩小。
2. 环形图鉴可以变成横向滑动。
3. 左右布局可以改成上下布局。
4. 动效减少 30%。

---

## 22.3 移动端

移动端保证可浏览，不追求完整 3D 效果。

移动端策略：

1. 首页用上滑触发。
2. 总览页环形图鉴改成横向卡片。
3. 朝代图鉴改成纵向或横向滑动列表。
4. 选中朝代图鉴取消复杂鼠标点选，改为滑动卡片点击。
5. 详情页 Tab 横向滚动。
6. 色彩和结构模块上下排列。
7. 视觉基因卡宽度 100%。

---

## 23. 可访问性与可读性

## 23.1 对比度

虽然整体是暗场，但文字必须可读。

要求：

1. 主标题对比度高。
2. 正文不要低于 60% 透明度。
3. 辅助说明可以低透明度，但不能作为关键信息。
4. 色值和按钮必须清晰。

---

## 23.2 键盘操作

需要支持：

1. Tab 聚焦按钮。
2. Enter 激活按钮。
3. 左右键切换作品卡片。
4. Esc 或返回按钮退出详情。

---

## 23.3 减少动效模式

如果用户系统开启减少动态效果，页面应降低动效。

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 24. 前端实现建议

## 24.1 推荐技术

```text
React
Vite
TypeScript
CSS Modules 或 Tailwind CSS
Framer Motion
```

---

## 24.2 CSS 组织建议

```text
src/
├── styles/
│   ├── variables.css
│   ├── typography.css
│   ├── layout.css
│   ├── components.css
│   └── motion.css
```

---

## 24.3 全局样式引入

```tsx
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/motion.css";
```

---

## 24.4 不建议第一版做的事情

第一版不要优先做：

1. 复杂 WebGL。
2. 真实 3D 洞窟建模。
3. 大量 shader。
4. 实时摄像头手势识别。
5. AI 实时生成色卡。
6. 用户登录系统。
7. 导出 PNG 功能。
8. 全 100 件藻井完整详情。

第一版优先做：

1. 黑底视觉系统。
2. 首页藻井显现。
3. 环形总览。
4. 朝代卡片。
5. 作品卡片。
6. 详情页 Tab。
7. 色卡面板。
8. 结构标注。
9. 视觉基因卡。

---

## 25. 视觉验收标准

## 25.1 全站验收

* [ ] 全站以黑色或近黑色为主背景。
* [ ] 图像是视觉中心，不被装饰元素抢走注意力。
* [ ] 不出现过度国潮、霓虹、金属 3D 风格。
* [ ] 页面视觉统一。
* [ ] 字体可读。
* [ ] 动效克制。
* [ ] 页面具有文化图鉴感。
* [ ] 页面具有空间沉浸感。
* [ ] 色彩与结构模块具有设计工具感。

---

## 25.2 首页验收

* [ ] 能感受到“抬头看见藻井”。
* [ ] 藻井图像显现过程自然。
* [ ] 标题《藻井集》有仪式感但不浮夸。
* [ ] 进入按钮明确。
* [ ] 页面不空、不杂、不俗。

---

## 25.3 总览页验收

* [ ] 环形图鉴清晰。
* [ ] 中央留白或短句不抢画面。
* [ ] 用户能明显知道可以点击进入图鉴。
* [ ] 卡片 hover 有反馈。
* [ ] 页面具有“图鉴入口”的识别度。

---

## 25.4 朝代图鉴验收

* [ ] 朝代卡片有时间变化感。
* [ ] 每个朝代有代表图像和主题色。
* [ ] hover 状态清楚。
* [ ] 点击路径明确。
* [ ] 不是普通列表页。

---

## 25.5 选中朝代图鉴验收

* [ ] 滚动时卡片有展开过程。
* [ ] 滚动到末端后可以点选作品。
* [ ] 当前作品卡片高亮明确。
* [ ] 卡片图像不被过度裁切。
* [ ] 兜底点击可用。

---

## 25.6 详情页验收

* [ ] 概览、投射、色彩、结构、生成五个 Tab 清晰。
* [ ] 作品名称、朝代、洞窟编号清楚。
* [ ] 图像完整且清晰。
* [ ] 色彩模块有工具感。
* [ ] 结构模块有解剖感。
* [ ] 视觉基因卡像最终成果，不像普通总结。

---

## 26. 视觉系统总结

《藻井集》的视觉系统应始终围绕一句话展开：

```text
在暗场中抬头看见藻井，
在图鉴中浏览历史变化，
在解构中提取纹样与色彩，
在视觉基因卡中完成设计转译。
```

因此，全站视觉不是简单“好看”，而是服务于四个动作：

```text
看见
浏览
解构
再造
```

开发时所有页面、组件、颜色、动效都应回到这四个动作中判断：

```text
它是否帮助用户看见藻井？
它是否帮助用户浏览图鉴？
它是否帮助用户理解结构？
它是否帮助用户提取并再造视觉资源？
```

如果不能，就应该删掉或弱化。

---

## 外部动效参考边界

`https://inkwell.tech/` 可作为前置流程的动效和滚动叙事参考，但视觉语言必须转译为《藻井集》的文化语境。

可借鉴：
- 强首屏。
- 暗色沉浸感。
- 滚动推进信息层级。
- 阶段编号与列表重组。
- 鼠标状态影响画面。

必须保持：
- 黑底、暗金、米白、敦煌色系。
- 藻井图像和纹样作为主视觉。
- 博物馆感、文化图鉴感、设计工具感。
- 克制动效，不做商业 AI 官网感。

本地网页样式素材统一放在：`E:\Cursor_Projects\zaojingji\asset`。
