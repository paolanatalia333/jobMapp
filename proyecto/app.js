var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/sessions")

//se ejecuta express
var app = express();


app.use("/public", express.static("public"));
//parser para peticiones json
app.use(bodyParser.json());
//otro parser
app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(cookieSession({
     name: "session",
     keys: ["llave-1", "llave-2"]
}));




//se trae jade que es algo que se vuelve en html
app.set("view engine", "jade");

//Verbos HTTP get y  post, put patch options headers delete
//se inicia el servidor
app.get("/", function (req, res) {
     console.log(req.session.user_id);
     res.render("index");
});
app.get("/signup", function (req, res) {
     res.render("signup");
});
app.get("/login", function (req, res) {
     res.render("login");
});
app.post("/users", function (req, res) {
     //instancia del objeto y recibe un JSON
     var user = new User({
          email: req.body.email,
          password: req.body.password,
          password_confirmation: req.body.password_confirmation,
          username: req.body.username
     });
     //guarda el usuario y como es asincorno entonces necesita un callback
     //se cambio el callback por el .then
     user.save().then(function (us) {
          res.send("Guardamos el usuario exitosamente");
     }, function (err) {
          if (err) {
               console.log(String(err));
               res.send("No se pudo guardar la información");
          }
     });

});
app.post("/sessions", function (req, res) {
     //1.query 2.fields 3.callback
     User.findOne({
          email: req.body.email,
          password: req.body.password
     }, function (err, user) {
          req.session.user_id = user._id;
          res.redirect("/app");
     });

});
app.use("/app", session_middleware);

app.use("/app", router_app);
// se pone a escuchar
app.listen(8080);
