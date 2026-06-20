import { useState } from 'react';
import { Menu, Mail, User, Code, Cpu, Briefcase } from 'lucide-react';
import { DEV_PROFILE } from './data/portfolio';
import CanvasParticles from './components/CanvasParticles';
import HomeTab from './components/HomeTab';
import ProjectsTab from './components/ProjectsTab';
import SkillsTab from './components/SkillsTab';
import ExperienceTab from './components/ExperienceTab';
import ChatBot from './components/ChatBot';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <CanvasParticles />

      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      <header className="sticky top-0 z-50 bg-[#030712]/75 backdrop-blur-xl border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-[0.95]">
              <img src="/images/icon.png" alt="Logo" className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {DEV_PROFILE.name}
              </span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold font-mono">
                portfolio v2.5
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/50 p-1.5 rounded-full border border-slate-800/80">
            {[
              { id: 'home', label: 'Home', icon: User },
              { id: 'projects', label: 'Projects', icon: Code },
              { id: 'skills', label: 'Skills', icon: Cpu },
              { id: 'experience', label: 'Experience', icon: Briefcase }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-indigo-500/30" />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a 
              href={`mailto:${DEV_PROFILE.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Hire Me</span>
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#030712] p-6 flex flex-col gap-6 md:hidden animate-fade-in-down">
          <div className="flex flex-col gap-3">
            {[
              { id: 'home', label: 'Home', icon: User },
              { id: 'projects', label: 'Projects', icon: Code },
              { id: 'skills', label: 'Skills', icon: Cpu },
              { id: 'experience', label: 'Experience', icon: Briefcase }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white border-l-4 border-cyan-400' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="h-px bg-slate-800/80 my-2"></div>

          <div className="flex flex-col gap-3">
            <a 
              href={`mailto:${DEV_PROFILE.email}`}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold"
            >
              <Mail className="w-5 h-5" />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
      </main>

      <ChatBot chatOpen={chatOpen} setChatOpen={setChatOpen} />

      <footer className="border-t border-slate-900 bg-slate-950/60 py-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/icon.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
            <span className="font-mono text-xs text-slate-400">Min Khant Zaw © 2026. Made with React, Tailwind & AI</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => setActiveTab('skills')} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => setActiveTab('experience')} className="hover:text-white transition-colors">Experience</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
