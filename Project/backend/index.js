const express=require("express")
const app=express()

const POST=5000

app.get("/",(req,res)=>{
    res.send({
        status:200,
        Message:"hlo"
    })
})

app.listen(POST,(err)=>{
    if(err){

        console.log("DataBase Not Created",err);
    }
    else{
        
        console.log("DataBase Created");
    }

    
})