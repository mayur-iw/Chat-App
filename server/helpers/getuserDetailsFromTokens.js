// const jwt = require('jsonwebtoken')
// const UserModel = require('../config/models/UserModel')

// const getUserdetailsFromTokens = async (token)=>{

//     if(!token){
//         return {
//             message :"session out",
//             logout : true
//         }
//     }

//     const decode = await jwt.verify(token,process.env.JWT_SECREAT_KEY)
//     const user = await UserModel.findById(decode.id).select('-password')

//     return user
// }

// module.exports = getUserdetailsFromTokens



const jwt = require('jsonwebtoken');
const UserModel = require('../config/models/UserModel');

const getUserdetailsFromTokens = async (token) => {
    try {
        if (!token) {
            return {
                message: "session out",
                logout: true
            };
        }

        // try/catch REQUIRED because jwt.verify throws errors
        const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);

        const user = await UserModel.findById(decoded.id).select('-password');

        return user;

    } catch (error) {
        console.error("JWT Error:", error.message);

        // Handle expired token or invalid token safely
        return {
            message: "invalid token",
            logout: true
        };
    }
};

module.exports = getUserdetailsFromTokens;
