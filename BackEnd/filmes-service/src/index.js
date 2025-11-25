// src/index.js
const express = require('express');
const routerFilmes = require('./routes/filmeRoutes.js');
const generoRouter = require('./routes/generoRouter.js');
const atorRouter = require('./routes/atorRoutes.js');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger.js');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/filmes', routerFilmes);
app.use('/generos', generoRouter);
app.use('/atores', atorRouter);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`🎬 Filme service rodando na porta ${PORT}`));
}

module.exports = app;
