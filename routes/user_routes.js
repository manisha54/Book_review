const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const  User = require('../models/User')
const { hash } = require('bcryptjs')

router.post('/register',(req, res, next)=>{
    const { username, password, fullname, email } = req.body
    User.find({username: username})
    .then((user) =>{
        if(!user) res.status(400)._construct({'error' : 'duplicate username'})
        bcrypt.hash(password,10,(err, hash)=>{
            if (err) return res.status(500).json({error:err.message})
            User.create({username,password:hash,fullname,email})
            .then((user)=>{
                res.status(201).json(user)
            }).catch(next)
        })
    }).catch(next)
})



module.exports = router
