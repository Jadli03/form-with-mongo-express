const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register")
dotenv.config();
require("./db/connection");
const bcrypt = require("bcryptjs");

const app = express();
// const sp =  path.join(__dirname,"../public")
 const template_path =  path.join(__dirname,"../templates/views")
 const partial_path =  path.join(__dirname,"../templates/partials")
//middleware
//app.use(express.static(sp));
app.set("view engine", "hbs")
app.set("views", template_path);
hbs.registerPartials(partial_path)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res) => {
    res.render("index");
})

app.get("/register",(req,res) => {
    res.render("register");
})

app.get("/login",(req,res) => {
    res.render("login");
})

app.post("/register", async (req,res) => {
    try{
    	const newUser = new Register({
            fname: req.body.fname,
            email: req.body.email,
            password: req.body.password,
        });

        //hash 
        
    	const result = await newUser.save();
    	res.status(200).render("index");
    }catch(err)
    {
    	res.status(400).send(err);
    }
})

app.post("/login", async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

         const uemail = await Register.findOne({email});
         
         const isMatch = bcrypt.compare(password,uemail.password);
         if(isMatch)
         {
             res.status(201).render("index");
         } else {
             res.send("password not mactching")
         }
         
    }catch(err){
         res.status(400).send("please enter correct email or password");
    }
})


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`listening to ${port}`)
})