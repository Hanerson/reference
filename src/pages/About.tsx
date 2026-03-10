import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, ArrowUpRight, MapPin, Compass } from 'lucide-react';
import {Link} from "react-router-dom";

const About: React.FC = () => {
    const skills = [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"] },
        { category: "Tools", items: ["Git", "Docker", "Webpack", "Vercel"] },
        { category: "Core", items: ["Node.js", "UI/UX Design", "Competitive Algorithms"] }
    ];

    const education = [
        {
            school: "Nanjing University / 南京大学",
            role: "Software Engineering · Bachelor / 软件工程 · 本科",
            period: "2024 - PRESENT",
            desc: "就读于软件学院, 在系统底层逻辑与现代前端工程的交汇处，探索软件的无限可能",
            tags: ["Algorithms", "System Design"]
        },
        {
            school: "Huai'an Middle School / 淮安中学",
            role: "Highest Honors Graduate / 2024届毕业生",
            period: "2021 - 2024",
            desc: "2024年高考淮安区状元. 曾获数学奥数省一等奖",
            tags: ["Honors", "Mathematics"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f8f7] text-[#1a1a1a] selection:bg-black selection:text-white pb-32">

            <Link
                to="/"
                className="fixed top-8 left-8 md:top-12 md:left-12 z-50 group flex items-center gap-3"
            >
                <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-black/5 group-hover:scale-110 group-hover:border-black/20 transition-all duration-500" />
                    <ArrowUpRight size={14} className="absolute -rotate-90 text-black/30 group-hover:text-black transition-colors" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black/20 group-hover:text-black uppercase transition-all">
                    Back <span className="hidden md:inline">to Index</span>
                </span>
            </Link>


            <section className="pt-40 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-bold tracking-[0.3em] text-orange-600 uppercase mb-6">
                                Introduction / 个人简介
                            </h2>
                            <h1 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.25] mb-8 text-black">
                                <span className="block mb-1">Fu Hao. (Hanerson)</span>
                            </h1>
                            <p className="text-[15px] text-black/50 max-w-lg leading-relaxed font-serif italic border-l border-black/10 pl-6 mt-10">
                                南京大学软件学院在读, 专注于前端架构与算法优化
                            </p>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end border-l lg:border-l-0 lg:border-r border-black/5 pl-8 lg:pl-0 lg:pr-8 py-2">
                        <div className="text-[13px] space-y-2 text-black/40 italic font-serif text-left lg:text-right">
                            <p className="flex items-center lg:justify-end gap-2 not-italic font-sans text-black">
                                <MapPin size={12} /> 南京 · 中国
                            </p>
                            <p>Currently pursuing excellence at NJU.</p>
                            <p className="not-italic text-[10px] font-mono uppercase tracking-widest opacity-30 pt-4">Status: Active_Learning</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Main Content Grid --- */}
            <main className="px-8 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

                {/* Left Side: Education & Story */}
                <div className="lg:col-span-7 space-y-32">

                    {/* Education */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">Academic Path / 学业历程</h3>
                            <div className="flex-1 h-[1px] bg-black/5" />
                        </div>
                        <div className="space-y-16">
                            {education.map((edu, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-4 gap-2">
                                        <h4 className="text-[18px] md:text-xl font-medium tracking-tight">{edu.school}</h4>
                                        <span className="font-mono text-[10px] text-black/20 tracking-tighter uppercase">{edu.period}</span>
                                    </div>
                                    <p className="text-orange-600/80 text-[10px] font-bold uppercase tracking-[0.15em] mb-4">{edu.role}</p>
                                    <p className="text-black/50 text-[14px] leading-relaxed max-w-xl mb-6 font-serif italic">
                                        "{edu.desc}"
                                    </p>
                                    <div className="flex gap-4">
                                        {edu.tags.map(tag => (
                                            <span key={tag} className="text-[9px] text-black/20 font-bold uppercase tracking-widest">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Personal Philosophy */}
                    <section className="bg-[#1a1a1a] text-[#f8f8f7] p-10 md:p-14 rounded-sm relative overflow-hidden">
                        {/* 装饰性背景文字 */}
                        <div className="absolute -right-4 -bottom-4 text-[100px] font-serif italic text-white/[0.03] select-none">
                            Thought
                        </div>
                        <div className="flex items-center gap-4 mb-8 opacity-30">
                            <Compass size={16} strokeWidth={1} />
                            <span className="text-[9px] uppercase tracking-[0.4em]">Philosophy / 哲学</span>
                        </div>
                        <p className="text-xl md:text-2xl font-serif italic leading-relaxed relative z-10">
                            "Engineering is not just about writing code; it's about <span className="text-orange-400">architecting thought</span> and reducing entropy in a chaotic world."
                        </p>
                    </section>
                </div>

                {/* Right Side: Skills & Links */}
                <div className="lg:col-span-5 space-y-24">

                    {/* Technical Stack */}
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-10">Capabilities / 技能栈</h3>
                        <div className="space-y-10">
                            {skills.map((skill, i) => (
                                <div key={i} className="border-b border-black/[0.04] pb-6 group">
                                    <h4 className="text-[9px] font-bold text-orange-600/60 uppercase mb-4 tracking-widest">{skill.category}</h4>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {skill.items.map(item => (
                                            <span key={item} className="text-[15px] font-normal text-black/60 group-hover:text-black transition-colors duration-300">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Digital Presence */}
                    <section className="space-y-6 pt-12 border-t border-black/5">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">Connect / 连接</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <a href="https://github.com/hanerson" target="_blank" className="flex items-center justify-between p-4 bg-white border border-black/[0.03] hover:bg-black hover:text-white transition-all duration-500 group">
                                <div className="flex items-center gap-3">
                                    <Github size={16} strokeWidth={1.5} />
                                    <span className="text-[13px] font-medium tracking-tight">GitHub Repository</span>
                                </div>
                                <ArrowUpRight size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="https://leetcode.cn/u/fu-guang-1e/" target="_blank" className="flex items-center justify-between p-4 bg-white border border-black/[0.03] hover:bg-black hover:text-white transition-all duration-500 group">
                                <div className="flex items-center gap-3">
                                    <Code size={16} strokeWidth={1.5} />
                                    <span className="text-[13px] font-medium tracking-tight">Algorithm Profile</span>
                                </div>
                                <ArrowUpRight size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="mt-40 text-center">
                <div className="inline-block px-8 py-px bg-black/[0.03] rounded-full">
                    <p className="font-serif italic text-[12px] text-black/20 tracking-widest uppercase">Fin.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;