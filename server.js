const express = require('express');
const bodyParser = require('body-parser');
const pacientesRouter = require('./routes/pacientes');
const atendimentosRouter = require('./routes/atendimentos');
const transferenciasRouter = require('./routes/transferencias');
const altasRouter = require('./routes/altas');

const app = express();
const PORT = 3000;

// Middleware para interpretar o corpo das requisições como JSON
app.use(bodyParser.json());

// Usar as rotas
app.use('/pacientes', pacientesRouter);
app.use('/atendimentos', atendimentosRouter);
app.use('/transferencias', transferenciasRouter);
app.use('/altas', altasRouter);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
