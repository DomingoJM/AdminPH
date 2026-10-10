import os

injection = """
    <!-- ECOSYSTEM GLOBAL INJECTION -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('eco-nav')) return; // Already injected
        
        const nav = document.createElement('div');
        nav.id = 'eco-nav';
        nav.innerHTML = `
          <div style="background: #0d2137; color: white; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; z-index: 99999; position: relative; font-family: sans-serif;">
            <div style="display: flex; gap: 16px;">
              <a href="https://comunidadesinteligentes.onrender.com" style="color: #4db6ac; text-decoration: none; font-weight: bold;">🌍 Hub Comunidades Inteligentes</a>
              <a href="/" style="color: white; text-decoration: none;">🏠 Inicio (App)</a>
            </div>
            <div>
              <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.href='/';" style="background: transparent; border: 1px solid #ef4444; color: #ef4444; border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 11px;">Salir</button>
            </div>
          </div>
        `;
        document.body.insertBefore(nav, document.body.firstChild);

        const footer = document.createElement('footer');
        footer.id = 'eco-footer';
        footer.innerHTML = `
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 16px; text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 40px; width: 100%;">
            <p style="margin-bottom: 4px; font-weight: bold; color: #334155;">Todos los derechos reservados. Domingo Jaimes Maldonado - 2026 - Bucaramanga - Colombia.</p>
            <p style="margin-bottom: 4px;">Prohibida su reproducción total o parcial, sin autorización escrita de su titular.</p>
            <p>Contacto: domingo.jaimes@gmail.com | Móvil: 3180580919</p>
          </div>
        `;
        document.body.appendChild(footer);
      });
    </script>
    <!-- END ECOSYSTEM INJECTION -->
"""

apps_dir = r"C:\Users\Domingo\Desktop\Aplicaciones"
for root, dirs, files in os.walk(apps_dir):
    if 'node_modules' in dirs: dirs.remove('node_modules')
    if '.git' in dirs: dirs.remove('.git')
    if 'dist' in dirs: dirs.remove('dist')
    if '.next' in dirs: dirs.remove('.next')
    
    for file in files:
        if file == 'index.html':
            path = os.path.join(root, file)
            # Skip the Next.js app in Comunidades_backend since we patch it manually
            if 'Comunidades_backend' in path: continue
            
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'ECOSYSTEM GLOBAL INJECTION' not in content and '</body>' in content:
                    content = content.replace('</body>', injection + '\n</body>')
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Patched: {path}")
            except Exception as e:
                print(f"Error patching {path}: {e}")
