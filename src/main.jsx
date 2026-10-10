import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import MiCopropiedad from './pages/MiCopropiedad'
import Asambleas from './pages/Asambleas'
import AdminPH from './pages/AdminPH'
import SuperAdminPH from './pages/SuperAdminPH'
import PorteriaPH from './pages/PorteriaPH'
import Onboarding from './pages/Onboarding'
import { LanguageProvider } from './services/LanguageContext'
import { AuthProvider, useAuth } from './services/AuthContext'
import './index.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white font-black">CARGANDO...</div>;
  }
  
  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};


const EcosystemNav = () => {
  const { logout } = useAuth();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '52px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', zIndex: 999999, display: 'flex', justifyContent: 'center', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', width: '100%', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="https://comunidadesinteligentes.online" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4db6ac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg>
          <span style={{ background: 'linear-gradient(90deg, #4db6ac, #00A86B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Comunidades Inteligentes</span>
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='#94a3b8'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Inicio de App
          </a>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }}></div>
          <button onClick={() => { if(logout) logout(); else { localStorage.clear(); window.location.href='/'; } }} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background='rgba(239, 68, 68, 0.2)'} onMouseOut={e => e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Salir
          </button>
        </div>
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

function AppRoutes() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <EcosystemNav />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '52px' }}>
            <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/mi-copropiedad" />} />
              <Route path="/mi-copropiedad" element={<MiCopropiedad />} />
              <Route path="/asambleas" element={<Asambleas />} />
              <Route path="/admin-ph" element={<AdminPH />} />
              <Route path="/super-admin-ph" element={<SuperAdminPH />} />
              <Route path="/porteria-ph" element={<PorteriaPH />} />
              <Route path="/dashboard" element={<Navigate to="/mi-copropiedad" />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/onboarding" />} />
          </Routes>
            </div>
          <EcosystemFooter />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<AppRoutes />)
