def patch():
    with open('src/pages/AdminPH.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the top header of Sala de Asamblea en Vivo
    target = """              <h2 className="text-2xl font-black uppercase text-gray-800">🎥 Sala de Asamblea en Vivo</h2>
            </div>"""
            
    replacement = """              <h2 className="text-2xl font-black uppercase text-gray-800">🎥 Sala de Asamblea en Vivo</h2>
              {asambleas.length > 0 && (
                  <button 
                    onClick={() => {
                      const token = localStorage.getItem('access_token');
                      window.open(`https://comunidadesinteligentes.onrender.com/api/v1/ph/asambleas/${asambleas[0].id}/descargar_borrador_acta/?token=${token}`, '_blank');
                    }}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm transition-colors border border-gray-200"
                  >
                    <Download className="w-4 h-4" /> Generar Borrador (.DOCX)
                  </button>
              )}
            </div>"""
    
    content = content.replace(target, replacement)
    
    with open('src/pages/AdminPH.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

patch()
