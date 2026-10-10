import os

def scaffold_interfaces():
    # 1. PorteriaPH.jsx
    porteria_content = """import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Camera, Package, Fingerprint, CheckCircle2 } from 'lucide-react'

export default function PorteriaPH() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('accesos')
  const [showScanner, setShowScanner] = useState(false)
  const [scannedCode, setScannedCode] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans selection:bg-primary-100">
      
      <div className="bg-[#0f172a] text-surface shadow-2xl relative overflow-hidden border-b-4 border-[#00A86B]">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg border border-white/10">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#F59E0B]/30">Plataforma Portería</span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-2">Control de Acceso</h1>
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
          <button onClick={() => setActiveTab('accesos')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'accesos' ? 'bg-[#F59E0B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Fingerprint className="w-5 h-5" /> Accesos QR
          </button>
          <button onClick={() => setActiveTab('paquetes')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'paquetes' ? 'bg-[#F59E0B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Package className="w-5 h-5" /> Paquetes / Casilleros
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          {activeTab === 'accesos' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Camera className="text-[#F59E0B]" /> Escáner de Invitados
              </h2>
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center bg-gray-50">
                {!showScanner ? (
                  <>
                    <Fingerprint className="w-20 h-20 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-bold mb-4">Haga clic para activar la cámara o escáner</p>
                    <button onClick={() => setShowScanner(true)} className="btn btn-primary bg-[#F59E0B] hover:bg-[#D97706] border-none text-white px-8 py-3 rounded-full font-bold shadow-lg">Activar Escáner</button>
                  </>
                ) : (
                  <div className="w-full max-w-sm aspect-square bg-black rounded-2xl relative overflow-hidden flex items-center justify-center border-4 border-[#00A86B]">
                    <div className="w-full h-1 bg-[#00A86B] shadow-[0_0_20px_#00A86B] absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                    <p className="text-white text-xs font-mono z-10">Cámara Activa...</p>
                    <button onClick={() => { setShowScanner(false); setScannedCode('INV-12345'); }} className="absolute bottom-4 bg-white/20 px-4 py-2 rounded-full text-white text-xs hover:bg-white/40">Simular Lectura</button>
                  </div>
                )}
              </div>
              
              {scannedCode && (
                <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-800 font-bold text-lg">Acceso Autorizado</h3>
                    <p className="text-green-600 text-sm">Código: {scannedCode}. El visitante tiene permiso para ingresar a la Unidad 304 - Torre 1.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'paquetes' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Package className="text-[#F59E0B]" /> Recepción de Paquetes
              </h2>
              <p className="text-gray-500 text-sm mb-6">Módulo para registrar la llegada de correspondencia y notificar a los residentes.</p>
              
              <form className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Unidad Destino</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B]" placeholder="Ej. Apto 101" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Empresa de Mensajería</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B]" placeholder="Ej. Servientrega, Interrapidisimo" />
                </div>
                <button type="button" className="bg-[#F59E0B] text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:bg-[#D97706] transition-colors w-full uppercase text-sm tracking-wider">
                  Registrar y Notificar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
"""

    with open('src/pages/PorteriaPH.jsx', 'w', encoding='utf-8') as f:
        f.write(porteria_content)

    # 2. SuperAdminPH.jsx
    superadmin_content = """import React, { useState } from 'react'
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
"""
    with open('src/pages/SuperAdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(superadmin_content)

scaffold_interfaces()
