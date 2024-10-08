const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo atendimento
router.post('/', async (req, res) => {
  const {
    cod_prontuario,
    data_atendimento,
    hora_atendimento,
    cod_convenio,
    cod_plano,
    cod_origem_atendimento,
    cod_prestador,
    tipo_atendimento,
    cod_leito,
    cod_unidade_interna
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO atendimentos (cod_prontuario, data_atendimento, hora_atendimento, cod_convenio, cod_plano, cod_origem_atendimento, cod_prestador, tipo_atendimento, cod_leito, cod_unidade_interna)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [cod_prontuario, data_atendimento, hora_atendimento, cod_convenio, cod_plano, cod_origem_atendimento, cod_prestador, tipo_atendimento, cod_leito, cod_unidade_interna]
    );

    res.status(201).json(result.rows[0]); // Retorna o novo atendimento criado
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar atendimento' });
  }
});

// Obter todos os atendimentos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM atendimentos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar atendimentos' });
  }
});

module.exports = router;
