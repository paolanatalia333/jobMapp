var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//se ejecuta express
var app = express();
//conectar con mongo a la base de datos workiidb-fotos
var connection = mongoose.createConnection("mongodb://localhost/workiidb-fotos");

var userSchemaJSON = {
     email:String,
     password:String
};
//crea un esquema con la estructura del json de arriba
var user_schema = new Schema(userSchemaJSON);
// se crea un modelo ( la tabla User) con la estructura del esquema
//var User = mongoose.model("User",user_schema);
var User = connection.model('User', user_schema);
app.use("/public",express.static("public"));
//parser para peticiones json
app.use(bodyParser.json());
//otro parser
app.use(bodyParser.urlencoded({extended: true}));

//se trae jade que es algo que se vuelve en html
app.set("view engine", "jade");

//Verbos HTTP get y  post, put patch options headers delete
//se inicia el servidor
app.get("/", function(req,res){
    res.render("index");
});
app.get("/login", function(req,res){
     User.find(function(err,doc){
          console.log(doc);

     res.render("login");
     });
});
app.post("/users", function(req,res){
     var user= new User({
          email: req.body.email,
          password: req.body.password
     });
     //guarda el usuario y como es asincorno entonces necesita un callback
     user.save(function(err){
           res.send("Se guardaron los datos");
          if(err) return handlerError(err);
               });

});
// se pone a escuchar
app.listen(8080);
