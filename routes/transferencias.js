const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Transferir um paciente
router.post('/', async (req, res) => {
  const {
    cod_atendimento,
    cod_leito_atual,
    cod_unidade_atual,
    cod_leito_destino,
    cod_unidade_destino,
    data_transferencia,
    hora_transferencia,
    cpf // Usar CPF quando offline
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transferencias (cod_atendimento, cod_leito_atual, cod_unidade_atual, cod_leito_destino, cod_unidade_destino, data_transferencia, hora_transferencia, cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [cod_atendimento, cod_leito_atual, cod_unidade_atual, cod_leito_destino, cod_unidade_destino, data_transferencia, hora_transferencia, cpf]
    );

    res.status(201).json(result.rows[0]); // Retorna a nova transferência criada
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao transferir paciente' });
  }
});

// Obter todas as transferências
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transferencias');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar transferências' });
  }
});

module.exports = router;
