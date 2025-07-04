const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
     userName: { type: String, default: "" },
        email: { type: String, default: "" },
        password: { type: String, default: "" },
        bio: { type: String, default: "" },
        followers: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        avtar: { type: String, default: "" },
        userType: { type: String, default: "" },   //1 - admin      2-people
        status: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("User", userSchema)