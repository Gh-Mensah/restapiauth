const Users = require("../models/users");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
const signUpValidation = require("../validators/signupval");
const signInValidation = require("../validators/signinval");

dotenv.config()


const controllers ={
    signin : (req,res)=>{
        const {error}= signInValidation(req.body)

        if (error) return res.status(400).json({error:error.details[0].message})

        Users.findOne({
            email:req.body.email
        }).then(user =>{
            if(!user) res.status(404).json({error : "NO USER MATCHED EMAIL FOUND"})

            else{
                bcrypt.compare( req.body.password, user.password, (error,match) => {
                    if (error) res.status(500).json(error)
                    else if(match) res.status(200).json({data : generateToken(user._id)})
                    else res.status(403).json({error:"Passwords do not match"})
                })
            }
        }).catch(error =>{
            res.status(500).json(error)
        })
       
    },

    signup : (req,res)=>{
        const {error}= signUpValidation(req.body)

        if (error) return res.status(400).json({error:error.details[0].message})

        Users.findOne({email: req.body.email })
        .then(mail =>{
              if (!mail){
                 bcrypt.hash(req.body.password ,10, (err,hash)=>{
                     if(err) res.status(500).json(err)
                      else{
                         Users.create({
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            email:req.body.email,
                            password:hash
                         })
                        .then(user => {res.status(200).json(user)})
                        .catch(error =>{res.status(500).json(error)} )
                    }
                })
            }else{
                res.status(400).json({error:"Email already exists"})
            }
        }).catch(error =>{
            res.status(500).json(error)
        })
    } 
}


generateToken = (user)=>{
    return jwt.sign({ data: user },process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '1800s'});
}


module.exports=controllers;