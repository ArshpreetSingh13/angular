const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({

    
    userId1: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
    userId2: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
    message: { type: String, default: "" },   
    sendBy: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("chat", chatSchema)