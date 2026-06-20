import { CheckCircle, GraduationCap, ExternalLink } from 'lucide-react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolio';

export default function ExperienceTab() {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="text-xs text-purple-400 uppercase tracking-widest font-bold font-mono">Journey</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold">Experience & Education</h2>
        <p className="text-slate-400 text-sm">
          Professional milestones and academic background.
        </p>
      </div>

      <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
        {EXPERIENCE.map((exp, idx) => (
          <div key={`work-${idx}`} className="relative pl-8 md:pl-10">
            <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 border border-[#030712] shadow-md shadow-cyan-400/40">
              <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-white text-lg">{exp.role}</h3>
                  <span className="text-cyan-400 font-mono text-xs font-semibold">{exp.company}</span>
                </div>
                <span className="inline-block md:text-right px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                  {exp.period}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2 pt-2">
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {EDUCATION.map((edu, idx) => (
          <div key={`edu-${idx}`} className="relative pl-8 md:pl-10">
            <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-indigo-400 border border-[#030712] shadow-md shadow-indigo-400/40">
              <span className="absolute inset-0 rounded-full bg-indigo-400/30 animate-ping" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-white text-lg">{edu.degree}</h3>
                    <span className="text-indigo-400 font-mono text-xs font-semibold">{edu.institution}</span>
                  </div>
                </div>
                <span className="inline-block md:text-right px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                  {edu.period}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Certifications</h3>
          <p className="text-slate-400 text-sm">Professional development and specializations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div 
              key={idx} 
              className="bg-slate-950/50 rounded-xl border border-slate-800/60 p-5 hover:border-slate-700/80 transition-all duration-300"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-white text-sm leading-snug">{cert.title}</h4>
                  <p className="text-[11px] text-cyan-400 font-mono mt-1">{cert.org}</p>
                </div>
                <p className="text-xs text-slate-400">{cert.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500 font-mono">{cert.date}</span>
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
