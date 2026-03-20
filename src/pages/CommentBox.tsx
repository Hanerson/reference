import React, { useState, useEffect } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Trash2, Star, X, Fingerprint, ArrowRight } from 'lucide-react';

// --- Supabase 配置 ---
const SUPABASE_URL = 'https://trlncfzxhgviwllplczp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybG5jZnp4aGd2aXdsbHBsY3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDU4MDksImV4cCI6MjA4OTU4MTgwOX0.YJHP4dWVp1j6fLLW82aFocbGTWUY5CDiZsnCxFf5WeQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Comment {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
    is_pinned: boolean;
}

const ADMIN_EMAIL = 'hanersons@qq.com';

const CommentBox: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);

    // 字体组合：西文 Times New Roman + 中文 宋体
    const serifStyle = {
        fontFamily: '"Times New Roman", "SimSun", "STSong", "Songti SC", serif'
    };

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };
        fetchSession();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false });
        if (!error) setComments(data as Comment[]);
    };

    useEffect(() => { fetchComments(); }, []);

    const handleAction = async () => {
        if (!user) { setShowAuthModal(true); return; }
        if (!content.trim()) return;
        const { error } = await supabase.from('comments').insert([{ content, user_id: user.id }]);
        if (!error) { setContent(''); fetchComments(); }
    };

    const handleAuth = async () => {
        if (!email || !password) return;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            const { error: signUpError } = await supabase.auth.signUp({ email, password });
            if (!signUpError) setShowAuthModal(false);
        } else { setShowAuthModal(false); }
    };

    return (
        <div className="min-h-screen bg-[#f8f8f7] text-[#1a1a1a] selection:bg-black selection:text-white">

            {/* --- 1. 融入设计的头部 (Header) --- */}
            <header className="fixed top-0 left-0 w-full z-40 bg-[#f8f8f7]/80 backdrop-blur-md border-b border-black/[0.03]">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="text-[15px] font-bold tracking-tight hover:opacity-70 transition-opacity">
                        HANERSON<span className="text-orange-500">.</span>
                    </Link>

                    <div className="flex items-center gap-8">
                        <span className="hidden md:block text-[10px] font-mono text-black/20 uppercase tracking-[0.3em]">
                            04_Thoughts_Archive
                        </span>
                        {user && (
                            <button
                                onClick={() => supabase.auth.signOut()}
                                className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-orange-600 transition-colors"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* --- 2. 主体内容区 --- */}
            <main className="max-w-4xl mx-auto px-6 pt-48 pb-32">

                {/* 介绍性文案 */}
                <div className="mb-20">
                    <h2 className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.4em] mb-6">
                        Public Dialogue / 公共存档
                    </h2>
                    <p className="text-2xl font-normal tracking-tight leading-snug max-w-xl" style={serifStyle}>
                        Say Something?
                    </p>
                </div>

                {/* --- 3. 极简单行输入区 --- */}
                <section className="mb-32">
                    <div className="flex items-center gap-6 border-b border-black/30 focus-within:border-black transition-all duration-700 pb-3">
                        <div className="shrink-0 text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] font-mono">
                            {user ? user.email?.split('@')[0] : "Guest / 访客"}
                        </div>
                        <input
                            style={serifStyle}
                            type="text"
                            placeholder="在此处留下你的见解..."
                            className="flex-1 bg-transparent text-[20px] md:text-[22px] outline-none placeholder:text-black/10 text-black py-1 italic"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAction()}
                        />
                        <button onClick={handleAction} className="shrink-0 p-2 text-black/40 hover:text-orange-600 transition-colors duration-300">
                            <Send size={22} strokeWidth={1.2} />
                        </button>
                    </div>
                </section>

                {/* --- 4. 评论列表：大号排版 --- */}
                <div className="space-y-28">
                    <AnimatePresence>
                        {comments.map((c) => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8"
                            >
                                <div className="md:col-span-2 text-[11px] font-mono text-black/40 uppercase tracking-tighter self-start pt-2 italic">
                                    {new Date(c.created_at).toLocaleDateString('en-GB')}
                                </div>

                                <div className="md:col-span-8 relative">
                                    {c.is_pinned && (
                                        <div className="flex items-center gap-2 text-orange-600 mb-4">
                                            <Star size={10} />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pinned</span>
                                        </div>
                                    )}
                                    <p
                                        style={serifStyle}
                                        className={`text-[21px] md:text-[24px] leading-[1.6] tracking-tight ${c.is_pinned ? 'text-black font-bold' : 'text-black/85 font-normal'}`}
                                    >
                                        {c.content}
                                    </p>
                                </div>

                                <div className="md:col-span-2 flex justify-end items-start gap-5 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                                    {(user?.id === c.user_id || user?.email === ADMIN_EMAIL) && (
                                        <button
                                            onClick={() => {
                                                supabase.from('comments').delete().eq('id', c.id).then(() => fetchComments());
                                            }}
                                            className="text-black/30 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* --- 5. 后置认证弹窗 --- */}
            <AnimatePresence>
                {showAuthModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#f8f8f7]/95 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-sm border border-black/10 p-12 bg-white shadow-2xl relative"
                        >
                            <button onClick={() => setShowAuthModal(false)} className="absolute top-8 right-8 text-black/40 hover:text-black">
                                <X size={20} />
                            </button>
                            <div className="mb-14">
                                <div className="flex items-center gap-2 text-orange-600 mb-4">
                                    <Fingerprint size={18} />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Identity Hub</span>
                                </div>
                                <h4 className="text-2xl font-normal text-black tracking-tight" style={serifStyle}>验证访客身份</h4>
                            </div>
                            <div className="space-y-10">
                                <input
                                    type="email" placeholder="Email / 邮箱"
                                    className="w-full border-b border-black/20 pb-2 text-[16px] outline-none focus:border-black transition-colors bg-transparent text-black"
                                    value={email} onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    type="password" placeholder="Password / 密码"
                                    className="w-full border-b border-black/20 pb-2 text-[16px] outline-none focus:border-black transition-colors bg-transparent text-black"
                                    value={password} onChange={e => setPassword(e.target.value)}
                                />
                                <button onClick={handleAuth} className="w-full py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
                                    Verify & Connect <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommentBox;