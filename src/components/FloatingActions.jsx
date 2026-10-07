import React, { useState } from 'react'
import { MessageCircle, Zap, X, Phone } from 'lucide-react'
import MikaAssistant from './MikaAssistant'

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)

  const whatsappUrl = "https://wa.me/1234567890?text=Hola%20MikaApp%21%20Necesito%20ayuda%20con%20mi%20ahorro%20para%20casa."

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      {/* Assistant Window */}
      {showAssistant && (
        <div className="w-[380px] h-[600px] max-h-[80vh] bg-white rounded-[3rem] shadow-2xl shadow-blue-500/20 border border-blue-100 overflow-hidden flex flex-col mb-4 pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
           <MikaAssistant onClose={() => setShowAssistant(false)} />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pointer-events-auto">
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl shadow-green-200 hover:scale-110 active:scale-95 transition-all transform hover:-translate-y-1"
        >
          <Phone className="w-8 h-8 fill-current" />
        </a>

        <button 
          onClick={() => setShowAssistant(!showAssistant)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-110 active:scale-95 hover:-translate-y-1 ${showAssistant ? 'bg-black text-white' : 'bg-blue-700 text-white shadow-blue-200'}`}
        >
          {showAssistant ? <X className="w-8 h-8" /> : <Zap className="w-8 h-8 fill-current" />}
        </button>
      </div>
    </div>
  )
}
