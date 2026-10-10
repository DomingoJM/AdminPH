import os

def patch_next_layout():
    path = r"C:\Users\Domingo\Desktop\Aplicaciones\Comunidades_backend\frontend\app\layout.tsx"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'ECOSYSTEM GLOBAL FOOTER' in content:
        return

    footer = """
        {/* ECOSYSTEM GLOBAL FOOTER */}
        <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '24px 16px', textAlign: 'center', fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif', marginTop: 'auto', width: '100%' }}>
          <p style={{ marginBottom: '4px', fontWeight: 'bold', color: '#334155' }}>Todos los derechos reservados. Domingo Jaimes Maldonado - 2026 - Bucaramanga - Colombia.</p>
          <p style={{ marginBottom: '4px' }}>Prohibida su reproducción total o parcial, sin autorización escrita de su titular.</p>
          <p>Contacto: domingo.jaimes@gmail.com | Móvil: 3180580919</p>
        </footer>
        {/* END ECOSYSTEM FOOTER */}
"""

    # Insert before </body>
    content = content.replace('</body>', footer + '\n      </body>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched Next.js layout")

patch_next_layout()
