const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    PostId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    text: { type: String, default: "" },
    commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("Comments", commentSchema)