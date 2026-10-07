import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, CheckCircle2, Shield, AlertTriangle, Wallet, Building, BarChart3, Settings } from 'lucide-react'
import { useAuth } from '../services/AuthContext'

export default function AdminPH() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('kpi')
  
  // Mock Data: Solicitudes de Identidad Inmobiliaria (Usuarios que usaron el flujo de Reclamar Unidad)
  const [solicitudes] = useState([
    { id: 1, usuario: 'Juan P茅rez', unidad: 'Apto 304 - Torre 1', rol: 'Propietario', documento: 'CertificadoLibertad.pdf', estado: 'Pendiente', fecha: '04 Oct 2026' },
    { id: 2, usuario: 'Mar铆a G贸mez', unidad: 'Apto 102 - Torre 2', rol: 'Arrendatario', documento: 'ContratoArriendo.pdf', estado: 'Pendiente', fecha: '03 Oct 2026' }
  ])

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans selection:bg-primary-100">
      
            {/* Sidebar & Header (Simplified layout for Admin) */}
      <div className="bg-[#0f172a] text-surface shadow-2xl relative overflow-hidden border-b-4 border-[#00A86B]">
        {/* Abstract Deco */}
        <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl">
          <Shield className="w-64 h-64 text-[#00A86B]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <img src="/logo-192x192.png" alt="AdminPH Logo" className="w-20 h-20 rounded-3xl shadow-2xl border border-white/10" />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#00A86B]/20 text-[#00A86B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#00A86B]/30">Plataforma AdminPH</span>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white">Conjunto Los Nogales</h1>
            </div>
          </div>
          <div className="flex gap-4">
             <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg backdrop-blur-md">Volver al App</button>
          </div>
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="md:col-span-3 space-y-2">
          <button onClick={() => setActiveTab('kpi')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'kpi' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <BarChart3 className="w-5 h-5" /> Resumen
          </button>
          <button onClick={() => setActiveTab('verificaciones')} className={`w-full flex justify-between items-center px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'verificaciones' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Verificaciones</div>
             <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px]">2</span>
          </button>
          <button onClick={() => setActiveTab('cartera')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'cartera' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <Wallet className="w-5 h-5" /> Cartera y Pagos
          </button>
          <button onClick={() => setActiveTab('pqrs')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'pqrs' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <FileText className="w-5 h-5" /> PQRS
          </button>
          <button onClick={() => setActiveTab('integraciones')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'integraciones' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <Building className="w-5 h-5" /> Integraciones B2B
          </button>
          <button onClick={() => setActiveTab('config')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'config' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <Settings className="w-5 h-5" /> Configuraci贸n
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
           
           {activeTab === 'kpi' && (
             <div className="animate-fade-in space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cartera Total</span>
                     <Wallet className="w-5 h-5 text-red-500" />
                   </div>
                   <div className="text-3xl font-black text-text mb-1">$12.5M</div>
                   <span className="text-xs text-red-500 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> 15 unidades en mora</span>
                 </div>
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Propietarios Verificados</span>
                     <Shield className="w-5 h-5 text-green-500" />
                   </div>
                   <div className="text-3xl font-black text-text mb-1">85%</div>
                   <span className="text-xs text-green-500 font-bold">170 de 200 unidades</span>
                 </div>
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">PQRS Pendientes</span>
                     <FileText className="w-5 h-5 text-yellow-500" />
                   </div>
                   <div className="text-3xl font-black text-text mb-1">8</div>
                   <span className="text-xs text-gray-400 font-bold">3 requieren atenci贸n urgente</span>
                 </div>
               </div>
               <div className="bg-[#0f172a] rounded-[2rem] p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 mt-8 border border-gray-800">
                 <div className="bg-[#00A86B]/20 p-5 rounded-full border border-[#00A86B]/50">
                   <Shield className="w-10 h-10 text-[#00A86B]" />
                 </div>
                 <div className="flex-1">
                   <h3 className="font-bold text-white mb-2 text-xl tracking-tight">Agente AdminPH</h3>
                   <p className="text-sm text-gray-400">He detectado 2 solicitudes nuevas de identidad inmobiliaria y 15 unidades en mora. 縌uieres que env韊 recordatorios autom醫icos o revisar los documentos de verificaci髇?</p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                   <button onClick={() => setActiveTab('verificaciones')} className="bg-white text-[#0f172a] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors text-center shadow-lg">
                     Ver Solicitudes
                   </button>
                   <button className="bg-[#00A86B] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#008C59] shadow-lg shadow-[#00A86B]/30 transition-all text-center">
                     Auto-Notificar Mora
                   </button>
                 </div>
               </div>
               
               <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                 <h2 className="text-xl font-black text-text uppercase tracking-tight mb-6">Pr贸ximos Mantenimientos (Mock)</h2>
                 <div className="space-y-4">
                   <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                     <div>
                       <h3 className="font-bold text-sm">Mantenimiento Ascensores Torre 1 y 2</h3>
                       <p className="text-xs text-gray-500">Proveedor: Elevadores Andinos SAS</p>
                     </div>
                     <span className="bg-primary-50 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Ma帽ana</span>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'integraciones' && (
             <div className="animate-fade-in bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
               <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Ecosistema MikasApp (B2B)</h2>
               <p className="text-sm text-text-muted font-bold mb-8">Conecta tu copropiedad con servicios financieros y de mantenimiento del ecosistema.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="border border-gray-200 rounded-3xl p-6">
                   <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                     <Wallet className="w-6 h-6" />
                   </div>
                   <h3 className="font-black text-lg mb-2">Recaudo Bancario API</h3>
                   <p className="text-xs text-gray-500 mb-4">Conecta las cuentas de recaudo de Bancolombia/Davivienda para conciliar pagos autom谩ticamente.</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Configurar Integraci贸n</button>
                 </div>
                 
                 <div className="border border-gray-200 rounded-3xl p-6">
                   <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                     <Building className="w-6 h-6" />
                   </div>
                   <h3 className="font-black text-lg mb-2">Marketplace Proveedores</h3>
                   <p className="text-xs text-gray-500 mb-4">Encuentra proveedores de mantenimiento verificados en el ecosistema para impermeabilizaci贸n o pintura.</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Explorar Proveedores</button>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'verificaciones' && (
             <div className="animate-fade-in bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
               <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Validaci贸n de Propietarios</h2>
               <p className="text-sm text-text-muted font-bold mb-8">Nuevos usuarios intentando reclamar Identidad Inmobiliaria en la plataforma.</p>

               <div className="space-y-4">
                 {solicitudes.map(s => (
                   <div key={s.id} className="p-6 border-2 border-gray-100 rounded-3xl hover:border-primary-200 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-primary-50 text-primary rounded-xl flex items-center justify-center font-black text-lg">
                         {s.usuario[0]}
                       </div>
                       <div>
                         <h3 className="font-black text-lg text-text">{s.usuario}</h3>
                         <div className="flex gap-3 text-xs mt-1">
                           <span className="font-bold text-gray-500">{s.unidad}</span>
                           <span className="font-black text-primary bg-primary-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{s.rol}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4">
                       <a href="#" className="flex flex-col items-center justify-center text-[10px] font-black uppercase tracking-widest text-primary bg-primary-50 px-4 py-2 rounded-xl hover:bg-primary-100 transition-colors">
                         <FileText className="w-4 h-4 mb-1" />
                         Ver Soporte
                       </a>
                       <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-200 hover:bg-green-600 transition-colors flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4" /> Aprobar
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'cartera' && (
             <div className="animate-fade-in bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center py-20">
               <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">M贸dulo de Cartera</h2>
               <p className="text-sm text-text-muted font-bold max-w-md mx-auto">Aqu铆 podr谩s generar los cobros masivos, registrar pagos y exportar informes contables.</p>
             </div>
           )}

        </div>
      </div>
    </div>
  )
}



