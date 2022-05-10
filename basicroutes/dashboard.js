const express = require('express')
const router = express.Router()
const controller = require('./userController')
const verifyToken = require('../validators/tokenval')


//INSERT YOUR PROGRAMMING LANGUAGE / NATIVE LANGUAGE / COUNTRY
router.post('/profile',controller.createUser)

//GETS ALL USERS FROM DATABASE
router.get('/profile',verifyToken,controller.listUsers)


//GETS A SINGLE USER FROM DATABASE AND DISPLAY DETAILS
router.get('/profile/:id',controller.showUser)

//UPDATES THE USER DETIALS ON ID
router.put('/profile/:id',controller.updateUser)

//DELETES A SINGLES USER FROM DATABASE
router.delete('/profiles/:id',controller.deleteUser)

module.exports=router