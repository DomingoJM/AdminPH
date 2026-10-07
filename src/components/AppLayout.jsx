import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import FloatingActions from './FloatingActions'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary-100">
      <main className="pb-32 pt-4">
        <Outlet />
      </main>

      <BottomNav />
      <FloatingActions />
    </div>
  )
}
