import { Code, Server, Cpu, Cloud } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolio';

const CATEGORY_ICONS = [Code, Server, Cpu, Cloud];

export default function SkillsTab() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold font-mono">Expertise</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold">Skill Matrix</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Core competencies across frontend, backend, AI, and cloud technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = CATEGORY_ICONS[idx] || Code;
          return (
            <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">{cat.name}</h3>
              </div>

              <div className="space-y-5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-slate-300">{skill.name}</span>
                      <span className="font-mono text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
