import re

def inject_resident():
    with open('src/pages/MiCopropiedad.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Import QrCode
    if 'QrCode' not in content:
        content = content.replace('FileSignature, ChevronRight } from', 'FileSignature, ChevronRight, QrCode } from')
        content = content.replace('getPaquetes } from', 'getPaquetes, getVisitas, createVisita } from')
        content = content.replace('fetchWithAuth } from', 'fetchWithAuth, getVisitas, createVisita } from')

    # 2. Add state
    if 'const [visitas, setVisitas]' not in content:
        content = content.replace('const [paquetes, setPaquetes] = useState([])', 'const [paquetes, setPaquetes] = useState([])\n  const [visitas, setVisitas] = useState([])\n  const [nuevaVisita, setNuevaVisita] = useState({ nombre_visitante: "", tipo: "Familiar" })')
        
    if 'getVisitas()' not in content:
        # It's inside Promise.all in loadDashboard
        # Let's just find and replace the promise block
        content = content.replace("fetchWithAuth('/api/v1/ph/paquetes/')", "fetchWithAuth('/api/v1/ph/paquetes/'),\n          getVisitas()")
        content = content.replace("setPaquetes(paqs.results || paqs)", "setPaquetes(paqs.results || paqs)\n        const vis = arguments[0][4] || []\n        setVisitas(vis.results || vis)")
        # That's too risky. I'll just append getVisitas() right after setPaquetes.
        
        target = "setPaquetes(paqs.results || paqs)"
        replacement = "setPaquetes(paqs.results || paqs)\n        const vis = await getVisitas()\n        setVisitas(vis.results || vis)"
        content = content.replace(target, replacement)
        
    # 3. Add Visitas Widget inside the 2x2 grid. Let's make it a 2x3 grid or just add a new full-width widget.
    # We will add it below the 2x2 grid.
    
    target_grid_end = """        </div>

        {/* REPOSITORIO DE ACTAS */}"""
    
    visitas_ui = """        </div>
        
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

        {/* REPOSITORIO DE ACTAS */}"""
        
    content = content.replace(target_grid_end, visitas_ui)

    with open('src/pages/MiCopropiedad.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject_resident()
