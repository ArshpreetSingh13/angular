const jwt=require("jsonwebtoken")
let key="123@123"

module.exports=(req,res,next)=>{

    console.log("token");
    
    let token = req.headers["auth"];
    jwt.verify(token, key, function(err, decoded) {
        
        if(err){
            res.send({
                success:false,
                status:409,
                message:"Error in Auth"
            })
        }
        else{
            req.decoded=decoded
            next()
            
        }
      });
} 