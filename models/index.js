const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo: Paciente
const Paciente = sequelize.define('Paciente', {
  cod_prontuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome_paciente: { type: DataTypes.STRING, allowNull: false },
  data_nascimento: { type: DataTypes.DATE, allowNull: false },
  nome_mae: { type: DataTypes.STRING, allowNull: false },
  nome_pai: { type: DataTypes.STRING },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Modelo: Atendimento
const Atendimento = sequelize.define('Atendimento', {
  cod_atendimento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cod_prontuario: { type: DataTypes.INTEGER, allowNull: false },
  data_atendimento: { type: DataTypes.DATE, allowNull: false },
  hora_atendimento: { type: DataTypes.TIME, allowNull: false },
  cod_convenio: { type: DataTypes.INTEGER, allowNull: false },
  cod_plano: { type: DataTypes.INTEGER, allowNull: false },
  cod_origem_atendimento: { type: DataTypes.INTEGER, allowNull: false },
  cod_prestador: { type: DataTypes.INTEGER, allowNull: false },
  tipo_atendimento: { type: DataTypes.STRING, allowNull: false },
  cod_leito: { type: DataTypes.INTEGER },
  cod_unidade_interna: { type: DataTypes.INTEGER },
});

// Modelo: Transferência
const Transferencia = sequelize.define('Transferencia', {
  cod_transferencia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cod_atendimento: { type: DataTypes.INTEGER },
  cpf: { type: DataTypes.STRING },
  cod_leito_atual: { type: DataTypes.INTEGER, allowNull: false },
  cod_unidade_atual: { type: DataTypes.INTEGER, allowNull: false },
  cod_leito_destino: { type: DataTypes.INTEGER, allowNull: false },
  cod_unidade_destino: { type: DataTypes.INTEGER, allowNull: false },
  data_transferencia: { type: DataTypes.DATE, allowNull: false },
  hora_transferencia: { type: DataTypes.TIME, allowNull: false },
});

// Modelo: Alta Hospitalar
const Alta = sequelize.define('Alta', {
  cod_atendimento: { type: DataTypes.INTEGER, primaryKey: true },
  data_alta: { type: DataTypes.DATE, allowNull: false },
  hora_alta: { type: DataTypes.TIME, allowNull: false },
  motivo_alta: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Paciente, Atendimento, Transferencia, Alta, sequelize };