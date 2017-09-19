var express = require("express");
//se ejecuta express
var app = express();
//se trae jade que es algo que se vuelve en html
app.set("view engine", "jade");

//se inicia el servidor
app.get("/", function(req,res){
    res.render("index",{hola:"Paola"});
});
// se pone a escuchar
app.listen(8080);
