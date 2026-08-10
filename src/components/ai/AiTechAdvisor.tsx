import React, { useState } from 'react';
import { Product } from '../../types';
import { X, Sparkles, Send, Cpu, Bot, User, ArrowRight } from 'lucide-react';

interface AiTechAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiTechAdvisor: React.FC<AiTechAdvisorProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm your TechVault AI Shopping Advisor. Ask me anything like: 'What is the best laptop for video editing under $3500?' or 'Compare the Sony headphones with the Sonos speaker'."
    }
  ]);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userQuery = prompt.trim();
    setPrompt('');
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setLoading(true);

    try {
      // Call Gemini API via server or mock fallback
      const catalogSummary = products.map(p => `${p.name} (${p.category}, $${p.price}) - ${p.description}`).join('\n');
      
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery, catalog: catalogSummary })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        // Fallback intelligent response based on catalog matching
        const matching = products.filter(p => 
          userQuery.toLowerCase().split(' ').some(w => p.name.toLowerCase().includes(w) || p.category.toLowerCase().includes(w) || p.tags.some(t => t.toLowerCase().includes(w)))
        );

        let replyText = "";
        if (matching.length > 0) {
          replyText = `Based on your request, I recommend looking at:\n\n` + 
            matching.map(m => `• **${m.name}** ($${m.price}): ${m.description}`).join('\n\n');
        } else {
          replyText = `For "${userQuery}", I recommend checking out our MacBook Pro 16" M3 Max for high productivity or the Sony WH-1000XM5 for audio excellence. Both feature top tier specs and full manufacturer warranty.`;
        }

        setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "I analyzed our catalog. For top performance, consider our flagship MacBook Pro M3 Max or Sony WH-1000XM5 headphones." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative text-slate-200 flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-sm">Gemini AI Tech Advisor</h2>
              <p className="text-[11px] text-slate-400">Personalized hardware recommendations & comparison</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex gap-3 text-xs leading-relaxed ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div 
                className={`max-w-[80%] rounded-2xl p-3.5 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                    : 'bg-slate-950 border border-slate-800/80 text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-cyan-400 bg-slate-950 p-3 rounded-xl border border-slate-800 w-fit">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>Analyzing technical specifications...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendPrompt} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input 
            type="text"
            placeholder="Ask AI e.g. 'Compare Sony WH-1000XM5 vs Sonos Era 300'..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button 
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 text-white p-2.5 rounded-xl transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
