// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()
// const mongoDB = require('./config/connectDB')
// const connectDB = require('./config/connectDB')
// const router = require('./router/index')

// const app = express()


// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     Credential: true
// }))

// app.use(express.json)
// const PORT = process.env.PORT || 8080

// app.get('/',(req,res)=>{
//     res.json({
//         message : "Server is running at " + PORT
//     })
// })

// // api endpoint

// app.use('/api',router)

// connectDB().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("server is running as expected at " + PORT)
//     })
// })



require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const router = require('./router/index')
const cookieParser = require('cookie-parser')

const app = express()

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}))

// IMPORTANT FIX
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.json({
        message: "Server is running at " + PORT
    })
})

// API routes
app.use('/api', router)

// DB connect + Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running as expected at " + PORT)
    })
})
