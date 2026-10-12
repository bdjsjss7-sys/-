import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://bdjsjs7-sys.github.io',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
