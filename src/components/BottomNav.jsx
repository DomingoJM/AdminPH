import React from 'react'
import { Building, Users, ShieldCheck } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/mi-copropiedad', icon: Building, label: 'Mi Unidad' },
    { path: '/asambleas', icon: Users, label: 'Asambleas' },
    { path: '/admin-ph', icon: ShieldCheck, label: 'Admin PH' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-15px_60px_rgba(0,0,0,0.12)] border-t border-primary-50 px-4 py-4 z-50 flex justify-around items-center max-w-5xl mx-auto rounded-t-[2.5rem]">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-2 transition-all duration-300 relative group flex-1 ${isActive ? 'text-primary-900' : 'text-primary hover:text-primary-600'}`}
          >
            <div 
              className={`p-3.5 rounded-2xl transition-all duration-500 ${isActive ? 'bg-primary text-surface scale-110 shadow-xl shadow-primary-100' : 'bg-primary-50/50 group-hover:bg-primary-100/50'}`}
            >
              <Icon className={`${isActive ? 'w-8 h-8' : 'w-7 h-7'} transition-all ${isActive ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
            </div>
            <span className={`text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${isActive ? 'opacity-100 translate-y-0 text-primary-900' : 'opacity-80 -translate-y-0.5 text-primary'}`}>
              {item.label}
            </span>
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(15,76,129,0.8)]" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
