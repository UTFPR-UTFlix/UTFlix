const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const clienteRoutes = require("./routes/clientesRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/clientes", clienteRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 Clientes Service rodando na porta ${PORT}`));
}
module.exports = app;
