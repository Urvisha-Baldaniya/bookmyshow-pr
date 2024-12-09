const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
// const connection = require("./connection/db");
const movieRoute = require("./controller/routes.user");
const movie = require("./model/model.user");
const authRoute = require("./controller/routes.auth");
const path = require("path");

const connectDB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://urvishabaldaniya:urvisha97531@cluster0.2v2ci.mongodb.net/data",
        { useNewUrlParser: true, useUnifiedTopology: true ,serverSelectionTimeoutMS:5000}
      );
      console.log("Mongoose is connected");
    } catch (err) {
      console.error("Connection error:", err);
    }
  };
  
  connectDB();

const port = 44000;

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.set("view engine", "ejs");
app.use(express.json());
app.use("/movieData", movieRoute);
app.use("/auth", authRoute);

app.get('/', async(req, res) => {
    let allMovies = await movie.find();
    console.log(allMovies);
    res.render("home", {
        movies: allMovies
    });
})


app.get("/home", (req, res)=>{
    res.render("home");
})

app.listen(port, (err)=>{
    // await connection;
    err?console.log(err):console.log("server in running at port "+port);
})

