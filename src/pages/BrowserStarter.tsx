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
