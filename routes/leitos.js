const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo leito
router.post('/', async (req, res) => {
  const { numero_leito, cod_unidade } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO leitos (numero_leito, cod_unidade) VALUES ($1, $2) RETURNING *',
      [numero_leito, cod_unidade]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar leito' });
  }
});

// Obter todos os leitos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leitos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar leitos' });
  }
});

// Obter um leito por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM leitos WHERE cod_leito = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leito não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar leito' });
  }
});

// Atualizar um leito
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { numero_leito, cod_unidade } = req.body;

  try {
    const result = await pool.query(
      'UPDATE leitos SET numero_leito = $1, cod_unidade = $2 WHERE cod_leito = $3 RETURNING *',
      [numero_leito, cod_unidade, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leito não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar leito' });
  }
});

// Deletar um leito
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM leitos WHERE cod_leito = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leito não encontrado' });
    }
    res.status(200).json({ message: 'Leito deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar leito' });
  }
});

module.exports = router;
