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
    res.render("index", {
        err: ""
    }); 
}) 

app.post("/", (req, res) => {
    let courseName= req.body.courseName; 
    let courseCode= req.body.courseCode; 
    let syllabus= req.body.syllabus; 
    let progression= req.body.progression; 
    let err = ""; 

    if (courseName != "" && courseCode != "" && syllabus != "" && progression != "" ) {
        //kurser lagras
        const input = db.prepare("INSERT INTO courses(coursename, coursecode, syllabus, progression) VALUES(?, ?, ?, ?);"); 
        input.run(courseName, courseCode, syllabus, progression); 
        input.finalize(); 
        
    } else {
        err = "Vänligen fyll i alla fälten med korrekta kursuppgifter"
    } 

    res.render("index", {
        err:err
    })
})

//startar servern 
app.listen(port, () =>{
    console.log("Started on port: " + port); 
}) 