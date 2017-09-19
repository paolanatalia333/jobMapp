var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conectar con mongo a la base de datos workiidb-fotos
//var connection = mongoose.createConnection("mongodb://localhost/workiidb-fotos");
mongoose.connect("mongodb://localhost/workiidb-fotos");

//crea un esquema con la estructura del json de arriba
var user_schema = new Schema({
     name: String,
     username: String,
     password: String,
     email: String,
     date_of_birth: Date
});

// Tipos de dato a traves de mongoose: String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array

//var User = connection.model('User', user_schema);
var User = mongoose.model("User", user_schema);
module.exports.User = User;
