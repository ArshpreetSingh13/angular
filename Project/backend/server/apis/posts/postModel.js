const mongoose =require("mongoose")

const postSchema=mongoose.Schema({
    title:{type:String,default:""},
    description:{type:String,default:""},
    codeSnippet:{type:String,default:""},
    codeImage:{type:String,default:""},
    // createdBy:{type:String,defaul:""},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref:"User"},  //decode id
    likedBy:{type:mongoose.Schema.Types.ObjectId ,ref:"User"},  //array
    // comments:{type:mongoose.Schema.Types.ObjectId ,ref:"User"},  //ref
    // answers:{type:mongoose.Schema.Types.ObjectId ,ref:"answers"},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default: Date.now()}
    
})

module.exports = mongoose.model("Post", postSchema)