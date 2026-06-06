export type PostType = 'article' | 'pdf' | 'folder';

export interface Post {
    id: number;
    title: string;
    excerpt?: string;
    date: string;
    type: PostType;
    fileUrl?: string;
    children?: Post[];
    tags: string[];
}