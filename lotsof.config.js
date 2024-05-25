import { __defineConfig } from '@lotsof/config';
import { __dirname } from '@lotsof/sugar/fs';

__defineConfig({
  docmap: {
    settings: {
      docblock: {
        settings: {
          renderMarkdown: true,
          renderMarkdownProps: ['description'],
        },
      },
    },
    build: {
      outPath: null,
      outDir: `${__dirname()}/doc`,
      mdx: true,
      json: false,
    },
  },
});
