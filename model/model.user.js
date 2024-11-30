const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title:String,
    rating:String,
    cinema:[String],
    length:String,
    format:[String],
    certificate:String,
    date:String,
    language:[String],
    description:String,
    poster_img:String,
    background_img:String


})

const userModel = mongoose.model("shows", userSchema);

module.exports = userModel;