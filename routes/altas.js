const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Registrar alta hospitalar
router.post('/', async (req, res) => {
  const { cod_atendimento, data_alta, hora_alta, motivo_alta } = req.body;

  try {
    await pool.query(
      `UPDATE atendimentos SET data_alta = $1, hora_alta = $2, motivo_alta = $3 WHERE cod_atendimento = $4`,
      [data_alta, hora_alta, motivo_alta, cod_atendimento]
    );

    res.status(200).json({ message: 'Alta registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao registrar alta' });
  }
});

// Obter todas as altas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM atendimentos WHERE motivo_alta IS NOT NULL');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar altas' });
  }
});

module.exports = router;
