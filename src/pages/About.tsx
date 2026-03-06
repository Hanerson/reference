import React from 'react';
import { motion } from 'framer-motion';
import {Github, Code, ArrowUpRight, MapPin, Compass,} from 'lucide-react';

const About: React.FC = () => {
    const skills = [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"] },
        { category: "Tools", items: ["Git", "Docker", "Webpack", "Vercel"] },
        { category: "Core", items: ["Node.js", "UI/UX Design", "Competitive Algorithms"] }
    ];

    const education = [
        {
            school: "Nanjing University",
            role: "Software Engineering · Bachelor",
            period: "2024 - PRESENT",
            desc: "Focusing on core system architecture and modern web engineering at the School of Software.",
            tags: ["Algorithms", "System Design"]
        },
        {
            school: "Huai'an Middle School",
            role: "Highest Honors Graduate",
            period: "2021 - 2024",
            desc: "District Champion of 2024 Gaokao (Ranked 227th in Jiangsu Province). Olympiad in Mathematics (Provincial First Prize).",
            tags: ["High School Hero", "Math Olympiad"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f8f7] text-[#1a1a1a] selection:bg-black selection:text-white pb-32">

            {/* --- Hero Section --- */}
            <section className="pt-40 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[11px] font-bold tracking-[0.3em] text-orange-600 uppercase mb-6">
                                Introduction
                            </h2>
                            <h1 className="text-5xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-8">
                                I build <span className="italic font-serif underline decoration-black/5 underline-offset-8">digital systems</span> with logic and aesthetics.
                            </h1>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end border-l lg:border-l-0 lg:border-r border-black/5 pl-8 lg:pl-0 lg:pr-8 py-2">
                        <div className="text-[13px] space-y-2 text-black/40 italic font-serif">
                            <p className="flex items-center gap-2 not-italic font-sans text-black">
                                <MapPin size={12} /> Nanjing, China
                            </p>
                            <p>Currently pursuing excellence at NJU.</p>
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
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">Academic Path</h3>
                            <div className="flex-1 h-[1px] bg-black/5" />
                        </div>
                        <div className="space-y-16">
                            {education.map((edu, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h4 className="text-2xl font-normal tracking-tight">{edu.school}</h4>
                                        <span className="font-mono text-[10px] text-black/20">{edu.period}</span>
                                    </div>
                                    <p className="text-orange-600/80 text-[11px] font-bold uppercase tracking-widest mb-4">{edu.role}</p>
                                    <p className="text-black/50 text-[15px] leading-relaxed max-w-xl mb-6 italic font-serif">
                                        "{edu.desc}"
                                    </p>
                                    <div className="flex gap-4">
                                        {edu.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-black/20 font-medium">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Personal Philosophy */}
                    <section className="bg-black text-[#f8f8f7] p-12 md:p-16 rounded-sm">
                        <div className="flex items-center gap-4 mb-8 opacity-30">
                            <Compass size={18} strokeWidth={1} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">Philosophy</span>
                        </div>
                        <p className="text-2xl md:text-3xl font-serif italic leading-snug">
                            "Engineering is not just about writing code; it's about <span className="text-orange-400">architecting thought</span> and reducing entropy in a chaotic world."
                        </p>
                    </section>
                </div>

                {/* Right Side: Skills & Links */}
                <div className="lg:col-span-5 space-y-24">

                    {/* Technical Stack - 紧凑列表样式 */}
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-10">Capabilities</h3>
                        <div className="space-y-10">
                            {skills.map((skill, i) => (
                                <div key={i} className="border-b border-black/[0.03] pb-6 hover:border-black/10 transition-colors group">
                                    <h4 className="text-[10px] font-bold text-orange-600/60 uppercase mb-4 tracking-tighter">{skill.category}</h4>
                                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                                        {skill.items.map(item => (
                                            <span key={item} className="text-base font-normal text-black/70 group-hover:text-black transition-colors">
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
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">Connect</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <a href="https://github.com/hanerson" target="_blank" className="flex items-center justify-between p-4 bg-white hover:bg-black hover:text-white transition-all group">
                                <div className="flex items-center gap-3">
                                    <Github size={16} />
                                    <span className="text-sm font-medium">GitHub Repository</span>
                                </div>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="https://leetcode.cn/u/fu-guang-1e/" target="_blank" className="flex items-center justify-between p-4 bg-white hover:bg-black hover:text-white transition-all group">
                                <div className="flex items-center gap-3">
                                    <Code size={16} />
                                    <span className="text-sm font-medium">Algorithm Profile</span>
                                </div>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="mt-40 text-center opacity-20">
                <p className="font-serif italic text-sm">Fin.</p>
            </footer>
        </div>
    );
};

export default About;