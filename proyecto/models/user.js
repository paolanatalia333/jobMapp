var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//crea un esquema con la estructura del json de arriba
var user_schema = new Schema({
     name: String,
     username: String,
     password: String,
     email: String,
     date_of_birth; Date
});

// Tipos de dato a traves de mongoose: String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
