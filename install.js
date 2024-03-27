/*Installations-script för databas*/

const sqlite3 = require("sqlite3").verbose(); //verbose för fler felmeddelanden 

const db = new sqlite3.Database("./db/cv.db"); 

//skapar tabellen för kurser som kommer fyllas på via hemsidan 
db.run(` 
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    coursename TEXT NOT NULL, 
    coursecode TEXT NOT NULL, 
    syllabus TEXT NOT NULL, 
    progression VARCHAR(5) NOT NULL
); 
`) 

//stänger databasen
db.close(); 