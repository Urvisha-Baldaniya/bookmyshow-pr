const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../model/model.auth");
const authRoutes = express.Router();

authRoutes.get("/sign", (req, res)=>{
    res.render("signup");
})

authRoutes.get("/loginPage", (req, res)=>{
    res.render("login");
})

authRoutes.post("/register", async (req, res)=>{
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({msg:"All fields are required..!"})
        }

        const hashedPass = await bcrypt.hash(password, 5);
    
        const newUser = new auth({username, email, password:hashedPass});
        await newUser.save();
        console.log(newUser);
        res.status(200).json({msg : "user added Successfully..!", newUser});
    }catch(error){
        res.status(400).json({msg : "Data not Found", error:error.message});
    }
})

authRoutes.post("/login", async (req, res)=>{
    try{
      const {password, email} = req.body;

      if(!password || !email){
        return res.status(400).json({msg:"password and email are required..!"})
      }

      const checkUser = await auth.findOne({email});
      if(!checkUser){
        return res.status(400).jaon({msg : "user not found..!"});
      }
      const matchedPass = await bcrypt.compare(password, checkUser.password);
      if(!matchedPass){
        return res.status(400).jaon({msg : "Enter your valid password..!"});
      }
      let token = jwt.sign({"course": "node"}, "node");
      console.log(token, "token");
      res.status(200).json({msg : "Login Successfully..!", token});
     

    }catch(error){
        res.status(400).json({msg : "Data not Found", error:error.message}); 
    }
})

module.exports = authRoutes;