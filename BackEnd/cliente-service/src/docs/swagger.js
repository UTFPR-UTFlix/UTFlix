const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UTFlix - Serviço de Clientes",
      version: "1.0.0",
      description: "API de gerenciamento de clientes do UTFlix",
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsDoc(options);
