import React from 'react'

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="MiKasApp Logo" className="h-12 w-auto object-contain" />
    </div>
  )
}
