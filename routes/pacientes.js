const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Criar um novo paciente
router.post('/', async (req, res) => {
  const { nome_paciente, data_nascimento, nome_mae, nome_pai, cpf } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO pacientes (nome_paciente, data_nascimento, nome_mae, nome_pai, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome_paciente, data_nascimento, nome_mae, nome_pai, cpf]
    );

    res.status(201).json(result.rows[0]); // Retorna o novo paciente criado
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar paciente' });
  }
});

// Obter todos os pacientes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
});

// Obter paciente por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pacientes WHERE cod_prontuario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar paciente' });
  }
});

// Atualizar um paciente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_paciente, data_nascimento, nome_mae, nome_pai} = req.body;

  try {
    const result = await pool.query(
      'UPDATE pacientes SET nome_paciente = $1, data_nascimento = $2, nome_mae = $3, nome_pai = $4 RETURNING *',
      [nome_paciente, data_nascimento, nome_mae, nome_pai]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json(result.rows[0]); // Retorna o paciente atualizado
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar paciente' });
  }
});

// Deletar um paciente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM pacientes WHERE cod_prontuario = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.status(200).json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar paciente' });
  }
});


module.exports = router;
