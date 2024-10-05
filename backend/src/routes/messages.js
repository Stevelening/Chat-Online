const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js');
const groups = require("../controllers/groups.js");
const messages = require('../controllers/messages.js');

// Verifying on each call the token and the user
router.use('/api',user.verifyUser,function(req,res,next){
  user.verifyToken(req,res,next);
})


router.post('/api/messages/:gid',user.isMember,messages.sendMessage)
router.get('/api/messages/:gid',user.isMember,messages.listMessage)

module.exports = router



