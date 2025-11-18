const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UTFlix - Serviço de Clientes",
      version: "1.0.0",
      description: "API de gerenciamento de clientes do UTFlix",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Cliente: {
          type: "object",
          properties: {
            id: { type: "integer" },
            senha: { type: "string" },
            nome: { type: "string" },
            email: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            filmesFavoritos: {
              type: "array",
              items: { $ref: "#/components/schemas/Favorito" },
            },
          },
        },
        Favorito: {
          type: "object",
          properties: { idFilme: { type: "integer" } },
        },
        RegistrarRequest: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string" },
            email: { type: "string" },
            senha: { type: "string" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string" },
            senha: { type: "string" },
          },
        },
        TokenResponse: {
          type: "object",
          properties: { token: { type: "string" } },
        },
        FavoritoRequest: {
          type: "object",
          required: ["idFilme"],
          properties: { idFilme: { type: "integer" } },
        },
      },
    },
    paths: {
      "/clientes": {
        get: {
          summary: "Lista clientes",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Cliente" } },
                },
              },
            },
          },
        },
      },
      "/clientes/{id}": {
        get: {
          summary: "Busca cliente por ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Cliente" } } } },
            "404": { description: "Not Found" },
          },
        },
        put: {
          summary: "Atualiza cliente",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { type: "object", properties: { nome: { type: "string" }, email: { type: "string" } } },
              },
            },
          },
          responses: {
            "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Cliente" } } } },
            "404": { description: "Not Found" },
          },
        },
        delete: {
          summary: "Remove cliente",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: { "204": { description: "No Content" }, "404": { description: "Not Found" } },
        },
      },
      "/clientes/registrar": {
        post: {
          summary: "Registra cliente",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/RegistrarRequest" } } },
          },
          responses: {
            "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/Cliente" } } } },
            "409": { description: "Conflict" },
            "400": { description: "Bad Request" },
          },
        },
      },
      "/clientes/login": {
        post: {
          summary: "Login",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } },
          },
          responses: {
            "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/TokenResponse" } } } },
            "401": { description: "Unauthorized" },
          },
        },
      },
      "/clientes/{id}/favoritos": {
        get: {
          summary: "Lista favoritos do cliente",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "OK",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Favorito" } } } },
            },
          },
        },
        post: {
          summary: "Adiciona favorito",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/FavoritoRequest" } } },
          },
          responses: { "201": { description: "Created" } },
        },
      },
      "/clientes/{id}/favoritos/{idFilme}": {
        delete: {
          summary: "Remove favorito",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } },
            { name: "idFilme", in: "path", required: true, schema: { type: "integer" } },
          ],
          responses: { "204": { description: "No Content" }, "404": { description: "Not Found" } },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsDoc(options);
