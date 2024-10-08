const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo convênio
router.post('/', async (req, res) => {
  const { nome_convenio } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO convenios (nome_convenio) VALUES ($1) RETURNING *',
      [nome_convenio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar convênio' });
  }
});

// Obter todos os convênios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM convenios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar convênios' });
  }
});

// Obter um convênio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM convenios WHERE cod_convenio = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Convênio não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar convênio' });
  }
});

// Atualizar um convênio
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_convenio } = req.body;

  try {
    const result = await pool.query(
      'UPDATE convenios SET nome_convenio = $1 WHERE cod_convenio = $2 RETURNING *',
      [nome_convenio, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Convênio não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar convênio' });
  }
});

// Deletar um convênio
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM convenios WHERE cod_convenio = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Convênio não encontrado' });
    }
    res.status(200).json({ message: 'Convênio deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar convênio' });
  }
});

module.exports = router;
