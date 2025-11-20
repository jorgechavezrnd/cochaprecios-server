import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';

import { getTestServer } from '../testServer';
import { getContainer, initializeContainer } from '../../../src/api/shared/dependency-injection/container';
import { Server } from '../../../src/api/server';
import { EnvironmentArranger } from '../../modules/shared/infrastructure/arranger/environmentArranger';

let _request: request.Test;
let testServer: Server;
let _response: Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(testServer.app).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(testServer.app)
    .put(route)
    .send(JSON.parse(body));
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
  testServer = await getTestServer();

  const container = getContainer();
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'Shared.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();

  await testServer.start();
});

AfterAll(async () => {
  testServer = await getTestServer();

  const container = getContainer();
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'Shared.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();

  testServer.close();
});
