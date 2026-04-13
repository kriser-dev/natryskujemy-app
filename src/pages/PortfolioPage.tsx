import React, {useState} from 'react';
import {
    Filter,
    MapPin,
    Maximize,
    Clock,
    ShieldCheck,
    Target,
    X,
    CheckCircle2,
    ImageIcon,
    PaintRoller,
    Layers
} from 'lucide-react';
import {projectsData} from '../data';

const categoryIconsMap: Record<string, React.ReactNode> = {
    'ShieldCheck': <ShieldCheck size={18} className="mr-2"/>,
    'PaintRoller': <PaintRoller size={18} className="mr-2"/>,
    'Layers': <Layers size={18} className="mr-2"/>
};

export default function PortfolioPage() {
    const [filter, setFilter] = useState<'all' | 'hydroizolacje' | 'malowanie' | 'gladzie'>('all');

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    return (
        <div className="bg-slate-50 min-h-screen animate-in fade-in duration-500 pb-24">
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div
                        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-primary blur-[100px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div
                        className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-sm mb-6 border border-brand-primary/30">
                        <ImageIcon size={16} className="mr-2"/> Case Studies
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Nasze <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-300">Realizacje.</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">Nie sprzedajemy obietnic.
                        Zobacz konkretne problemy techniczne naszych klientów i sprawdź, jak sprawnie je
                        rozwiązaliśmy.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div
                    className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-16">
                    <div className="flex items-center text-slate-500 font-bold uppercase tracking-widest text-xs mr-4">
                        <Filter size={16} className="mr-2"/> Filtruj:
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button onClick={() => setFilter('all')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-brand-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'}`}>Wszystkie
                        </button>
                        <button onClick={() => setFilter('hydroizolacje')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'hydroizolacje' ? 'bg-brand-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'}`}>Hydroizolacje
                            Dachów
                        </button>
                        <button onClick={() => setFilter('malowanie')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'malowanie' ? 'bg-brand-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'}`}>Malowanie
                            Hydrodynamiczne
                        </button>
                        <button onClick={() => setFilter('gladzie')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'gladzie' ? 'bg-brand-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'}`}>Gładzie
                            Polimerowe
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {filteredProjects.map(project => (
                        <div key={project.id}
                             className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group">
                            <div className="relative h-64 overflow-hidden">
                                <picture className="w-full h-full">
                                    <source srcSet={`${project.image}&w=400 400w, ${project.image}&w=800 800w`}
                                            sizes="(max-width: 768px) 100vw, 50vw" type="image/webp"/>
                                    <img
                                        src={`${project.image}&w=800`}
                                        alt={`Realizacja: ${project.title}`}
                                        className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                        width="800" height="600"
                                    />
                                </picture>
                                <div
                                    className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                                    <MapPin size={14} className="mr-1.5 text-brand-primary"/> {project.location}
                                </div>
                                <div
                                    className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col">
                                <div
                                    className="flex items-center text-brand-primary text-xs font-bold uppercase tracking-widest mb-3">
                                    {categoryIconsMap[project.iconName]} {project.category.toUpperCase()}
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-6">{project.title}</h3>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    {Object.entries(project.stats).map(([key, value], i) => (
                                        <div key={`stat-${project.id}-${i}`}
                                             className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center">
                                            {key === 'area' && <Maximize size={14} className="mr-1.5 text-brand-primary"/>}
                                            {key === 'time' && <Clock size={14} className="mr-1.5 text-brand-primary"/>}
                                            {key === 'guarantee' &&
                                                <ShieldCheck size={14} className="mr-1.5 text-brand-primary"/>}
                                            {key === 'type' && <Target size={14} className="mr-1.5 text-brand-primary"/>}
                                            {value}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center"><X
                                            size={16} className="text-red-500 mr-2"/> Problem (Wyzwanie)</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{project.problem}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center">
                                            <CheckCircle2 size={16} className="text-emerald-500 mr-2"/> Nasze
                                            Rozwiązanie</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{project.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}