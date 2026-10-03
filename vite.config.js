import { defineConfig } from 'vite';
import { readdirSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';
export default defineConfig({
    build: {
        rollupOptions: {
            input: [resolve('index.html'), ...readdirSync('pages').filter(file => file.endsWith('.html')).map(file => resolve('pages', file))],
        },
    },
    plugins: [{
        name: 'local-content-assets',
        closeBundle() { cpSync('assets', 'dist/assets', { recursive: true }); },
    }],
});
