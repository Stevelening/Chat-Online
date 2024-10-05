const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js');
const groups = require("../controllers/groups.js")

// Verifying on each call the token and the user
router.use('/api',user.verifyUser,function(req,res,next){
  user.verifyToken(req,res,next);
})


router.post('/api/mygroups',groups.createGroup)
router.get('/api/mygroups',groups.listGroups)
router.put('/api/mygroups/:gid/:uid',user.isAdminOfGroup,groups.addMembersGroup)
router.get('/api/mygroups/:gid',user.isAdminOfGroup,groups.getMembersGroup)
router.delete('/api/mygroups/:gid/:uid',user.isAdminOfGroup,groups.removeMembersGroup)
router.delete('/api/mygroups/:gid',user.isAdminOfGroup,groups.deleteGroup)
router.get('/api/groupsmember',groups.getMyGroups)
router.get('/api/allgroups',groups.listAllGroups)


module.exports = router



