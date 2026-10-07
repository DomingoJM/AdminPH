import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import MiCopropiedad from './pages/MiCopropiedad'
import Asambleas from './pages/Asambleas'
import AdminPH from './pages/AdminPH'
import './index.css'
import { LanguageProvider } from './services/LanguageContext'
import { AuthProvider } from './services/AuthContext'

function AppRoutes() {
  return (
    <AuthProvider>
    <LanguageProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/mi-copropiedad" />} />
          <Route path="/mi-copropiedad" element={<MiCopropiedad />} />
          <Route path="/asambleas" element={<Asambleas />} />
          <Route path="/admin-ph" element={<AdminPH />} />
          <Route path="*" element={<Navigate to="/mi-copropiedad" />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </LanguageProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<AppRoutes />)
