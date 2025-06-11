const userModel=require("../apis/user/userModel")
const bcrypt=require("bcrypt")


const adminreg=async (req,res)=>{
    
    await userModel.findOne({email:"admin@gmail.com"})
    .then((Admin)=>{
        if(Admin==null){
            const newadmin=new userModel()

            newadmin.userName = "admin"
            newadmin.email = "admin@gmail.com"
            newadmin.userType = 1
            newadmin.password = bcrypt.hashSync("123",10)
  
            newadmin.save().then((savedData)=>{     
                console.log("Admin Created");
                
            })
            .catch(()=>{
                console.log("Internal server Error");
                
               
            })
           
            

        }
        else{
            console.log("Admin Already exists");
           
        }
    })
    .catch(()=>{

        console.log("Internal server error")
    })
}


module.exports = { adminreg }