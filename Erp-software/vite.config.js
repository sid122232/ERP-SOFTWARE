import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'X-Frame-Options': 'DENY',  // This could stop unwanted content in your footer
    },
  },
  plugins: [
    {
      name: 'no-vite-footer',
      enforce: 'post',
      transformIndexHtml(html) {
        return html.replace(/<script.*?vite[^>]*><\/script>/, '');  // Remove Vite script tags if any
      },
    },
    [react()]
  ],

})
