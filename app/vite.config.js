import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        assetsDir: '.',
        rollupOptions: {
            input: {
                bundle: 'index.html'
            },
            output: [
                {
                    entryFileNames: 'static/dist/[name].js',
                    assetFileNames: 'static/dist/[name].[ext]',
                    dir: 'dist'
                }
            ]
        },
    }
});