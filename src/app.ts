import { envs } from './modules/shared/infrastructure/envs';
import { AppRoutes } from './api/routes';
import { Server } from './api/server';

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
