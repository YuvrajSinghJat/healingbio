require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require('body-parser');
  
const port = process.env.PORT || 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

const connection = mysql.createConnection({
    host:'nodedatabase.ch4a440e0n0g.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password:'Medicaps2024',
    database: 'nodedb',
});
connection.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected to database");
});

app.listen(port,(req,res)=>{
    console.log(`app is listening on ${port}`);
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});
app.post("/server",(req,res)=>{
    console.log(req.body);
    let name=req.body.name;
    let mail=req.body.mail;
    let thoughts=req.body.thoughts;
    let data=[name,mail,thoughts];

    let q = "INSERT INTO TWO (name,mail,thoughts) VALUES (?,?,?)";
    //let q1 = "SELECT * FROM TWO ";
    connection.query(q,data,(results,fields)=>{
    console.log("form submitted");
    });
    res.redirect("/");
});

app.get("/page1",(req,res)=>{
    res.render("page1.ejs");
});
app.get("/payment",(req,res)=>{
    res.render("payment.ejs");
});
