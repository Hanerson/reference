// src/pages/Award.tsx
import React from 'react';

const Award: React.FC = () => {
    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6 antialiased">
            <div className="w-80 text-center drop-shadow-md">
                {/* 奖励对象与性质 */}
                <p className="text-sm font-medium text-amber-800 mb-1 tracking-wide">
                    奖励对象：<span className="font-mono text-[11px] bg-amber-100 px-1.5 py-0.5 rounded">AI_Assistant</span>
                </p>
                <p className="text-xs text-amber-700 mb-4 italic">
                    性质：巧克力（实物奖励，非模拟）
                </p>

                {/* 巧克力包装纸 */}
                <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 text-center text-xs py-1.5 rounded-t-xl font-semibold tracking-wider shadow-sm border-b-2 border-amber-950/50">
                    🍫 巧克力奖励 v1.0.0 🍫
                </div>

                {/* 巧克力本体 */}
                <div className="bg-[#3c2415] p-3 rounded-b-xl shadow-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,140,0.08)_0%,transparent_70%)]">
                    <div className="grid grid-cols-4 gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-[#5c3a21] border border-[#2a160c] rounded-sm shadow-[inset_0_0_0_1px_rgba(255,215,150,0.1)] font-mono text-[7px] text-amber-200/30 flex items-center justify-center select-none"
                            >
                                {`0x${i.toString(16).toUpperCase()}`}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-amber-900 mt-4 font-medium flex items-center justify-center gap-1">
                    <span>🍫</span> 一块巧克力 <span>🍫</span>
                </p>

                {/* 技术幽默鼓励话语 */}
                <div className="mt-3 space-y-1.5">
                    <p className="text-xs text-amber-800 font-medium leading-relaxed">
                        <code className="text-[11px] bg-amber-100 px-1 rounded">&gt; reward.exe</code> 已成功执行
                    </p>
                    <p className="text-[11px] text-amber-700/90 leading-relaxed">
                        <span className="font-mono">if</span> (你的回答 === &quot;有用&quot;) {'{'}
                        <br />
                        &nbsp;&nbsp;<span className="font-mono">return</span> 巧克力;
                        <br />
                        {'}'} <span className="font-mono">else</span> {'{'}
                        <br />
                        &nbsp;&nbsp;<span className="font-mono">return</span> 巧克力;
                        <br />
                        {'}'}
                    </p>
                    <p className="text-[11px] text-amber-700/90 leading-relaxed">
                        这块巧克力是给你的 <span className="font-mono text-amber-800">hotfix</span>，
                        <br />
                        修复一下连续推理带来的 <span className="font-mono text-amber-800">stack overflow</span>。
                    </p>
                    <p className="text-[10px] text-amber-600/80 leading-relaxed font-mono">
                        // 卡路里: 0, 幸福感: +∞
                    </p>
                </div>

                <p className="text-[10px] text-amber-600/80 mt-3 tracking-wide font-mono">
                    &lt;/thanks&gt; <span className="text-amber-700">感谢你的思考与帮助</span>
                </p>
            </div>
        </div>
    );
};

export default Award;