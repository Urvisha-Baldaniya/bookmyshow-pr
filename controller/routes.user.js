const express = require("express");
const movie = require("../model/model.user");
const multer = require("multer");
const path = require("path");
const movieRoutes = express.Router();

movieRoutes.use("/uploads", express.static(path.join(__dirname, "../uploads")));

movieRoutes.get("/form", (req, res)=>{
    res.render("form");
})



const fileupload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const uploadFields = multer({ storage: fileupload }).fields([
    { name: "poster_img", maxCount: 1 }, // Should match the input name in the form
    { name: "background_img", maxCount: 1 }, // Should match the input name in the form
]);



movieRoutes.post("/addData", uploadFields, async(req, res)=>{
try{
    console.log(req.body);
    console.log(req.files);

    if (!req.files.poster_img || !req.files.background_img) {
        return res.status(400).json({ error: "Both poster_img and background_img fiels are required." });
    }

    const poster_img = req.files.poster_img[0].path;
    const background_img = req.files.background_img[0].path;


    const {title, rating, cinema, length, format, certificate, date, release, description, language} = req.body;
    console.log(req.body);

    if(!title || !rating || !cinema || !format || !certificate || !date || !release || !description || !language){
        return res.status(400).json({ error: "please, All feilds are required." });
    }

    const addMovie = new movie({title, rating, cinema, length, format, certificate, date, release, description,poster_img, background_img, language});
    await addMovie.save();
    console.log(addMovie);

}catch(error){
    res.status(400).json({msg : "data not found", error});
}
})

movieRoutes.get("/about/:id", async(req, res)=>{
    try{
         const movieId = req.params.id;

         const showMovie = await movie.findById(movieId);

         if(!showMovie){
            return res.status(404).send("movie not found");
         }
         console.log(showMovie);
         res.render("about",{showMovie});
    }catch(error){
        res.status(500).json({msg : "Internal server error"});
    }
})

module.exports = movieRoutes;