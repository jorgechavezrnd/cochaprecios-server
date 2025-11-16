import { envs } from './modules/shared/infrastructure/envs';
import { AppRoutes } from './api/routes';
import { Server } from './api/server';
import { initializeContainer } from './api/shared/dependency-injection/container';

(async () => {
  await main();
})();

async function main() {
  await initializeContainer();

  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
