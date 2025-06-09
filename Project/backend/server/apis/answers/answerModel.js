const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "" },
    code: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("answer", answerSchema)