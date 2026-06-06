import type { Post } from './types';

export const posts: Post[] = [
    {
        id: 20260605,
        title: "内聚/耦合原始代码参考",
        excerpt: "reference",
        date: "2026-06-05",
        tags: [],
        type: 'pdf',
        fileUrl: '/papers/rawReferences_耦合&内聚.pdf'
    },
    {
        id: 20260424,
        title: "红黑树逻辑分析以及Java实现",
        excerpt: "在Gemini帮助之下完成的有关于RBT数据结构的简要分析以及Java实践",
        date: "2026-04-24",
        tags: ["算法", "RBT"],
        type: 'pdf',
        fileUrl: '/papers/RBT.pdf'
    },
    {
        id: 20260319,
        title: "滑动窗口",
        excerpt: "使用LeetCode370来探讨滑动窗口方法设计的核心逻辑以及一般使用方法",
        date: "2026-03-19",
        tags: ["算法", "滑动窗口"],
        type: 'pdf',
        fileUrl: '/papers/滑动窗口.pdf'
    },
    {
        id: 20260310,
        title: "前缀和以及差分",
        excerpt: "详细分析前缀和数组以及差分数组的真正含义以及实际用途",
        date: "2026-03-10",
        tags: ["算法", "前缀和", "差分"],
        type: 'pdf',
        fileUrl: '/papers/前缀和以及差分.pdf'
    },
    {
        id: 20260309,
        title: "二分查找在实际解题当中的运用",
        excerpt: "在各类隐含单调元素范围的题目当中合理的使用二分查找提高算法效率",
        date: "2026-03-09",
        tags: ["算法", "二分"],
        type: 'pdf',
        fileUrl: '/papers/BinarySearch 在实际解题当中的运用.pdf'
    },
    {
        id: 103,
        type: 'folder',
        title: "BusinessIntel",
        date: "2026-03-09",
        tags: ["商业智能"],
        children: [
            ...[
                { id: 10301, title: "01 Business Intelligence", file: "01 Business Intelligence.pdf" },
                { id: 10302, title: "02 Data Warehouse 1", file: "02 Data Warehouse 1.pdf" },
                { id: 10303, title: "03 Data Warehouse 2", file: "03 Data Warehouse 2.pdf" },
                { id: 10304, title: "04 Data Warehouse 3", file: "04 Data Warehouse 3.pdf" },
                { id: 10305, title: "05 OLAP", file: "05 OLAP.pdf" },
                { id: 10306, title: "06 Design of Data Warehouse", file: "06 Design of Data Warehouse.pdf" },
                { id: 10307, title: "07 Dimensional Modeling 1", file: "07 Dimensional Modeling 1.pdf" },
                { id: 10308, title: "08 Dimensional Modeling 2", file: "08 Dimensional Modeling 2.pdf" },
                { id: 10309, title: "09 Dimensional Modeling 3", file: "09 Dimensional Modeling 3.pdf" },
                { id: 10310, title: "10 Dimensional Modeling 4", file: "10 Dimensional Modeling 4.pdf" },
                { id: 10311, title: "11 Data Mining", file: "11 Data Mining.pdf" }
            ].map(item => ({
                id: item.id,
                title: item.title,
                excerpt: "",
                date: "2026-03-09",
                tags: ["商业智能", "数据仓库", "数据挖掘"],
                type: 'pdf' as const,
                fileUrl: `/papers/BusinessIntel/${item.file}`
            }))
        ]
    },
    {
        id: 400,
        type: 'folder',
        title: "operating system 复习讲义",
        date: "2026-03-02",
        tags: ["操作系统", "CS基础"],
        children: [
            ...[
                { id: 40001, title: "01.概述", file: "01-intro.pdf" },
                { id: 40002, title: "21.处理器", file: "021-processor.pdf" },
                { id: 40003, title: "22.中断机制", file: "022-interruption.pdf" },
                { id: 40004, title: "23.进程管理", file: "023-process-management.pdf" },
                { id: 40005, title: "24.多线程技术", file: "024-multithreading.pdf" },
                { id: 40006, title: "25.进程调度", file: "025-process-scheduling.pdf" },
                { id: 40007, title: "31.存储管理基础", file: "031-storage-management.pdf" },
                { id: 40008, title: "32.分页存储管理", file: "032-paged-storage-management.pdf" },
                { id: 40009, title: "33.分段存储管理", file: "033-segmental-storage-management.pdf" },
                { id: 40010, title: "41.设备管理基础", file: "041-device-management.pdf" },
                { id: 40011, title: "42.设备概述", file: "042-devices.pdf" },
                { id: 40012, title: "43.虚拟设备", file: "043-virtual-devices.pdf" },
                { id: 40013, title: "51.文件系统基础", file: "051-file-system.pdf" },
                { id: 40014, title: "52.Linux 文件系统", file: "052-fs-in-linux.pdf" },
                { id: 40015, title: "61.并发程序设计", file: "061-concurrent-program.pdf" },
                { id: 40016, title: "62.信号量机制", file: "062-semaphore.pdf" },
                { id: 40017, title: "63.信号量经典问题", file: "063-semaphore-problems.pdf" },
                { id: 40018, title: "90.操作系统总复习", file: "90-final.pdf" }
            ].map(item => ({
                id: item.id,
                title: item.title,
                excerpt: "",
                date: "2026-03-02",
                tags: ["讲义", "操作系统"],
                type: 'pdf' as const,
                fileUrl: `/papers/OS/${item.file}`
            }))
        ]
    },
    {
        id: 20260202,
        title: "libGDX的设计哲学以及软件工程实践",
        excerpt: "记录第一次与游戏引擎——libGDX的通力合作",
        date: "2026-02-02",
        tags: ["方法", "框架"],
        type: 'pdf',
        fileUrl: '/papers/libGDX的开发哲学与项目实践.pdf'
    },
    {
        id: 20260127,
        title: "如何学习各种大型框架？—— FUP(finite understanding protocol)",
        excerpt: "希望通过“有限理解协议”来建立一种可以在有限窗口期当中高效学习各种大型框架（如libGDX, React, Spring）的方法论",
        date: "2026-01-27",
        tags: ["方法", "框架"],
        type: 'pdf',
        fileUrl: '/papers/一种个人学习方法论——FUP.pdf'
    },
    {
        id: 20260123,
        title: "从LeetCode1219与3459看：什么时候dp成立？",
        excerpt: "通过对于力扣1219和3459的详细分析，探讨什么时候dp是合适的，什么时候dp不合适",
        date: "2026-01-23",
        tags: ["算法", "Java"],
        type: 'pdf',
        fileUrl: '/papers/dp什么时候成立.pdf'
    },
    {
        id: 20260110,
        title: "图论算法Kruskal、Prim与Dijkstra详细解析",
        excerpt: "对于Kruskal、Prim与Dijkstra三大图论算法的详细解释，附带Java实现",
        date: "2026-01-10",
        tags: ["算法", "图论", "Java", "原创"],
        type: 'pdf',
        fileUrl: '/papers/图论三算法.pdf'
    },
    {
        id: 20260109,
        title: "基于Java实现的各类排序算法详解",
        excerpt: "详细解释了各种排序算法的运行逻辑以及复杂度分析",
        date: "2026-01-09",
        tags: ["算法", "排序", "Java", "原创"],
        type: 'pdf',
        fileUrl: '/papers/基于代码实现的排序算法深入讲解.pdf'
    },

    // --- 课程资料文件夹：数据结构 (ID: 900) ---
    {
        id: 900,
        type: 'folder',
        title: "数据结构与算法往年卷复习参考",
        date: "2026-01-02",
        tags: ["算法", "往年卷"],
        children: [
            {
                id: 90001,
                title: "数据结构与算法2023",
                excerpt: "2023年往年卷（2021级前辈试卷）",
                date: "2026-01-08",
                        tags: ["往年卷", "算法"],
                        type: 'pdf',
                fileUrl: '/papers/DStructure_Review/2023.pdf'
            },
            {
                id: 90002,
                title: "数据结构与算法2021",
                excerpt: "2021年往年卷",
                date: "2026-01-08",
                        tags: ["往年卷", "算法"],
                        type: 'pdf',
                fileUrl: '/papers/DStructure_Review/2021.pdf'
            },
        ]
    },

    // --- 课程资料：南软通识 ---
    {
        id: 2026010501,
        title: "南京大学2025年毛泽东思想概述重点问题整理",
        excerpt: "课程梳理以及问题概述",
        date: "2026-01-05",
        tags: ["南软", "通识", "复习资料"],
        type: 'pdf',
        fileUrl: '/papers/maoTheory.pdf'
    },
    {
        id: 2026010502,
        title: "南京大学2025年习概重点问题整理",
        excerpt: "重点理论整理",
        date: "2026-01-05",
        tags: ["共创", "南软", "通识"],
        type: 'pdf',
        fileUrl: '/papers/xiTheory.pdf'
    },

    {
        id: 800,
        type: 'folder',
        title: "计算机组成与体系结构复习讲义",
        date: "2026-01-02",
        tags: ["计组", "CS基础"],
        children: [
            {
                id: 80099,
                type: 'folder',
                title: "COA 相关作业整合",
                date: "2026-01-07",
                                tags: ["作业"],
                children: Array.from({ length: 10 }, (_, i) => ({
                    id: 8009901 + i,
                    title: `COA 作业 ${i + 1}`,
                    excerpt: ``,
                    date: "2026-01-02",
                        tags: ["作业", "计组"],
                    
                    type: "pdf" as const,
                    fileUrl: `/papers/COA/COA_homeworks/HW_${i + 1}.pdf`
                }))
            },
            ...[
                { id: 80018, title: "90. 组成原理总复习", file: "90-复习.pdf" },
                { id: 80017, title: "17. 输入输出系统", file: "17-输入输出.pdf" },
                { id: 80016, title: "16. 总线系统", file: "16-总线.pdf" },
                { id: 80015, title: "15. 控制器逻辑", file: "15-控制器.pdf" },
                { id: 80014, title: "14. 指令流水线", file: "14-指令流水线.pdf" },
                { id: 80013, title: "13. 指令系统", file: "13-指令系统.pdf" },
                { id: 80012, title: "12. 虚拟存储器", file: "12-虚拟存储器.pdf" },
                { id: 80011, title: "11. RAID 技术", file: "11-RAID.pdf" },
                { id: 80010, title: "10. 外部存储器", file: "10-外部存储器.pdf" },
                { id: 80009, title: "09. Cache 映射", file: "09-Cache.pdf" },
                { id: 80008, title: "08. 内部存储器", file: "08-内部存储器.pdf" },
                { id: 80007, title: "07. BCD 运算", file: "07-BCD运算.pdf" },
                { id: 80006, title: "06. 浮点运算", file: "06-浮点运算.pdf" },
                { id: 80005, title: "05. 整数运算", file: "05-整数运算.pdf" },
                { id: 80004, title: "04. 校验码", file: "04-校验码.pdf" },
                { id: 80003, title: "03. 数据表示", file: "03-数据表示.pdf" },
                { id: 80002, title: "02. 计算机的顶层视图", file: "02-计算机的顶层视图.pdf" },
                { id: 80001, title: "01. 概述", file: "01-概述.pdf" }
            ].map(item => ({
                id: item.id,
                title: item.title,
                excerpt: "",
                date: "2026-01-02",
                tags: ["讲义", "计组"],
                
                type: 'pdf' as const,
                fileUrl: `/papers/COA/${item.file}`
            }))
        ]
    },

    // --- 课程资料文件夹：数据库 (ID: 700) ---
    {
        id: 700,
        type: 'folder',
        title: "数据管理基础",
        date: "2026-01-01",
        tags: ["数据库"],
        children: [
            {
                id: 70099,
                type: "folder",
                title: "重点章节",
                date: "2026-01-04",
                                tags: ["重点章节"],
                children: [
                    { id: 7009901, title: "视图", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/视图.pdf' },
                    { id: 7009902, title: "关系范式", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/关系范式.pdf' },
                    { id: 7009903, title: "存取控制", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/存取控制.pdf' },
                    { id: 7009904, title: "并发", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/并发.pdf' },
                    { id: 7009905, title: "概念模型以及ER图", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/概念模型以及ER图.pdf' },
                    { id: 7009906, title: "数据库故障相关", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/数据库故障相关.pdf' },
                    { id: 7009907, title: "断言与触发器", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/断言与触发器.pdf' },
                    { id: 7009908, title: "NoSQL与仲裁", date: "2026-01-04", tags: ["数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/pointChapters/NoSQL与仲裁.pdf' },
                ]
            },
            { id: 70010, title: "数据库作业整合", date: "2026-01-04", tags: ["作业", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/作业.pdf' },
            { id: 70009, title: "数据库个人笔记", date: "2026-01-04", tags: ["笔记", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/笔记.pdf' },
            { id: 70008, title: "数据库课件章节导航", date: "2026-01-04", tags: ["导航", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/导航.pdf' },
            { id: 70007, title: "数据库基础2023往年卷", date: "2026-01-03", tags: ["往年卷", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/2023.pdf' },
            { id: 70006, title: "数据库基础2020往年卷", date: "2026-01-03", tags: ["往年卷", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/2020.pdf' },
            { id: 70005, title: "数据库基础复习总指南", date: "2026-01-01", tags: ["复习指南", "数据库"], type: 'pdf', fileUrl: '/papers/数据库复习相关/复习指南.pdf' }
        ]
    },
    {
        id: 20260101,
        title: "我的2025年年度总结",
        excerpt: "“在奋勇向前的路上，也别忘了停下来反思自己走过的路2025”",
        date: "2026-01-01",
        tags: ["年度总结"],
        
        type: 'pdf',
        fileUrl: '/papers/2025Conclusion.pdf'
    },
    {
        id: 20251209,
        title: "Cream -- 一种反向验证的代码生成检查框架",
        excerpt: "通过“搜索相似” + “代码生成”提高 viber_coding 可行性",
        date: "2025-12-09",
        tags: ["AI", "原创", "代码生成"],
        type: 'pdf',
        fileUrl: '/papers/Cream.pdf'
    },
    {
        id: 101,
        type: 'folder',
        title: "计算系统基础",
        date: "2025-06-07",
        tags: ["计算系统", "CS基础", "计算机组成原理"],
        children: [
            ...[
                { id: 10101, title: "c1 计算系统概述", file: "c1计算系统概述.pdf" },
                { id: 10102, title: "c2 数据的机器级表示-1", file: "c2 数据的机器级表示-1.pdf" },
                { id: 10103, title: "c3 数据的机器级表示-2", file: "c3 数据的机器级表示-2.pdf" },
                { id: 10104, title: "c4 数据的运算", file: "c4 数据的运算.pdf" },
                { id: 10105, title: "c5 数字逻辑电路", file: "c5 数字逻辑电路.pdf" },
                { id: 10106, title: "c6 dlx系统", file: "c6 dlx系统.pdf" },
                { id: 10107, title: "c7 指令集架构", file: "c7 指令集架构.pdf" },
                { id: 10108, title: "c9 汇编语言", file: "c9 汇编语言.pdf" }
            ].map(item => ({
                id: item.id,
                title: item.title,
                excerpt: "",
                date: "2025-06-07",
                tags: ["讲义", "计算系统基础"],
                
                type: 'pdf' as const,
                fileUrl: `/papers/计算系统基础/${item.file}`
            }))
        ]
    }
];