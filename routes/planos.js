const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo plano
router.post('/', async (req, res) => {
  const { nome_plano, cod_convenio } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO planos (nome_plano, cod_convenio) VALUES ($1, $2) RETURNING *',
      [nome_plano, cod_convenio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar plano' });
  }
});

// Obter todos os planos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM planos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar planos' });
  }
});

// Obter um plano por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM planos WHERE cod_plano = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar plano' });
  }
});

// Atualizar um plano
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_plano, cod_convenio } = req.body;

  try {
    const result = await pool.query(
      'UPDATE planos SET nome_plano = $1, cod_convenio = $2 WHERE cod_plano = $3 RETURNING *',
      [nome_plano, cod_convenio, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar plano' });
  }
});

// Deletar um plano
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM planos WHERE cod_plano = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    res.status(200).json({ message: 'Plano deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar plano' });
  }
});

module.exports = router;
