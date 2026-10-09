def inject():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add state for unidades and votoManual
    if 'const [unidades, setUnidades]' not in content:
        content = content.replace('const [votaciones, setVotaciones] = useState([])', 
                                  'const [votaciones, setVotaciones] = useState([])\n  const [unidades, setUnidades] = useState([])\n  const [votoManual, setVotoManual] = useState({ unidadId: "", opcionId: "" })')
    
    # Import getUnidades and emitirVoto
    if 'getUnidades' not in content:
        content = content.replace('getActas } from', 'getActas, getUnidades, emitirVoto } from')
    
    # Fetch unidades on load
    if 'getUnidades()' not in content:
        content = content.replace('const vts = await getVotaciones()', 'const vts = await getVotaciones()\n        const un = await getUnidades()\n        setUnidades(un.results || un)')
        
    # Inject Voto Manual UI
    target = """                      {v.resultados && v.resultados.map((res, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{res.opcion__texto}</span>
                          <span className="font-black text-primary">{Number(res.total_coeficiente || 0).toFixed(4)}% Quórum</span>
                        </div>
                      ))}
                    </div>"""
    
    voto_manual_ui = """                      {v.resultados && v.resultados.map((res, idx) => (
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
                    )}"""
    
    content = content.replace(target, voto_manual_ui)

    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject()
