import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';

import { getTestServer } from '../testServer';
import { getContainer } from '../../../src/api/shared/dependency-injection/container';
import { Server } from '../../../src/api/server';
import { EnvironmentArranger } from '../../modules/shared/infrastructure/arranger/environmentArranger';

let _request: request.Test;
let testServer: Server;
let _response: Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(testServer.app).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(testServer.app)
    .put(route)
    .send(JSON.parse(body));
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(testServer.app)
    .post(route)
    .send(JSON.parse(body));
});

Given('I send a DELETE request to {string}', function (route: string) {
  _request = request(testServer.app)
    .delete(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response should contain:', (body: string) => {
  const expectedBody = JSON.parse(body);
  const actualBody = _response.body;
  
  Object.keys(expectedBody).forEach(key => {
    assert.strictEqual(actualBody[key], expectedBody[key], `Expected ${key} to be ${expectedBody[key]} but got ${actualBody[key]}`);
  });
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
