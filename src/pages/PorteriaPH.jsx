import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Camera, Package, Fingerprint, CheckCircle2, QrCode, CreditCard, UserPlus, BellRing, Smartphone, ScanLine } from 'lucide-react'

export default function PorteriaPH() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('registro') // 'qr', 'registro', 'paquetes'
  
  // States for QR Scanner
  const [showScanner, setShowScanner] = useState(false)
  const [scannedCode, setScannedCode] = useState('')

  // States for Manual Registration / Virtual Intercom
  const [intercomStatus, setIntercomStatus] = useState('idle') // idle, waiting, approved, rejected
  const [idData, setIdData] = useState({ cedula: '', nombre: '', destino: '', tipo: 'Familiar' })

  // Simulate Cedula Barcode Scan
  const handleScanCedula = () => {
    setIdData({
      cedula: '1098765432',
      nombre: 'JUAN CARLOS PEREZ GOMEZ',
      destino: '',
      tipo: 'Domicilio / Repartidor'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans selection:bg-primary-100">
      
      <div className="bg-[#0f172a] text-surface shadow-2xl relative overflow-hidden border-b-4 border-[#F59E0B]">
        <div className="absolute top-0 right-0 p-10 opacity-5 blur-xl">
          <Shield className="w-64 h-64 text-[#F59E0B]" />
        </div>
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
          <button onClick={() => setActiveTab('registro')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'registro' ? 'bg-[#F59E0B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <CreditCard className="w-5 h-5" /> Visitantes Inesperados
          </button>
          <button onClick={() => setActiveTab('qr')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'qr' ? 'bg-[#F59E0B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <QrCode className="w-5 h-5" /> Escáner QR Autorizado
          </button>
          <button onClick={() => setActiveTab('paquetes')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'paquetes' ? 'bg-[#F59E0B] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            <Package className="w-5 h-5" /> Paquetes / Casilleros
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
          
          {/* TAB 1: Registro de Visitantes Inesperados (Nuevo) */}
          {activeTab === 'registro' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-slide-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] flex items-center gap-3">
                    <CreditCard className="text-[#F59E0B]" /> Registro de Visitantes
                  </h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Para visitas sin QR previo</p>
                </div>
                <button onClick={handleScanCedula} className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors shadow-sm">
                  <ScanLine className="w-4 h-4" /> Leer Código Cédula
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {/* Formulario */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cédula</label>
                      <input type="text" value={idData.cedula} onChange={(e) => setIdData({...idData, cedula: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] font-medium" placeholder="Ej. 1098..." />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nombre Completo</label>
                      <input type="text" value={idData.nombre} onChange={(e) => setIdData({...idData, nombre: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] font-medium text-xs" placeholder="Nombres y Apellidos" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unidad Destino</label>
                      <input type="text" value={idData.destino} onChange={(e) => setIdData({...idData, destino: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] font-bold text-gray-800" placeholder="Torre / Apto" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tipo de Visita</label>
                      <select value={idData.tipo} onChange={(e) => setIdData({...idData, tipo: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] text-xs font-medium">
                        <option>Familiar / Amigo</option>
                        <option>Domicilio / Repartidor</option>
                        <option>Servicio / Contratista</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Citófono Virtual y Foto */}
                <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                  
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden relative group cursor-pointer border border-gray-200 shadow-inner">
                    <UserPlus className="text-gray-400 w-8 h-8" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white w-6 h-6" />
                    </div>
                  </div>
                  
                  {intercomStatus === 'idle' && (
                    <button onClick={() => setIntercomStatus('waiting')} className="w-full bg-[#0f172a] hover:bg-gray-800 text-white font-bold rounded-xl px-4 py-3 shadow-lg transition-colors uppercase text-[11px] tracking-widest flex items-center justify-center gap-2">
                      <BellRing className="w-4 h-4" /> Citófono Virtual (Anunciar)
                    </button>
                  )}
                  
                  {intercomStatus === 'waiting' && (
                    <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-3 flex flex-col items-center animate-pulse">
                      <Smartphone className="w-5 h-5 mb-1 text-yellow-500" />
                      <span className="text-xs font-black uppercase tracking-wider">Notificando App...</span>
                      <span className="text-[10px] font-medium opacity-70">Esperando respuesta del residente</span>
                      <div className="flex gap-2 mt-2 w-full">
                         <button onClick={() => setIntercomStatus('approved')} className="flex-1 text-[10px] bg-green-100 text-green-700 font-bold py-1 rounded">Simular SÍ</button>
                         <button onClick={() => setIntercomStatus('rejected')} className="flex-1 text-[10px] bg-red-100 text-red-700 font-bold py-1 rounded">Simular NO</button>
                      </div>
                    </div>
                  )}

                  {intercomStatus === 'approved' && (
                    <div className="w-full bg-green-50 border border-green-200 text-green-800 rounded-xl p-3 flex flex-col items-center">
                      <CheckCircle2 className="w-6 h-6 mb-1 text-green-500" />
                      <span className="text-xs font-black uppercase tracking-wider text-green-700">¡Ingreso Autorizado!</span>
                      <button onClick={() => { setIntercomStatus('idle'); setIdData({cedula:'', nombre:'', destino:'', tipo:'Familiar'}) }} className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs font-black px-4 py-2 rounded-lg w-full uppercase tracking-widest shadow-md transition-colors">
                        Registrar Entrada
                      </button>
                    </div>
                  )}

                  {intercomStatus === 'rejected' && (
                    <div className="w-full bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 flex flex-col items-center">
                      <div className="w-6 h-6 mb-1 text-red-500 font-black text-lg flex items-center justify-center">X</div>
                      <span className="text-xs font-black uppercase tracking-wider text-red-700">Ingreso Rechazado</span>
                      <button onClick={() => setIntercomStatus('idle')} className="mt-2 text-[10px] underline text-gray-500">Volver a intentar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Escáner QR */}
          {activeTab === 'qr' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-slide-up">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <QrCode className="text-[#F59E0B]" /> Lector de Código QR
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-6">Valida el ingreso de invitados que traigan un código QR de invitación generado por el residente.</p>
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center bg-gray-50">
                {!showScanner ? (
                  <>
                    <Camera className="w-20 h-20 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-bold mb-4">Haga clic para activar la cámara o escáner de pedestal</p>
                    <button onClick={() => setShowScanner(true)} className="btn btn-primary bg-[#F59E0B] hover:bg-[#D97706] border-none text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-lg transition-colors">Activar Cámara Frontal</button>
                  </>
                ) : (
                  <div className="w-full max-w-sm aspect-square bg-black rounded-3xl relative overflow-hidden flex items-center justify-center border-4 border-[#F59E0B] shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    <div className="w-full h-1 bg-[#F59E0B] shadow-[0_0_20px_#F59E0B] absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                    <p className="text-white text-xs font-mono z-10 font-bold tracking-widest">CÁMARA ACTIVA...</p>
                    <button onClick={() => { setShowScanner(false); setScannedCode('QR-VALIDO-778'); }} className="absolute bottom-4 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full text-white text-xs font-bold hover:bg-white/40 transition-colors uppercase tracking-widest">Simular Lectura Exitosa</button>
                  </div>
                )}
              </div>
              
              {scannedCode && (
                <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center gap-4 animate-fade-in shadow-sm">
                  <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-green-800 font-black text-lg uppercase tracking-tight">Acceso QR Autorizado</h3>
                    <p className="text-green-600 text-sm font-medium">Invitación Válida. Permiso para ingresar a la Unidad 304 - Torre 1.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Paquetes */}
          {activeTab === 'paquetes' && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-slide-up">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-6 flex items-center gap-3">
                <Package className="text-[#F59E0B]" /> Casillero Digital
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-6">Módulo para registrar la llegada de correspondencia y enviar notificación push al residente.</p>
              
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl max-w-lg">
                <form className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unidad Destino (Torre / Apto)</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] font-bold" placeholder="Ej. Apto 101" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Empresa de Mensajería</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] font-medium" placeholder="Ej. Servientrega, Interrapidisimo, Amazon" />
                  </div>
                  <button type="button" className="bg-[#F59E0B] text-white font-black rounded-xl px-6 py-3 shadow-lg hover:bg-[#D97706] transition-colors w-full uppercase text-xs tracking-widest mt-2 flex items-center justify-center gap-2">
                    <BellRing className="w-4 h-4"/> Notificar Llegada al Residente
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
