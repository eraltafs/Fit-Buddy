const jwt = require("jsonwebtoken")
require("dotenv").config()



const authentication = (req,res,next)=>{
    const token = req.headers?.authentication?.split(" ")[1]|| req.cookies?.token
    if(token){
        jwt.verify(token, process.env.jwtsec, function(err, decoded) {
            if(decoded){

                req.body._id = decoded?._id
                req.body.email =decoded?.email
                next()
            }
            if(err){
                console.log(err)
                res.status(401).send({msg:"please login again","err":err.message})
            }
          });
    }else{
        res.send({msg:"login again"})
    }
}
module.exports = {authentication}