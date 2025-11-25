const request = require('supertest');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
let app;
let jestOpenAPI;

beforeAll(async () => {
  const mod = await import('../src/index');
  app = mod.default || mod;
  const specPath = path.join(__dirname, '..', 'src', 'docs', 'openapi.yaml');
  const spec = YAML.parse(fs.readFileSync(specPath, 'utf8'));
  const jOpenAPI = require('jest-openapi');
  jestOpenAPI = jOpenAPI.default || jOpenAPI.jestOpenAPI;
  jestOpenAPI(spec);
});

describe('Cliente contract', () => {
  it('GET /clientes matches OpenAPI', async () => {
    const res = await request(app).get('/clientes').expect(200);
    expect(res).toSatisfyApiSpec();
  });

  it('GET /clientes/1 matches OpenAPI', async () => {
    const res = await request(app).get('/clientes/1');
    expect([200, 404]).toContain(res.status);
    expect(res).toSatisfyApiSpec();
  });

  it('GET /clientes/1/favoritos matches OpenAPI', async () => {
    const res = await request(app).get('/clientes/1/favoritos').expect(200);
    expect(res).toSatisfyApiSpec();
  });
});