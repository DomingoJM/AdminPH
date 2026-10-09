import sys

def inject():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Imports
    if 'getVotaciones' not in content:
        content = content.replace('getAsambleas, getPqrs, getComites } from', 'getAsambleas, getPqrs, getComites, getVotaciones, createVotacion } from')

    # 2. State
    if 'setVotaciones' not in content:
        content = content.replace('const [asambleas, setAsambleas] = useState([])', 'const [asambleas, setAsambleas] = useState([])\n  const [votaciones, setVotaciones] = useState([])\n  const [nuevaPregunta, setNuevaPregunta] = useState({ titulo: "", tipo: "consejo", opciones: ["", ""] })')
        
    # 3. UseEffect
    if 'getVotaciones()' not in content:
        content = content.replace('const pqs = await getPqrs()', 'const vts = await getVotaciones()\n        setVotaciones(vts.results || vts)\n\n        const pqs = await getPqrs()')
        
    # 4. Tab Component
    tab_code = """
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
"""
    if 'Sala de Asamblea en Vivo' not in content:
        content = content.replace("{activeTab === 'mensajes' && (", tab_code + "\n        {activeTab === 'mensajes' && (")
            
    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject()
