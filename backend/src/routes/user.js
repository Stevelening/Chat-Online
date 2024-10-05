const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')
const userModel = require('../models/users.js')
const jws = require('jws')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env






// Verifying on each call the token and the user
router.use('/api',user.verifyUser,function(req,res,next){
  user.verifyToken(req,res,next);
})




router.get('/api/users', user.getUsers)
router.post('/register', user.newUser) // POST replace /api/users by /register
router.put('/api/users/:id', user.verifyUserIsAdmin, user.updateUser)
router.delete('/api/users/:id',user.verifyUserIsAdmin,user.deleteUser)
router.post('/login', user.login)
router.get('/api/admin', user.isAdmin)
router.put('/api/password',user.updatePassword)



module.exports = router



