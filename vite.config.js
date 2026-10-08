import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = parseInt(env.PORT) || 3000
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Plataforma AdminPH',
          short_name: 'MyAdminPH',
          description: 'Gestión inteligente de propiedad horizontal.',
          theme_color: '#00A86B',
          background_color: '#0f172a',
          icons: [
            {
              src: 'logo-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'logo-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    server: {
      host: '0.0.0.0',
      port
    }
  })
}
