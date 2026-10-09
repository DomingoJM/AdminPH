import re

def patch_resident_habeas_data():
    with open('src/pages/MiCopropiedad.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add state for checkbox
    if 'const [aceptaTerminos' not in content:
        content = content.replace("const [unidad, setUnidad] = useState({ torre: '', numero: '', rol: 'propietario' })", 
                                  "const [unidad, setUnidad] = useState({ torre: '', numero: '', rol: 'propietario' })\n  const [aceptaTerminos, setAceptaTerminos] = useState(false)")

    # Modify the claimUnit function to check the checkbox
    if '!aceptaTerminos' not in content:
        content = content.replace("const claimUnit = async () => {", 
                                  "const claimUnit = async () => {\n    if (!aceptaTerminos) return alert('Debes aceptar la política de tratamiento de datos.');")

    # Add the checkbox UI before the VINCULAR INMUEBLE button
    target_button = """<button onClick={claimUnit} className="w-full bg-primary text-surface font-black py-4 rounded-xl mt-4 shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                VINCULAR INMUEBLE
              </button>"""
              
    checkbox_ui = """<div className="flex items-start gap-3 mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <input 
                  type="checkbox" 
                  id="habeas" 
                  checked={aceptaTerminos}
                  onChange={e => setAceptaTerminos(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="habeas" className="text-[10px] text-gray-500 leading-tight">
                  Autorizo el tratamiento de mis datos personales conforme a la <strong>Ley de Protección de Datos (Habeas Data)</strong>, exclusivamente para fines de administración, seguridad y participación democrática en la copropiedad.
                </label>
              </div>
              
              <button 
                onClick={claimUnit} 
                disabled={!aceptaTerminos}
                className={`w-full font-black py-4 rounded-xl mt-4 transition-all ${aceptaTerminos ? 'bg-primary text-surface shadow-lg shadow-primary/30 hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                VINCULAR INMUEBLE
              </button>"""
              
    content = content.replace(target_button, checkbox_ui)

    with open('src/pages/MiCopropiedad.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

patch_resident_habeas_data()
