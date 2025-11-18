// c:\Project\UTFlix\BackEnd\filmes-service\src\docs\swagger.js
export default {
  openapi: "3.0.0",
  info: {
    title: "UTFlix - Serviço de Filmes",
    version: "1.0.0",
    description: "APIs de filmes, gêneros e atores",
  },
  servers: [{ url: "http://localhost:3001" }],
  components: {
    schemas: {
      Filme: {
        type: "object",
        properties: {
          idFilme: { type: "integer" },
          titulo: { type: "string" },
          anoLancamento: { type: "integer" },
          rating: { type: "number" },
          duration: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          generos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                principal: { type: "boolean" },
                genero: {
                  type: "object",
                  properties: { idGenero: { type: "integer" }, genero: { type: "string" } },
                },
              },
            },
          },
          atores: {
            type: "array",
            items: {
              type: "object",
              properties: {
                personagem: { type: "string", nullable: true },
                principal: { type: "boolean" },
                ator: {
                  type: "object",
                  properties: { idAtor: { type: "integer" }, nome: { type: "string" } },
                },
              },
            },
          },
        },
      },
      Genero: {
        type: "object",
        properties: { idGenero: { type: "integer" }, genero: { type: "string" } },
      },
      Ator: {
        type: "object",
        properties: { idAtor: { type: "integer" }, nome: { type: "string" } },
      },
      CreateFilmeRequest: {
        type: "object",
        required: ["titulo", "anoLancamento", "generos"],
        properties: {
          titulo: { type: "string" },
          anoLancamento: { type: "integer" },
          rating: { type: "number" },
          duration: { type: "string" },
          rating: { type: "number" },
          duration: { type: "string" },
          generos: {
            type: "array",
            items: {
              type: "object",
              required: ["idGenero"],
              properties: { idGenero: { type: "integer" }, principal: { type: "boolean" } },
            },
          },
          atores: {
            type: "array",
            items: {
              type: "object",
              required: ["idAtor"],
              properties: {
                idAtor: { type: "integer" },
                personagem: { type: "string" },
                principal: { type: "boolean" },
              },
            },
          },
        },
      },
      UpdateFilmeRequest: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          anoLancamento: { type: "integer" },
          generos: {
            type: "array",
            items: {
              type: "object",
              properties: { idGenero: { type: "integer" }, principal: { type: "boolean" } },
            },
          },
          atores: {
            type: "array",
            items: {
              type: "object",
              properties: {
                idAtor: { type: "integer" },
                personagem: { type: "string" },
                principal: { type: "boolean" },
              },
            },
          },
        },
      },
      CreateGeneroRequest: {
        type: "object",
        required: ["genero"],
        properties: { genero: { type: "string" } },
      },
      UpdateGeneroRequest: {
        type: "object",
        properties: { genero: { type: "string" } },
      },
      CreateAtorRequest: {
        type: "object",
        required: ["nome"],
        properties: { nome: { type: "string" } },
      },
      UpdateAtorRequest: {
        type: "object",
        properties: { nome: { type: "string" } },
      },
    },
  },
  paths: {
    "/filmes": {
      get: {
        summary: "Lista filmes",
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Filme" } } } },
          },
        },
      },
      post: {
        summary: "Cria filme",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateFilmeRequest" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/Filme" } } } },
          "400": { description: "Bad Request" },
        },
      },
    },
    "/filmes/{id}": {
      get: {
        summary: "Busca filme por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Filme" } } } },
          "404": { description: "Not Found" },
        },
      },
      put: {
        summary: "Atualiza filme",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateFilmeRequest" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Filme" } } } },
          "404": { description: "Not Found" },
        },
      },
      delete: {
        summary: "Remove filme",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "No Content" }, "404": { description: "Not Found" } },
      },
    },
    "/generos": {
      get: {
        summary: "Lista gêneros",
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Genero" } } } },
          },
        },
      },
      post: {
        summary: "Cria gênero",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateGeneroRequest" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/Genero" } } } },
          "400": { description: "Bad Request" },
        },
      },
    },
    "/generos/{id}": {
      get: {
        summary: "Busca gênero por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Genero" } } } },
          "404": { description: "Not Found" },
        },
      },
      put: {
        summary: "Atualiza gênero",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateGeneroRequest" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Genero" } } } },
          "404": { description: "Not Found" },
        },
      },
      delete: {
        summary: "Remove gênero",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "No Content" }, "404": { description: "Not Found" } },
      },
    },
    "/atores": {
      get: {
        summary: "Lista atores",
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Ator" } } } },
          },
        },
      },
      post: {
        summary: "Cria ator",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateAtorRequest" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/Ator" } } } },
          "400": { description: "Bad Request" },
        },
      },
    },
    "/atores/{id}": {
      get: {
        summary: "Busca ator por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Ator" } } } },
          "404": { description: "Not Found" },
        },
      },
      put: {
        summary: "Atualiza ator",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateAtorRequest" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Ator" } } } },
          "404": { description: "Not Found" },
        },
      },
      delete: {
        summary: "Remove ator",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "No Content" }, "404": { description: "Not Found" } },
      },
    },
  },
}