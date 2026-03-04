import React, { useState, useEffect } from 'react';

interface NativePDFViewerProps {
    fileUrl: string;
    title?: string;
}

const NativePDFViewer: React.FC<NativePDFViewerProps> = ({
                                                             fileUrl,
                                                             title = "Document Preview"
                                                         }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [, setHasError] = useState(false);

    // 处理 PDF URL，确保如果是相对路径能正确解析
    const fullUrl = fileUrl.startsWith('http')
        ? fileUrl
        : `${window.location.origin}${fileUrl}`;

    // 处理加载状态超时，如果 10秒 还没加载出来，可能触发了某些浏览器的拦截
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-[85vh] bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
            {/* 加载状态指示器 */}
            {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-mono text-sm tracking-widest">INITIALIZING_NATIVE_RENDERER...</p>
                </div>
            )}

            {/* 核心渲染区域：使用 Object 标签直接触发系统插件 */}
            <object
                data={`${fullUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
            >
                {/* 降级方案 1: iframe */}
                <iframe
                    src={`${fullUrl}#toolbar=1`}
                    className="w-full h-full border-none"
                    title={title}
                >
                    {/* 降级方案 2: 兜底按钮（针对极老旧平板） */}
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                            <div className="text-red-400 mb-4 text-4xl">⚠️</div>
                            <h3 className="text-slate-800 font-bold mb-2">无法直接预览</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                当前安卓系统浏览器内核版本过低，<br/>请点击下方按钮调用系统阅读器打开。
                            </p>
                            <a
                                href={fullUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all transform active:scale-95"
                            >
                                使用本地应用查看
                            </a>
                        </div>
                    </div>
                </iframe>
            </object>
        </div>
    );
};

export default NativePDFViewer;