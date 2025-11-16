import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';

import { getTestServer } from '../../testServer';
import { initializeContainer } from '../../../../src/api/shared/dependency-injection/container';
import { Server } from '../../../../src/api/server';

let _request: request.Test;
let testServer: Server;
let _response: Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(testServer.app).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

BeforeAll(async () => {
  await initializeContainer();
  testServer = getTestServer();
  await testServer.start();
});

AfterAll(async () => {
  testServer = getTestServer();
  testServer.close();
});
