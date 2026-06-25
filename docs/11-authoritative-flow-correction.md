# 权威流程修正：加载页到选中朝代图鉴

## 文档作用

本文档修正当前开发中的页面状态和交互路径。后续开发中，如果本文件与 `03-interaction-flow.md`、`04-page-spec.md`、`08-development-plan.md` 或旧版说明存在冲突，以本文件为准。

## 修正原因

当前代码和部分文档把“进入图鉴”理解为按钮点击直接进入 `/atlas`，并把 `/atlas` 总览页直接做成朝代卡片网格。实际项目流程需要更细：

1. 首页加载页先完成“藻井显现”。
2. 用户继续向下滚动后进入总览页。
3. 总览页展示多张藻井卡片，不是朝代卡片。
4. 点击总览页中的单张藻井卡片后，才进入按朝代划分的藻井图鉴。
5. 点击某个朝代后，进入选中朝代藻井图鉴。

## 素材与页面状态映射

| 素材 | 对应页面 / 状态 | 交互角色 |
| --- | --- | --- |
| `04加载页4(3).svg` | `/` 首页加载页 | 首页最终显现状态 |
| `05总览页面(1).svg` | `/atlas` 的 `overview` 状态 | 用户从首页滚动进入后的总览页 |
| `06藻井图鉴（朝代）(1).svg` | `/atlas` 的 `dynasty-index` 状态 | 点击总览页单张藻井卡片后出现 |
| `07选中朝代藻井图鉴(1).svg` | `/atlas/:dynastyId` | 点击某一朝代后出现 |
| `08具体藻井介绍(1).svg` | `/work/:workId` | 点击具体藻井作品后出现 |

## 权威用户流程

```text
/ 首页加载页
对应 04加载页4(3).svg
↓ 用户向下滚动，完成藻井显现后继续推进
/atlas overview 总览页
对应 05总览页面(1).svg
↓ 用户点击一张藻井卡片
/atlas dynasty-index 朝代图鉴页
对应 06藻井图鉴（朝代）(1).svg
↓ 用户点击某一朝代
/atlas/:dynastyId 选中朝代藻井图鉴
对应 07选中朝代藻井图鉴(1).svg
↓ 用户滚动浏览该朝代作品，或使用兜底点击
/work/:workId 具体藻井介绍
对应 08具体藻井介绍(1).svg
```

## 交互优先级修正

### 首页 `/`

首页中的“进入图鉴”按钮不应是主路径。主路径是：

```text
用户滚动
↓
藻井显现
↓
继续滚动
↓
进入 /atlas overview
```

按钮可以保留为兜底入口，但文案和视觉权重应低于滚动推进。

### `/atlas` overview

`overview` 状态不是朝代图鉴。它应展示 `05总览页面(1).svg` 的视觉结构：

- 左侧项目总览标题和说明。
- 右侧或主体区域展示多张藻井卡片。
- 卡片是藻井作品或藻井图像占位，不是朝代卡片。
- 点击任意藻井卡片或指定入口后，切换到 `dynasty-index`。

### `/atlas` dynasty-index

`dynasty-index` 状态对应 `06藻井图鉴（朝代）(1).svg`：

- 这里才展示按朝代划分的入口。
- 朝代卡片从 `src/data/dynasties.ts` 读取。
- 点击朝代进入 `/atlas/:dynastyId`。

### `/atlas/:dynastyId`

该页面对应 `07选中朝代藻井图鉴(1).svg`：

- 展示当前朝代下的藻井作品。
- 后续 Round 06 先实现基础数据读取和点击进入详情。
- Round 07 再实现滚动浏览与鼠标滑动点选。

## 开发修正要求

后续回头改代码时，应按以下状态模型执行：

```ts
// IntroPage
// wheel/reveal progress reaches threshold -> navigate("/atlas")

// IntroPage fallback
// button click may set reveal progress to complete or navigate directly, but scroll remains primary

type AtlasView = "overview" | "dynasty-index";

// AtlasPage overview
// wheel up -> navigate("/")
// click zaojing card -> setAtlasView("dynasty-index")

// AtlasPage dynasty-index
// click dynasty card -> navigate(`/atlas/${dynasty.id}`)

// SelectedDynastyPage
// read dynastyId, list works, click work -> navigate(`/work/${work.id}`)
```

## 验收修正

- `/` 首页必须能通过向下滚动进入 `/atlas`。
- `/atlas` 默认总览状态必须能通过向上滚动回退到 `/` 首页加载页。
- `/atlas` 默认必须是 `05总览页面(1).svg` 对应的总览状态。
- `/atlas` 的总览卡片不能直接表现为朝代卡片。
- 点击 `/atlas` 总览中的藻井卡片后，才出现朝代图鉴。
- 朝代图鉴点击朝代后，进入 `/atlas/:dynastyId`。
