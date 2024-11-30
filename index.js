const express = require("express");
const app = express();
const ejs = require("ejs");
const connection = require("./connection/db");
const movieRoute = require("./controller/routes.user");
const movie = require("./model/model.user");
const authRoute = require("./controller/routes.auth");
const path = require("path");

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
app.get("/form", (req, res)=>{
    res.render("form");
})

app.listen(port, async(err)=>{
    await connection;
    err?console.log(err):console.log("server in running at port "+port);
})

