def inject_porteria():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Import new endpoints
    if 'getVisitas' not in content:
        content = content.replace('getPaquetes } from', 'getPaquetes, getVisitas, registrarIngresoVisita } from')
        content = content.replace('Users, Settings', 'Users, Settings, QrCode, UserCheck')

    # Add state
    if 'const [visitas, setVisitas]' not in content:
        content = content.replace('const [paquetes, setPaquetes] = useState([])', 'const [paquetes, setPaquetes] = useState([])\n  const [visitas, setVisitas] = useState([])')
        
    if 'getVisitas()' not in content:
        content = content.replace('const paqs = await getPaquetes()', 'const vis = await getVisitas()\n        setVisitas(vis.results || vis)\n\n        const paqs = await getPaquetes()')

    # Replace Porteria tab
    target_start = "{activeTab === 'porteria' && ("
    target_end = "          </div>\n        )}"
    
    # We will locate the block safely by finding the start of the next block.
    # The next block is {activeTab === 'pqrs' && (
    import re
    # Extract everything between {activeTab === 'porteria' && ( and {activeTab === 'pqrs' && (
    
    porteria_ui = """{activeTab === 'porteria' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase text-gray-800">🛡️ Central de Portería y Seguridad</h2>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* MODULO DE VISITAS (QR) */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-lg"><QrCode className="w-5 h-5 text-primary" /> Control de Acceso (Visitantes)</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-blue-800 uppercase mb-2">Escáner de Autorizaciones QR</p>
                  <ScannerComponent onScan={async (text) => {
                    // text will be the QR code UUID. We look for a visit with this code.
                    const v = visitas.find(vi => vi.codigo_qr === text);
                    if (v) {
                       if (v.estado === 'preautorizada') {
                          await registrarIngresoVisita(v.id);
                          alert(`¡ACCESO CONCEDIDO!\\nVisitante: ${v.nombre_visitante}\\nApto: ${v.unidad_numero}`);
                          const vis = await getVisitas();
                          setVisitas(vis.results || vis);
                       } else {
                          alert('Este código QR ya fue utilizado o caducó.');
                       }
                    } else {
                       alert('QR INVÁLIDO. No se encontró autorización.');
                    }
                  }} />
                </div>
                
                <h4 className="font-bold text-sm text-gray-500 uppercase mb-3">Visitas Pre-Autorizadas Hoy</h4>
                <div className="space-y-3">
                  {visitas.filter(v => v.estado === 'preautorizada').map(v => (
                    <div key={v.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-xl">
                      <div>
                        <p className="font-black text-gray-800">{v.nombre_visitante}</p>
                        <p className="text-xs text-gray-500">{v.tipo} - Dirígese al Apto <span className="font-bold text-primary">{v.unidad_numero}</span></p>
                      </div>
                      <button onClick={async () => {
                         await registrarIngresoVisita(v.id);
                         const vis = await getVisitas();
                         setVisitas(vis.results || vis);
                      }} className="bg-gray-100 text-gray-600 font-bold px-3 py-2 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors">
                        INGRESO MANUAL
                      </button>
                    </div>
                  ))}
                  {visitas.filter(v => v.estado === 'preautorizada').length === 0 && <p className="text-xs text-gray-400 italic">No hay visitas esperando.</p>}
                </div>
              </div>

              {/* MODULO DE CORRESPONDENCIA */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-lg"><Package className="w-5 h-5 text-primary" /> Recepción de Paquetería</h3>
                
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Escanear Código de Barras (Guía)</p>
                  <ScannerComponent onScan={async (text) => {
                     alert(`Código de paquete leído: ${text}\\nListo para registrar.`);
                  }} />
                </div>

                <h4 className="font-bold text-sm text-gray-500 uppercase mb-3">Paquetes en Portería</h4>
                <div className="space-y-3">
                  {paquetes.filter(p => p.estado === 'en_porteria').map(p => (
                    <div key={p.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-xl">
                      <div>
                        <p className="font-black text-gray-800">Apto {p.unidad_numero || p.unidad}</p>
                        <p className="text-xs text-gray-500">{p.transportadora} - {p.codigo_guia}</p>
                      </div>
                      <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-1 rounded-full uppercase">Sin Entregar</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}"""
        
    content = re.sub(r"\{activeTab === 'porteria' && \(.*?(?=\{activeTab === 'pqrs' && \()", porteria_ui + "\n        ", content, flags=re.DOTALL)
    
    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject_porteria()
