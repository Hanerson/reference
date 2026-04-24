import React from 'react';
import { motion } from 'framer-motion';

const TaskStack: React.FC = () => {
    // 模拟多线程任务数据
    const tasks = [
        { title: "使用LeetCode2528.来进一步详解差分数组以及答案二分", progress: 34, category: "算法", status: "准备中" },
    ];

    return (
        <section className="my-12 px-2">
            {/* 头部装饰：极简的标题 */}
            <div className="flex items-center gap-3 mb-6 px-4">
                <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
                    Active_Threads / 正在进行
                </span>
            </div>

            <div className="border-y border-black/[0.03] bg-[#f2f2f0]/40 divide-y divide-black/[0.03]">
                {tasks.map((task, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col md:flex-row md:items-center justify-between py-4 px-4 gap-4 transition-colors hover:bg-white/50"
                    >
                        {/* 任务核心：标题与分类 */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                                <span className="text-[9px] font-mono text-black/20 uppercase tracking-tighter border border-black/5 px-1.5 py-0.5">
                                    {task.category}
                                </span>
                                <span className="text-[10px] text-orange-600/50 font-serif italic">
                                    {task.status}
                                </span>
                            </div>
                            <h3 className="text-[13px] md:text-[14px] font-normal text-black/70 tracking-tight line-clamp-1 group-hover:text-black transition-colors">
                                {task.title}
                            </h3>
                        </div>

                        {/* 进度显示：极窄进度条 */}
                        <div className="flex items-center gap-6 shrink-0 min-w-[120px]">
                            <div className="flex-1">
                                <div className="flex justify-between text-[9px] font-mono text-black/20 mb-1 tracking-tighter">
                                    <span>PROGRESS</span>
                                    <span>{task.progress}%</span>
                                </div>
                                <div className="h-[1px] w-full bg-black/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${task.progress}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-black/30 group-hover:bg-orange-500/40 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 底部点缀 */}
            <div className="mt-4 px-4 flex justify-end">
                <p className="text-[9px] font-serif italic text-black/20 tracking-widest uppercase">
                    Synchronizing across multiple domains
                </p>
            </div>
        </section>
    );
};

export default TaskStack;