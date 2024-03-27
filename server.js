/*Server för kurshemsidan */

const express = require("express"); 
const bodyParser = require("body-parser"); 
const sqlite3 = require("sqlite3").verbose(); //för fler felmeddelanden 

//Anslutning till CV DB 
const db = new sqlite3.Database("./db/cv.db"); 

const app = express(); 
const port = 3000; 

app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true})); 

//Routing 
app.get("/", (req, res) => {
    res.render("index"); 
}) 

//startar servern 
app.listen(port, () =>{
    console.log("Started on port: " + port); 
}) 