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

function AppRoutes() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<AppRoutes />)
