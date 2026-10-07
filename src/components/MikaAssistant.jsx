import React, { useState, useEffect, useRef } from 'react'
import { Send, X, User, MessageSquare, Zap } from 'lucide-react'
import { useTranslation } from '../services/LanguageContext'

export default function MikaAssistant({ onClose }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    { id: '1', text: t('ai_greeting'), sender: 'mika', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const getAiResponse = (text) => {
    const lower = text.toLowerCase()
    if (lower.includes('itin')) return t('ai_itin_help') + ' ¿Ya tienes el tuyo?'
    if (lower.includes('ahorro') || lower.includes('dinero') || lower.includes('save')) return t('ai_savings_help')
    if (lower.includes('hola') || lower.includes('hi')) return '¡Hola! Soy Mika. Estoy aquí para resolver tus dudas sobre préstamos hipotecarios con ITIN.'
    if (lower.includes('subsidio') || lower.includes('ayuda') || lower.includes('grant')) return 'Existen muchos subsidios, como el FHA Grant de $10,000 que incluimos en nuestro simulador. ¿Te interesa saber más?'
    return 'Entiendo. Esa es una gran pregunta. Como tu asistente "Free Agent", mi recomendación es completar los datos de tu perfil para darte una asesoría más exacta.'
  }

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg = { 
      id: Date.now().toString(), 
      text: input, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        text: getAiResponse(input),
        sender: 'mika',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-blue-700 p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-white font-black text-sm uppercase tracking-widest">Mika AI</div>
            <div className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">Asistente Virtual</div>
          </div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50/50"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${msg.sender === 'user' ? 'bg-blue-100 border-blue-200' : 'bg-blue-700 border-blue-800'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4 text-blue-700" /> : <Zap className="w-4 h-4 text-white fill-current" />}
              </div>
              <div>
                <div className={`p-4 rounded-[1.5rem] text-sm font-medium shadow-sm transition-all ${
                  msg.sender === 'user' 
                  ? 'bg-blue-700 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-blue-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white border border-blue-100 p-4 rounded-[1.5rem] rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-blue-50 bg-white">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu duda aquí..."
            className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl py-4 pl-6 pr-14 font-medium text-sm focus:border-blue-600 outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100/50 hover:bg-black transition-all disabled:opacity-30 disabled:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] font-black text-slate-400 text-center mt-4 uppercase tracking-[0.2em]">Mika AI Free Agent v1.0</p>
      </div>
    </div>
  )
}
