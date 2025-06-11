const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    PostID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    code: { type: String, default: "" },
    output: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("answer", answerSchema)