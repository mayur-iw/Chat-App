const getUserdetailsFromTokens = require("../helpers/getuserDetailsFromTokens")

async function userDetails(req,res) {
    try {
        const token = req.cookies.token || ""
        const user = await getUserdetailsFromTokens(token)

        return res.status(200).json({
            message:"User details",
            date : user
        })
        
    } catch (error) {

        return res.status(500).json({
            message : error.message || error,
            error : true
        })
        
    }
    
}


module.exports = userDetails