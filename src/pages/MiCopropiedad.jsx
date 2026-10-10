import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, MapPin, Search, ArrowRight, CheckCircle2, Shield, AlertTriangle, FileText, Package, MessageSquare, Video, FileSignature, ChevronRight, QrCode } from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import { getCopropiedades, fetchWithAuth, getVisitas, createVisita } from '../services/api'

export default function MiCopropiedad() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  
  // States
  const [misUnidades, setMisUnidades] = useState([])
  const [activeUnidad, setActiveUnidad] = useState(null)
  
  const [asambleas, setAsambleas] = useState([])
  const [actas, setActas] = useState([])
  const [pqrs, setPqrs] = useState([])
  const [paquetes, setPaquetes] = useState([])
  const [visitas, setVisitas] = useState([])
  const [nuevaVisita, setNuevaVisita] = useState({ nombre_visitante: "", tipo: "Familiar" })
  const [loading, setLoading] = useState(true)

  // Onboarding States
  const [copropiedades, setCopropiedades] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCop, setSelectedCop] = useState(null)
  const [unidad, setUnidad] = useState({ torre: '', numero: '', rol: 'propietario' })
  const [aceptaTerminos, setAceptaTerminos] = useState(false)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const units = await fetchWithAuth('/api/v1/ph/mis-unidades/')
      const unitData = units.results || units
      setMisUnidades(unitData)
      
      if (unitData.length > 0) {
        setActiveUnidad(unitData[0]) // Select first unit by default
        
        // Cargar data del dashboard
        const [asm, ac, pq, paqs] = await Promise.all([
          fetchWithAuth('/api/v1/ph/asambleas/'),
          fetchWithAuth('/api/v1/ph/actas/'),
          fetchWithAuth('/api/v1/ph/pqrs/'),
          fetchWithAuth('/api/v1/ph/paquetes/'),
          getVisitas()
        ])
        setAsambleas(asm.results || asm)
        setActas(ac.results || ac)
        setPqrs(pq.results || pq)
        setPaquetes(paqs.results || paqs)
        const vis = await getVisitas()
        setVisitas(vis.results || vis)
      } else {
        // Cargar lista de conjuntos para afiliarse
        const cops = await getCopropiedades()
        setCopropiedades(cops.results || cops)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const claimUnit = async () => {
    if (!aceptaTerminos) return alert('Debes aceptar la política de tratamiento de datos.');
    try {
      await fetchWithAuth('/api/v1/ph/mis-unidades/', {
        method: 'POST',
        body: JSON.stringify({
          copropiedad_id: selectedCop.id,
          unidad_numero: unidad.numero,
          rol: unidad.rol
        })
      })
      window.location.reload()
    } catch (e) {
      alert("Error al vincular el inmueble")
    }
  }

  const votar = async (votacionId, opcionId) => {
    try {
      await fetchWithAuth(`/api/v1/ph/votaciones/${votacionId}/emitir_voto/`, {
        method: 'POST',
        body: JSON.stringify({ opcion_id: opcionId, unidad_id: activeUnidad?.unidad?.id || activeUnidad?.unidad })
      })
      alert("¡Voto registrado con éxito! Tu coeficiente ha sido sumado al quórum.")
      loadDashboard() // recargar
    } catch (e) {
      alert("Error: Puede que ya hayas votado por esta unidad.")
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Cargando tu residencia...</div>

  // VISTA 1: ONBOARDING (No tiene unidades)
  if (misUnidades.length === 0) {
    return (
      <div className="min-h-screen bg-surface p-4 flex flex-col items-center">
        {!selectedCop ? (
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-sm mt-8 border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-800">Busca tu Copropiedad</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">Para comenzar, busca el nombre de tu edificio o conjunto residencial.</p>
            
            <div className="relative mb-6">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Nombre del conjunto..."
                className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              {copropiedades.filter(c => c.nombre.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                <button key={c.id} onClick={() => setSelectedCop(c)}
                  className="w-full text-left bg-gray-50 hover:bg-primary/5 p-4 rounded-xl flex items-center justify-between group transition-colors">
                  <div>
                    <p className="font-black text-gray-800 text-sm">{c.nombre}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3"/> {c.ciudad || 'Ciudad'}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-sm mt-8 border border-gray-100">
            <button onClick={() => setSelectedCop(null)} className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest hover:text-primary">← Volver</button>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-800 mb-2">Identifica tu Inmueble</h2>
            <p className="text-primary font-bold bg-primary/10 inline-block px-3 py-1 rounded-full text-sm mb-6">{selectedCop.nombre}</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Número de Apartamento / Casa</label>
                <input type="text" placeholder="Ej: 304" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1"
                  value={unidad.numero} onChange={e => setUnidad({...unidad, numero: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Tu relación con el inmueble</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['propietario', 'arrendatario', 'residente'].map(r => (
                    <button key={r} onClick={() => setUnidad({...unidad, rol: r})}
                      className={`py-3 text-xs font-bold rounded-xl border transition-all ${unidad.rol === r ? 'bg-primary text-surface border-primary' : 'bg-white text-gray-500 border-gray-200'}`}>
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <input 
                  type="checkbox" 
                  id="habeas" 
                  checked={aceptaTerminos}
                  onChange={e => setAceptaTerminos(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="habeas" className="text-[10px] text-gray-500 leading-tight">
                  Autorizo el tratamiento de mis datos personales conforme a la <strong>Ley de Protección de Datos (Habeas Data)</strong>, exclusivamente para fines de administración, seguridad y participación democrática en la copropiedad.
                </label>
              </div>
              
              <button 
                onClick={claimUnit} 
                disabled={!aceptaTerminos}
                className={`w-full font-black py-4 rounded-xl mt-4 transition-all ${aceptaTerminos ? 'bg-primary text-surface shadow-lg shadow-primary/30 hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                VINCULAR INMUEBLE
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // VISTA 2: DASHBOARD RESIDENTE ("KILLER UI")
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-br from-primary to-blue-800 pt-12 pb-16 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-surface/80 text-sm font-bold tracking-widest uppercase mb-1">Tu Residencia</p>
            <h1 className="text-3xl font-black text-surface tracking-tight">Apt {activeUnidad?.unidad_numero || '000'}</h1>
            <p className="text-surface/90 font-medium text-sm mt-1 bg-black/20 inline-block px-3 py-1 rounded-full">{activeUnidad?.copropiedad_nombre || 'Conjunto Residencial'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg">
            <Building className="w-6 h-6 text-surface" />
          </div>
        </div>
        
        {/* Selector de multiples unidades */}
        {misUnidades.length > 1 && (
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {misUnidades.map(u => (
              <button key={u.id} onClick={() => setActiveUnidad(u)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black tracking-wide transition-all ${activeUnidad?.id === u.id ? 'bg-surface text-primary shadow-lg scale-105' : 'bg-white/20 text-surface hover:bg-white/30 border border-white/20'}`}>
                APT {u.unidad_numero}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 -mt-8 relative z-20 space-y-4">
        
        {/* WIDGET: ASAMBLEA EN VIVO */}
        {asambleas.length > 0 && (
          <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-red-500/30 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center animate-pulse">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-lg tracking-tight">Asamblea en Vivo</h3>
                <p className="text-xs text-red-500 font-black uppercase tracking-widest">{asambleas[0].titulo}</p>
              </div>
            </div>
            
            {/* Votaciones activas */}
            {asambleas[0].votaciones && asambleas[0].votaciones.filter(v => v.abierta).length > 0 ? (
              <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                <p className="text-xs font-black text-red-600 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4"/> ¡Tu voto es requerido!
                </p>
                {asambleas[0].votaciones.filter(v => v.abierta).map(vot => (
                  <div key={vot.id} className="mb-4 last:mb-0">
                    <p className="font-black text-gray-800 mb-3 text-lg leading-tight">{vot.titulo}</p>
                    <div className="space-y-2">
                      {vot.opciones.map(opt => (
                        <button key={opt.id} onClick={() => votar(vot.id, opt.id)} className="w-full bg-white border-2 border-red-100 hover:bg-red-50 hover:border-red-500 text-gray-700 hover:text-red-700 font-black py-4 rounded-xl transition-all shadow-sm flex items-center justify-between px-5">
                          {opt.texto}
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <button className="w-full bg-red-500 text-white font-black py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-red-600 shadow-lg shadow-red-500/30">
                 Ingresar a la videollamada <Video className="w-4 h-4" />
               </button>
            )}
          </div>
        )}

        {/* WIDGETS 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">{paquetes.filter(p => p.estado === 'en_porteria').length}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paquetes</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">{pqrs.filter(p => p.estado !== 'resuelto').length}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">PQRS Activas</p>
            </div>
          </div>

        </div>
        
        {/* WIDGET: CONTROL DE ACCESO (QR) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-gray-800 flex items-center gap-2 text-lg"><QrCode className="w-5 h-5 text-primary" /> Mis Autorizaciones (QR)</h3>
          </div>
          
          <div className="space-y-3 mb-5">
            {visitas.filter(v => v.estado === 'preautorizada').map(v => (
              <div key={v.id} className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-black text-blue-900">{v.nombre_visitante}</p>
                  <p className="text-xs text-blue-700">{v.tipo}</p>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm text-center">
                   <QrCode className="w-8 h-8 text-blue-900 mx-auto" />
                   <p className="text-[8px] font-black uppercase mt-1">Mostrar en Portería</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
             <p className="text-xs font-bold text-gray-500 uppercase mb-3">Pre-autorizar nueva visita</p>
             <div className="flex gap-2">
                <input type="text" placeholder="Nombre del visitante..." 
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm"
                  value={nuevaVisita.nombre_visitante}
                  onChange={e => setNuevaVisita({...nuevaVisita, nombre_visitante: e.target.value})}
                />
                <select className="bg-white border border-gray-200 rounded-xl px-2 py-2 text-sm"
                  value={nuevaVisita.tipo}
                  onChange={e => setNuevaVisita({...nuevaVisita, tipo: e.target.value})}
                >
                   <option>Familiar</option>
                   <option>Domicilio</option>
                   <option>Servicio</option>
                </select>
                <button onClick={async () => {
                   if (!nuevaVisita.nombre_visitante) return;
                   await createVisita({ 
                     copropiedad: activeUnidad.copropiedad_id, 
                     unidad: activeUnidad.unidad_id || activeUnidad.unidad, 
                     ...nuevaVisita 
                   });
                   const vis = await getVisitas();
                   setVisitas(vis.results || vis);
                   setNuevaVisita({nombre_visitante: '', tipo: 'Familiar'});
                }} className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm">
                   CREAR
                </button>
             </div>
          </div>
        </div>

        {/* REPOSITORIO DE ACTAS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-gray-800 flex items-center gap-2 text-lg"><FileSignature className="w-5 h-5 text-primary" /> Actas Oficiales</h3>
            <button className="text-[10px] uppercase tracking-widest text-primary font-black bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">Ver Todo</button>
          </div>
          <div className="space-y-3">
            {actas.slice(0, 3).map(a => (
              <a key={a.id} href={a.documento} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                     <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-black text-sm text-gray-800 group-hover:text-primary transition-colors">Acta {a.entidad}</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-0.5">{new Date(a.fecha_reunion).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
              </a>
            ))}
            {actas.length === 0 && (
              <div className="py-8 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Repositorio Vacío</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
