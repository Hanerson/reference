import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { posts } from '../data';
import { Post } from '../types';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PDFViewer from '../components/PDFViewer';
import 'highlight.js/styles/github-dark.css';

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
            <div className="min-h-screen bg-[#f8f8f7] flex items-center justify-center font-serif italic text-black/20">
                Entry not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f8f7] text-[#1a1a1a] selection:bg-black selection:text-white">

            <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-8 md:px-12 z-50 bg-[#f8f8f7]/80 backdrop-blur-md border-b border-black/[0.03]">
                <Link to="/" className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-tighter">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Index
                </Link>
                <div className="flex items-center gap-6">
                    {isPDF && (
                        <button
                            onClick={handleDownload}
                            className="text-[12px] font-bold uppercase tracking-widest text-orange-600 hover:opacity-60 transition-opacity"
                        >
                            {isDownloading ? 'Downloading...' : 'Get PDF'}
                        </button>
                    )}
                </div>
            </nav>

            <main className="pt-32 pb-32">
                <div className="max-w-screen-xl mx-auto px-8 md:px-12">

                    {/* 非对称布局 Header */}
                    <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600/80">
                                        {post.category}
                                    </span>
                                    <div className="w-8 h-[1px] bg-black/10" />
                                    <span className="text-[11px] font-medium text-black/30 uppercase tracking-widest">
                                        Ref_{post.id}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-4xl font-normal leading-[1.1] tracking-tight mb-8">
                                    {post.title}
                                </h1>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-end border-l border-black/5 pl-8 py-2">
                            <div className="space-y-4 text-[13px]">
                                <div className="flex justify-between items-center text-black/40 italic font-serif">
                                    <span>Published</span>
                                    <span className="font-sans not-italic text-black/80">{post.date.replace(/-/g, '.')}</span>
                                </div>
                                <div className="flex justify-between items-center text-black/40 italic font-serif">
                                    <span>Reading Time</span>
                                    <span className="font-sans not-italic text-black/80">{post.readTime}</span>
                                </div>
                                <div className="pt-4 border-t border-black/5">
                                    <p className="text-black/50 leading-relaxed italic">
                                        {post.excerpt || "A thoughtful exploration of concepts and execution."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className={`lg:col-span-10 ${isPDF ? 'lg:col-span-11' : 'lg:col-span-8'}`}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {loading ? (
                                    <div className="h-64 flex items-center justify-center italic text-black/20 font-serif">
                                        Gathering thoughts...
                                    </div>
                                ) : isPDF ? (
                                    <div className="bg-white p-2 md:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.05)] rounded-sm">
                                        <PDFViewer fileUrl={post.fileUrl || ''} />
                                    </div>
                                ) : (
                                    <div className="prose prose-neutral prose-lg max-w-none
                                        prose-headings:font-normal prose-headings:tracking-tight
                                        prose-p:leading-relaxed prose-p:text-black/80
                                        prose-blockquote:border-l-orange-500 prose-blockquote:font-serif prose-blockquote:italic
                                        prose-pre:bg-[#1a1a1a] prose-pre:rounded-sm
                                        prose-code:text-orange-600 prose-code:font-medium
                                        prose-img:rounded-sm prose-img:shadow-2xl">
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                                            {content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-20 border-t border-black/5 mx-8 md:mx-12">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-30 text-black">
                            End of Entry
                        </span>
                    </div>
                    <Link to="/" className="text-[13px] italic font-serif hover:underline">
                        Back to the library
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default BlogPost;