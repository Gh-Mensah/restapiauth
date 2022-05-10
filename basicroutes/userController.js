const Users = require("../models/users")

const controller={
    createUser : (req,res)=>{
        Users.create({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password
        }).then((user)=>{
            res.send(user)
        }).catch()

    },

    listUsers : (req,res,next)=>{
        Users.findOne({_id:req.user},
            {password:0})
            .then((user)=>{
                res.send(user)
        }).catch()
    },

    showUser : (req,res)=>{
        Users.findOne(
            { _id: req.params.id },
            { _id:0,
                password:0
            }).then((user)=>{
                res.send(user)
            }).catch()
    },

    updateUser : (req,res)=>{
        Users.updateOne(
            {_id:req.params.id},
            {$set :{ 
                name:req.body.name,
                age:req.body.age,
                email:req.body.email
            }
             }).then(
            Users.findOne(
                { _id: req.params.id },
                { _id:0,
                    password:0
                })
        ).then((user)=>{
            res.send(user)
        }).catch()

    },

    deleteUser : (req,res)=>{
        Users.findOneAndDelete({
            _id:req.params.id
        }).then((user)=>{
            res.send(user)
        })
    }
}

module.exports=controller