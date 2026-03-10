import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#f8f8f7] border-t border-black/[0.03] pt-24 pb-12 px-8 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                    {/* 左侧：品牌语与理念 */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="text-[14px] font-bold tracking-tighter text-black uppercase">
                            Hanerson<span className="text-orange-500">.</span>
                        </div>
                        <p className="text-[13px] text-black/40 font-serif italic max-w-sm leading-relaxed">
                            A curated archive of thoughts on software architecture,
                            minimalist design, and the intersection of human-computer interaction.
                        </p>
                    </div>

                    {/* 中间：技术声明 (Colophon Style) */}
                    <div className="lg:col-span-3 space-y-4">
                        <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">Build Stack</span>
                        <ul className="text-[12px] text-black/60 space-y-1 font-light">
                            <li>React 18 / TypeScript</li>
                            <li>Tailwind CSS / Framer Motion</li>
                            <li>Vercel Deployment</li>
                        </ul>
                    </div>

                    {/* 右侧：快速导航 */}
                    <div className="lg:col-span-3 space-y-4 lg:text-right">
                        <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">Network</span>
                        <div className="flex flex-col lg:items-end gap-2 text-[12px]">
                            <a
                                href="https://github.com/hanerson"
                                target="_blank"
                                className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                            >
                                GitHub <ArrowUpRight size={12} className="opacity-30" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 底部版权栏：极简的一行 */}
                <div className="pt-8 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[11px] text-black/30 flex items-center gap-4">
                        <span>© {new Date().getFullYear()} HANERSON HAO</span>
                        <span className="w-1 h-1 rounded-full bg-black/10" />
                        <span className="italic font-serif">Made in Nanjing</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;