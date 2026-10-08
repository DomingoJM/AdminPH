import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, ArrowRight, Home, Building } from 'lucide-react'
import { useAuth } from '../services/AuthContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../services/api'

export default function Onboarding() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true)
    try {
      const data = await loginWithGoogle(credentialResponse.credential)
      // trigger refresh of auth state
      window.location.href = '/dashboard'
    } catch (err) {
      alert('Error al conectar con Google')
    } finally {
      setIsLoading(false)
    }
  }

  // Google necesita un clientID. Se debe configurar en Render o .env local.
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '143162394627-123456.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-[#0f172a] text-surface flex flex-col justify-center items-center p-6 relative overflow-hidden">
        {/* Abstract Deco */}
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#00A86B]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary to-[#00A86B] shadow-[0_0_40px_rgba(0,168,107,0.3)] mb-6">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Plataforma<br/>PH</h1>
            <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Identidad Inmobiliaria Segura</p>
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
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="Tu contraseña"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-[#0f172a] hover:bg-gray-200 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4"
              >
                {isLoading ? 'Conectando...' : 'Acceder Segun Perfil'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
