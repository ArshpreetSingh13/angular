const express=require("express")
const app=express()

const POST=5000

const db=require("./server/config/db")


app.listen(POST,(err)=>{
    if(err){

        console.log("DataBase Not Created",err);
    }
    else{
        
        console.log("DataBase Created");
    }

    
})