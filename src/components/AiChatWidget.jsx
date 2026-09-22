import React, { useState, useRef, useEffect } from 'react';
import { chatWithBuildAI, getOpenRouterApiKey } from '../services/openrouterService';

export default function AiChatWidget({ propertyData, styleData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I've analyzed your project specs. Need help optimizing material costs, checking foundation structural integrity, or adjusting your schedule?",
      usedAI: false
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const hasApiKey = !!getOpenRouterApiKey();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = inputVal.trim();
    if (!text || isTyping) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputVal('');
    setIsTyping(true);

    try {
      const { reply, usedAI } = await chatWithBuildAI({
        userMessage: text,
        propertyData,
        styleData
      });

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, usedAI }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sorry, I ran into an issue. Please try again.',
          usedAI: false
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-[70] flex flex-col items-end">
      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white shadow-2xl rounded-2xl border border-[#c2c6d6]/40 mb-4 overflow-hidden transition-all transform scale-100 opacity-100 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#0058be] p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-amber-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <div>
                <span className="font-bold text-sm block">BuildAI Assistant</span>
                <span className="text-[10px] text-blue-100">
                  {hasApiKey ? 'Powered by OpenRouter AI' : 'AI Architect & Cost Engine'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* API key status indicator */}
              <span
                title={hasApiKey ? 'OpenRouter API connected' : 'Using local engine (no API key set)'}
                className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-[#6cf8bb]' : 'bg-amber-300'}`}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* API key warning banner */}
          {!hasApiKey && (
            <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-[10px] text-amber-700 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">info</span>
              Using local engine. Set <code className="font-mono font-bold">VITE_OPENROUTER_API_KEY</code> in <code className="font-mono font-bold">.env</code> for live AI.
            </div>
          )}

          {/* Messages Thread */}
          <div className="h-72 p-4 overflow-y-auto custom-scrollbar space-y-3 bg-[#faf8ff]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0058be] text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-[#c2c6d6]/40 text-[#131b2e] rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                  {/* AI source tag */}
                  {m.sender === 'ai' && idx > 0 && (
                    <span className={`block mt-1.5 text-[9px] font-bold ${m.usedAI ? 'text-[#006c49]' : 'text-[#b0b5c3]'}`}>
                      {m.usedAI ? '✦ OpenRouter AI' : '● Local Engine'}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#c2c6d6]/40 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#0058be] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#0058be] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#0058be] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#c2c6d6]/30 bg-white flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask BuildAI architect..."
              disabled={isTyping}
              className="flex-1 bg-[#f2f3ff] border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0058be] outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="bg-[#0058be] text-white p-2 rounded-xl hover:bg-[#004395] transition-colors cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0058be] rounded-full shadow-2xl shadow-[#0058be]/50 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/80"
        title="Open BuildAI Assistant"
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'psychology'}
        </span>
      </button>
    </div>
  );
}
