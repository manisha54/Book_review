const jwt = require('jsonwebtoken')


//middleware for user to verify
const  verifyUser = (req,res,next)=>{
    let token = req.headers.authorization
    if(!token) return res.status(401).json({error: 'auth token not present'})
    token = token.split(' ')[1]
    
    jwt.verify(token, process.env.SECRET,(err,payload)=>{
        if(err) return res.status(401).json({error:err.message})
        req.user = payload
        console.log(req.user)
       
    })
    next()
   

}

// middleware for admin to verify

const verifyAdmin = (req,res,next)=>{
    if(req.user.role !=='admin'){
        return res.status(403).json({error: 'you are not admin!'})
    } else if (req.user.role === 'admin'){
        next()

    }

}

module.exports = { verifyUser, verifyAdmin }