const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo prestador
router.post('/', async (req, res) => {
  const { nome_prestador } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO prestadores (nome_prestador) VALUES ($1) RETURNING *',
      [nome_prestador]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar prestador' });
  }
});

// Obter todos os prestadores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM prestadores');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar prestadores' });
  }
});

// Obter um prestador por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM prestadores WHERE cod_prestador = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar prestador' });
  }
});

// Atualizar um prestador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_prestador } = req.body;

  try {
    const result = await pool.query(
      'UPDATE prestadores SET nome_prestador = $1 WHERE cod_prestador = $2 RETURNING *',
      [nome_prestador, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar prestador' });
  }
});

// Deletar um prestador
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM prestadores WHERE cod_prestador = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }
    res.status(200).json({ message: 'Prestador deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar prestador' });
  }
});

module.exports = router;
