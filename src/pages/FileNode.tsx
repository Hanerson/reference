import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface FileNodeProps {
    post: Post;
    level: number;
}

const FileNode: React.FC<FileNodeProps> = ({ post, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = post.type === 'folder';

    // 减小缩进幅度，保持紧凑
    const indentation = level > 0 ? { paddingLeft: `${level * 16}px` } : {};

    if (!isFolder) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={indentation}
                className="group relative"
            >
                <Link
                    to={`/post/${post.id}`}
                    className="flex items-center gap-4 md:gap-8 py-4 border-b border-black/[0.03] hover:bg-black/[0.01] transition-all duration-300 px-2"
                >
                    {/* 日期：更小、更淡 */}
                    <span className="font-mono text-[9px] text-black/20 w-10 shrink-0 tracking-tighter">
                        {post.date.split('-').slice(1).join('.')}
                    </span>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                            {/* 标题：字号缩小到 xl，保持粗细适中 */}
                            <h2 className="text-[15px] md:text-[17px] font-normal tracking-tight text-black/80 group-hover:text-black group-hover:translate-x-1 transition-all">
                                {post.title}
                            </h2>
                            {/* 核心标签：紧凑展示 */}
                            <span className="hidden md:inline text-[9px] font-bold uppercase tracking-widest text-orange-600/40">
                                {post.category}
                            </span>
                        </div>
                        {/* 摘要：限制高度，字号缩小 */}
                        <p className="line-clamp-1 text-[12px] text-black/30 italic font-serif mt-0.5">
                            { post.excerpt || "View details"}
                        </p>
                    </div>

                    {/* 右侧元数据：常驻显示关键信息，Hover 显示箭头 */}
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="hidden sm:block text-[10px] font-mono text-black/10 tabular-nums">
                            {post.readTime}
                        </span>
                        <ArrowUpRight
                            size={14}
                            className="text-black/0 group-hover:text-black/20 transition-all transform group-hover:translate-y-[-2px]"
                        />
                    </div>
                </Link>
            </motion.div>
        );
    }

    // --- 文件夹渲染逻辑 (更紧凑的折叠层) ---
    return (
        <div className="w-full" style={indentation}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="group py-3 flex items-center justify-between cursor-pointer border-b border-black/[0.06] hover:bg-black/[0.02] transition-colors px-2"
            >
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-black/20 w-10 shrink-0 flex items-center justify-center">
                        {isOpen ? <Minus size={10} /> : <Plus size={10} />}
                    </span>

                    <h3 className={`text-[14px] md:text-[15px] font-bold tracking-wide transition-all ${isOpen ? 'text-black' : 'text-black/40'}`}>
                        {post.title}
                    </h3>

                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-black/[0.03] text-black/20 uppercase tracking-tighter">
                        {post.children?.length || 0}
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && post.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="overflow-hidden border-l border-black/[0.03] ml-[25px]"
                    >
                        {post.children.map(child => (
                            <FileNode key={child.id} post={child} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileNode;