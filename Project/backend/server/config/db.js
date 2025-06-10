const mongoose= require("mongoose")

mongoose.connect("mongodb+srv://arshpreetsingh1327:dhillons@cluster0.ce85icl.mongodb.net/final_project").then(()=>{
    console.log("Connect To the Server");
    
})
.catch((err)=>{
    console.log("Internal Server Error");

})