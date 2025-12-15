// const express = require('express')
// const { server } = require('socket.io')
// const  http  = require('http')

// const app = express()

// // Socket connection 

// const server = http.createServer(app)
// const io = new server(server,{
//     // CORS
//     cors:{

//         origin: process.env.FRONTEND_URL || "*",
//         credentials: true
//    }
// })

// io.on('connection',(socket)=>{
//     console.log("Connect User", socket.id)

//     // dissconnect

//     io.on('disconnect',()=>{
//         console.log("Disconnect User", socket.id)
//     })
// })

// module.exports = {
//     app,
//     server

// }

const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getUserdetailsFromTokens = require('../helpers/getuserDetailsFromTokens');
const UserModel = require('../config/models/UserModel');
const mongoose = require("mongoose");
const {ConversationModel,MessageModel} = require('../config/models/ConversationModel'); 

const app = express();

// Create HTTP server
const server = http.createServer(app); 

// Create Socket.io server
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "*",
        credentials: true
    }
});

// Online users
const onlineUser = new Set();

// Socket connection
io.on('connection', async (socket) => {
    console.log("Connected User:", socket.id);

    const token = socket.handshake.auth.token;
    // console.log("token",token);

    // current user details
    const user = await getUserdetailsFromTokens(token);

    // Create room
    socket.join(user?._id.toString());
    onlineUser.add(user?._id?.toString());

    io.emit('onlineUsers', Array.from(onlineUser));

   
    // socket.on('message-page',async(userId)=>{
    //     // console.log("userId",userId)
    //     const userDetails = await UserModel.findById(userId).select("-password")

    //     // console.log("userDetails-from backend",userDetails)

    //     const payload = {
    //         _id : userDetails?._id, 
    //         name : userDetails?.name,
    //         email : userDetails?.email,
    //         online : onlineUser.has(userId.toString()),
    //         profile_pic:userDetails?.profile_pic
    //     }

    //     socket.emit('message-user',payload)
        
    //     // previous messages 
        
    //     const updatedConversation = await ConversationModel.findOne({
    //         "$or": [
    //             { sender: user?._id, receiver: userId },
    //             { sender: userId, receiver: user?._id }
    //         ]
    //     }).populate({ path: 'messages', options: { sort: { createdAt: 1 } } });
        
    //     socket.emit('message',updatedConversation.messages)


    // })



    socket.on('message-page', async (userId) => {
    try {
        // --- (Existing code to fetch user details and emit 'message-user' payload) ---
        const userDetails = await UserModel.findById(userId).select("-password");
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            online: onlineUser.has(userId.toString()),
            profile_pic: userDetails?.profile_pic
        };
        socket.emit('message-user', payload);

        // previous messages 
        
        const conversation = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id }
            ]
        }).populate({ path: 'messages', options: { sort: { createdAt: 1 } } });
        
        // >>>>>>>>>>>>>>>>> FIX APPLIED HERE <<<<<<<<<<<<<<<<<<<<
        
        let messagesToSend = [];

        if (conversation && conversation.messages) {
            // If conversation is found, and it has messages, send them
            messagesToSend = conversation.messages;
        } else {
            // If conversation is NOT found (null), send an empty array instead of crashing
            console.log(`No existing conversation found. Sending empty message array.`);
        }
        
        // We use messagesToSend here instead of conversation.messages
        socket.emit('message', messagesToSend); 

    } catch (error) {
        console.error("Error handling 'message-page' event:", error);
    }
});




   
    
        // socket.on('new-message',async(data)=>{

        //     let converstation = await ConversationModel.findOne({
        //         "$or" : [
        //             { sender: data.sender, receiver: data.receiver }
        //             { sender: data.receiver, receiver: data.sender }
        //         ]
        //     })
        //     if(!converstation){
        //         const createConverstation = await ConversationModel({
        //             sender : data?.sender,
        //             receiver : data?.receiver
        //         })
        //         converstation = await createConverstation.save()
        //     }

        //     const message = new MessageModel({
        //         text: data?.text,
        //         imageUrl: data?.imageUrl,
        //         videoUrl: data?.videoUrl,
        //         messageByUser : data?.messageByUser
        //     })

        //     const saveMessage = await message.save()

        //     const updateConvversiation = await ConversationModel.updateOne({ _id : converstation?._id },{
        //         "$push" : { messages : saveMessage?._id }
        //     })

        //     console.log("updateConvversiation",updateConvversiation);

        //     const getConversiationMessage = await ConversationModel.findOne({
        //         "$or" : [
        //             { sender: data.sender, receiver: data.receiver },
        //             { sender: data.receiver, receiver: data.sender }
        //         ]
                
        //     }).populate('messages').sort({updatedAt : -1})
        //     console.log("getConversiationMessage",getConversiationMessage);


            
        //     io.to(data?.sender).emit('message',getConversiationMessage)
        //     io.to(data?.receiver).emit('message',getConversiationMessage)
        // })





       









       socket.on('new-message', async (data) => {
            try { // Wrap in try-catch for stability
                // Find existing conversation
                let conversation = await ConversationModel.findOne({
                    "$or": [
                        { sender: data.sender, receiver: data.receiver },
                        { sender: data.receiver, receiver: data.sender }
                    ]
                });

                // Create conversation if not exist
                if (!conversation) {
                    conversation = await new ConversationModel({
                        sender: data.sender,
                        receiver: data.receiver
                    }).save();
                }

                // Create new message
                const message = await new MessageModel({
                    text: data.text,
                    imageUrl: data.imageUrl,
                    videoUrl: data.videoUrl,
                    messageByUser: data.messageByUser
                }).save();

                // Push message to conversation and update last update time
                await ConversationModel.updateOne(
                    { _id: conversation._id },
                    { 
                        "$push": { messages: message._id },
                        updatedAt: new Date() // Explicitly update the timestamp for sorting
                    }
                );

                // Fetch updated conversation with messages
                const updatedConversation = await ConversationModel.findOne({
                    "$or": [
                        { sender: data.sender, receiver: data.receiver },
                        { sender: data.receiver, receiver: data.sender }
                    ]
                }).populate({ path: 'messages', options: { sort: { createdAt: 1 } } });

                // Emit messages only (Chat Window Update)
                io.to(data.sender.toString()).emit('message', updatedConversation?.messages || []);
                io.to(data.receiver.toString()).emit('message', updatedConversation?.messages || []);
                
                // 🔥🔥🔥 NEW CODE ADDED HERE 🔥🔥🔥
                // Real-time Sidebar Update: Notify both users' clients to refresh their sidebar data.
                io.to(data.sender.toString()).emit('sidebar', data.sender.toString()); 
                io.to(data.receiver.toString()).emit('sidebar', data.receiver.toString());
                // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
                
            } catch (error) {
                console.error('Error handling new-message event:', error);
            }
        });




            // side bar 


            // socket.on('sidebar',async(currentUserId)=>{
            //     console.log("sidebar id",currentUserId)

            //     const currentUserConversiation = await ConversationModel.find({
            //         "$or" : [
            //             { sender : currentUserId?._id },
            //             { receiver : currentUserId?._id }
            //         ]
            //     }).populate('messages').populate('sender').populate('receiver').sort({updatedAt: -1})

            //     // console.log("currentUserConversiation",currentUserConversiation);

            //     const conversation = currentUserConversiation.map((conv)=>{
            //         const unSeenMessage = conv.messages.reduce((preve,curr) => preve + (curr.seen ? 0 :1),0)
            //         return{
            //             _id : conv?._id,
            //             sender : conv?.sender,
            //             receiver : conv?.receiver,
            //             unseenMsg : unSeenMessage,
            //             lastMessage : conv.messages[conv?.messages?.length - 1]
            //         }
            //     })
            //     socket.emit('Conversation',conversation)
            //     // console.log('conversiation',conversation)
            // })

            const mongoose = require('mongoose');

            socket.on('sidebar', async (currentUserId) => {
                try {
                    console.log("sidebar id", currentUserId);

                    // Validate
                    if (!currentUserId || !mongoose.Types.ObjectId.isValid(currentUserId)) {
                        console.log('Invalid or empty currentUserId:', currentUserId);
                        return;
                    }

                    const currentUserConversations = await ConversationModel.find({
                        "$or": [
                            { sender: currentUserId },
                            { receiver: currentUserId }
                        ]
                    })
                    .populate('messages')
                    .populate('sender')
                    .populate('receiver')
                    .sort({ updatedAt: -1 });

                    const conversations = currentUserConversations.map((conv) => {
                        const unseenMsg = conv.messages.reduce((prev, curr) => prev + (curr.seen ? 0 : 1), 0);
                        return {
                            _id: conv._id,
                            sender: conv.sender,
                            receiver: conv.receiver,
                            unseenMsg,
                            lastMessage: conv.messages[conv.messages.length - 1] || null
                        };
                    });

                    socket.emit('Conversation', conversations);
                    console.log('Conversations sent to user:', currentUserId);

                } catch (error) {
                    console.error('Error in sidebar event:', error);
                }
            });




    // Disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
        console.log("Disconnected User:", socket.id);
    });
});

module.exports = { app, server };

