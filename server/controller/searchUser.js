// const UserModel = require("../config/models/UserModel")



// async function searchUser(req,res) {

//     try {

//         const [search] = req.body;
//         const query = new RegExp(search,"i","g");

//         const user = await UserModel.find({
//             "$or" : [
//                 { name : query },
//                 { email : query }
//             ]
//         })

//         return res.json({
//             message : 'All User',
//             data : user,
//             success : true
//         })
        
//     } catch (error) {
//         return res.status(500).json.message({
//             message : error.message || error,
//             error : true
//         })
        
//     }
    
// }

// module.exports = searchUser;




const UserModel = require("../config/models/UserModel");

async function searchUser(req, res) {
    try {
        // FIX 1: req.body.search se le (object se)
        const search = req.body.search || "";

        if (!search.trim()) {
            return res.status(400).json({
                message: "Search term is required",
                success: false
            });
        }

        // FIX 2: RegExp sahi bana (sirf "i" flag chahiye, "g" nahi)
        const query = new RegExp(search.trim(), "i");

        const users = await UserModel.find({
            $or: [
                { name: query },
                { email: query }
            ]
        }).select("-password"); // password na bheje security ke liye

        return res.json({
            message: "Search results",
            data: users,
            success: true
        });

    } catch (error) {
        console.log("Search error:", error); // ← server console mein dikhega
        return res.status(500).json({     // ← syntax fix
            message: error.message || "Internal server error",
            error: true
        });
    }
}

module.exports = searchUser;