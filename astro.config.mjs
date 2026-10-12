import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ⚠️ ВАЖНО: ниже замени URL на свой (пока можешь оставить так,
// когда определишься с доменом — вернёшься и поправишь)

export default defineConfig({
  site: 'https://remont-grodno.by',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
