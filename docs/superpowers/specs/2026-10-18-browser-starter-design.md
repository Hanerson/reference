# Browser Starter（浏览器起始页）设计文档

- 日期：2026-10-18
- 状态：需求逐项确认完毕，待实现
- 关联 mockup：`.superpowers/brainstorm/3-1792334488/content/`（`layout-v3.html`、`title.html`，含可交互原型）

## 1. 背景与目标

站点是部署在 Vercel 的纯前端个人博客（Vite + React 19 + TypeScript + Tailwind 3 + react-router-dom v7，HashRouter）。本次新增一个极简页面，用作浏览器的自定义起始页：

- 路由 `/#/browserStarter`，首页顶栏提供入口
- 界面扁平：无卡片边框、无下拉选择框，信息直接平铺
- 支持跟随系统的暗色/明亮模式，适配移动端
- 页面加载快、无网络依赖（除用户点击跳转外）

## 2. 已确认的需求决策

| 决策点 | 结论 |
| --- | --- |
| 主题模式 | 仅跟随系统 `prefers-color-scheme`，无手动切换控件、不持久化 |
| 路由 | 在现有 HashRouter 内新增 `/browserStarter`，不新增 vercel.json |
| 页面内容 | 搜索框 + 预设站点链接列表 |
| 搜索引擎 | Bing / Google / 百度 可切换，默认 Bing，选择存 localStorage |
| 链接打开方式 | 当前标签页 / 新标签页 可选，默认当前标签页，选择存 localStorage |
| 引擎配置入口 | 右上角小齿轮，点击弹出小面板（唯一允许的弹层），点面板外收起 |
| 站点列表样式 | 一行一个；名称在前（前景色、中字重），域名在后（灰色小字，只显示域名如 `bilibili.com`）；不分组 |
| 标题 | 居中大字 "HANERSON."：逐字渐入动效 + 纵向单色渐变字面 + 蓝色句点（mockup 方案 A） |
| 预设站点 | Bilibili、知乎、微博、豆瓣、掘金、力扣、V2EX、少数派（8 个，改数据文件即可增删） |
| 技术方案 | 方案一：页面自管主题容器 + Tailwind 默认 media 暗色策略，现有页面零改动 |

## 3. 架构与文件

| 文件 | 动作 | 内容 |
| --- | --- | --- |
| `src/pages/BrowserStarter.tsx` | 新增 | 页面组件：标题、搜索框、齿轮弹窗、站点列表，自包含全部交互 |
| `src/data/sites.ts` | 新增 | `sites`（站点数组）、`engines`（搜索引擎数组）及默认值，纯数据 |
| `src/App.tsx` | 修改 | HashRouter 中新增 `<Route path="/browserStarter" element={<BrowserStarter />} />` |
| `src/pages/Home.tsx` | 修改 | 顶栏搜索框右侧新增入口图标（lucide-react `Compass`，`Link to="/browserStarter"`，带 `title`/`aria-label`「起始页」） |

- 不修改 `tailwind.config.js`：Tailwind 3 的 `darkMode` 默认值就是 `media`，`dark:` 前缀自动跟随系统
- 不新增任何依赖：动效用已有 framer-motion，图标用已有 lucide-react
- 页面根节点自铺 `min-h-screen` 亮/暗背景，盖住 `App.tsx` 外层的 `bg-white`，故 `App.tsx` 的包裹层无需改动

## 4. 数据模型

```ts
// src/data/sites.ts
export interface Site {
    name: string;   // 展示名，如 "Bilibili"、"知乎"
    url: string;    // 完整地址，如 "https://www.bilibili.com"
}

export interface Engine {
    name: string;       // "Bing" | "Google" | "百度"
    searchUrl: string;  // 形如 "https://www.bing.com/search?q=%s"，%s 为 URL 编码后的关键词
}

export const sites: Site[] = [
    { name: 'Bilibili', url: 'https://www.bilibili.com' },
    { name: '知乎',     url: 'https://www.zhihu.com' },
    { name: '微博',     url: 'https://weibo.com' },
    { name: '豆瓣',     url: 'https://www.douban.com' },
    { name: '掘金',     url: 'https://juejin.cn' },
    { name: '力扣',     url: 'https://leetcode.cn' },
    { name: 'V2EX',    url: 'https://www.v2ex.com' },
    { name: '少数派',   url: 'https://sspai.com' },
];

export const engines: Engine[] = [
    { name: 'Bing',   searchUrl: 'https://www.bing.com/search?q=%s' },
    { name: 'Google', searchUrl: 'https://www.google.com/search?q=%s' },
    { name: '百度',   searchUrl: 'https://www.baidu.com/s?wd=%s' },
];

export const DEFAULT_ENGINE = 'Bing';
```

