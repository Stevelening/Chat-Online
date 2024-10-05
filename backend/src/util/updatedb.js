const userModel = require('../models/users.js')
const groupModel = require('../models/groups.js')
const messageModel = require('../models/messages.js')
const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  // Creation de 03 Users
  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)
  const user1 = await userModel.create({
    name: 'Sebastien Viardot', email: 'Sebastien.Viardot@grenoble-inp.fr', passhash
  })
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
  const pwd1 = await bcrypt.hash('admin123', 2)
  const user2 = await userModel.create({
    name: 'Admin', email: 'Admin@admin.fr', passhash: pwd1, isAdmin: 1
  })

  const pwd2 = await bcrypt.hash('steve123', 2)
  const user3 = await userModel.create({
    name: 'Lening Steve', email: 'stevelening@grenoble-inp.org', passhash: pwd2
  })

  const pwd3 = await bcrypt.hash("1m02P@Ss", 2)
  const user4 = await userModel.create({
    name: 'Yo Zidane', email: 'zidane@gmail.com', passhash: pwd3
  })

  const pwjred3 = await bcrypt.hash("1m02P@Ss", 2)
  const jre = await userModel.create({
    name: 'Joe Rogan', email: 'jre@gmail.com', passhash: pwjred3
  })


  const tuckpwd = await bcrypt.hash("1m02P@Ss", 2)
  const tucker = await userModel.create({
    name: 'Tucker Carslon', email: 'cnn@gmail.com', passhash: tuckpwd
  })


  // Creation de 05 Groupes :
  const oId1 = user1.id;
  const group1 = await groupModel.create({
    name: 'groupe a', userId: oId1
  });

  const oId2 = user2.id;
  const group2 = await groupModel.create({
    name: "groupe b", userId : oId2
  })


  const group6 = await groupModel.create({
    name: "JRE", userId : jre.id
  })


  const group3 = await groupModel.create({
    name: "groupe c", userId : oId2
  })

  const oId3 = user4.id;
  const group4 = await groupModel.create({
    name: "groupe d", userId : oId3
  })

  const group5 = await groupModel.create({
    name: "groupe e", userId : oId3
  })
  
})()
