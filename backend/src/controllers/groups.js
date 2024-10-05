const status = require('http-status')
const userModel = require('../models/users.js')
const groupModel = require('../models/groups.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const jws = require('jws')



module.exports = {
    async listGroups(req, res) {
        // #swagger.tags = ['Groups']
        // #swagger.summary = 'List all groups'
       try {
         const login = jws.decode(req.headers['x-access-token']).payload;
         const ownerId = await userModel.findOne({where: { email: login }});
         const myGroups = await groupModel.findAll({where: { userId: ownerId.id} });
         res.json({ status: true,message:"returning managed groups", data: myGroups });
       } catch (error) {
         console.log('error :>> ', error);
         res.status(500).json({ status: false, message: 'Internal server error' });
       }
     },
   

     async listAllGroups(req, res) {
      // #swagger.tags = ['All Groups']
      // #swagger.summary = 'List all groups'
     try {
       const login = jws.decode(req.headers['x-access-token']).payload;
       const groups = await groupModel.findAll();
       res.json({ status: true,message:"returning all groups", data: groups });
     } catch (error) {
       console.log('error :>> ', error);
       res.status(500).json({ status: false, message: 'Internal server error' });
     }
   },
     
     async createGroup(req, res) {
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'Create a group '
   
         try {
             const name = req.body.name;
             if (!name) {
                 throw new CodeError("Group must have a name!", status.BAD_REQUEST);
             }
             const login = jws.decode(req.headers['x-access-token']).payload;
             console.log('login :>> ', login);
             const user = await userModel.findOne({ where: { email: login } });
             
             if (!user) {
                 throw new Error("User not found!");
             }
             console.log('user.name :>> ', user);
             const group = await groupModel.create({ name: name, userId: user.id });
             const queryGroup = await groupModel.findOne({ where: { name: name } });
             
             await user.addGroup(group);
             await queryGroup.addUser(user); 
             
             res.json({ status: true, message: "Group Created" });
   
         } catch (error) {
             console.error(error);
             res.status(500).json({ status: false, message: 'Internal server error' });
         }
       },
     async getMembersGroup(req,res){
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'get members of a group'
   
       login=jws.decode(req.headers['x-access-token']).payload
   
       if(!has(req.params,'gid')) {
         throw new CodeError('You must specify group id') , status.BAD_REQUEST;
       }
   
       const groupQuery = await groupModel.findOne({where: {id:req.params.gid}});
   
       if(!groupQuery){
         throw new CodeError("Invalid Group id !")
       }
       const members = await groupQuery.getUser();
       let listOfMembers=[]
       if(members){
         listOfMembers = members
       }
       res.json({status : true,data:listOfMembers})
     }
   
     ,
     async addMembersGroup(req,res){
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'Assign a member to a group '
   
       login=jws.decode(req.headers['x-access-token']).payload
   
       if(!has(req.params,['gid','uid'])) {
         throw new CodeError('You must specify group id and user id') , status.BAD_REQUEST;
       }
   
       const {gid,uid} =req.params; 
       const group = await groupModel.findOne( {where:{id:gid}})
       const user = await userModel.findOne({where:{id:uid}})
   
       if(!group || !user){
         throw new CodeError("Please make sure you entered valid crendentials"), status.BAD_REQUEST
       }
   
       await user.addGroup(group);
       await group.addUser(user);
       res.json({ status: true, message: "User "+uid+" added to group "+gid });
     },
   
     async removeMembersGroup(req,res){
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'remove a member from a group '
   
       login=jws.decode(req.headers['x-access-token']).payload
   
       if(!has(req.params,['gid','uid'])) {
         throw new CodeError('You must specify group id and user id') , status.BAD_REQUEST;
       }
   
       const {gid,uid} =req.params; 
       const group = await groupModel.findOne( {where:{id:gid}})
       const user = await userModel.findOne({where:{id:uid}})
   
       if(!group || !user){
         throw new CodeError("Please make sure you entered valid crendentials"), status.BAD_REQUEST
       }
   
       await user.removeGroup(group);
       await group.removeUser(user);
       res.json({ status: true, message: "User "+uid+" removed from group "+gid });
     },
   
   
     async deleteGroup(req,res){
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'delete a group '
       login=jws.decode(req.headers['x-access-token']).payload
       if(!has(req.params,'gid')) {
         throw new CodeError('You must specify group id') , status.BAD_REQUEST;
       }
       const gid =req.params.gid; 
       const group = await groupModel.findOne( {where:{id:gid}})
       //TODO: send a goodbye message 
       
       group.destroy()
   
       res.json({ status: true, message: "Group Removed : "+gid });
       
     },
   
     async getMyGroups(req,res){
       // #swagger.tags = ['Groups']
       // #swagger.summary = 'Get my groups'
       login=jws.decode(req.headers['x-access-token']).payload
       const user = await userModel.findOne({where: { email: login }});
   
       if(!user){
         throw new CodeError("This token is invalid") 
       }
   
       const listOfGroups = await user.getGroup();
       
       res.json({ status: true, data: listOfGroups });
     }
}