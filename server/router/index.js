const express = require('express')
const registerUser = require('../controller/registarUser')
const checkemail = require('../controller/checkemail')
const checkPassword = require('../controller/checkpassword')
const userDetails = require('../controller/userDetail')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')

const router = express.Router()

// Create user API
router.post('/register',registerUser)
// Cheack user email
router.post('/email',checkemail)
// Check user password
router.post('/password',checkPassword)
// login user userDetails
router.get('/user-details',userDetails)
// Logout 
router.get('/logout',logout)
// update user details
router.post('/update-user',updateUserDetails)
// Search User
router.post('/search-user',searchUser)


module.exports = router