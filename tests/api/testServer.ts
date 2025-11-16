import { AppRoutes } from '../../src/api/routes';
import { envs } from '../../src/modules/shared/infrastructure/envs';
import { Server } from '../../src/api/server';

let _testServer: Server;

export const getTestServer = (): Server => {
  if (!_testServer) {
    _testServer = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });
  }
  return _testServer;
};
