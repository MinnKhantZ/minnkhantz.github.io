import { Sparkles, ChevronRight, User, Github, Linkedin, Mail, Terminal, Zap, Layers, Code, Cpu } from 'lucide-react';
import { DEV_PROFILE } from '../data/portfolio';

export default function HomeTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="space-y-24">
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-center">
          <div className="lg:col-span-7 space-y-8 md:space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold tracking-wider mx-auto lg:mx-0">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Portfolio v2.5</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Building apps with <br/>
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI & cloud-ready backends.
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {DEV_PROFILE.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => setActiveTab('projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <a 
              href={DEV_PROFILE.resumeUrl}
              target="_blank"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 transition-all cursor-pointer"
            >
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="flex items-center gap-5 pt-4 justify-center lg:justify-start">
            <a href={DEV_PROFILE.github} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:-translate-y-1 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href={DEV_PROFILE.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-400/40 hover:-translate-y-1 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${DEV_PROFILE.email}`} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-400/40 hover:-translate-y-1 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-800/80 p-6 shadow-2xl overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-xl pointer-events-none group-hover:scale-125 transition-all duration-700"></div>

            <div className="relative space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs font-semibold text-slate-400">min_khant_zaw.config</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1.5px] shadow-md shadow-indigo-500/15">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <User className="w-8 h-8 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{DEV_PROFILE.name}</h3>
                  <p className="text-xs text-slate-400">{DEV_PROFILE.title}</p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 font-mono text-[11px] text-slate-300 space-y-1">
                <p><span className="text-cyan-400">"status"</span>: <span className="text-yellow-400">"Open for remote work"</span>,</p>
                <p><span className="text-cyan-400">"focus"</span>: [<span className="text-purple-400">"full_stack_dev"</span>, <span className="text-purple-400">"AI_integration"</span>],</p>
                <p><span className="text-cyan-400">"stack"</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"RN"</span>],</p>
                <p><span className="text-cyan-400">"location"</span>: <span className="text-orange-400">"Myanmar"</span></p>
              </div>

              <button 
                onClick={() => setActiveTab('skills')}
                className="w-full py-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Skill Matrix</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950/40 rounded-3xl border border-slate-800/60 p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {DEV_PROFILE.stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-2">
              <span className="block text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">What I Build</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Turning complex ideas into simple, production-ready applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4 hover:border-slate-700/80 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Full-Stack Apps</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              React and React Native apps backed by Node.js, with PostgreSQL, MySQL, Redis, and cloud infrastructure for scalable production deployments.
            </p>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4 hover:border-slate-700/80 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Integrations</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              RAG pipelines, AI-powered features like goal reviews, language translations, and natural language query builders using OpenAI and LangChain.
            </p>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4 hover:border-slate-700/80 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Tenant SaaS</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Scalable multi-tenant architectures with CI/CD automation, dynamic theming, and custom domain management for hundreds of business clients.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
