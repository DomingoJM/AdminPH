import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Globe, ShieldCheck, Zap, ArrowRight, Building2, HeartHandshake, CheckCircle2, Wallet, Users, BarChart3, FileText } from 'lucide-react'
import { useTranslation } from '../services/LanguageContext'
import Logo from '../components/Logo'

export default function Landing() {
  const { lang, setLang } = useTranslation()

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-gray-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="#ecosistema" className="hover:text-primary transition-colors">Ecosistema</a>
            <a href="#copropiedades" className="hover:text-primary transition-colors">Propiedad Horizontal</a>
            <a href="#compradores" className="hover:text-primary transition-colors">Compradores</a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/onboarding" 
              className="hidden md:flex text-primary font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/onboarding" 
              className="bg-primary text-surface px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-100 flex items-center gap-2"
            >
              Crear Cuenta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Plataforma Integral de Vivienda
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-text leading-[1.1] tracking-tighter mb-8">
              Tu hogar, desde la búsqueda hasta la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 italic">administración.</span>
            </h1>
            
            <p className="text-lg text-text-muted font-medium leading-relaxed mb-10 max-w-lg">
              MikasApp es el primer gestor inteligente que te acompaña en el camino a comprar tu casa y, una vez la tienes, simplifica tu vida en copropiedad. Todo en un solo ecosistema.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/onboarding" 
                className="w-full sm:w-auto px-8 py-4 bg-text text-surface rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Comenzar ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Match Inmobiliario
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Administración PH
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Gestión Financiera
              </div>
            </div>
          </div>

          {/* Hero Visual - Bento Style */}
          <div className="relative grid grid-cols-2 gap-4">
             <div className="space-y-4">
               {/* Cierre Financiero */}
               <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col justify-between aspect-square transform hover:-translate-y-2 transition-transform group">
                 <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80" alt="Finanzas" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                 <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                   <Wallet className="w-10 h-10 text-blue-400 mb-4" />
                   <div>
                     <h3 className="font-black text-lg text-white mb-1">Cierre Financiero</h3>
                     <p className="text-xs text-gray-300 font-bold">Simula y gestiona recursos.</p>
                   </div>
                 </div>
               </div>
               
               {/* Mi Copropiedad */}
               <div className="relative rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between aspect-square transform hover:-translate-y-2 transition-transform group">
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Copropiedad" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-primary-900/20 mix-blend-multiply"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                 <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                   <Building2 className="w-10 h-10 text-primary-300 mb-4" />
                   <div>
                     <h3 className="font-black text-lg text-white mb-1">Mi Copropiedad</h3>
                     <p className="text-xs text-primary-100 font-bold">Asambleas, PQRS y pagos.</p>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="space-y-4 pt-12">
               {/* Match Inmobiliario */}
               <div className="relative rounded-3xl overflow-hidden shadow-xl border border-blue-100 flex flex-col justify-between aspect-square transform hover:-translate-y-2 transition-transform group">
                 <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" alt="Casa" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-black/40 to-transparent"></div>
                 <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                   <Home className="w-10 h-10 text-blue-300 mb-4" />
                   <div>
                     <h3 className="font-black text-lg text-white mb-1">Match Inmobiliario</h3>
                     <p className="text-xs text-blue-100 font-bold">Casas según tu capacidad.</p>
                   </div>
                 </div>
               </div>
               
               {/* Comunidad */}
               <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col justify-between aspect-square transform hover:-translate-y-2 transition-transform group">
                 <img src="https://images.unsplash.com/photo-1577414440130-9eb51b1f9b16?auto=format&fit=crop&w=600&q=80" alt="Comunidad" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                 <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                   <Users className="w-10 h-10 text-green-400 mb-4" />
                   <div>
                     <h3 className="font-black text-lg text-white mb-1">Comunidad</h3>
                     <p className="text-xs text-gray-300 font-bold">Conecta con tu administración.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosistema" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">El Ecosistema Completo</h2>
            <h3 className="text-3xl md:text-5xl font-black text-text tracking-tight mb-6">Administramos la relación entre tú, tu vivienda y tu comunidad.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                 <Home className="w-7 h-7 text-blue-500" />
              </div>
              <h4 className="text-2xl font-black text-text mb-4 tracking-tight">Acceso a Vivienda</h4>
              <p className="text-gray-500 leading-relaxed font-bold text-sm">
                Organizamos tu expediente digital, diagnosticamos tu capacidad financiera y te conectamos con subsidios (Cajas de Compensación, FNA) para que logres tu cierre financiero.
              </p>
            </div>

            <div className="bg-background rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                 <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-2xl font-black text-text mb-4 tracking-tight">Propiedad Horizontal</h4>
              <p className="text-gray-500 leading-relaxed font-bold text-sm">
                Para residentes y administradores. Unifica el estado de cuenta, la radicación de PQRS, las asambleas virtuales con votación por coeficiente y los comunicados del conjunto.
              </p>
            </div>

            <div className="bg-background rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                 <Zap className="w-7 h-7 text-green-500" />
              </div>
              <h4 className="text-2xl font-black text-text mb-4 tracking-tight">Servicios Financieros</h4>
              <p className="text-gray-500 leading-relaxed font-bold text-sm">
                Integración B2B con constructoras e inmobiliarias. Conectamos los recaudos bancarios de tu copropiedad y te acercamos a créditos para mejoramiento de vivienda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences / Features Highlight */}
      <section id="copropiedades" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-text text-surface rounded-[3rem] p-10 md:p-16 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-16 opacity-10">
               <ShieldCheck className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Moderniza tu Copropiedad</h2>
                <p className="text-gray-400 font-bold leading-relaxed mb-8 text-lg">
                  MikasApp no es solo un software contable. Es una plataforma donde la administración y los propietarios conviven de manera transparente y eficiente.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Identidad Inmobiliaria (Roles claros: Propietario, Arrendatario)
                  </li>
                  <li className="flex items-center gap-3 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Asambleas, Quórum y Delegación de Poderes
                  </li>
                  <li className="flex items-center gap-3 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Cartera, Recaudos y Transparencia
                  </li>
                </ul>
                <Link to="/onboarding" className="inline-block bg-primary text-surface px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-colors">
                  Registrar mi Edificio
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-surface/10 backdrop-blur-sm border border-surface/20 rounded-3xl p-6">
                   <BarChart3 className="w-8 h-8 text-primary-300 mb-4" />
                   <h4 className="font-black mb-1">Dashboard Admin</h4>
                   <p className="text-[10px] text-gray-400 font-bold">Control total de KPIs y pagos.</p>
                 </div>
                 <div className="bg-surface/10 backdrop-blur-sm border border-surface/20 rounded-3xl p-6 mt-8">
                   <FileText className="w-8 h-8 text-blue-300 mb-4" />
                   <h4 className="font-black mb-1">Gestión de PQRS</h4>
                   <p className="text-[10px] text-gray-400 font-bold">Atención de tickets organizada.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <HeartHandshake className="w-16 h-16 mx-auto mb-8 text-primary" />
          <h2 className="text-4xl md:text-6xl font-black text-text mb-6 tracking-tight">Súmate a la evolución Inmobiliaria</h2>
          <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Ya sea para encontrar tu primera casa, gestionar tu edificio o vender tus proyectos constructivos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/onboarding" 
              className="px-10 py-5 bg-primary text-surface rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-100 hover:-translate-y-1"
            >
              Comenzar Gratis
            </Link>
            <a href="mailto:contacto@mikasapp.online" className="px-10 py-5 bg-surface text-text border-2 border-gray-200 rounded-full font-black text-sm uppercase tracking-widest hover:border-primary-200 transition-all">
              Contactar Ventas B2B
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-gray-400 py-12 border-t border-gray-800 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-black text-surface text-xl italic tracking-tighter">MiKasApp.online</div>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-surface transition-colors">Términos</a>
            <a href="#" className="hover:text-surface transition-colors">Privacidad</a>
            <a href="#" className="hover:text-surface transition-colors">Soporte</a>
          </div>
          <p className="text-[10px] font-bold">© 2026 MiKasApp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
