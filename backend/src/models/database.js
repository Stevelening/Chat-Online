// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
require('mandatoryenv').load(['DB'])
const { DB } = process.env

const Sequelize = require('sequelize')
const config = DB.includes('sqlite') ? { dialect: 'sqlite', storage: DB, logging: (...msg) => console.log(msg) } : DB
const db = new Sequelize(config)
module.exports = db