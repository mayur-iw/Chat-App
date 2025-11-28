const UserModel = require("../config/models/UserModel")

async function checkmail(req,res) {
    try {
        const {email} = req.body

        const checkEmail = await UserModel.findOne({email}).select('-password')

        if(!checkEmail){
            return res.status(400).json({
                message:"User is not exist",
                error : true
            })
        }

        return res.status(200).json({
            message:"User already exist",
            successs:true,
            date:checkEmail
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
    
}

module.exports=checkmail