import React, { useState } from 'react'
import { isValidItin } from '../utils/validation'
import { useTranslation } from '../services/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowRight, ShieldCheck, Zap, DollarSign, Building2, User } from 'lucide-react'
import Logo from '../components/Logo'
import { register } from '../services/api'
import { useAuth } from '../services/AuthContext'

export default function Onboarding() {
  const { lang, setLang, t } = useTranslation()
  const [step, setStep] = useState(0) // Step 0: Role Selection
  
  // Role & Residence
  const [role, setRole] = useState('') // 'comprador' | 'constructora' | 'vendedor'
  const [residence, setResidence] = useState('exterior') // 'exterior' | 'local'

  // Identity
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') // FASE 0: Autenticación Real
  const [itin, setItin] = useState('') // Cédula o NIT
  
  // Lead Qualification Fields (Compradores only)
  const [savingsCapacity, setSavingsCapacity] = useState('')
  const [hasDownPayment, setHasDownPayment] = useState(null)
  const [wantsSubsidy, setWantsSubsidy] = useState(true)
  
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    if (step === 0) {
      if (!role) {
        setError('Por favor selecciona una opción para continuar.')
        return
      }
      setError('')
      setStep(1)
    } else if (step === 1) {
      if (!name || !email || !password) {
        setError('Por favor completa todos los campos, incluyendo la contraseña.')
        return
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.')
        return
      }
      setError('')
      if (role === 'constructora' || role === 'vendedor' || role === 'admin_ph' || role === 'residente') {
        finalize() // These roles don't need financial qualification step
      } else {
        setStep(2)
      }
    } else {
      finalize()
    }
  }

  const finalize = async () => {
    if (!name || !email || !password) {
      setError('Campos de identidad y contraseña son obligatorios.')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      // 1. Registro de usuario seguro (Supabase Auth)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.error("Auth Error:", authError)
        setError(authError.message || 'No se pudo crear la cuenta de usuario.')
        setIsSaving(false)
        return
      }

      const userId = authData.user?.id

      if (!userId) {
        setError('Error al obtener el ID de usuario.')
        setIsSaving(false)
        return
      }

      // 2. Crear el Perfil
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        full_name: name,
        email: email,
        role: role,
        itin: itin,
        residence: residence
      })

      if (profileError) {
        console.error("Profile Error:", profileError)
      }

      // 3. Crear Perfil Financiero si es Comprador
      if (role === 'comprador') {
        await supabase.from('financial_profiles').insert({
          user_id: userId,
          current_savings: savingsCapacity ? parseFloat(savingsCapacity) : 0,
          has_down_payment: hasDownPayment || false,
          wants_subsidy: wantsSubsidy
        })
      }

      localStorage.removeItem('ahorro_user')

      // Redirección por rol
      if (role === 'constructora') {
        navigate('/constructora')
      } else if (role === 'vendedor') {
        navigate('/vendedor')
      } else if (role === 'admin_ph') {
        navigate('/crear-conjunto')
      } else if (role === 'residente') {
        navigate('/mi-copropiedad')
      } else {
        navigate('/dashboard')
      }
      
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error inesperado al guardar.')
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 font-sans selection:bg-primary-100">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-8 py-8 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-2xl border border-primary-50 shadow-sm">
          <button onClick={() => setLang('es')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${lang === 'es' ? 'bg-primary text-surface' : 'text-text-muted hover:text-primary'}`}>ES</button>
          <button onClick={() => setLang('en')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${lang === 'en' ? 'bg-primary text-surface' : 'text-text-muted hover:text-primary'}`}>EN</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-8">
        {/* Left Side: Visual & Message */}
        <div className="relative group">
           <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl group-hover:bg-primary/10 transition-colors" />
           <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" 
                alt="Your Dream Home" 
                className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent flex flex-col justify-end p-12 text-surface">
                <div className="bg-surface/20 backdrop-blur-md w-fit px-4 py-2 rounded-full mb-6 border border-surface/30 text-[10px] font-black uppercase tracking-widest">MiKasApp Experience</div>
                <h1 className="text-5xl font-black mb-4 leading-tight uppercase italic tracking-tighter">
                  {step === 0 ? 'Bienvenido a MiKasApp' : step === 1 ? t('hero_title') : 'Tus metas, tus reglas.'}
                </h1>
                <p className="text-primary-50 max-w-sm text-lg font-medium leading-relaxed mb-4">
                  {step === 0 ? 'Conectamos a compradores y desarrolladores.' : step === 1 ? t('hero_subtitle') : 'Ayúdanos a entender tu objetivo de inversión.'}
                </p>
              </div>
           </div>
        </div>

        {/* Right Side: Step-based Form */}
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
           <div className="bg-surface rounded-[3rem] shadow-2xl shadow-primary/5 p-10 md:p-14 border border-primary-50">
              
              <div className="flex items-center gap-4 mb-12">
                 {[0, 1, 2].map((s) => (
                   <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-primary-50'}`} />
                 ))}
              </div>

              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-text uppercase tracking-tight mb-8">¿Cómo quieres usar MiKasApp?</h2>
                  <div className="grid gap-4">
                    <button 
                      onClick={() => setRole('comprador')}
                      className={`p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${role === 'comprador' ? 'border-primary bg-primary-50 shadow-lg shadow-primary-50' : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${role === 'comprador' ? 'bg-primary text-surface' : 'bg-slate-100 text-text-muted'}`}>
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg text-text">Quiero comprar vivienda</div>
                        <div className="text-sm text-text-muted mt-1">Busco proyectos, subsidios y crédito.</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setRole('constructora')}
                      className={`p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${role === 'constructora' ? 'border-primary bg-primary-50 shadow-lg shadow-primary-50' : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${role === 'constructora' ? 'bg-primary text-surface' : 'bg-slate-100 text-text-muted'}`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg text-text">Soy Constructora / Desarrollador</div>
                        <div className="text-sm text-text-muted mt-1">Quiero publicar proyectos y captar clientes.</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setRole('vendedor')}
                      className={`p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${role === 'vendedor' ? 'border-primary bg-primary-50 shadow-lg shadow-primary-50' : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${role === 'vendedor' ? 'bg-primary text-surface' : 'bg-slate-100 text-text-muted'}`}>
                        <Home className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg text-text">Quiero vender mi propiedad</div>
                        <div className="text-sm text-text-muted mt-1">Sube tu vivienda usada, encuentra compradores.</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setRole('admin_ph')}
                      className={`p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${role === 'admin_ph' ? 'border-primary bg-primary-50 shadow-lg shadow-primary-50' : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${role === 'admin_ph' ? 'bg-primary text-surface' : 'bg-slate-100 text-text-muted'}`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg text-text">Crear / Administrar Conjunto</div>
                        <div className="text-sm text-text-muted mt-1">Crea tu copropiedad y gestiona residentes, asambleas y cobros.</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setRole('residente')}
                      className={`p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${role === 'residente' ? 'border-primary bg-primary-50 shadow-lg shadow-primary-50' : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${role === 'residente' ? 'bg-primary text-surface' : 'bg-slate-100 text-text-muted'}`}>
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-lg text-text">Soy Residente / Propietario</div>
                        <div className="text-sm text-text-muted mt-1">Únete a tu conjunto y accede a tu panel de Mi Copropiedad.</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <form className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  {role === 'comprador' && (
                    <div className="mb-4">
                      <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest leading-none">Lugar de Residencia</label>
                      <div className="flex gap-4">
                         <button type="button" onClick={() => setResidence('exterior')} className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${residence === 'exterior' ? 'bg-primary text-surface' : 'bg-primary-50 text-primary hover:bg-primary-100'}`}>En el Exterior</button>
                         <button type="button" onClick={() => setResidence('local')} className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${residence === 'local' ? 'bg-primary text-surface' : 'bg-primary-50 text-primary hover:bg-primary-100'}`}>En Colombia</button>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest leading-none">
                      {role === 'constructora' ? 'Nombre de la Constructora' : (role === 'vendedor' ? 'Nombre Completo (Vendedor)' : t('full_name'))}
                    </label>
                    <input 
                      placeholder={role === 'constructora' ? "Constructora XYZ" : "Juan Pérez"} 
                      className="w-full bg-primary-50/50 border-2 border-primary-50 rounded-2xl py-4 px-6 font-bold text-text focus:border-primary outline-none transition-all"
                      value={name} 
                      onChange={(e)=>setName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest leading-none">
                      {role === 'constructora' ? 'Correo corporativo' : t('email')}
                    </label>
                    <input 
                      type="email" 
                      placeholder={role === 'constructora' ? "contacto@constructora.com" : "juan@email.com"} 
                      className="w-full bg-primary-50/50 border-2 border-primary-50 rounded-2xl py-4 px-6 font-bold text-text focus:border-primary outline-none transition-all"
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest leading-none">
                      Contraseña segura
                    </label>
                    <input 
                      type="password" 
                      placeholder="Mínimo 6 caracteres" 
                      className="w-full bg-primary-50/50 border-2 border-primary-50 rounded-2xl py-4 px-6 font-bold text-text focus:border-primary outline-none transition-all"
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest leading-none">
                      {role === 'constructora' ? 'NIT' : (residence === 'exterior' && role === 'comprador' ? 'Número de ITIN / Cédula (Opcional)' : 'Cédula de Ciudadanía')}
                    </label>
                    <input 
                      placeholder={role === 'constructora' ? "900.123.456-7" : (residence === 'exterior' && role === 'comprador' ? "9xx-xx-xxxx" : "1.000.xxx.xxx")} 
                      className="w-full bg-primary-50/50 border-2 border-primary-50 rounded-2xl py-4 px-6 font-bold text-text focus:border-primary outline-none transition-all"
                      value={itin} 
                      onChange={(e)=>setItin(e.target.value)} 
                    />
                  </div>
                </form>
              )}

              {step === 2 && role === 'comprador' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <label className="block text-[10px] font-black text-primary mb-1 uppercase tracking-widest leading-none flex items-center justify-between">
                      {t('monthly_savings')} ({residence === 'exterior' ? 'USD' : 'COP'})
                      <span className="text-secondary lowercase italic flex items-center gap-1 cursor-pointer" onClick={() => alert('¡Escríbele a Mika en el chat flotante!')}>
                        <Zap className="w-3 h-3" /> {t('not_sure_help')}
                      </span>
                    </label>
                    <div className="relative">
                       <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                       <input 
                         type="number"
                         placeholder={residence === 'exterior' ? "500" : "1500000"} 
                         className="w-full bg-primary-50/50 border-2 border-primary-50 rounded-2xl py-5 pl-14 pr-6 font-black text-xl text-text focus:border-primary outline-none transition-all"
                         value={savingsCapacity}
                         onChange={(e) => setSavingsCapacity(e.target.value)}
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-primary mb-4 uppercase tracking-widest leading-none">{t('down_payment_status')}</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setHasDownPayment(true)}
                         className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg border-2 ${hasDownPayment === true ? 'bg-primary text-surface shadow-primary-100 border-primary' : 'bg-surface text-text-muted border-slate-100 hover:border-primary-100 shadow-none'}`}
                       >
                         Sí, ya tengo
                       </button>
                       <button 
                         onClick={() => setHasDownPayment(false)}
                         className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg border-2 ${hasDownPayment === false ? 'bg-primary text-surface shadow-primary-100 border-primary' : 'bg-surface text-text-muted border-slate-100 hover:border-primary-100 shadow-none'}`}
                       >
                         Empezando de 0
                       </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/subsidios')}
                    className="w-full p-6 rounded-3xl border-2 border-dashed flex items-center justify-between transition-all bg-accent-50 border-accent text-accent-600 hover:bg-accent hover:text-surface group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-accent text-surface group-hover:bg-surface group-hover:text-accent transition-colors">
                           <Zap className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <div className="text-left">
                           <div className="font-black uppercase tracking-tight text-sm">Simular Subsidios</div>
                           <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Cajas de Compensación y FHA</p>
                        </div>
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-widest">Ver más</div>
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-secondary-50 text-secondary-600 p-6 rounded-2xl text-sm font-bold border border-secondary-500 mt-8 mb-4 animate-in shake-in-x">
                   {error}
                </div>
              )}

              <div className="mt-12 flex flex-col gap-4">
                 <button 
                  onClick={handleNext}
                  className="w-full group bg-secondary hover:bg-secondary-600 text-surface py-6 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-secondary-50 hover:shadow-secondary-500/20"
                >
                  {step === 0 ? 'Continuar' : step === 1 ? (role === 'constructora' ? 'Ir a mi Panel' : (role === 'vendedor' ? 'Crear mi cuenta' : t('continue'))) : 'Ver Mi Plan de Casa'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>
                
                {step > 0 && role === 'comprador' && (
                  <button 
                    onClick={finalize}
                    className="w-full text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-primary transition-all py-2"
                  >
                    {t('skip_for_now')}
                  </button>
                )}
                
                {step > 0 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="w-full text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-primary transition-all py-2"
                  >
                    Atrás
                  </button>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center gap-3 text-[10px] font-black text-accent-600 uppercase tracking-widest bg-accent-50/50 -mx-10 md:-mx-14 rounded-b-[3rem]">
                 <ShieldCheck className="w-4 h-4" />
                 Tu información está protegida bajo estándares seguros
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

