const UserModel = require("../config/models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(req,res) {
    try {

        const {password , userId} = req.body

        const user = await UserModel.findById(userId)

        const tokenDeta ={
            id : user._id,
            email: user.email
        }

        const token = await jwt.sign(tokenDeta,process.env.JWT_SECREAT_KEY,{expiresIn:'1d'})

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }


        const verifyPassword = await bcryptjs.compare(password,user.password)
        
        if(!verifyPassword){
            return res.status(400).json({
                message:"please enter correct password",
                error : true
            })
        }

        return res.cookie('token',token,cookieOption).status(200).json({
                message:"Login sucessfuly",
                token : token,
                success : true
            })


        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
        
    }
    
}

module.exports = checkPassword