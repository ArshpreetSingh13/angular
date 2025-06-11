const mongoose = require("mongoose")

const competitionSchma = mongoose.Schema({
    task: { type: String, default: "" },
    userId1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user1OP: { type: String, default: "" },
    user2OP: { type: String, default: "" },
    Winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user1Time: { type: Number, default: "" },
    user2Time: { type: Number, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("competition", competitionSchma)