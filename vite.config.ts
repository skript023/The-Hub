import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url"
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      options: {
				// Your javascript-obfuscator options here
				// See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
        apply: "build",
        transformObjectKeys: true,
        unicodeEscapeSequence: true,
        numbersToExpressions: true,
        shuffleStringArray: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        identifierNamesGenerator: 'hexadecimal',
        stringArrayEncoding: ['base64'],
			},
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'bundle-[hash].js',
        chunkFileNames: 'chunk-[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
