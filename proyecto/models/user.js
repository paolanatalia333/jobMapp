var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conectar con mongo a la base de datos workiidb-fotos
//var connection = mongoose.createConnection("mongodb://localhost/workiidb-fotos");
mongoose.connect("mongodb://localhost/workiidb-fotos");
var posibles_valores = ["Masculino", "Femenino", "Otro"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingresa un email válido"];
var pass_validation = {
     validator: function (p) {
          return this.password_confirmation == p;
     },
     message: "Las contraseñas no son iguales"

};
//crea un esquema con la estructura del json de arriba
var user_schema = new Schema({
     name: String,
     username: {
          type: String,
          required: true,
          maxlength: [50, "El nombre de usuario es muy grande"],
          minlength: 4
     },
     password: {
          type: String,
          minlength: [8, "Debe tener mínimo 8 caracteres"],
          validate: pass_validation
     },
     age: {
          type: Number,
          min: 18,
          max: 100
     },
     email: {
          type: String,
          required: "El correo es obligatorio",
          match: email_match
     },
     date_of_birth: Date,
     sex: {
          type: String,
          enum: {
               values: posibles_valores,
               message: "Opción no válida"
          }
     }
});

user_schema.virtual("password_confirmation").get(function () {
     return this.p_c;
}).set(function (password) {
     this.p_c = password;
});

// Tipos de dato a traves de mongoose: String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array

//var User = connection.model('User', user_schema);
var User = mongoose.model("User", user_schema);
module.exports.User = User;
