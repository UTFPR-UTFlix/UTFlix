const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const clienteRoutes = require("./routes/clientesRoutes");

const app = express();
app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/clientes", clienteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
