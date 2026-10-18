# Browser Starter 起始页实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有博客站点内新增浏览器起始页 `/#/browserStarter`：居中标题动效 + 搜索框 + 扁平站点列表，右上角齿轮弹窗配置搜索引擎与打开方式，跟随系统暗色，适配移动端。

**Architecture:** 新增纯数据文件与自包含页面组件；HashRouter 加一条路由；首页顶栏加入口图标。暗色完全依赖 Tailwind 默认 `media` 策略（`dark:` 前缀），页面根节点自铺背景盖住外层 `bg-white`，现有页面零行为变化。

**Tech Stack:** React 19 + TypeScript + Tailwind CSS 3.4（现有）+ framer-motion 12（已有依赖，做标题逐字动画）+ lucide-react（已有依赖，图标）。

**设计文档:** `docs/superpowers/specs/2026-10-18-browser-starter-design.md`（本计划的任务均以其为准；视觉参考 mockup 在 `.superpowers/brainstorm/3-1792334488/content/layout-v3.html` 与 `title.html`）。

## Global Constraints

- **不新增任何依赖**（framer-motion、lucide-react 已在 package.json）
- **不修改 `tailwind.config.js`**（`darkMode` 保持默认 `media`，不引入 class 策略）
- **不新增 vercel.json**；路由挂在现有 HashRouter 下，路径 `/browserStarter`
- localStorage 键名固定：`bs-engine`（引擎 name 字符串）、`bs-newtab`（`'true'`/`'false'`）
- localStorage 读写一律 try/catch 静默回退（隐私模式兼容）
- UI 文案为中文；品牌字样固定 `HANERSON.`
- 颜色严格按 spec §6 对照表：页面底 `bg-gray-50`/`dark:bg-gray-950`，主文字 `text-gray-900`/`dark:text-gray-100`，次要 `text-gray-400`/`dark:text-gray-500`，边框 `border-gray-200`/`dark:border-gray-800`，弹窗底 `bg-white`/`dark:bg-gray-900`，强调 `text-blue-500`/`dark:text-blue-400`，标题渐变亮 `from-gray-900 to-gray-500`、暗 `from-gray-100 to-[#7d8590]`
- 现有博客页面（Home/BlogPost）行为与外观不得改变
- **测试说明：** 本项目无测试框架，spec §8 明确验证方式为「类型检查 + lint + 构建 + dev server 手动清单」，各任务的验证步骤以此替代 TDD 循环，不要引入测试框架
- 所有命令在仓库根目录 `D:\projects\referenceSite\reference` 下执行（Git Bash）

---

### Task 1: 站点与引擎数据文件

**Files:**
- Create: `src/data/sites.ts`

**Interfaces:**
- Consumes: 无
- Produces: `interface Site { name: string; url: string }`、`interface Engine { name: string; searchUrl: string }`、`sites: Site[]`（8 项）、`engines: Engine[]`（Bing/Google/百度）、`DEFAULT_ENGINE: string`（`'Bing'`）。Task 2/3 从 `../data/sites` 导入这些名字。

- [ ] **Step 1: 创建数据文件**

```ts
// src/data/sites.ts
export interface Site {
    name: string;   // 展示名
    url: string;    // 完整地址
}

export interface Engine {
    name: string;       // 引擎显示名
    searchUrl: string;  // 含 %s 占位符
}

export const sites: Site[] = [
    { name: 'Bilibili', url: 'https://www.bilibili.com' },
    { name: '知乎', url: 'https://www.zhihu.com' },
    { name: '微博', url: 'https://weibo.com' },
    { name: '豆瓣', url: 'https://www.douban.com' },
    { name: '掘金', url: 'https://juejin.cn' },
    { name: '力扣', url: 'https://leetcode.cn' },
    { name: 'V2EX', url: 'https://www.v2ex.com' },
    { name: '少数派', url: 'https://sspai.com' },
];

export const engines: Engine[] = [
    { name: 'Bing', searchUrl: 'https://www.bing.com/search?q=%s' },
    { name: 'Google', searchUrl: 'https://www.google.com/search?q=%s' },
    { name: '百度', searchUrl: 'https://www.baidu.com/s?wd=%s' },
];

export const DEFAULT_ENGINE = 'Bing';
```

- [ ] **Step 2: 类型检查**

Run: `npx tsc -b`
Expected: 无输出、退出码 0（新文件未被引用也不报错）

- [ ] **Step 3: Commit**

```bash
git add src/data/sites.ts
git commit -m "feat(data): 新增起始页站点与搜索引擎数据"
```

---

### Task 2: 起始页组件、路由与首页入口

**Files:**
- Create: `src/pages/BrowserStarter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/Home.tsx`（顶栏 nav 内，约 `Home.tsx:40-51`）

