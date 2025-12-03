const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require :[true, "Please provide Name"]
    },
    email : {
        type : String,
        require :[true, "Please provide email"],
        unique : true
    },
    password : {
        type : String,
        require :[true, "Please provide password"]
    },
    profile_pic : {
        type : String,
        default: ""
    }
},{
    timestamps:true
})

const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel