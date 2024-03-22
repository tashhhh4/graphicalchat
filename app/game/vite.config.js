import { defineConfig } from 'vite';

export default defineConfig({
    root: '../',
    build: {
        outDir: 'gcmain/static/game',
        assetsDir: '.',
        rollupOptions: {
            input: 'material.js',
            output: {
                entryFileNames: 'debug.js'
            }
        }
    }
});