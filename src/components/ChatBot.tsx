import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, ChevronDown } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

const MAX_MESSAGES = 100;
const ERROR_DISMISS_MS = 6000;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hello! I'm Min Khant Zaw's AI Twin. Ask me anything about his coding background, tech stack, projects, or work experience!"
};

const QUICK_QUESTIONS = [
  "What is Min's tech stack?",
  "Tell me about Easy2Success",
  "Is Min available for hire?"
];

export default function ChatBot({ chatOpen, setChatOpen }: { chatOpen: boolean; setChatOpen: (open: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastSendRef = useRef(0);
  const messagesRef = useRef<Message[]>(messages);
  messagesRef.current = messages;
  const [isNearBottom, setIsNearBottom] = useState(true);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isNearBottom) scrollToBottom('smooth');
  }, [messages, streamingContent, isNearBottom, scrollToBottom]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), ERROR_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [error]);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const threshold = 100;
    setIsNearBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  };

  const sendMessage = async (query: string) => {
    if (!query || isStreaming) return;

    const now = Date.now();
    if (now - lastSendRef.current < 1500) {
      setError('Please wait a moment before sending another message.');
      return;
    }

    const workerUrl = import.meta.env.VITE_WORKER_URL;
    if (!workerUrl) {
      setError('AI Twin is not configured. Contact Min directly at minkhankzaw2543@gmail.com.');
      return;
    }

    setUserInput('');
    setError(null);
    setStreamingContent('');
    lastSendRef.current = now;

    const userMessage: Message = { role: 'user', content: query };

    const updatedMessages = [...messagesRef.current, userMessage].slice(-MAX_MESSAGES);
    setMessages(updatedMessages);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`${workerUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.slice(-50) }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${response.status})`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content || '';
            if (token) {
              fullContent += token;
              setStreamingContent(fullContent);
            }
          } catch { /* skip malformed chunks */ }
        }
      }

      if (fullContent) {
        setMessages(prev => [...prev, { role: 'assistant', content: fullContent }]);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'Connection failed. Try again.';
      setError(message);
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
      abortRef.current = null;
    }
  };

  const handleSend = () => sendMessage(userInput.trim());

  return (
    <>
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-xl shadow-cyan-500/25 hover:brightness-110 hover:scale-105 transform transition-all cursor-pointer"
        >
          <Bot className="w-5 h-5 animate-bounce" />
          <span className="hidden sm:inline">Consult AI Twin</span>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full md:bottom-6 md:right-6 md:w-full md:max-w-md h-dvh md:h-[550px] bg-slate-950 border-slate-800 md:border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">

          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Min's Digital Twin</h4>
                <p className="text-[10px] text-emerald-400 font-mono">
                  {isStreaming ? 'Thinking...' : 'Synchronized & Online'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60 relative">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 border border-indigo-500/30 text-white whitespace-pre-wrap'
                      : 'bg-slate-900 border border-slate-800/80 text-slate-300'
                  }`}
                >
                  {msg.role === 'user' ? msg.content : <MarkdownRenderer content={msg.content} />}
                </div>
              </div>
            ))}

            {isStreaming && streamingContent && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] flex-shrink-0">
                  🤖
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
                  <MarkdownRenderer content={streamingContent} />
                </div>
              </div>
            )}

            {isStreaming && !streamingContent && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] flex-shrink-0">
                  🤖
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-2xl bg-red-900/20 border border-red-800/50 text-xs text-red-300">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!isNearBottom && (
            <button
              onClick={() => scrollToBottom('smooth')}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 shadow-lg hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          <div className="px-4 py-2 border-t border-slate-900/80 bg-slate-950 flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => { setUserInput(q); sendMessage(q); }}
                disabled={isStreaming}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 border-t border-slate-800 bg-slate-900/60 flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask anything about Min..."
              disabled={isStreaming}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 disabled:opacity-50 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={isStreaming || !userInput.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
