import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'                              // ← AGREGAR ESTA LÍNEA

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = parseInt(env.PORT) || 3000
  return defineConfig({
    resolve: {                                        // ← AGREGAR ESTE BLOQUE
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
          name: 'AhorroCasa Latino',
          short_name: 'MiKasApp',
          description: 'Tu camino a casa empieza aquí. Ahorro y educación financiera.',
          theme_color: '#1d4ed8',
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