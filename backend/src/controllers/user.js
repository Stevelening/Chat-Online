const status = require('http-status')
const userModel = require('../models/users.js')
const groupModel = require('../models/groups.js')

const db  = require('../models/database.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
const { col } = require('sequelize')
const groups = require('../models/groups.js')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env

function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}


 

module.exports = {
  async verifyToken(req,res,next){

    if (!req.headers || !req.headers.hasOwnProperty('x-access-token'))
    throw {code: 403, message: 'Token missing'}
  
    if (!jws.verify(req.headers['x-access-token'],'HS256',TOKENSECRET))
    throw {code: 403, message: 'Token invalid'}
  
      next();
  },

  async verifyUser(req,res,next){
    login=jws.decode(req.headers['x-access-token']).payload
    if(!userModel.findOne(({ where: { email: login } }))) {
      throw {code: 403, message: 'User Invalid'}
     }
  
     next();
  
  }
  ,
  
   async verifyUserIsAdmin(req,res,next){
    login=jws.decode(req.headers['x-access-token']).payload
    if(!userModel.findOne(({ where: { email: login ,isAdmin:1} }))) {
      throw {code: 403, message: 'User not admin'}
     }
  
     next();
  
  }
  ,
  // Verify if a certain access token belongs to the admin of the group
  async isAdminOfGroup(req,res,next){
    login=jws.decode(req.headers['x-access-token']).payload
    const user = await userModel.findOne({ where: { email:login } })
    const group = await groupModel.findOne( {where:{id:req.params.gid}})
    if(group.userId != user.id){
      res.status(status.FORBIDDEN).json({ status: false, message: 'Not a group Admin' })
    }
    next();
  },
  //TODO: TO FIX
  async isAdminOrAdminOfGroup(req,res,next){
    if(!user.isAdminOfGroup(req,res,next) && !user.verifyUserIsAdmin(req,res,next)){
    }
  },
  async isMember(req,res,next){
    login=jws.decode(req.headers['x-access-token']).payload
    const user = await userModel.findOne({ where: { email:login } })
    const gid =req.params.gid; 
    const group = await groupModel.findOne( {where:{id:gid}})

    if(!group.hasUser(user)){
      res.status(status.FORBIDDEN).json({ status: false, message: 'Not a group member' })
    }

    next();

  }
  ,
  async login (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'John.Doe@acme.com', $password: '12345'}}
    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const user = await userModel.findOne({ where: { email } })
    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        res.json({ status: true, message: 'Login/Password ok', token })
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
  },


  async newUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'New User'
    // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
    if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
    const { name, email, password } = req.body
    if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
    await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
    res.json({ status: true, message: 'User Added' })
  },

async getUsers(req, res) {
  try {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get All users'

    // Ask for x-access-token in the header and verify it
    const login = jws.decode(req.headers['x-access-token']).payload;

    const data = await userModel.findAll({ attributes: ['id', 'name', 'email'] });
    res.json({ status: true, message: 'Returning users', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
},
  async updateUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Mettre à jour les informations de l utilisateur (réservé à un utilisateur administrateur)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!' }}
    const userModified = {}
    for (const field of ['name', 'email', 'password', 'isAdmin']) {
      if (has(req.body, field)) {
        if (field === 'password') {
          userModified.passhash = await bcrypt.hash(req.body.password, 2)
        } else {
          userModified[field] = req.body[field]
        }
      }
    }
    if (Object.keys(userModified).length === 0) throw new CodeError('You must specify the name, email or password', status.BAD_REQUEST)
    await userModel.update(userModified, { where: { id: req.params.id } })
    res.json({ status: true, message: 'User updated' })
  },
  async deleteUser (req, res) {
    // verify if the token is valid and correspond to an admin
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete User by id'
    if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params
    await userModel.destroy({ where: { id } })
    res.json({ status: true, message: 'User deleted' })
  },

  async updatePassword(req,res){
     // #swagger.tags = ['Users']
    // verify if the token is valid and correspond to an admin
    // #swagger.parameters['obj'] = { in: 'body', schema: { $password: 'newPasswordDone' }}
    // #swagger.summary = 'update  of logged in User'
    login=jws.decode(req.headers['x-access-token']).payload
    field="password"
    if(has(req.body, field))
    {
      const  password  = req.body.password;
      const user = await userModel.findOne({ where: { email:login } })
      if (user) {
        const newPassword = await bcrypt.hash(password, 2);
        await user.update({ passhash: newPassword });
        res.json({ status: true, message: 'Password updated successfully' })
      }
      else{
        res.json({ status: true, message: 'Password update failed' })
      }
    }
    else{
      res.json({ status: false, message: 'Password update failed' })
    }
  },

  async isAdmin(req, res) {
    login = jws.decode(req.headers['x-access-token']).payload
    
    const user = await userModel.findOne({ where: { email:login } })
    if (user) {
      if(user.isAdmin){
        res.json({ status: true, message: 'This is an admin' })
      }
      else{
        res.json({ status: false, message: 'This is not an admin' })
      } 
    }
    else{
      res.json({ status: false, message: 'This is not an admin' })
    }
  },

}





