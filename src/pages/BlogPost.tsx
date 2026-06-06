import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { posts } from '../data';
import { Post } from '../types';
import { ArrowLeft } from 'lucide-react';
import PDFViewer from '../components/PDFViewer';
import 'highlight.js/styles/github.css';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isDownloading, setIsDownloading] = useState(false);

    const findPostById = (items: Post[], targetId: number): Post | undefined => {
        for (const item of items) {
            if (item.id === targetId) return item;
            if (item.children) {
                const found = findPostById(item.children, targetId);
                if (found) return found;
            }
        }
        return undefined;
    };

    const post = useMemo(() => findPostById(posts, parseInt(id || '0')), [id]);
    const isPDF = post?.type === 'pdf';

    const handleDownload = async () => {
        if (!post?.fileUrl) return;
        setIsDownloading(true);
        try {
            const response = await fetch(post.fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${post.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (post?.type === 'article' && post.fileUrl) {
            setLoading(true);
            fetch(post.fileUrl)
                .then(res => res.ok ? res.text() : Promise.reject())
                .then(text => { setContent(text); setLoading(false); })
                .catch(() => { setContent('# Error \nUnable to fetch content.'); setLoading(false); });
        } else {
            setLoading(false);
        }
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
                内容未找到。
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 固定顶部区域 */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
                {/* 顶栏导航 */}
                <nav className="w-full px-6 py-2">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft size={14} />
                            返回列表
                        </Link>
                        {isPDF && (
                            <button
                                onClick={handleDownload}
                                className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                            >
                                {isDownloading ? '下载中...' : '下载 PDF'}
                            </button>
                        )}
                    </div>
                </nav>

                {/* 文章标题区域 */}
                <div className="max-w-4xl mx-auto px-6 pb-3">
                    <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                        {post.title}
                    </h2>
                    {post.excerpt && (
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                </div>
            </div>

            {/* 主内容 */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* 内容区域 */}
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                        <p className="text-sm text-gray-400 mt-4">加载中...</p>
                    </div>
                ) : isPDF ? (
                    <div className="bg-white">
                        <PDFViewer fileUrl={post.fileUrl || ''} />
                    </div>
                ) : (
                    <article className="prose prose-slate max-w-none
                        prose-headings:font-semibold prose-headings:text-gray-900
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
                        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
                        prose-img:rounded-lg prose-img:shadow-sm
                        prose-hr:border-gray-200">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </article>
                )}
            </main>
        </div>
    );
};

export default BlogPost;
