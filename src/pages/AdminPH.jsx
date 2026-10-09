import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, CheckCircle2, Shield, AlertTriangle, Wallet, Building, BarChart3, Settings, Plus, MessageSquare, Package, Camera, Fingerprint, FolderOpen, Headphones, PieChart, Video \} from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import { getCopropiedades, createCopropiedad, getMensajes, enviarMensaje } from '../services/api'

export default function AdminPH() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('kpi')
  
  const [copropiedades, setCopropiedades] = useState([])
  const [mensajes, setMensajes] = useState([])
  const [paquetes, setPaquetes] = useState([])
  const [showScanner, setShowScanner] = useState(false)
  const [scannedCode, setScannedCode] = useState('')
  
  // Forms state
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [nuevoConjunto, setNuevoConjunto] = useState({ nombre: '', nit: '', direccion: '', ciudad: '', tipo: 'residencial' })

  // Mock Data
  const [solicitudes] = useState([
    { id: 1, usuario: 'Juan Perez', unidad: 'Apto 304 - Torre 1', rol: 'Propietario', documento: 'CertificadoLibertad.pdf', estado: 'Pendiente', fecha: '04 Oct 2026' },
  ])

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

  const handleCreateCopropiedad = async (e) => {
    e.preventDefault()
    try {
      await createCopropiedad(nuevoConjunto)
      setShowCreateForm(false)
      loadData()
    } catch (err) {
      alert('Error al crear el conjunto')
    }
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
              <h1 className="text-3xl font-black uppercase tracking-tight text-white">GestiÃ³n Central</h1>
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
          <button onClick={() => setActiveTab('kpi')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'kpi' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <BarChart3 className="w-5 h-5" /> Resumen
          </button>
          <button onClick={() => setActiveTab('conjuntos')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'conjuntos' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <Building className="w-5 h-5" /> Mis Conjuntos
          </button>
          <button onClick={() => setActiveTab('verificaciones')} className={`w-full flex justify-between items-center px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'verificaciones' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Verificaciones</div>
             <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px]">1</span>
          </button>
          <button onClick={() => setActiveTab('porteria')} className={`w-full flex justify-between items-center px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'porteria' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <div className="flex items-center gap-3"><Package className="w-5 h-5" /> Portería Casillero</div>
             {paquetes.length > 0 && <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px]">{paquetes.filter(p => p.estado === 'en_porteria').length}</span>}
          </button>
          <button onClick={() => setActiveTab('mensajes')} className={`w-full flex justify-between items-center px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'mensajes' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
             <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> MensajerÃ­a</div>
             {mensajes.length > 0 && <span className="bg-[#00A86B] text-white px-2 py-0.5 rounded-full text-[10px]">{mensajes.length}</span>}
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
           
           {activeTab === 'kpi' && (
             <div className="animate-fade-in space-y-8">
               <div className="bg-[#0f172a] rounded-[2rem] p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 border border-gray-800">
                 <div className="bg-[#00A86B]/20 p-5 rounded-full border border-[#00A86B]/50">
                   <Shield className="w-10 h-10 text-[#00A86B]" />
                 </div>
                 <div className="flex-1">
                   <h3 className="font-bold text-white mb-2 text-xl tracking-tight">Agente AdminPH</h3>
                   <p className="text-sm text-gray-400">Tienes {copropiedades.length} conjuntos bajo tu administraciÃ³n. Puedes crear nuevos conjuntos o revisar los mensajes y solicitudes de residentes.</p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                   <button onClick={() => setActiveTab('conjuntos')} className="bg-white text-[#0f172a] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors text-center shadow-lg">
                     Ver Conjuntos
                   </button>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'conjuntos' && (
             <div className="animate-fade-in">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-black uppercase tracking-tight">Mis Conjuntos (Copropiedades)</h2>
                 <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2 bg-[#00A86B] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#008C59]">
                   <Plus className="w-4 h-4" /> Inscribir Nuevo
                 </button>
               </div>

               {showCreateForm && (
                 <form onSubmit={handleCreateCopropiedad} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6 space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input required type="text" placeholder="Nombre del Conjunto" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" value={nuevoConjunto.nombre} onChange={e => setNuevoConjunto({...nuevoConjunto, nombre: e.target.value})} />
                     <input required type="text" placeholder="NIT" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" value={nuevoConjunto.nit} onChange={e => setNuevoConjunto({...nuevoConjunto, nit: e.target.value})} />
                     <input required type="text" placeholder="DirecciÃ³n" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" value={nuevoConjunto.direccion} onChange={e => setNuevoConjunto({...nuevoConjunto, direccion: e.target.value})} />
                     <input required type="text" placeholder="Ciudad" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" value={nuevoConjunto.ciudad} onChange={e => setNuevoConjunto({...nuevoConjunto, ciudad: e.target.value})} />
                   </div>
                   <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4">Guardar Copropiedad</button>
                 </form>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {copropiedades.length === 0 ? (
                    <div className="col-span-full p-10 text-center text-gray-400">Aún no has inscrito ningún conjunto.</div>
                 ) : copropiedades.map(c => (
                   <div key={c.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                     <div className="flex items-center gap-3 mb-2">
                       <Building className="w-6 h-6 text-primary" />
                       <h3 className="font-bold text-lg">{c.nombre}</h3>
                     </div>
                     <p className="text-sm text-gray-500">NIT: {c.nit}</p>
                     <p className="text-sm text-gray-500">{c.direccion}, {c.ciudad}</p>
                     <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                        <span className="text-xs font-bold text-[#00A86B] uppercase">{c.tipo}</span>
                        <button className="text-primary text-xs font-bold">Gestionar Torres</button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'porteria' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Portería Inteligente</h2>
                <p className="text-gray-500 font-medium text-sm mt-1">Recepción de encomiendas y paquetes</p>
              </div>
              <button onClick={() => setShowScanner(!showScanner)} className="px-6 py-3 bg-gradient-to-r from-primary to-[#00A86B] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 flex items-center gap-2">
                <Camera className="w-4 h-4" /> {showScanner ? 'Ocultar Cámara' : 'Escanear Paquete'}
              </button>
            </div>

            {showScanner && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="max-w-md mx-auto">
                  <ScannerComponent 
                    onScanSuccess={(text) => {
                      setScannedCode(text);
                      setShowScanner(false);
                    }}
                    onScanFailure={(err) => {}}
                  />
                </div>
              </div>
            )}

            {(scannedCode || showScanner) && (
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                <h3 className="font-black text-indigo-900 uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><Fingerprint className="w-4 h-4"/> Registrar Nuevo Paquete</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-indigo-400">Código de Rastreo</label>
                    <input type="text" value={scannedCode} onChange={(e)=>setScannedCode(e.target.value)} className="w-full mt-1 bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm font-bold text-indigo-900" placeholder="Ej: GUIA-123456" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-indigo-400">Apto / Destinatario</label>
                    <input type="text" className="w-full mt-1 bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm font-bold text-indigo-900" placeholder="Ej: Apto 304" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => { alert('Paquete registrado exitosamente en portería.'); setScannedCode(''); }} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-colors">Guardar y Notificar al Residente</button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-black uppercase tracking-widest text-xs text-gray-500">Paquetes en Portería</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {paquetes.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 font-medium text-sm">No hay paquetes pendientes.</div>
                ) : (
                  paquetes.filter(p => p.estado === 'en_porteria').map(p => (
                    <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{p.tracking_code || 'Paquete sin guía'}</p>
                          <p className="text-xs text-gray-500 mt-1">Apto {p.unidad_numero} • Recibido hoy</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-100">Entregar</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        
        {activeTab === 'asambleas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase text-gray-800">🎥 Sala de Asamblea en Vivo</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Panel de Votaciones Activas */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Preguntas de la Asamblea</h3>
                
                {votaciones.map(v => (
                  <div key={v.id} className="mb-4 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-black text-gray-800">{v.titulo}</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{v.abierta ? 'VOTACIÓN ABIERTA' : 'CERRADA'}</span>
                    
                    <div className="mt-4 space-y-2">
                      {v.resultados && v.resultados.map((res, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{res.opcion__texto}</span>
                          <span className="font-black text-primary">{Number(res.total_coeficiente || 0).toFixed(4)}% Quórum</span>
                        </div>
                      ))}
                    </div>
                    
                    {v.abierta && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Voto Manual (Presencial)</p>
                        <div className="flex gap-2">
                          <select className="bg-gray-50 text-xs border border-gray-200 rounded-lg px-2 py-1 w-1/3"
                            value={votoManual.unidadId}
                            onChange={e => setVotoManual({...votoManual, unidadId: e.target.value})}
                          >
                            <option value="">Apto...</option>
                            {unidades.map(u => (
                              <option key={u.id} value={u.id}>{u.numero}</option>
                            ))}
                          </select>
                          <select className="bg-gray-50 text-xs border border-gray-200 rounded-lg px-2 py-1 flex-1"
                            value={votoManual.opcionId}
                            onChange={e => setVotoManual({...votoManual, opcionId: e.target.value})}
                          >
                            <option value="">Decisión...</option>
                            {v.opciones && v.opciones.map(opt => (
                              <option key={opt.id} value={opt.id}>{opt.texto}</option>
                            ))}
                          </select>
                          <button 
                            onClick={async () => {
                              if (!votoManual.unidadId || !votoManual.opcionId) return alert('Selecciona unidad y opción')
                              try {
                                await emitirVoto(v.id, votoManual.opcionId, votoManual.unidadId)
                                alert('Voto asistido registrado exitosamente.')
                                const vts = await getVotaciones()
                                setVotaciones(vts.results || vts)
                                setVotoManual({unidadId: '', opcionId: ''})
                              } catch(e) {
                                alert('Error al registrar voto manual. ¿Ya votó?')
                              }
                            }}
                            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-black transition-colors"
                          >
                            SALVAR VOTO
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Formulario para lanzar pregunta */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4">Lanzar Votación</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Pregunta o Decisión</label>
                    <input type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1"
                      placeholder="Ej: Aprobar aumento del 10%"
                      value={nuevaPregunta.titulo}
                      onChange={e => setNuevaPregunta({...nuevaPregunta, titulo: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Opciones</label>
                    {nuevaPregunta.opciones.map((opt, i) => (
                      <input key={i} type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 mt-2"
                        placeholder={`Opción ${i+1}`}
                        value={opt}
                        onChange={e => {
                          const newOpts = [...nuevaPregunta.opciones];
                          newOpts[i] = e.target.value;
                          setNuevaPregunta({...nuevaPregunta, opciones: newOpts});
                        }}
                      />
                    ))}
                    <button onClick={() => setNuevaPregunta({...nuevaPregunta, opciones: [...nuevaPregunta.opciones, '']})}
                      className="text-xs text-primary font-bold mt-2">+ Añadir Opción</button>
                  </div>
                  
                  <button onClick={async () => {
                    const res = await createVotacion({
                      asamblea: asambleas[0]?.id,
                      titulo: nuevaPregunta.titulo,
                      tipo: nuevaPregunta.tipo,
                      opciones_textos: nuevaPregunta.opciones.filter(o => o.trim() !== '')
                    });
                    setVotaciones([res, ...votaciones]);
                    setNuevaPregunta({titulo: '', tipo: 'consejo', opciones: ['', '']})
                  }} className="w-full bg-primary text-surface font-black py-3 rounded-xl">LANZAR VOTACIÓN EN VIVO</button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {activeTab === 'convocatorias' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase text-gray-800">💼 Convocatorias y Licitaciones</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulario para crear convocatoria */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-1">
                <h3 className="font-bold mb-4">Abrir Nueva Convocatoria</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Título del Proyecto</label>
                    <input type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1"
                      placeholder="Ej: Pintura de Fachada Exterior"
                      value={nuevaConvocatoria.titulo}
                      onChange={e => setNuevaConvocatoria({...nuevaConvocatoria, titulo: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Términos de Referencia</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1 h-32"
                      placeholder="Describe los requerimientos técnicos y legales..."
                      value={nuevaConvocatoria.descripcion}
                      onChange={e => setNuevaConvocatoria({...nuevaConvocatoria, descripcion: e.target.value})}
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Fecha Límite para Propuestas</label>
                    <input type="date" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1"
                      value={nuevaConvocatoria.fecha_cierre}
                      onChange={e => setNuevaConvocatoria({...nuevaConvocatoria, fecha_cierre: e.target.value})}
                    />
                  </div>
                  
                  <button onClick={async () => {
                    const res = await createConvocatoria({
                      copropiedad: profile.copropiedad || copropiedades[0]?.id,
                      titulo: nuevaConvocatoria.titulo,
                      descripcion: nuevaConvocatoria.descripcion,
                      fecha_cierre: nuevaConvocatoria.fecha_cierre ? new Date(nuevaConvocatoria.fecha_cierre).toISOString() : new Date().toISOString()
                    });
                    setConvocatorias([res, ...convocatorias]);
                    setNuevaConvocatoria({titulo: '', descripcion: '', fecha_cierre: ''})
                  }} className="w-full bg-primary text-surface font-black py-3 rounded-xl">PUBLICAR CONVOCATORIA</button>
                </div>
              </div>

              {/* Lista de Convocatorias y Propuestas */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Cartelera de Contratación Pública</h3>
                
                <div className="space-y-4">
                {convocatorias.map(c => (
                  <div key={c.id} className="p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-gray-800 text-lg">{c.titulo}</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.descripcion}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                        VENCE: {new Date(c.fecha_cierre).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Propuestas Recibidas ({c.propuestas?.length || 0})</h5>
                      {c.propuestas && c.propuestas.length > 0 ? (
                        <div className="space-y-2">
                          {c.propuestas.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                              <span className="font-medium text-gray-700">{p.proveedor_nombre}</span>
                              <span className="font-black text-primary">${Number(p.monto_estimado).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No hay propuestas de contratistas aún. Los residentes pueden subir propuestas de referidos en su app.</p>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        )}

        
        {activeTab === 'comites' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase text-gray-800">📂 Comités, Consejo y Actas</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Panel de Consejo de Administración */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Consejo de Administración</h3>
                {consejos.length > 0 ? consejos.map(c => (
                  <div key={c.id} className="mb-4 p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-gray-800">Periodo {c.periodo}</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{c.activo ? 'ACTIVO' : 'HISTÓRICO'}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {c.miembros && c.miembros.map(m => (
                        <div key={m.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg">
                          <span className="font-medium text-gray-700">Apt {m.unidad_numero || m.unidad}</span>
                          <span className="text-primary font-bold uppercase text-xs">{m.cargo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-400 text-sm">No hay un consejo registrado.</p>
                    <button className="mt-3 text-xs bg-primary text-surface px-4 py-2 rounded-full font-bold">Registrar Nuevo Consejo</button>
                  </div>
                )}
              </div>

              {/* Repositorio de Actas */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2"><FileTextIcon className="w-5 h-5 text-primary" /> Repositorio de Actas Oficiales</h3>
                
                <div className="space-y-3">
                  {actas.length > 0 ? actas.map(a => (
                    <div key={a.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                          <FileTextIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">Acta de {a.entidad}</p>
                          <p className="text-xs text-gray-400">{new Date(a.fecha_reunion).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <a href={a.documento} target="_blank" rel="noreferrer" className="text-primary hover:text-blue-700 p-2 bg-primary/10 rounded-full">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-400 italic text-center py-4">El repositorio está vacío.</p>
                  )}
                  
                  <button className="w-full mt-4 border-2 border-dashed border-primary/50 text-primary font-bold py-3 rounded-xl hover:bg-primary/5 transition-colors">
                    + SUBIR NUEVA ACTA AL REPOSITORIO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mensajes' && (
             <div className="animate-fade-in">
               <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Bandeja de MensajerÃ­a</h2>
               <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 min-h-[400px]">
                 {mensajes.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-center py-20">
                     <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                     <h3 className="text-lg font-bold text-gray-500">No hay mensajes activos</h3>
                     <p className="text-sm text-gray-400">Los comunicados con los residentes aparecerÃ¡n aquÃ­.</p>
                     <button className="mt-6 bg-[#0f172a] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Nuevo Comunicado</button>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {mensajes.map(m => (
                        <div key={m.id} className="p-4 border-b border-gray-100 flex flex-col gap-2">
                           <div className="flex justify-between items-center">
                             <span className="font-bold text-sm uppercase">{m.asunto}</span>
                             <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleDateString()}</span>
                           </div>
                           <p className="text-gray-600 text-sm">{m.contenido}</p>
                        </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           )}

           {activeTab === 'verificaciones' && (
             <div className="animate-fade-in">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Verificaciones Pendientes</h2>
                <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
                  {solicitudes.map(s => (
                     <div key={s.id} className="p-4 mb-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                       <div>
                         <h3 className="font-bold text-sm">{s.usuario}</h3>
                         <p className="text-xs text-gray-500">{s.unidad} â€¢ {s.rol}</p>
                         <div className="mt-2 flex items-center gap-2">
                           <FileText className="w-4 h-4 text-blue-500" />
                           <span className="text-xs text-blue-500 font-bold cursor-pointer">{s.documento}</span>
                         </div>
                       </div>
                       <div className="flex gap-2">
                         <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-red-500">Rechazar</button>
                         <button className="px-4 py-2 bg-[#00A86B] text-white rounded-lg text-xs font-bold">Aprobar</button>
                       </div>
                     </div>
                  ))}
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  )
}





