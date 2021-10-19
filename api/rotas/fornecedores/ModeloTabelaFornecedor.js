const Sequelize = require('sequelize');
const instacia = require('../../database')

const colunas = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.ENUM('ração', 'brinquedos'),
    allowNull: false,
  }
};

const opcoes = {
  freezeTableName: true,
  tableName: 'fornecedores',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
};

module.exports = instacia.define('fornecedor', colunas, opcoes)