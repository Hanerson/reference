import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { Post, CATEGORY_CONFIG } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';
import FileNode from './FileNode';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const categoryOptions = useMemo(() => ["All", ...Object.keys(CATEGORY_CONFIG), "Archive"], []);

    const displayPosts = useMemo(() => {
        const getFlattened = (items: Post[]): Post[] => {
            let res: Post[] = [];
            items.forEach(p => {
                if (p.type !== 'folder') res.push(p);
                if (p.children) res = [...res, ...getFlattened(p.children)];
            });
            return res;
        };

        let result = (selectedCategory === "Archive")
            ? posts.filter(p => p.type === 'folder')
            : (selectedCategory === "All") ? posts : posts.filter(p => p.category === selectedCategory);

        if (searchQuery.trim() !== "") {
            result = getFlattened(posts).filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        return result.sort((a, b) => b.date.localeCompare(a.date));
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-[#f8f8f7] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">

            {/* 顶栏：悬浮极简导航 */}
            <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-8 md:px-12 z-50 bg-[#f8f8f7]/80 backdrop-blur-md">
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-[15px] font-bold tracking-tight">
                        HANERSON<span className="text-orange-500">.</span>
                    </Link>

                    <div className="hidden md:flex gap-8">
                        {categoryOptions.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[13px] transition-all relative ${
                                    selectedCategory === cat ? 'text-black font-medium' : 'text-black/40 hover:text-black'
                                }`}
                            >
                                {cat === 'All' ? 'Overview' : cat}
                                {selectedCategory === cat && (
                                    <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-black" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative flex items-center group">
                        <Search className="absolute left-0 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none py-2 pl-7 pr-4 text-[13px] outline-none w-40 focus:w-64 transition-all placeholder-black/20"
                        />
                    </div>
                    <Link to="/about" className="hidden sm:flex items-center gap-1 text-[13px] text-black/40 hover:text-black transition-colors">
                        About <ArrowUpRight size={14} />
                    </Link>
                </div>
            </nav>

            {/* 主内容 */}
            <main className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto">

                {/* 动态 Header 部分 */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-[12px] uppercase tracking-[0.3em] text-black/30 mb-4 font-semibold">
                            {selectedCategory} / {displayPosts.length} Entries
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight text-black">
                            Make steady progress.
                        </h1>
                    </motion.div>
                </header>

                {/* 列表区域：放弃所有卡片背景，使用纯净的行级排版 */}
                <div className="grid grid-cols-1 gap-x-20">
                    <AnimatePresence mode='popLayout'>
                        <div className="border-t border-black/10">
                            {displayPosts.length > 0 ? (
                                displayPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <FileNode post={post} level={0} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-20 text-[18px] text-black/20 italic font-serif">
                                    No entries found in this collection.
                                </div>
                            )}
                        </div>
                    </AnimatePresence>
                </div>

                {/* 装饰性底部 */}
                <footer className="mt-32 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                </footer>
            </main>

            {/* 全局装饰：柔和的渐变底色，增加呼吸感 */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/30 blur-[120px] rounded-full -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 blur-[120px] rounded-full -z-10" />
        </div>
    );
};

export default Home;