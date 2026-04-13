export type Page = 'home' | 'portfolio' | 'about' | 'process' | 'privacy' | 'cookies' | '404';

export interface FAQItemData {
    q: string;
    a: string;
}

export interface Opinion {
    text: string;
    author: string;
}

export interface ProjectStats {
    area?: string;
    time?: string;
    guarantee?: string;
    type?: string;
}

export interface Project {
    id: number;
    category: 'hydroizolacje' | 'malowanie' | 'gladzie';
    iconName: 'ShieldCheck' | 'PaintRoller' | 'Layers';
    title: string;
    location: string;
    image: string;
    stats: ProjectStats;
    problem: string;
    solution: string;
}

export interface AppContextType {
    currentPage: Page;
    isNavigating: boolean;
    navigateTo: (page: Page, hash?: string) => void;
}