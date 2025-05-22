import { createServer } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

async function startDevServer() {
  const server = await createServer({
    // Vite configuration options, similar to vite.config.ts
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
      tsconfigPaths(),
    ],
    // Other Vite server options if needed
    server: {
      port: 3000, // Default Remix port
    },
  });

  await server.listen();

  server.printUrls();
}

startDevServer().catch((err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});
