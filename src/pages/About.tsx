import React from 'react';
import { Github, Code } from 'lucide-react';
import {Link} from "react-router-dom";

const About: React.FC = () => {
    const skills = [
        { category: "前端", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite"] },
        { category: "工具", items: ["Git", "Docker", "Webpack", "Vercel"] },
        { category: "核心", items: ["Node.js", "UI/UX Design", "Competitive Algorithms"] }
    ];

    const education = [
        {
            school: "南京大学",
            role: "软件工程 · 本科",
            period: "2024 - 至今",
            desc: "就读于软件学院，在系统底层逻辑与现代前端工程的交汇处，探索软件的无限可能"
        },
        {
            school: "淮安中学",
            role: "2024届毕业生",
            period: "2021 - 2024",
            desc: "2024年高考淮安区状元，曾获数学奥数省一等奖"
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-16">
            {/* 顶栏导航 */}
            <nav className="sticky top-0 w-full bg-white border-b border-gray-200 px-6 py-3">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors">
                        ← 返回列表
                    </Link>
                </div>
            </nav>

            {/* 主内容 */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* 个人信息头部 */}
                <section className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">付浩 (Hanerson)</h1>
                    <p className="text-base text-gray-600 mb-2">南京大学软件学院在读</p>
                    <p className="text-sm text-gray-500">专注于前端架构与算法优化</p>
                </section>

                {/* 教育经历 */}
                <section className="mb-12">
                    <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-wide">教育经历</h2>
                    <div className="space-y-6">
                        {education.map((edu, i) => (
                            <div key={i} className="p-5 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-base font-semibold text-gray-900">{edu.school}</h3>
                                    <span className="text-xs text-gray-400 font-mono">{edu.period}</span>
                                </div>
                                <p className="text-xs text-blue-600 mb-3 font-medium">{edu.role}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {edu.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 技能栈 */}
                <section className="mb-12">
                    <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-wide">技能栈</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {skills.map((skill, i) => (
                            <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map(item => (
                                        <span key={item} className="text-xs px-2.5 py-1 bg-white rounded-md text-gray-600 border border-gray-200">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 联系方式 */}
                <section>
                    <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-wide">联系方式</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="https://github.com/hanerson" target="_blank" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                            <Github size={20} className="text-gray-600 group-hover:text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">GitHub</span>
                        </a>
                        <a href="https://leetcode.cn/u/fu-guang-1e/" target="_blank" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                            <Code size={20} className="text-gray-600 group-hover:text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">LeetCode</span>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;