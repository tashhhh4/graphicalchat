import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '.',
        assetsDir: '.',
        rollupOptions: {
            input: 'material.js',
            output: {
                entryFileNames: 'debug.js'
            }
        }
    }
});