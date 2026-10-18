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
        return new URL(url).host.replace(/^www\./, '');
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
                        className="absolute right-0 top-full z-10 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-3.5 shadow-md dark:border-gray-800 dark:bg-gray-900"
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
