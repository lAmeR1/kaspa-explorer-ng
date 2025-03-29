import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import eslint from 'vite-plugin-eslint';


// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    plugins: [react(),
        tailwindcss(),
        svgr({
            svgrOptions: {
                // svgr options?
            },
        }),
        eslint({
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),],
});
