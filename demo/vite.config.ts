import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: isProd ? '/zarr-maps/' : '/',
    plugins: [react(), tailwindcss()],
    // The explorer is linked from the parent workspace. Always use the demo's
    // React and UI runtimes so hooks and contexts have one dispatcher.
    resolve: {
      dedupe: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/icons-material'
      ]
    }
  };
});