localStorage 键（读写均 try/catch 包裹）：

- `bs-engine`：引擎 `name` 字符串
- `bs-newtab`：`'true'` / `'false'`

## 5. 页面结构与交互

自上而下（容器 `max-w-xl mx-auto px-6`）：

1. **齿轮按钮**：页面右上角固定（lucide `Settings`，小号灰色，hover 加深）。点击在其下方弹出小面板
2. **齿轮弹窗**：absolute 定位、右对齐，约 `w-48`，圆角 + 细边框 + 轻投影。含两组扁平文字选项：
   - 搜索引擎：Bing / Google / 百度，选中项加粗并带底部短横线
   - 链接打开方式：当前标签页 / 新标签页，样式同上
   - 点击面板外部或按 Esc 收起；选择立即写入 localStorage
3. **标题 "HANERSON."**：居中，`clamp(2.25rem, 8vw, 3.5rem)`，字重 600，字距 -0.02em。9 个字符逐个动画（framer-motion）：opacity 0→1、y 10px→0、blur 4px→0，依次延迟约 45ms，每次进入页面播放一次。字面为纵向单色渐变（`bg-clip-text`：亮色 #111827→#6b7280，暗色 #f3f4f6→#7d8590），句点单独填充蓝色（亮 #3b82f6，暗 #60a5fa）
4. **搜索框**：居中胶囊形，细边框、无投影；占位文案「搜索或输入网址…」。Enter 触发：
   - 输入含 `.` 且不含空格 → 视为网址直接打开（无协议时自动补 `https://`）
   - 否则 → 用当前引擎 `searchUrl` 将 `%s` 替换为 `encodeURIComponent(输入)` 后打开
   - 输入为空时 Enter 不动作
5. **站点列表**：一行一项，整行是 `<a>`。`名称`（`text-gray-900 dark:text-gray-100`，font-medium）在前，`域名`（从 `url` 解析 host，`text-gray-400 dark:text-gray-500`，小一号）在后；hover 时整行文字变品牌蓝；`target` 按 `bs-newtab` 设置决定，新标签页时补 `rel="noopener noreferrer"`
6. **移动端**：容器随视口缩窄；过长域名 `truncate` 省略；行的垂直 padding 加大保证触控舒适度

## 6. 样式与主题

| 元素 | 亮色 | 暗色 |
| --- | --- | --- |
| 页面背景 | `bg-gray-50` | `dark:bg-gray-950` |
| 主文字 | `text-gray-900` | `dark:text-gray-100` |
| 次要文字（域名/占位符） | `text-gray-400` | `dark:text-gray-500` |
| 搜索框/弹窗边框 | `border-gray-200` | `dark:border-gray-800` |
| 弹窗背景 | `bg-white` | `dark:bg-gray-900` |
| 品牌强调（句点、hover） | `text-blue-500` | `dark:text-blue-400` |

暗色切换完全由 media query 驱动，页面内无任何主题状态；博客现有页面不含 `dark:` 类，不受影响。

## 7. 错误与边界

- localStorage 不可用（隐私模式等）：try/catch 包裹全部读写，静默回退默认值
- `bs-engine` 存的值不在 `engines` 列表内：回退 Bing
- 站点 `url` 解析域名失败：直接展示整段 url 字符串
- 弹窗打开时组件卸载（路由跳转）：清理 document 级事件监听

## 8. 验证方式

项目无测试框架，采用构建 + 手动验证：

- `npm run lint` 无错误
- `npm run build`（`tsc -b && vite build`）通过
- dev server 手动清单：
  - `/#/browserStarter` 直接访问正常；首页图标可跳转
  - 系统亮/暗切换（DevTools emulate）两套配色正确
  - 375px 宽度下布局与截断正常
  - 齿轮弹窗开合、Esc/外点收起、选择持久化（刷新后保持）
  - 搜索回车：关键词走引擎、含点号走网址、空输入不动作
  - 打开方式设置对搜索结果与站点链接同时生效

## 9. 范围外（明确不做）

- 站点的增删改 UI（直接改 `src/data/sites.ts`）
- 时间、天气等小组件
- 博客其他页面的暗色模式
- 自定义搜索引擎的添加
- 服务端逻辑（保持纯前端）
