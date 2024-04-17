import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // Custom MIME types for specific file extensions
        mimeTypes: {
            '.js': 'text/jsx', // Set MIME type for .js files to text/jsx
        },
    },
})
