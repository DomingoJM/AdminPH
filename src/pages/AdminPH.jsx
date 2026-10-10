import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, CheckCircle2, Shield, AlertTriangle, Wallet, Building, BarChart3, Settings, Plus, MessageSquare, Headphones, PieChart, Video, UploadCloud } from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import { getCopropiedades, getMensajes, enviarMensaje } from '../services/api'

export default function AdminPH() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('conjuntos')
  
  const [copropiedades, setCopropiedades] = useState([])
  const [mensajes, setMensajes] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [nuevoConjunto, setNuevoConjunto] = useState({ nombre: '', nit: '', direccion: '', ciudad: '', tipo: 'residencial' })

  const handleCreateCopropiedad = async (e) => {
    e.preventDefault()
    try {
      // simulate API call for now or use actual endpoint
      // await createCopropiedad(nuevoConjunto)
      alert('Conjunto ' + nuevoConjunto.nombre + ' creado con éxito (Simulado)')
      setShowCreateForm(false)
      loadData()
    } catch (err) {
      alert('Error al crear el conjunto')
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const cops = await getCopropiedades()
      setCopropiedades(cops.results || cops || [])
      const msjs = await getMensajes()
      setMensajes(msjs.results || msjs || [])
    } catch (e) { console.error('Error loading admin data', e) }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans selection:bg-primary-100">
      
      <div className="bg-[#0f172a] text-surface shadow-2xl relative overflow-hidden border-b-4 border-[#00A86B]">
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
              <h1 className="text-3xl font-black uppercase tracking-tight text-white">Administración Local</h1>
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
          <button onClick={() => setActiveTab('conjuntos')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'conjuntos' ? 'bg-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Building className="w-5 h-5" /> Mis Conjuntos
          </button>
          <button onClick={() => setActiveTab('unidades')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'unidades' ? 'bg-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Building className="w-5 h-5" /> Unidades y Residentes
          </button>
          <button onClick={() => setActiveTab('asambleas')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'asambleas' ? 'bg-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Users className="w-5 h-5" /> Asambleas y Actas
          </button>
          <button onClick={() => setActiveTab('verificaciones')} className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'verificaciones' ? 'bg-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5" /> Verificaciones</div>
            <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
          </button>
          <button onClick={() => setActiveTab('mensajeria')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'mensajeria' ? 'bg-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <MessageSquare className="w-5 h-5" /> PQRS y Mensajes
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          
          {activeTab === 'conjuntos' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] flex items-center gap-3">
                  <Building className="text-[#00A86B]" /> Mis Conjuntos
                </h2>
                <button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-[#00A86B] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#008f5a] transition-colors">
                  <Plus className="w-4 h-4" /> Nuevo Conjunto
                </button>
              </div>
              
              {showCreateForm && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 animate-slide-up">
                  <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-xs">Registrar Nuevo Conjunto</h3>
                  <form onSubmit={handleCreateCopropiedad} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nombre</label>
                      <input type="text" required value={nuevoConjunto.nombre} onChange={e => setNuevoConjunto({...nuevoConjunto, nombre: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A86B]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">NIT</label>
                      <input type="text" required value={nuevoConjunto.nit} onChange={e => setNuevoConjunto({...nuevoConjunto, nit: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A86B]" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 text-gray-500 font-bold mr-2">Cancelar</button>
                      <button type="submit" className="bg-[#0f172a] text-white px-6 py-2 rounded-xl font-bold">Guardar</button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                {copropiedades.length > 0 ? (
                  copropiedades.map(cop => (
                    <div key={cop.id} className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all flex justify-between items-center cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center border border-gray-100 overflow-hidden">
                             {cop.logo ? <img src={cop.logo} className="w-full h-full object-cover" /> : <Building className="text-[#00A86B]" />}
                          </div>
                          <div>
                            <h3 className="font-black text-lg text-gray-800">{cop.nombre}</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">NIT: {cop.nit}</p>
                          </div>
                       </div>
                       <button className="text-[#00A86B] font-bold text-xs uppercase tracking-widest hover:underline">Administrar</button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                    <p className="text-gray-500 font-bold">No tienes conjuntos asignados.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'unidades' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] flex items-center gap-3">
                  <Building className="text-[#00A86B]" /> Unidades de la Copropiedad
                </h2>
              </div>
              
              <div className="p-8 border-2 border-dashed border-[#00A86B]/30 rounded-3xl bg-[#00A86B]/5 text-center flex flex-col items-center">
                <UploadCloud className="w-16 h-16 text-[#00A86B] mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Importación Masiva de Propiedades</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-md">Sube un archivo Excel (.xlsx) o CSV con el listado de unidades (Torre, Apartamento, Coeficiente) y sus respectivos propietarios o residentes para registrarlos automáticamente.</p>
                <div className="flex gap-4">
                  <button className="bg-white border border-[#00A86B] text-[#00A86B] px-6 py-2 rounded-xl font-bold hover:bg-gray-50">Descargar Plantilla</button>
                  <button className="bg-[#00A86B] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#008f5a] shadow-lg">Subir Archivo Excel</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'asambleas' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Users className="text-[#00A86B]" /> Gestión de Asambleas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <Video className="w-8 h-8 text-[#00A86B] mb-4" />
                  <h3 className="font-bold text-lg">Asambleas en Vivo</h3>
                  <p className="text-sm text-gray-500 mt-2">Control del quórum, preguntas y botón de Voto Manual Asistido.</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <FileText className="w-8 h-8 text-[#00A86B] mb-4" />
                  <h3 className="font-bold text-lg">Actas (Word/PDF)</h3>
                  <p className="text-sm text-gray-500 mt-2">Descargar borrador de actas con sello criptográfico.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verificaciones' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-[#00A86B]" /> Solicitudes Pendientes
              </h2>
              <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
                <p className="text-gray-500 text-center font-bold">No hay solicitudes de nuevos residentes pendientes.</p>
              </div>
            </div>
          )}

          {activeTab === 'mensajeria' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <MessageSquare className="text-[#00A86B]" /> Buzón PQRS
              </h2>
              <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
                <p className="text-gray-500 text-center font-bold">Bandeja de entrada vacía.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