**Interfaces:**
- Consumes: Task 1 的 `sites`、`engines`、`DEFAULT_ENGINE`、`Engine`、`Site`（`import { sites, engines, DEFAULT_ENGINE, Engine } from '../data/sites'`）
- Produces: 默认导出组件 `BrowserStarter`；路由路径 `/browserStarter`（HashRouter 实际地址 `/#/browserStarter`）。Task 3 只改组件内部，不改对外形态。

- [ ] **Step 1: 创建页面组件（本任务为固定默认值版本：Bing、当前标签页，无设置弹窗；Task 3 再加偏好设置）**

```tsx
// src/pages/BrowserStarter.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sites, engines, DEFAULT_ENGINE, Engine } from '../data/sites';

const TITLE = 'HANERSON';

/** 从完整 url 取 host 用于展示，解析失败时原样返回 */
const displayHost = (url: string): string => {
    try {
        return new URL(url).host;
    } catch {
        return url;
    }
};

const BrowserStarter: React.FC = () => {
    const [input, setInput] = useState('');
    const engine: Engine = engines.find(e => e.name === DEFAULT_ENGINE) ?? engines[0];
    const newTab = false;

    const handleSearch = (): void => {
        const query = input.trim();
        if (!query) return;
        let target: string;
        if (query.includes('.') && !query.includes(' ')) {
            // 像网址：直接打开，无协议时补 https://
            target = /^https?:\/\//i.test(query) ? query : `https://${query}`;
        } else {
            // 否则走当前引擎搜索
            target = engine.searchUrl.replace('%s', encodeURIComponent(query));
        }
        window.open(target, newTab ? '_blank' : '_self', newTab ? 'noopener' : undefined);
        setInput('');
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* 右上角设置入口在 Task 3 加入，占位保持布局 */}
            <div className="absolute right-5 top-5 h-7 w-7" />

            <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 pb-24">
                <h1 className="text-center font-semibold leading-none tracking-tight select-none text-[clamp(2.25rem,8vw,3.5rem)]">
                    <span aria-hidden="true">
                        {TITLE.split('').map((ch, i) => (
                            <motion.span
                                key={i}
                                className="inline-block bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-gray-100 dark:to-[#7d8590]"
                                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: i * 0.045, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                        <motion.span
                            className="text-blue-500 dark:text-blue-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: TITLE.length * 0.045, duration: 0.5 }}
                        >
                            .
                        </motion.span>
                    </span>
                    <span className="sr-only">HANERSON.</span>
                </h1>

                <form
                    className="mt-10"
                    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="搜索或输入网址…"
                        autoFocus
                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-600"
                    />
                </form>

                <ul className="mt-12">
                    {sites.map((site) => (
                        <li key={site.url}>
                            <a
                                href={site.url}
                                target={newTab ? '_blank' : '_self'}
                                rel={newTab ? 'noopener noreferrer' : undefined}
                                className="group flex items-baseline gap-3 px-2 py-2.5"
                            >
                                <span className="min-w-[5rem] shrink-0 font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400">
                                    {site.name}
                                </span>
                                <span className="truncate text-sm text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400">
                                    {displayHost(site.url)}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default BrowserStarter;
```

- [ ] **Step 2: 在 App.tsx 注册路由**

`src/App.tsx` 顶部 import 区（`import BlogPost from './pages/BlogPost';` 之后）加：

```tsx
import BrowserStarter from './pages/BrowserStarter';
```

`<Route path="/post/:id" ... />` 一行之后加：

```tsx
<Route path="/browserStarter" element={<BrowserStarter />} />
```

- [ ] **Step 3: 在 Home.tsx 顶栏加入口图标**

`src/pages/Home.tsx:5` 的 import 行改为：

```tsx
import { Search, Compass } from 'lucide-react';
```

在搜索框的 `</div>`（`Home.tsx:50`，`relative flex items-center` 容器结束处）之后、外层 `</div>`（`flex items-center gap-4` 结束处）之前插入：

```tsx
                        <Link
                            to="/browserStarter"
                            title="起始页"
                            aria-label="起始页"
                            className="text-gray-500 transition-colors hover:text-gray-900"
                        >
                            <Compass size={17} />
                        </Link>
```

- [ ] **Step 4: 类型检查与 lint**

Run: `npx tsc -b && npm run lint`
Expected: 两者均无输出、退出码 0（注意：`loadPrefs` 此时不存在，不要提前引用）

- [ ] **Step 5: dev server 手动验证**

Run: `npm run dev`（后台），浏览器打开 `http://localhost:5173/#/browserStarter`

Expected:
- 标题字母依次浮现、单色渐变、句点为蓝色；动画只播一次
- 搜索框输入 `bilibili.com` 回车 → 当前标签页打开该站；输入 `react hooks` 回车 → 跳 Bing 搜索；空输入回车无动作
- 8 行站点列表：名称深色在前、域名灰色在后，hover 整行变蓝，点击当前标签页打开
- DevTools → Rendering → Emulate prefers-color-scheme: dark → 页面近黑底、标题浅色渐变、输入框深底
- DevTools 切 375px 宽：列表单行不溢出，长域名截断省略
- 回首页 `http://localhost:5173/`：博客外观不变，顶栏出现罗盘图标，点击跳到起始页

验证完 `Ctrl+C` 停掉 dev server。

- [ ] **Step 6: Commit**

```bash
git add src/pages/BrowserStarter.tsx src/App.tsx src/pages/Home.tsx
git commit -m "feat(page): 新增 BrowserStarter 起始页、路由与首页入口"
```

---

### Task 3: 设置齿轮弹窗与偏好持久化

**Files:**
- Modify: `src/pages/BrowserStarter.tsx`（整文件替换为下方最终版）

**Interfaces:**
- Consumes: Task 1 的 `engines`、`DEFAULT_ENGINE`、`Engine`；Task 2 的组件结构
- Produces: 页面新增行为——右上角齿轮弹窗（搜索引擎、打开方式），选择写 localStorage（`bs-engine`/`bs-newtab`），读取失败或值非法时回退默认（Bing / 当前标签页）；Esc 或点击面板外收起。对外导出形态不变。

- [ ] **Step 1: 将 `src/pages/BrowserStarter.tsx` 整体替换为最终版**

```tsx
// src/pages/BrowserStarter.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { sites, engines, DEFAULT_ENGINE, Engine } from '../data/sites';

const TITLE = 'HANERSON';

interface Prefs {
    engine: Engine;
    newTab: boolean;
}

/** 读取偏好；localStorage 不可用或值非法时静默回退默认值 */
const loadPrefs = (): Prefs => {
    let engine = engines.find(e => e.name === DEFAULT_ENGINE) ?? engines[0];
    let newTab = false;
    try {
        const savedEngine = localStorage.getItem('bs-engine');
        if (savedEngine) {
            engine = engines.find(e => e.name === savedEngine) ?? engine;
        }
        const savedNewTab = localStorage.getItem('bs-newtab');
        if (savedNewTab !== null) {
            newTab = savedNewTab === 'true';
        }
    } catch {
        // 隐私模式等场景下 localStorage 不可用，使用默认值
    }
    return { engine, newTab };
};

const savePref = (key: string, value: string): void => {
    try {
        localStorage.setItem(key, value);
    } catch {
        // 写入失败静默忽略
    }
};

/** 从完整 url 取 host 用于展示，解析失败时原样返回 */
const displayHost = (url: string): string => {
    try {
        return new URL(url).host;
    } catch {
        return url;
    }
};

/** 弹窗内一组扁平文字选项；选中项加粗并带底部短线 */
const OptionButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={
            active
                ? 'border-b border-gray-900 pb-px font-semibold text-gray-900 dark:border-gray-100 dark:text-gray-100'
                : 'text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        }
    >
        {label}
    </button>
);

const BrowserStarter: React.FC = () => {
    const [input, setInput] = useState('');
    const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // 弹窗打开期间：点外部或按 Esc 收起；关闭时移除监听
    useEffect(() => {
        if (!settingsOpen) return;
        const close = () => setSettingsOpen(false);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('click', close);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', close);
            document.removeEventListener('keydown', onKey);
        };
    }, [settingsOpen]);

    const setEngine = (engine: Engine): void => {
        setPrefs(p => ({ ...p, engine }));
        savePref('bs-engine', engine.name);
    };

    const setNewTab = (newTab: boolean): void => {
        setPrefs(p => ({ ...p, newTab }));
        savePref('bs-newtab', String(newTab));
    };

    const handleSearch = (): void => {
        const query = input.trim();
        if (!query) return;
        let target: string;
        if (query.includes('.') && !query.includes(' ')) {
            // 像网址：直接打开，无协议时补 https://
            target = /^https?:\/\//i.test(query) ? query : `https://${query}`;
        } else {
            // 否则走当前引擎搜索
            target = prefs.engine.searchUrl.replace('%s', encodeURIComponent(query));
        }
        window.open(target, prefs.newTab ? '_blank' : '_self', prefs.newTab ? 'noopener' : undefined);
        setInput('');
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* 右上角设置入口 */}
            <div className="absolute right-5 top-5">
                <button
                    type="button"
                    aria-label="设置"
                    title="设置"
                    onClick={(e) => { e.stopPropagation(); setSettingsOpen(open => !open); }}
                    className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <Settings size={18} />
                </button>
                {settingsOpen && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white p-3.5 shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                        <p className="mb-1.5 text-xs text-gray-400 dark:text-gray-500">搜索引擎</p>
                        <div className="mb-3 flex gap-3 text-sm">
                            {engines.map(engine => (
                                <OptionButton
                                    key={engine.name}
                                    label={engine.name}
                                    active={engine.name === prefs.engine.name}
                                    onClick={() => setEngine(engine)}
                                />
                            ))}
                        </div>
                        <p className="mb-1.5 text-xs text-gray-400 dark:text-gray-500">链接打开方式</p>
                        <div className="flex gap-3 text-sm">
                            <OptionButton
                                label="当前标签页"
                                active={!prefs.newTab}
                                onClick={() => setNewTab(false)}
                            />
                            <OptionButton
                                label="新标签页"
                                active={prefs.newTab}
                                onClick={() => setNewTab(true)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 pb-24">
                <h1 className="text-center font-semibold leading-none tracking-tight select-none text-[clamp(2.25rem,8vw,3.5rem)]">
                    <span aria-hidden="true">
                        {TITLE.split('').map((ch, i) => (
                            <motion.span
                                key={i}
                                className="inline-block bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-gray-100 dark:to-[#7d8590]"
                                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: i * 0.045, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
                            >
                                {ch}
                            </motion.span>
                        ))}
                        <motion.span
                            className="text-blue-500 dark:text-blue-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: TITLE.length * 0.045, duration: 0.5 }}
                        >
                            .
                        </motion.span>
                    </span>
                    <span className="sr-only">HANERSON.</span>
                </h1>

                <form
                    className="mt-10"
                    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="搜索或输入网址…"
                        autoFocus
                        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-600"
                    />
                </form>

                <ul className="mt-12">
                    {sites.map((site) => (
                        <li key={site.url}>
                            <a
                                href={site.url}
                                target={prefs.newTab ? '_blank' : '_self'}
                                rel={prefs.newTab ? 'noopener noreferrer' : undefined}
                                className="group flex items-baseline gap-3 px-2 py-2.5"
                            >
                                <span className="min-w-[5rem] shrink-0 font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400">
                                    {site.name}
                                </span>
                                <span className="truncate text-sm text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400">
                                    {displayHost(site.url)}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default BrowserStarter;
```

- [ ] **Step 2: 类型检查与 lint**

Run: `npx tsc -b && npm run lint`
Expected: 均无输出、退出码 0

- [ ] **Step 3: dev server 手动验证**

Run: `npm run dev`（后台），浏览器打开 `http://localhost:5173/#/browserStarter`

Expected:
- 点齿轮 → 右上角下方弹出小面板（圆角、细边框、轻投影），点面板外或按 Esc 收起，再点齿轮可再开
- 切到 Google 后：面板内 Google 加粗带底线；DevTools Application → Local Storage 出现 `bs-engine: "Google"`；刷新页面仍选中 Google；搜索 `test` 跳 Google 搜索
- 切「新标签页」→ `bs-newtab: "true"`；刷新后设置保持；点站点链接与搜索结果都开新标签页
- DevTools 控制台执行 `localStorage.setItem('bs-engine','Yahoo')` 后刷新 → 回退到 Bing（不报错）
- 隐私窗口打开页面 → 正常渲染、设置可临时生效、无报错
- 亮/暗与 375px 移动端宽度复验 Task 2 Step 5 的表现

验证完停掉 dev server。

- [ ] **Step 4: Commit**

```bash
git add src/pages/BrowserStarter.tsx
git commit -m "feat(page): 起始页设置弹窗与偏好持久化"
```

---

### Task 4: 全量验证收尾

**Files:**
- 无新改动（若发现问题，修复后随本任务提交）

**Interfaces:**
- Consumes: Task 1-3 的全部产出
- Produces: 通过 spec §8 完整验证清单的可交付状态

- [ ] **Step 1: 构建验证**

Run: `npm run lint && npm run build`
Expected: lint 无错误；`tsc -b && vite build` 成功产出 `dist/`

- [ ] **Step 2: spec §8 手动清单复核**

Run: `npm run dev`（后台），逐项核对 spec 第 8 节清单：
- `/#/browserStarter` 直接访问正常；首页图标可跳转
- 系统亮/暗切换（DevTools emulate）两套配色正确
- 375px 宽度下布局与截断正常
- 齿轮弹窗开合、Esc/外点收起、选择持久化（刷新后保持）
- 搜索回车：关键词走引擎、含点号走网址、空输入不动作
- 打开方式设置对搜索结果与站点链接同时生效

全部通过后停掉 dev server。任何一项不过：修复后重跑本步骤并提交修复。

- [ ] **Step 3: 收尾提交（仅当有修复时）**

```bash
git add -A
git commit -m "fix(page): 起始页验证问题修复"
```
