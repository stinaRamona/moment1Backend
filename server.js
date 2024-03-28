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
    //Läs ut kurser 
    db.all("SELECT * FROM courses;", (err, rows) =>{
        if(err){
            console.log(err.message)
        }
        res.render("index", {
            err: "",
            courses: rows
        });
    })
}) 

//för formulär
app.get("/new", (req, res) => {
    res.render("new", {
        err: ""
    }); 
})

//för om sidan
app.get("/about", (req, res) => {
    res.render("about", {
        err: ""
    }); 
})

//Input från formuläret till databasen 
app.post("/new", (req, res) => {
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

    res.render("new", {
        err:err
    })
}) 



//startar servern 
app.listen(port, () =>{
    console.log("Started on port: " + port); 
}) 