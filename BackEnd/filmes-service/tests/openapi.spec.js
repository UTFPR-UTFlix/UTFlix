// tests/openapi.spec.js (Filmes)
const request = require('supertest');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');

const BASE = 'http://localhost:3001'; // servidor de filmes no Docker
let jestOpenAPI;

beforeAll(() => {
  const specPath = path.join(__dirname, '..', 'src', 'docs', 'openapi.yaml');
  const spec = YAML.parse(fs.readFileSync(specPath, 'utf8'));
  const jOpenAPI = require('jest-openapi');
  jestOpenAPI = jOpenAPI.default || jOpenAPI.jestOpenAPI || jOpenAPI;
  jestOpenAPI(spec);
});

describe('Filmes contract', () => {
  it('GET /filmes matches OpenAPI', async () => {
    const res = await request(BASE).get('/filmes').expect(200);
    expect(res).toSatisfyApiSpec();
  });

  it('GET /filmes/1 matches OpenAPI', async () => {
    const res = await request(BASE).get('/filmes/1');
    expect([200, 404]).toContain(res.status);
    expect(res).toSatisfyApiSpec();
  });
});
