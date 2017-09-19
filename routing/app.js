var express = require("express");
//se ejecuta express
var app = express();
//se trae jade que es algo que se vuelve en html
app.set("view engine", "jade");

//Verbos HTTP get y  post, put patch options headers delete
//se inicia el servidor
app.get("/", function(req,res){
    res.render("index");
});
app.post("/", function(req,res){
     res.render("form");
});
// se pone a escuchar
app.listen(8080);
