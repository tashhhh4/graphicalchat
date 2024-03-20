import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '.',
        assetsDir: '.',
        rollupOptions: {
            input: 'main.js',
            output: {
                entryFileNames: 'bundle.js'
            }
        }
    }
});