const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register")
dotenv.config();
require("./db/connection");

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
    	const newUser = new Register(req.body);
    	const result = await newUser.save();
    	res.status(200).render("index");
    }catch(err)
    {
    	res.status(400).send(err);
    }
})



const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`listening to ${port}`)
})