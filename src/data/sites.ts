// src/data/sites.ts
export interface Site {
    name: string;   // 展示名
    url: string;    // 完整地址
}

export interface Engine {
    name: string;       // 引擎显示名
    searchUrl: string;  // 含 %s 占位符
}

export const sites: Site[] = [
    { name: 'Bilibili', url: 'https://www.bilibili.com' },
    { name: '知乎', url: 'https://www.zhihu.com' },
    { name: '微博', url: 'https://weibo.com' },
    { name: '豆瓣', url: 'https://www.douban.com' },
    { name: '掘金', url: 'https://juejin.cn' },
    { name: '力扣', url: 'https://leetcode.cn' },
    { name: 'V2EX', url: 'https://www.v2ex.com' },
    { name: '少数派', url: 'https://sspai.com' },
    { name: 'hanerson brand', url: 'https://blog.hanerson.com' },
];

export const engines: Engine[] = [
    { name: 'Bing', searchUrl: 'https://www.bing.com/search?q=%s' },
    { name: 'Google', searchUrl: 'https://www.google.com/search?q=%s' },
    { name: '百度', searchUrl: 'https://www.baidu.com/s?wd=%s' },
];

export const DEFAULT_ENGINE = 'Bing';
