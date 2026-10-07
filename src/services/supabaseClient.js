// Configuración de cliente de Supabase usando variables de entorno
import { createClient } from '@supabase/supabase-js'

// Estas variables se cargan desde .env en desarrollo y desde las variables de entorno de Netlify en producción
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase

