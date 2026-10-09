import sys

def inject():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Imports
    if 'getConvocatorias' not in content:
        content = content.replace('getVotaciones, createVotacion } from', 'getVotaciones, createVotacion, getConvocatorias, createConvocatoria } from')
        content = content.replace('FolderOpen, Headphones, PieChart, Video } from', 'FolderOpen, Headphones, PieChart, Video, Briefcase } from')

    # 2. State
    if 'const [convocatorias, setConvocatorias]' not in content:
        content = content.replace('const [votaciones, setVotaciones] = useState([])', 'const [votaciones, setVotaciones] = useState([])\n  const [convocatorias, setConvocatorias] = useState([])\n  const [nuevaConvocatoria, setNuevaConvocatoria] = useState({ titulo: "", descripcion: "", fecha_cierre: "" })')
        
    # 3. UseEffect
    if 'getConvocatorias()' not in content:
        content = content.replace('const com = await getComites()', 'const convs = await getConvocatorias()\n        setConvocatorias(convs.results || convs)\n\n        const com = await getComites()')
        
    # 4. Tab Component
    tab_code = """
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
"""
    if 'Convocatorias y Licitaciones' not in content:
        content = content.replace("{activeTab === 'mensajes' && (", tab_code + "\n        {activeTab === 'mensajes' && (")
    
    # 5. Sidebar Button
    sidebar_button = """
          <button onClick={() => setActiveTab('convocatorias')} className={` "w-full flex justify-between items-center px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors " + (activeTab === 'convocatorias' ? 'bg-primary text-surface shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100')}>
             <div className="flex items-center gap-3"><Briefcase className="w-5 h-5" /> Licitaciones</div>
          </button>
"""
    if 'Licitaciones</div>' not in content:
        content = content.replace("<button onClick={() => setActiveTab('estadisticas')}", sidebar_button + "\n          <button onClick={() => setActiveTab('estadisticas')}")
            
    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject()
