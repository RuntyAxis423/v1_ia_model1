import { createServer } from 'vite';

async function startDevServer() {
  const server = await createServer();
  await server.listen();
  server.printUrls();
}

startDevServer().catch((err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});