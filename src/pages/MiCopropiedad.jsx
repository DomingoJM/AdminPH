import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building, ArrowLeft, Search, FileText, Upload, Wallet, Megaphone, FileSignature, HelpCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import supabase from '../services/supabaseClient'

export default function MiCopropiedad() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [userUnit, setUserUnit] = useState(null)
  
  // States for Claim Flow
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCopropiedad, setSelectedCopropiedad] = useState(null)
  const [selectedTorre, setSelectedTorre] = useState('')
  const [selectedUnidad, setSelectedUnidad] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    async function loadData() {
      if (profile?.id) {
        // Fetch verified units for the user
        const { data } = await supabase
          .from('ph_unidad_usuarios')
          .select(`
            rol,
            estado,
            ph_unidades (
              numero,
              tipo,
              coeficiente,
              ph_torres (
                nombre,
                ph_copropiedades (
                  nombre,
                  direccion
                )
              )
            )
          `)
          .eq('user_id', profile.id)
          .eq('estado', 'verificado')
          .limit(1)
          .single()

        if (data) setUserUnit(data)
      }
      setLoading(false)
    }
    loadData()
  }, [profile])
  
  const copropiedadesMock = [
    { id: 'c1', nombre: 'Conjunto Los Nogales', direccion: 'Cra 45 # 120-15', ciudad: 'Bogotá' },
    { id: 'c2', nombre: 'Edificio Torre Real', direccion: 'Av Poblado 50', ciudad: 'Medellín' },
  ]

  const handleClaim = () => {
    alert("Solicitud enviada a la administración. Serás notificado cuando se verifique tu propiedad/residencia.")
    navigate('/dashboard')
  }

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>

  // Si no tiene unidad verificada, mostramos el flujo de reclamo
  if (!userUnit) {
    return (
      <div className="min-h-screen bg-background pb-32 font-sans selection:bg-primary-100">
        <header className="max-w-4xl mx-auto p-8 flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-4 rounded-2xl bg-surface shadow-sm border border-primary-50 text-primary hover:bg-primary-50 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-text uppercase tracking-tight italic">Reclamar Unidad</h1>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Identidad Inmobiliaria Segura</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6">
          <div className="bg-surface rounded-[3rem] p-10 border-2 border-primary-100 shadow-xl shadow-primary-50 relative overflow-hidden">
            <div className="flex gap-4 mb-10">
              <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-100'}`} />
              <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-100'}`} />
              <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-100'}`} />
            </div>

            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-md mx-auto mb-8">
                  <Building className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Busca tu Copropiedad</h2>
                  <p className="text-sm text-text-muted font-bold">Ingresa el nombre o NIT de tu conjunto cerrado o edificio para comenzar.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Ej: Conjunto Los Nogales..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-primary-50/30 border-2 border-primary-50 rounded-2xl py-4 pl-16 pr-6 font-bold focus:border-primary outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {copropiedadesMock.map(c => (
                    <button key={c.id} onClick={() => { setSelectedCopropiedad(c); setStep(2); }} className="flex flex-col text-left p-6 bg-white border border-gray-100 rounded-2xl hover:border-primary-200 hover:shadow-md transition-all group">
                      <span className="font-black text-lg text-text group-hover:text-primary transition-colors">{c.nombre}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{c.ciudad} • {c.direccion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && selectedCopropiedad && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-md mx-auto mb-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{selectedCopropiedad.nombre}</div>
                  <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Identifica tu Inmueble</h2>
                  <p className="text-sm text-text-muted font-bold">Selecciona tu ubicación exacta y el rol que cumples en la unidad.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Torre / Interior</label>
                     <select value={selectedTorre} onChange={(e) => setSelectedTorre(e.target.value)} className="w-full bg-surface border-2 border-primary-50 rounded-2xl py-4 px-5 font-bold outline-none focus:border-primary">
                       <option value="">Selecciona...</option>
                       <option value="Torre 1">Torre 1</option>
                       <option value="Torre 2">Torre 2</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Apartamento / Casa</label>
                     <input type="text" placeholder="Ej: 304" value={selectedUnidad} onChange={(e) => setSelectedUnidad(e.target.value)} className="w-full bg-surface border-2 border-primary-50 rounded-2xl py-4 px-5 font-bold outline-none focus:border-primary" />
                   </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 text-center">Mi relación con este inmueble es:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Propietario', 'Arrendatario', 'Residente'].map(role => (
                      <button key={role} onClick={() => setSelectedRole(role)} className={`py-4 rounded-xl font-black uppercase tracking-widest text-xs border-2 transition-all ${selectedRole === role ? 'bg-primary text-surface border-primary shadow-md' : 'bg-surface text-gray-500 border-gray-100 hover:border-primary-200'}`}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Volver</button>
                  <button disabled={!selectedTorre || !selectedUnidad || !selectedRole} onClick={() => setStep(3)} className="flex-1 py-4 bg-primary text-surface rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 disabled:opacity-50 transition-colors">Siguiente</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in text-center">
                 <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <FileText className="w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-2">Validación Requerida</h2>
                 <p className="text-sm text-text-muted font-bold max-w-md mx-auto">
                   Para proteger la seguridad de la copropiedad, el administrador debe verificar tu identidad. Opcionalmente, puedes adjuntar un documento (Ej. Certificado de Libertad, Contrato de Arriendo) para acelerar el proceso.
                 </p>
                 <div className="border-2 border-dashed border-primary-200 bg-primary-50/30 rounded-3xl p-8 max-w-md mx-auto cursor-pointer hover:bg-primary-50 transition-colors">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
                    <span className="font-black text-sm block">Subir Documento Soporte</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">(Opcional)</span>
                 </div>
                 <div className="flex gap-4 pt-6 max-w-md mx-auto">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Volver</button>
                  <button onClick={handleClaim} className="flex-1 py-4 bg-primary text-surface rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-colors shadow-lg">Enviar Solicitud</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // SI TIENE UNIDAD VERIFICADA: FASE 3 - DASHBOARD DEL RESIDENTE
  const unidad = userUnit.ph_unidades
  const copropiedad = unidad.ph_torres.ph_copropiedades

  return (
    <div className="min-h-screen bg-background pb-32 font-sans selection:bg-primary-100">
      
      {/* Header Residente */}
      <header className="bg-primary text-surface p-10 rounded-b-[3.5rem] shadow-xl shadow-primary-50 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Building className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="p-4 rounded-2xl bg-surface/10 backdrop-blur-sm shadow-sm border border-surface/20 text-surface hover:bg-surface/20 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <p className="text-primary-100 font-bold uppercase tracking-widest text-xs mb-2">Mi Copropiedad</p>
              <h1 className="text-4xl font-black uppercase tracking-tight mb-1">{copropiedad.nombre}</h1>
              <div className="flex items-center gap-3">
                <span className="bg-surface/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{unidad.ph_torres.nombre} - {unidad.tipo} {unidad.numero}</span>
                <span className="bg-green-500/20 text-green-100 border border-green-500/30 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {userUnit.rol} Verificado
                </span>
              </div>
            </div>
          </div>
          <Link to="/asambleas" className="bg-surface text-primary px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-50 transition-colors shadow-lg">
            Módulo de Asambleas
          </Link>
        </div>
      </header>

            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Asistente KasApp Copropiedad */}
        <div className="md:col-span-12 mb-2">
          <section className="bg-primary-50 rounded-[2rem] p-6 border border-primary-100 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="bg-primary/10 p-4 rounded-full">
              <Megaphone className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-primary-900 mb-1">KasApp Administrator</h3>
              <p className="text-sm text-primary-700">He analizado los reportes de {copropiedad.nombre}. �Quieres que resuma las decisiones de la �ltima asamblea o el estado financiero general?</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-primary text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-600 shadow-lg shadow-primary/30 transition-all text-center">
                Generar Resumen
              </button>
            </div>
          </section>
        </div>

        {/* Columna Principal */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Módulo Financiero: Mis Obligaciones */}
          <section className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-text uppercase tracking-tight flex items-center gap-2">
                 <Wallet className="w-6 h-6 text-primary" /> Estado de Mi Cuenta
               </h2>
               <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full">Al día</span>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
               <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total a Pagar</p>
                 <p className="text-2xl font-black text-text">$345.000</p>
               </div>
               <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Próximo Vencimiento</p>
                 <p className="text-2xl font-black text-text">15 Oct</p>
               </div>
               <div className="p-5 rounded-2xl bg-primary-50 border border-primary-100 flex flex-col justify-center items-center cursor-pointer hover:bg-primary hover:text-surface transition-colors group">
                 <span className="text-[10px] font-black text-primary group-hover:text-surface uppercase tracking-widest">Pagar en línea</span>
               </div>
             </div>
             
             <div>
               <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Detalle del mes</h3>
               <div className="flex justify-between items-center py-3 border-b border-gray-100">
                 <span className="font-bold text-sm text-text">Cuota de Administración (Octubre)</span>
                 <span className="font-black text-sm">$320.000</span>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-gray-100">
                 <span className="font-bold text-sm text-text">Cuota Extra - Pintura Fachada (Cuota 2/3)</span>
                 <span className="font-black text-sm">$25.000</span>
               </div>
             </div>
          </section>

          {/* Módulo PQRS y Solicitudes */}
          <section className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-text uppercase tracking-tight flex items-center gap-2">
                 <HelpCircle className="w-6 h-6 text-primary" /> Mis Solicitudes (PQRS)
               </h2>
               <button className="text-[10px] font-black uppercase tracking-widest bg-primary text-surface px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors">Nueva PQR</button>
             </div>
             
             <div className="space-y-4">
               {/* Mock PQRS */}
               <div className="p-5 rounded-2xl border border-gray-100 flex items-start justify-between hover:border-primary-100 transition-colors">
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REQ-0042</span>
                     <span className="text-[10px] font-black bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full uppercase">En Proceso</span>
                   </div>
                   <h3 className="font-bold text-sm text-text">Filtración de agua en parqueadero</h3>
                   <p className="text-xs text-text-muted mt-1">Radicada el 01 de Octubre</p>
                 </div>
                 <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Ver Trazabilidad</button>
               </div>
             </div>
          </section>

          {/* FASE 6: ECOSISTEMA DE VIVIENDA */}
          <section className="bg-gradient-to-br from-gray-900 to-primary-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-800 text-surface relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 mb-2">
                 Oportunidades para tu Vivienda
               </h2>
               <p className="text-xs font-bold text-gray-300 mb-6">MikasApp te conecta con el ecosistema inmobiliario y financiero.</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 
                 <Link to="/simulator" className="bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-2xl transition-all group backdrop-blur-sm">
                   <Wallet className="w-6 h-6 text-green-400 mb-3" />
                   <h3 className="font-black text-sm uppercase tracking-tight mb-1">Crédito y Financiación</h3>
                   <p className="text-[10px] text-gray-300">Explora tasas de bancos y opciones para refinanciar o pagar tu cuota.</p>
                 </Link>

                 <Link to="/subsidios" className="bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-2xl transition-all group backdrop-blur-sm">
                   <Building className="w-6 h-6 text-yellow-400 mb-3" />
                   <h3 className="font-black text-sm uppercase tracking-tight mb-1">Mejoramiento y Subsidios</h3>
                   <p className="text-[10px] text-gray-300">Aplica a programas del gobierno o cajas de compensación para arreglos.</p>
                 </Link>

                 <Link to="/homes" className="bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-2xl transition-all group backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                   <Search className="w-6 h-6 text-blue-400 mb-3" />
                   <h3 className="font-black text-sm uppercase tracking-tight mb-1">Match Inmobiliario</h3>
                   <p className="text-[10px] text-gray-300">¿Pensando en mudarte? Calcula qué puedes comprar con tu patrimonio actual.</p>
                 </Link>

               </div>
             </div>
          </section>

        </div>

        {/* Columna Secundaria */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Comunicaciones */}
          <section className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-black text-text uppercase tracking-tight flex items-center gap-2 mb-6">
              <Megaphone className="w-5 h-5 text-primary" /> Cartelera
            </h2>
            <div className="space-y-6">
              <div className="relative pl-4 border-l-2 border-primary-300">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full" />
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">04 Octubre</p>
                <h3 className="font-bold text-sm text-text mb-1">Fumigación de Zonas Comunes</h3>
                <p className="text-xs text-text-muted">Se realizará mantenimiento y fumigación en los pasillos de todas las torres.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-200">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-gray-300 rounded-full" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">01 Octubre</p>
                <h3 className="font-bold text-sm text-text mb-1">Acta Asamblea Extraordinaria</h3>
                <p className="text-xs text-text-muted">Ya se encuentra disponible el acta de la asamblea del mes pasado.</p>
              </div>
            </div>
          </section>

          {/* Documentos */}
          <section className="bg-surface rounded-[2.5rem] p-8 shadow-sm border border-primary-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-black text-text uppercase tracking-tight flex items-center gap-2 mb-6">
              <FileSignature className="w-5 h-5 text-primary" /> Documentos
            </h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary-50 group transition-colors">
                <span className="font-bold text-xs text-text group-hover:text-primary">Manual de Convivencia</span>
                <ArrowLeft className="w-4 h-4 transform rotate-135 text-gray-400 group-hover:text-primary" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary-50 group transition-colors">
                <span className="font-bold text-xs text-text group-hover:text-primary">Presupuesto 2026</span>
                <ArrowLeft className="w-4 h-4 transform rotate-135 text-gray-400 group-hover:text-primary" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary-50 group transition-colors">
                <span className="font-bold text-xs text-text group-hover:text-primary">Acta Asamblea 01-Oct</span>
                <ArrowLeft className="w-4 h-4 transform rotate-135 text-gray-400 group-hover:text-primary" />
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}


