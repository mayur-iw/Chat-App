const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        default: ""
    },
    imageUrl :{
        type: String,
        default: ""
    },
    videoUrl:{
        type: String,
        default: ""
    },
    seen:{
        type: Boolean,
        default: false
    },
    messageByUser:{
        type : mongoose.Schema.ObjectId,
        require :true,
        ref : 'user'
    }
},{
    timestamps:true 
})

const convesationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        require :true,
        ref : 'user'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        require :true,
        ref : 'user'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
    
   
},{
    timestamps:true 
})

const ConversationModel = mongoose.model('Conversation',convesationSchema)
const MessageModel = mongoose.model('Message',messageSchema)

module.exports = {
    ConversationModel,
    MessageModel
}