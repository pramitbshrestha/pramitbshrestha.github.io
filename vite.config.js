import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Defaults to "/" (correct for Vercel/Netlify/Cloudflare Pages, a custom
// domain, or a GitHub "username.github.io" user/org site). Only set
// VITE_BASE_PATH when deploying to a GitHub Pages *project* site without a
// custom domain, where the site is served from "/repo-name/" — the
// included GitHub Actions workflow sets this automatically.
const basePath = process.env.VITE_BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/logo.png', 'robots.txt'],
      manifest: {
        name: 'Subechhya Bag पसल',
        short_name: 'Subechhya Bag',
        description:
          'Bags and luggage for travel, work, school and everyday use — Asan, Balkumari, Kathmandu.',
        theme_color: '#092542',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'assets/logo.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/logo.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: `${basePath}offline.html`,
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
