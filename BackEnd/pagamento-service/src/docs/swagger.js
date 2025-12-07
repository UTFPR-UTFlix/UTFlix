export default {
  openapi: "3.0.0",
  info: { title: "UTFlix - Serviço de Pagamentos", version: "1.0.0" },
  servers: [{ url: "http://localhost:3002" }],
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
    schemas: {
      Pagamento: {
        type: "object",
        properties: {
          idPagamento: { type: "integer" },
          idCliente: { type: "string" },
          descricao: { type: "string" },
          valor: { type: "number" },
          metodoPagamento: { type: "string", enum: ["CREDITO", "PIX", "BOLETO", "DEBITO"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      CreatePagamentoRequest: {
        type: "object",
        required: ["descricao", "valor", "metodoPagamento"],
        properties: {
          descricao: { type: "string" },
          valor: { type: "number" },
          metodoPagamento: { type: "string", enum: ["CREDITO", "PIX", "BOLETO", "DEBITO"] }
        }
      }
    }
  },
  paths: {
    "/pagamentos": {
      get: {
        summary: "Lista pagamentos do cliente autenticado",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Pagamento" } } } }
          },
          "401": { description: "Unauthorized" }
        }
      },
      post: {
        summary: "Cria pagamento",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CreatePagamentoRequest" } } }
        },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/Pagamento" } } } },
          "400": { description: "Bad Request" },
          "401": { description: "Unauthorized" }
        }
      }
    },
    "/pagamentos/{id}": {
      get: {
        summary: "Busca pagamento do cliente",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not Found" }, "401": { description: "Unauthorized" } }
      },
      put: {
        summary: "Atualiza pagamento do cliente",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not Found" }, "401": { description: "Unauthorized" }, "403": { description: "Forbidden" } }
      },
      delete: {
        summary: "Remove pagamento do cliente",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "No Content" }, "404": { description: "Not Found" }, "401": { description: "Unauthorized" }, "403": { description: "Forbidden" } }
      }
    }
  }
};