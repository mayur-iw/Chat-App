// const mongoose = require('mongoose')

// async function connectDB() {

//     try {
//         await mongoose.connect(process.env.MONGODB_URI)

//         const connection = mongoose.connection

//         connection.on('connected',()=>{
//             console.log("Database is connected")
//         })

//         connection.on('error',(error)=>{
//             console.log("Something is wroung with your Database ", error)
//         })
//     } catch (error) {
        
//     }
    
// }

// module.exports = connectDB



const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        // Immediate log
        console.log("✅ Database is connected");

        // Future errors
        connection.on('error', (error) => {
            console.log("❌ Something is wrong with your Database:", error);
        });

    } catch (error) {
        console.log("❌ MongoDB connection failed:", error);
    }
}

module.exports = connectDB;
    
