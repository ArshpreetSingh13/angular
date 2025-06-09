const mongoose =require("mongoose")

const techSchema=mongoose.Schema({
    name:{type:String,default:""},
    description:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default: Date.now()}
    
})

module.exports = mongoose.model("Technologies", techSchema)