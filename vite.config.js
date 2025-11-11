import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const order417 = JSON.parse(
  readFileSync(new URL('./mock/order-417.json', import.meta.url), 'utf-8'),
)


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    {
      name: 'mock-order-417-endpoint',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.method !== 'GET' ||
            !req.url ||
            (req.url !== '/order/417' && !req.url.startsWith('/order/417?'))
          ) {
            next()
            return
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(order417))
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
