import { useState, useMemo, useRef, useEffect } from 'react';
import { ExternalLink, Github, Play, ChevronDown, ChevronUp, X } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

export default function ProjectsTab() {
  const [projectFilter, setProjectFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoModal]);

  const categories = useMemo(() => {
    return ['All', ...new Set(PROJECTS.map(p => p.category))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === projectFilter);
  }, [projectFilter]);

  const displayedProjects = showAll || projectFilter !== 'All' ? filteredProjects : filteredProjects.filter(p => p.featured);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold font-mono">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">Featured Projects</h2>
          <p className="text-slate-400 text-sm max-w-lg">
            Production applications built with React, React Native, Node.js, and AI integrations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setProjectFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                projectFilter === cat 
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedProjects.map((project) => (
          <div 
            key={project.id} 
            className="group relative flex flex-col rounded-2xl bg-slate-950/70 border border-slate-800/60 overflow-hidden hover:border-slate-700/80 transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-900">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800/80 text-xs font-semibold text-slate-300">
                {project.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.highlights && (
                <div className="space-y-1.5">
                  {project.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400 mt-0.5">▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono font-medium text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  )}
                  {project.videoUrl && (
                    <button 
                      onClick={() => setVideoModal(project.videoUrl)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </button>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a 
                      href={project.playStoreUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                      </svg>
                      <span>Google Play</span>
                    </a>
                  )}
                  {project.appStoreUrl && (
                    <a 
                      href={project.appStoreUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.69-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <span>App Store</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projectFilter === 'All' && filteredProjects.length > 2 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
          >
            {showAll ? (
              <><ChevronUp className="w-4 h-4" /> View Less</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> View All Projects</>
            )}
          </button>
        </div>
      )}

      {videoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => { videoRef.current?.pause(); setVideoModal(null); }}
        >
          <div className="relative max-w-3xl w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            <button
              onClick={() => { videoRef.current?.pause(); setVideoModal(null); }}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <video 
              ref={videoRef}
              className="w-full aspect-video" 
              controls 
              autoPlay
              onClick={(e) => e.stopPropagation()}
            >
              <source src={videoModal} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
