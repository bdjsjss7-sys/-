import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://remont-grodno.by',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
