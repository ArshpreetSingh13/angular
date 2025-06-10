const express=require("express")
const app=express()

const POST=5001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db=require("./server/config/db")



const apis=require("./server/routes/apiRoute")
app.use("/api",apis)


app.listen(POST,(err)=>{
    if(err){

        console.log("DataBase Not Created",err);
    }
    else{
        
        console.log("DataBase Created");
    }

    
})