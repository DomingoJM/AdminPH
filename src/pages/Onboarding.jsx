import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, ArrowRight, Home, ArrowLeft, Key , Eye, EyeOff} from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../services/api'

export default function Onboarding() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState(null) // null = selecting role, 'residente', 'admin', 'porteria'
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // In the future, we can send 'role' to the backend if needed.
      // Currently, backend detects role automatically via models.
      await login(usernameOrEmail, password)
      if (role === 'admin') navigate('/admin-ph')
      else if (role === 'porteria') navigate('/porteria-ph')
      else navigate('/mi-copropiedad')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true)
    try {
      await loginWithGoogle(credentialResponse.credential)
      if (role === 'admin') window.location.href = '/admin-ph'
      else if (role === 'porteria') window.location.href = '/porteria-ph'
      else window.location.href = '/mi-copropiedad'
    } catch (err) {
      alert('Error al conectar con Google')
    } finally {
      setIsLoading(false)
    }
  }

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '909723678608-300gup5gee8j3tffai4a28cb526aog2g.apps.googleusercontent.com'

  const renderRoleSelection = () => (
    <div className="w-full max-w-sm relative z-10 animate-fade-in">
      <div className="text-center mb-10">
        <img src="/logo.png" alt="MyAdminPH" className="w-28 h-auto object-contain drop-shadow-[0_0_30px_rgba(0,168,107,0.5)] mb-4 mx-auto" />
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">MyAdminPH</h1>
        <p className="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Plataforma de Administración<br/>de Propiedad Horizontal</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-white text-center font-bold mb-6 text-sm uppercase tracking-widest">¿Cómo deseas ingresar?</h2>
        
        <button onClick={() => setRole('residente')} className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-lg">
            <Home className="text-white w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-white font-bold">Soy Residente</h3>
            <p className="text-gray-400 text-xs">Acceder a Mi Unidad</p>
          </div>
          <ArrowRight className="text-gray-500 group-hover:text-white transition-colors w-5 h-5" />
        </button>

        <button onClick={() => setRole('admin')} className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-[#00A86B] flex items-center justify-center shadow-lg">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-white font-bold">Soy Administrador</h3>
            <p className="text-gray-400 text-xs">Gestión Central PH</p>
          </div>
          <ArrowRight className="text-gray-500 group-hover:text-white transition-colors w-5 h-5" />
        </button>

        <button onClick={() => setRole('porteria')} className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg">
            <Key className="text-white w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-white font-bold">Portería / Guardia</h3>
            <p className="text-gray-400 text-xs">Control de Acceso</p>
          </div>
          <ArrowRight className="text-gray-500 group-hover:text-white transition-colors w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="w-full max-w-sm relative z-10 animate-slide-up">
      <button onClick={() => setRole(null)} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold tracking-wider uppercase">
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>

      <div className="text-center mb-8">
        <img src="/logo.png" alt="MyAdminPH" className="w-20 h-auto object-contain mx-auto mb-2 opacity-50" />
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
          {role === 'residente' ? 'Acceso Residente' : role === 'admin' ? 'Acceso Administrador' : 'Acceso Portería'}
        </h2>
        <p className="text-primary font-bold text-xs uppercase tracking-widest">Ingresa tus credenciales</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
            theme="filled_black"
            shape="pill"
            locale="es"
            text="continue_with"
          />
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">o usa tu correo</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Ej. admin o correo@ejemplo.com"
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Tu contraseña"
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-[#0f172a] hover:bg-gray-200 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Conectando...' : 'Iniciar Sesión'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-[#0f172a] text-surface flex flex-col justify-center items-center p-6 relative overflow-hidden">
        {/* Abstract Deco */}
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#00A86B]/20 rounded-full blur-[100px] pointer-events-none" />
        
        {role === null ? renderRoleSelection() : renderLoginForm()}
      </div>
    </GoogleOAuthProvider>
  )
}
