const Sequelize = require('sequelize')
const db = require('./database.js')


const messages = db.define('messages', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING(128),
  },
}
, { timestamps: true })






module.exports = messages