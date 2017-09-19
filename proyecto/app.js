var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;

//se ejecuta express
var app = express();

app.use("/public", express.static("public"));
//parser para peticiones json
app.use(bodyParser.json());
//otro parser
app.use(bodyParser.urlencoded({
     extended: true
}));

//se trae jade que es algo que se vuelve en html
app.set("view engine", "jade");

//Verbos HTTP get y  post, put patch options headers delete
//se inicia el servidor
app.get("/", function (req, res) {
     res.render("index");
});
app.get("/login", function (req, res) {
     res.render("login");

});
app.post("/users", function (req, res) {
     var user = new User({
          email: req.body.email,
          password: req.body.password
     });
     //guarda el usuario y como es asincorno entonces necesita un callback
     user.save(function (err) {
          res.send("Se guardaron los datos");
          User.find(function (err, doc) {
               console.log(doc);
          });
          if (err) return handlerError(err);
     });

});
// se pone a escuchar
app.listen(8080);
