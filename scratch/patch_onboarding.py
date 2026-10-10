import codecs

def patch_onboarding():
    path = r'src/pages/Onboarding.jsx'
    with codecs.open(path, 'r', 'utf-8') as f:
        content = f.read()

    # Target 1: The Logo and Title
    target_logo = """<div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary to-[#00A86B] shadow-[0_0_40px_rgba(0,168,107,0.3)] mb-6">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Plataforma<br/>PH</h1>
            <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Identidad Inmobiliaria Segura</p>"""

    replacement_logo = """<img src="/logo.png" alt="MyAdminPH" className="w-28 h-auto object-contain drop-shadow-[0_0_30px_rgba(0,168,107,0.5)] mb-4 mx-auto" />
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">MyAdminPH</h1>
            <p className="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Plataforma de Administración<br/>de Propiedad Horizontal</p>"""

    # Target 2: The password placeholder
    # It might be `Tu contraseÃ±a` or `Tu contrasea`. We can just use string replace carefully or regex.
    import re
    content = re.sub(r'placeholder="Tu contrase.*?"', 'placeholder="Tu contraseña"', content)
    
    content = content.replace(target_logo, replacement_logo)

    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(content)
        
patch_onboarding()
