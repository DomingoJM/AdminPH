import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Building, Users, BarChart3, Plus } from 'lucide-react'

export default function SuperAdminPH() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('conjuntos')

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans selection:bg-primary-100">
      
      <div className="bg-[#0f172a] text-surface shadow-2xl relative overflow-hidden border-b-4 border-purple-500">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg border border-white/10">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/30">Plataforma MyAdminPH</span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-2">Panel Super Administrador</h1>
            </div>
          </div>
          <div className="flex gap-4">
             <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg backdrop-blur-md">Volver al App</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-3 space-y-2">
          <button onClick={() => setActiveTab('conjuntos')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'conjuntos' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Building className="w-5 h-5" /> Crear Conjuntos
          </button>
          <button onClick={() => setActiveTab('admins')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'admins' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Users className="w-5 h-5" /> Crear Admins
          </button>
          <button onClick={() => setActiveTab('kpi')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'kpi' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <BarChart3 className="w-5 h-5" /> Estadísticas Globales
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          {activeTab === 'conjuntos' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Building className="text-purple-500" /> Crear Nuevo Conjunto
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre del Conjunto</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">NIT</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dirección</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ciudad</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Logo URL</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" placeholder="https://..." />
                </div>
                <button type="button" className="md:col-span-2 bg-purple-600 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:bg-purple-700 transition-colors w-full uppercase text-sm tracking-wider mt-4 flex justify-center items-center gap-2">
                  <Plus className="w-5 h-5"/> Guardar Copropiedad
                </button>
              </form>
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Users className="text-purple-500" /> Asignar Administrador
              </h2>
              <p className="text-gray-500 text-sm mb-6">Crea la cuenta de usuario para el administrador de un conjunto específico.</p>
              <form className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Seleccionar Conjunto</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500">
                    <option>Conjunto Residencial Las Palmas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Correo Electrónico del Admin</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                </div>
                <button type="button" className="bg-purple-600 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:bg-purple-700 transition-colors w-full uppercase text-sm tracking-wider mt-4">
                  Crear Cuenta de Admin
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'kpi' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center items-center">
                <h3 className="text-5xl font-black text-purple-600 mb-2">12</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Conjuntos Activos</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center items-center">
                <h3 className="text-5xl font-black text-purple-600 mb-2">3.4k</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Usuarios Totales</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
