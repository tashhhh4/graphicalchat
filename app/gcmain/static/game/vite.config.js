import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'gcmain/static/gcmain',
        assetsDir: '.',
        rollupOptions: {
            input: 'material.js',
            output: {
                entryFileNames: 'bundle.js'
            }
        }
    }
});