import { defineConfig } from 'vite';

export default defineConfig({
    root: '../',
    build: {
        outDir: 'gcmain/static/game',
        assetsDir: '.',
        rollupOptions: {
            input: {
                debug: 'material.js',
                bundle: 'game.js'
            },
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
});