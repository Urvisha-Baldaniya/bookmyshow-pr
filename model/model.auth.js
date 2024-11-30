const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const authModel = mongoose.model("authentication", authSchema);

module.exports = authModel;