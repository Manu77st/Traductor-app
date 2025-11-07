const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Definimos el modelo Word
const Word = sequelize.define('Word', {
 word_es: {
    type: DataTypes.STRING,
    allowNull: false
  },
  word_en: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'words',
  timestamps: false
});

module.exports = Word;