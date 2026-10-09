def inject():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to add state for `unidades` and `votoManual`
    if 'const [unidades, setUnidades]' not in content:
        content = content.replace('const [votaciones, setVotaciones] = useState([])', 
                                  'const [votaciones, setVotaciones] = useState([])\n  const [unidades, setUnidades] = useState([])\n  const [votoManual, setVotoManual] = useState({ unidadId: "", opcionId: "" })')
    
    # We need to fetch unidades
    if 'getUnidades' not in content:
        content = content.replace('getActas } from', 'getActas, getUnidades } from')
    
    if 'getUnidades()' not in content:
        content = content.replace('const vts = await getVotaciones()', 'const vts = await getVotaciones()\n        const un = await getUnidades()\n        setUnidades(un.results || un)')
        
    # We need to add the Manual Vote button inside the Asambleas panel
    # In the Left Panel where Votaciones are listed.
    # Currently it says:
    # <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{v.abierta ? 'VOTACIÓN ABIERTA' : 'CERRADA'}</span>
    # After the `<div className="mt-4 space-y-2">` block which shows the results, we can add the form.
    
    # We'll locate the end of the `v.resultados` map:
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
                                await fetchWithAuth(`/api/v1/ph/votaciones/${v.id}/emitir_voto/`, {
                                  method: 'POST',
                                  body: JSON.stringify({ opcion_id: votoManual.opcionId, unidad_id: votoManual.unidadId })
                                })
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
