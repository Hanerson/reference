import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data';
import { Post } from '../types';
import { Search } from 'lucide-react';
import FileNode from './FileNode';

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const displayPosts = useMemo(() => {
        let result = posts;

        if (searchQuery.trim() !== "") {
            const getFlattened = (items: Post[]): Post[] => {
                let res: Post[] = [];
                items.forEach(p => {
                    if (p.type !== 'folder') res.push(p);
                    if (p.children) res = [...res, ...getFlattened(p.children)];
                });
                return res;
            };
            result = getFlattened(posts).filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        return result.sort((a, b) => b.date.localeCompare(a.date));
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-white">
            {/* 顶栏导航 */}
            <nav className="sticky top-0 w-full bg-white border-b border-gray-200 px-6 py-3">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <Link to="/" className="text-base font-semibold tracking-tight">
                        HANERSON.
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="搜索文章..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-50 border-none rounded-md py-1.5 pl-7 pr-3 text-xs outline-none w-40 focus:w-56 transition-all placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <Link to="/about" className="text-xs text-gray-500 hover:text-black transition-colors">
                            About
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 主内容 */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-1">
                    {displayPosts.length > 0 ? (
                        displayPosts.map((post) => (
                            <FileNode key={post.id} post={post} level={0} />
                        ))
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-sm text-gray-400">未找到相关内容</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;