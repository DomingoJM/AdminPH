import sys

def inject():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Imports
    if 'getConsejos' not in content:
        content = content.replace('getConvocatorias, createConvocatoria } from', 'getConvocatorias, createConvocatoria, getConsejos, getActas } from')
        content = content.replace('PieChart, Video, Briefcase } from', 'PieChart, Video, Briefcase, FileText as FileTextIcon, Download } from')

    # 2. State
    if 'const [actas, setActas]' not in content:
        content = content.replace('const [convocatorias, setConvocatorias] = useState([])', 'const [convocatorias, setConvocatorias] = useState([])\n  const [actas, setActas] = useState([])\n  const [consejos, setConsejos] = useState([])')
        
    # 3. UseEffect
    if 'getActas()' not in content:
        content = content.replace('const convs = await getConvocatorias()', 'const ac = await getActas()\n        setActas(ac.results || ac)\n\n        const cns = await getConsejos()\n        setConsejos(cns.results || cns)\n\n        const convs = await getConvocatorias()')
        
    # 4. Tab Component (Comités y Actas)
    tab_code = """
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
"""
    if 'Repositorio de Actas Oficiales' not in content:
        content = content.replace("{activeTab === 'mensajes' && (", tab_code + "\n        {activeTab === 'mensajes' && (")
    
    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

inject()
