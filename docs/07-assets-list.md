# 素材清单

## 文档作用
记录所有图片素材、命名、来源和使用位置，便于后续维护版权与资源引用。

## 目录建议
```txt
public/
  assets/
    zaojing/
      thumbnails/
      originals/
    texture/
    icons/
```

## 图片命名规则
- 原图：`{id}.jpg`
- 缩略图：`{id}-thumb.jpg`
- 纹理：`texture-{name}.png`
- 图标：`icon-{name}.svg`

## 素材登记表
| 文件名 | 类型 | 使用位置 | 来源 | 授权 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `mogao-cave-example.jpg` | 藻井图片 | 详情页、图库 | 待补充 | 待确认 | 示例占位 |
| `mogao-cave-example-thumb.jpg` | 缩略图 | 图库卡片 | 待补充 | 待确认 | 示例占位 |

## 使用原则
- 所有图片必须有 `alt` 文本。
- 所有外部素材必须记录来源。
- 未确认授权的图片只能作为本地开发占位，不进入正式发布。
- 图片文件名应与数据 `id` 对齐。

---

## 新增素材路径约束

网页样式参考素材目录：`E:\Cursor_Projects\zaojingji\asset`

当前已存在子目录：
- `asset/title/`

建议新增并使用：
- `asset/style-reference/`：网页静态样式参考。
- `asset/motion-reference/`：动效参考截图或拆帧。
- `asset/raw/`：未整理原始素材。

动效录屏目录：`F:\EV录屏\非遗网站`

已记录录屏：
- `非遗网站.mp4`
- `非遗网站加载页.mp4`
- `按朝代划分藻井图鉴.mp4`
- `藻井纹样观看.mp4`

后续开发前，Codex 必须先检查 `asset` 目录和上述录屏目录是否有新增素材。
