const status = require('http-status')
const userModel = require('../models/users.js')
const groupModel = require('../models/groups.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const jws = require('jws')
const messageModel = require('../models/messages.js')

module.exports = {
    async sendMessage(req,res){
        // #swagger.tags = ['Sending and Receiving Messages']
        // #swagger.summary = 'send Messages'
        login=jws.decode(req.headers['x-access-token']).payload
        const user = await userModel.findOne({where: { email: login }});
        if(!req.params.gid){
          throw new CodeError("Invalid parameter")
        }
        if(!req.body.content){
          throw new CodeError("No message is provided")
        }
        const gid =req.params.gid; 
        const message = req.body.content
        const group = await groupModel.findOne( {where:{id:gid}});
    
        if(!group){
          throw new CodeError("Invalid group")
        }
        const newMessage = messageModel.create({ 
          content:message,
          senderId:user.id,
          groupId: gid
         });
    
    
        res.json({ status: true, message: "message sent by : "+user.name+" in group "+group.name });
      },
      async listMessage(req,res){
        // #swagger.tags = ['Sending and Receiving Messages']
        // #swagger.summary = 'list Messages'
        const messageSent=await messageModel.findAll({where:
        {groupId:req.params.gid}})
    
        console.log('messageSent :>> ', messageSent);  
    
        if(!messageSent){
          res.json({ status: true, message: "No messages yet" });
        }
    
        res.json({ status: true,data:messageSent});
        
    
    
      }
}