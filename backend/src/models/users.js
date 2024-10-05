const Sequelize = require('sequelize')
const db = require('./database.js')
const groups = require('./groups.js')
const messages = require('./messages.js')

const users = db.define('users', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    }
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passhash: {
    type: Sequelize.STRING(60),
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  },
  isAdmin: {
    type: Sequelize.TINYINT(1),
    defaultValue: 0
  }
}
, { timestamps: false })

// Relationships between users and groups
users.belongsToMany(groups,{ as:'Group' , through: 'User_Group' });
groups.belongsToMany(users,{ as:'User' , through: 'User_Group' });
groups.belongsTo(users,{as:"Owner",foreignKey:"userId",onDelete:"CASCADE",onUpdate:"CASCADE"});
users.hasMany(groups,{as:"Owned"});


messages.belongsTo(users,{as:"Msg",foreignKey:"senderId",onDelete:"CASCADE",onUpdate:"CASCADE"});
users.hasMany(messages,{as:"Send",foreignKey:"senderId"});
messages.belongsTo(groups,{as:"Message",foreignKey:"groupId",onDelete:"CASCADE",onUpdate:"CASCADE"});
groups.hasMany(messages,{as:"Receives",foreignKey:"groupId"});



module.exports = users