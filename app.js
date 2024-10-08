const express = require('express');
const bodyParser = require('body-parser');

// Routes
const pacientesRouter = require('./routes/pacientes');
const atendimentosRouter = require('./routes/atendimentos');
const transferenciasRouter = require('./routes/transferencias');
const altasRouter = require('./routes/altas');
const conveniosRouter = require('./routes/convenios');
const leitosRouter = require('./routes/leitos');
const planosRouter = require('./routes/planos');
const prestadoresRouter = require('./routes/prestadores');

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Para permitir que o Express interprete JSON

// Usar as rotas
app.use('/pacientes', pacientesRouter);
app.use('/atendimentos', atendimentosRouter);
app.use('/transferencias', transferenciasRouter);
app.use('/altas', altasRouter);
app.use('/convenios', conveniosRouter);
app.use('/leitos', leitosRouter);
app.use('/planos', planosRouter);
app.use('/prestadores', prestadoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
