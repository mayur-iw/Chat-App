async function logout(req,res) {
    try {
        const cookieOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }
        
            res.cookie('token','',cookieOption).status(200).json({
                message:"session out",
                succsess : true
            })
        
                
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}


module.exports = logout