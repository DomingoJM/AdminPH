import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import MiCopropiedad from './pages/MiCopropiedad'
import Asambleas from './pages/Asambleas'
import AdminPH from './pages/AdminPH'
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

function AppRoutes() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <EcosystemNav />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/mi-copropiedad" />} />
              <Route path="/mi-copropiedad" element={<MiCopropiedad />} />
              <Route path="/asambleas" element={<Asambleas />} />
              <Route path="/admin-ph" element={<AdminPH />} />
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
