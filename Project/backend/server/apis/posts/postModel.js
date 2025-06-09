const mongoose =require("mongoose")

const postSchema=mongoose.Schema({
    title:{type:String,default:""},
    description:{type:String,default:""},
    codeSnippet:{type:String,default:""},
    createdBy:{type:mongoose.Schema.Types.ObjectId ,ref:"people"},
    likedBy:{type:mongoose.Schema.Types.ObjectId ,ref:"people"},
    comments:{type:mongoose.Schema.Types.ObjectId ,ref:"people"},
    answers:{type:mongoose.Schema.Types.ObjectId ,ref:"answers"},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default: Date.now()}
    
})

module.exports = mongoose.model("Post", postSchema)