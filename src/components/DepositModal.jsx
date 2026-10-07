import React, { useState } from 'react'
import { X, DollarSign, FileText, CheckCircle2 } from 'lucide-react'
import { useTranslation } from '../services/LanguageContext'

export default function DepositModal({ isOpen, onClose, onSave }) {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [hasReceipt, setHasReceipt] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return
    
    // Simulate save
    setIsSuccess(true)
    setTimeout(() => {
      onSave(parseFloat(amount))
      setIsSuccess(false)
      setAmount('')
      setHasReceipt(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 decoration-none border-none bg-transparent cursor-pointer transition-colors">
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-75 duration-500">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
               <CheckCircle2 className="w-10 h-10 text-green-600" />
             </div>
             <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{t('congratulations')}</h2>
             <p className="text-slate-500 font-medium px-4">{t('milestone_reached')}</p>
             <div className="mt-8 text-blue-700 font-black text-sm uppercase tracking-[0.2em] bg-blue-50 px-6 py-3 rounded-full">
               +50 MikaPoints
             </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">{t('log_deposit')}</h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t('mika_tip')}: Ahorrar hoy es tu casa mañana.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">{t('deposit_amount')}</label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-black text-blue-700">$</span>
                  <input 
                    type="number"
                    className="w-full border-b-2 border-slate-100 focus:border-blue-600 outline-none pl-6 pr-0 py-4 text-3xl font-black transition-all placeholder:text-slate-200" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div 
                className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-between ${
                  hasReceipt ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                }`}
                onClick={() => setHasReceipt(!hasReceipt)}
              >
                <div className="flex items-center gap-4 text-slate-700">
                  <div className={`p-2 rounded-xl ${hasReceipt ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-tight">{t('receipt_attached')}</div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sube tu comprobante</p>
                  </div>
                </div>
                {hasReceipt && <CheckCircle2 className="w-6 h-6 text-green-600" />}
              </div>

              <button 
                type="submit"
                disabled={!amount}
                className="w-full bg-blue-700 hover:bg-black disabled:bg-slate-200 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:shadow-black/20"
              >
                {t('continue')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
