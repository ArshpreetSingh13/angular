const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    PostId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    text: { type: String, default: "" },
    commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "people" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("comments", commentSchema)