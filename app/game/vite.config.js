import { defineConfig } from 'vite';

export default defineConfig({
    root: '../',
    build: {
        outDir: 'gcmain/static/game/main',
        assetsDir: '.',
        rollupOptions: {
            input: {
                bundle: '../index.html'
            },
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
});