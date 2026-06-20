import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  strong: ({ children }) => <strong className="text-cyan-300 font-semibold">{children}</strong>,
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mb-2 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mb-2 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="text-slate-300">{children}</li>,
  h1: ({ children }) => <h1 className="text-sm font-bold text-white mb-1">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xs font-bold text-white mb-1">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xs font-semibold text-white mb-1">{children}</h3>,
  code: ({ children }) => (
    <code className="bg-slate-800 text-cyan-200 px-1 py-0.5 rounded text-[10px]">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-x-auto text-[10px] mb-2 last:mb-0">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">
      {children}
    </a>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
