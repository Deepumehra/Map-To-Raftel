import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/auth':{
        target:'http://localhost:5454',
        changeOrigin:true,
        secure:false,
      }
    }
  }
})
