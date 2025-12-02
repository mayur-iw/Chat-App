const UserModel = require("../config/models/UserModel")
const bcrypt = require('bcryptjs')

async function registerUser(req,res) {
    try {
        const {name , email , password , profile_pic} = req.body

        const checkEmail = await UserModel.findOne({email})

        if(checkEmail){
            return res.status(400).json({
                message:"Already user exist mayur",
                error:true
            })
        }

        // convert password in hash
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const payload = {
            name,
            email,
            profile_pic,
            password : hashPassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(201).json({
            message : "User was created",
            data : userSave,
            success : true

        });


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
    
}

module.exports = registerUser









// const UserModel = require("../config/models/UserModel")
// const bcrypt = require('bcryptjs')

// async function registerUser(req, res) {
//     try {
//         const { name, email, password, profile_pic } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 message: "Name, email, and password are required",
//                 error: true
//             })
//         }

//         const checkEmail = await UserModel.findOne({ email });

//         if (checkEmail) {
//             return res.status(400).json({
//                 message: "User already exists",
//                 error: true
//             })
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         const user = new UserModel({
//             name,
//             email,
//             password: hashPassword,
//             profile_pic
//         });

//         const savedUser = await user.save();

//         return res.status(201).json({
//             message: "User created successfully",
//             data: savedUser,
//             success: true
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//             error: true
//         })
//     }
// }

// module.exports = registerUser;
