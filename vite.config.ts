import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const singleLineHtmlPlugin = (): Plugin => ({
  name: 'single-line-html',
  transformIndexHtml: {
    order: 'post',
    handler(html: string) {
      return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/>\s+</g, '><')
        .replace(/\r?\n\s*/g, ' ')
        .trim();
    }
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react(), singleLineHtmlPlugin()],
    base: process.env.ELECTRON_BUILD === 'true' ? './' : '/',
    build: {
      sourcemap: false,
      minify: 'esbuild',
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : []
    }
  };
})
