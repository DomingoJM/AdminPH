import os

def patch_main_jsx():
    filepath = 'src/main.jsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'EcosystemNav' in content:
        return

    # Create the components
    ecosystem_components = """
const EcosystemNav = () => {
  const { logout } = useAuth();
  return (
    <div style={{ background: '#0d2137', color: 'white', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', zIndex: 9999, position: 'relative' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="https://comunidadesinteligentes.onrender.com" style={{ color: '#4db6ac', textDecoration: 'none', fontWeight: 'bold' }}>?" Hub Comunidades Inteligentes</a>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>? Inicio (App)</a>
      </div>
      <div>
        <button onClick={() => { if(logout) logout(); else { localStorage.clear(); window.location.href='/'; } }} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '11px' }}>Salir</button>
      </div>
    </div>
  );
};

const EcosystemFooter = () => (
  <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '24px 16px', textAlign: 'center', fontSize: '11px', color: '#64748b', marginTop: 'auto' }}>
    <p style={{ marginBottom: '4px', fontWeight: 'bold', color: '#334155' }}>Todos los derechos reservados. Domingo Jaimes Maldonado - 2026 - Bucaramanga - Colombia.</p>
    <p style={{ marginBottom: '4px' }}>Prohibida su reproducción total o parcial, sin autorización escrita de su titular.</p>
    <p>Contacto: domingo.jaimes@gmail.com | Móvil: 3180580919</p>
  </footer>
);

"""
    
    # We need to wrap the Router content with the Nav and Footer.
    target_router = "<BrowserRouter>"
    replacement_router = "<BrowserRouter>\n          <EcosystemNav />"
    
    target_end_router = "</BrowserRouter>"
    replacement_end_router = "  <EcosystemFooter />\n        </BrowserRouter>"

    # Inject components right before AppRoutes
    target_approutes = "function AppRoutes() {"
    content = content.replace(target_approutes, ecosystem_components + target_approutes)
    
    # Inject into BrowserRouter
    content = content.replace(target_router, replacement_router)
    content = content.replace(target_end_router, replacement_end_router)
    
    # Also we need to make sure the root div takes full height so footer goes to bottom
    # we can add a wrapper inside BrowserRouter
    target_routes = "<Routes>"
    replacement_routes = "<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>\n            <Routes>"
    
    target_end_routes = "</Routes>"
    replacement_end_routes = "</Routes>\n            </div>"
    
    content = content.replace(target_routes, replacement_routes)
    content = content.replace(target_end_routes, replacement_end_routes)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_main_jsx()
