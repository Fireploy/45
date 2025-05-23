import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default ({ mode }: { mode: string })  => {
  const env = loadEnv(mode, process.cwd());
return defineConfig({
  plugins: [react()],
  base: `${env.VITE_BASE_PATH}`,
  server: {
      port: parseInt(env.VITE_PORT),
      host: true,
      cors: true,
      allowedHosts: ['proyectos.fireploy.online'],
    },
    preview: {
      port: parseInt(env.VITE_PORT),
      host: true,  
      cors: true,
      allowedHosts: ['proyectos.fireploy.online'],
    },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
}
