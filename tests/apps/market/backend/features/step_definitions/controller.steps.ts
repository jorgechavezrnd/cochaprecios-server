import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request from 'supertest';

import { MarketBackendApp } from '../../../../../../src/apps/market/backend/MarketBackendApp';

let _request: request.Test;
let application: MarketBackendApp;

Given('I send a GET request to {string}', (route: string) => {
  // TODO: Upgrade supertest and @types/supertest dependencies
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  await _request.expect(status);
});

BeforeAll(async () => {
  application = new MarketBackendApp();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});
