import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Calendar, Clock, FileText, CheckCircle2, UserPlus, FileSignature, BarChart3, Info } from 'lucide-react'
import { useAuth } from '../services/AuthContext'

export default function Asambleas() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  
  const [activeTab, setActiveTab] = useState('proximas') // proximas, poderes, historial
  const [showPoderModal, setShowPoderModal] = useState(false)

  // Mock Data
  const asambleaActiva = {
    titulo: 'Asamblea General Ordinaria 2026',
    fecha: '15 de Octubre, 2026',
    hora: '7:00 PM',
    modalidad: 'Virtual / Zoom',
    estado: 'Convocada',
    quorumActual: '0%',
    ordenDia: [
      '1. Verificación de quórum',
      '2. Elección de presidente y secretario',
      '3. Informe de gestión',
      '4. Aprobación de estados financieros',
      '5. Elección de Consejo de Administración'
    ]
  }

  return (
    <div className="min-h-screen bg-background pb-32 font-sans selection:bg-primary-100">
      
      {/* Header */}
      <header className="bg-primary text-surface p-10 rounded-b-[3.5rem] shadow-xl shadow-primary-50 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Users className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex gap-6 items-center">
            <button onClick={() => navigate('/mi-copropiedad')} className="p-4 rounded-2xl bg-surface/10 backdrop-blur-sm shadow-sm border border-surface/20 text-surface hover:bg-surface/20 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <p className="text-primary-100 font-bold uppercase tracking-widest text-xs mb-2">Módulo de Participación</p>
              <h1 className="text-4xl font-black uppercase tracking-tight mb-1">Asambleas</h1>
              <div className="flex items-center gap-3">
                <span className="bg-surface/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Conjunto Los Nogales</span>
                <span className="bg-surface/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Coeficiente: 0.8500%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
         
         {/* Tabs */}
         <div className="flex flex-wrap gap-4 mb-10 border-b-2 border-gray-100 pb-4">
           <button 
             onClick={() => setActiveTab('proximas')}
             className={`pb-4 -mb-[18px] px-2 text-sm font-black uppercase tracking-widest transition-colors border-b-4 ${activeTab === 'proximas' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-text'}`}
           >
             Próximas Asambleas
           </button>
           <button 
             onClick={() => setActiveTab('poderes')}
             className={`pb-4 -mb-[18px] px-2 text-sm font-black uppercase tracking-widest transition-colors border-b-4 ${activeTab === 'poderes' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-text'}`}
           >
             Delegar Poderes
           </button>
           <button 
             onClick={() => setActiveTab('historial')}
             className={`pb-4 -mb-[18px] px-2 text-sm font-black uppercase tracking-widest transition-colors border-b-4 ${activeTab === 'historial' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-text'}`}
           >
             Historial y Decisiones
           </button>
         </div>

         {/* Contenido Tabs */}
         {activeTab === 'proximas' && (
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
             <div className="md:col-span-8 space-y-6">
               <div className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50">
                 <div className="flex items-center justify-between mb-6">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      En {Math.ceil((new Date('2026-10-15').getTime() - new Date().getTime()) / (1000 * 3600 * 24))} Días
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modalidad: {asambleaActiva.modalidad}</span>
                 </div>
                 <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-4">{asambleaActiva.titulo}</h2>
                 
                 <div className="flex gap-8 mb-8 border-y border-gray-100 py-6">
                   <div>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Fecha</span>
                     <div className="flex items-center gap-2 font-bold text-sm"><Calendar className="w-4 h-4 text-primary" /> {asambleaActiva.fecha}</div>
                   </div>
                   <div>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hora</span>
                     <div className="flex items-center gap-2 font-bold text-sm"><Clock className="w-4 h-4 text-primary" /> {asambleaActiva.hora}</div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-sm font-black text-text uppercase tracking-widest mb-4">Orden del Día</h3>
                   <div className="space-y-3">
                     {asambleaActiva.ordenDia.map((item, idx) => (
                       <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                         <div className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">{idx + 1}</div>
                         <span className="font-bold text-sm text-text">{item.substring(3)}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                   <button className="flex-1 py-4 bg-primary text-surface rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-colors shadow-lg shadow-primary-100 flex items-center justify-center gap-2">
                     <CheckCircle2 className="w-4 h-4" /> Confirmar Asistencia
                   </button>
                 </div>
               </div>
             </div>

             <div className="md:col-span-4 space-y-6">
                <div className="bg-primary-50 border border-primary-100 rounded-3xl p-6 text-primary-900">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-6 h-6 text-primary" />
                    <h3 className="font-black uppercase tracking-tight">Tu Derecho a Voto</h3>
                  </div>
                  <p className="text-xs font-medium mb-4">Como propietario verificado, tus decisiones en esta asamblea tendrán un peso de <strong>0.8500%</strong> sobre el total de la copropiedad, según el reglamento.</p>
                  <button onClick={() => setActiveTab('poderes')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">¿No puedes asistir? Delega tu poder</button>
                </div>
             </div>
           </div>
         )}

         {activeTab === 'poderes' && (
           <div className="animate-fade-in space-y-8 max-w-3xl">
             <div className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2 flex items-center gap-2"><UserPlus className="w-6 h-6 text-primary" /> Delegar Representación</h2>
                   <p className="text-sm text-text-muted font-bold">Autoriza a un tercero o vecino para que vote por ti.</p>
                 </div>
                 <button onClick={() => setShowPoderModal(true)} className="bg-primary text-surface px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-600 transition-colors shadow-md">
                   Crear Nuevo Poder
                 </button>
               </div>
               
               <div className="p-10 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                 <FileSignature className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                 <p className="font-bold text-gray-500 mb-1">No tienes poderes registrados</p>
                 <p className="text-xs text-gray-400">Si no asistes, registra un poder para no incurrir en multas de inasistencia.</p>
               </div>
             </div>
           </div>
         )}

         {activeTab === 'historial' && (
           <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-black text-text uppercase tracking-tight">Asamblea General 2025</h3>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hace 1 año</span>
               </div>
               <div className="space-y-4">
                 <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-primary" />
                     <span className="font-bold text-sm">Acta Oficial Aprobada</span>
                   </div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Descargar</button>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <BarChart3 className="w-5 h-5 text-primary" />
                     <span className="font-bold text-sm">Resultados Votaciones</span>
                   </div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Ver</button>
                 </div>
               </div>
             </div>
           </div>
         )}
      </main>

      {/* Modal Mock de Poder */}
      {showPoderModal && (
        <div className="fixed inset-0 bg-text/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative">
            <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Registrar Poder</h2>
            <p className="text-xs text-text-muted font-bold mb-6">Selecciona el tipo de representación</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Representante (Nombre/Cédula o Vecino)</label>
                <input type="text" className="w-full bg-primary-50/30 border-2 border-primary-50 rounded-xl py-3 px-4 font-bold focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Documento Soporte (Carta PDF)</label>
                <div className="border-2 border-dashed border-primary-200 bg-primary-50/30 rounded-xl p-4 text-center cursor-pointer hover:bg-primary-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Subir Archivo</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setShowPoderModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors">Cancelar</button>
              <button onClick={() => { setShowPoderModal(false); alert("Poder registrado para revisión de la administración.") }} className="flex-1 py-3 bg-primary text-surface rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-600 transition-colors">Guardar Poder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
