import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { Plus, Minus } from 'lucide-react';

interface FileNodeProps {
    post: Post;
    level: number;
}

const FileNode: React.FC<FileNodeProps> = ({ post, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = post.type === 'folder';

    const indentation = level > 0 ? { paddingLeft: `${level * 16}px` } : {};

    if (!isFolder) {
        return (
            <div style={indentation}>
                <Link
                    to={`/post/${post.id}`}
                    className="group flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                    {/* 日期 */}
                    <span className="text-xs text-gray-400 w-24 shrink-0 font-mono">
                        {post.date}
                    </span>

                    <div className="flex-1 min-w-0">
                        {/* 标题 */}
                        <h2 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                            {post.title}
                        </h2>
                        {/* 摘要 */}
                        {post.excerpt && (
                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </Link>
            </div>
        );
    }

    // 文件夹渲染逻辑
    return (
        <div style={indentation}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="py-2 flex items-center justify-between cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors px-2"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gray-400">
                        {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                    </span>

                    <h3 className={`text-sm ${isOpen ? 'text-black font-medium' : 'text-gray-600'}`}>
                        {post.title}
                    </h3>

                    <span className="text-[10px] text-gray-400">
                        {post.children?.length || 0} 项
                    </span>
                </div>
            </div>

            {isOpen && post.children && (
                <div className="border-l border-gray-200 ml-4">
                    {post.children.map(child => (
                        <FileNode key={child.id} post={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileNode;