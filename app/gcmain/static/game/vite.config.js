import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '.',
        assetsDir: '.',
        rollupOptions: {
            input: 'test.js',
            output: {
                entryFileNames: 'bundle.js'
            }
        }
    }
});