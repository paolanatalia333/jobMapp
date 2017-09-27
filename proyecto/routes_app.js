var express = require("express");
var Imagen = require("./models/imagenes");

var router = express.Router();
//para acceder a estas rutas toca con /app antes
router.get("/", function (req, res) {
     res.render("app/home")
});

//rest
//put=actualizar, get=traer y mostrarlo, delete= eliminar, post=crear

router.get("/imagenes/new", function (req, res) {
     res.render("app/imagenes/new");

});

router.get("/imagenes/:id/edit", function (req, res) {

});


router.route("/imagenes/:id")
     .get(function (req, res) {
          Imagen.findById(req.params.id, function (err, imagen1) {
               res.render("app/imagenes/show", {
                    imagen: imagen1
               });
          });

     })
     .put(function (req, res) {

     })
     .delete(function (req, res) {

     });

router.route("/imagenes")
     .get(function (req, res) {

     })
     .post(function (req, res) {
          var data = {
               title: req.body.title
          }
          var imagen = new Imagen(data);
          imagen.save(function (err) {
               if (!err) {
                    res.redirect("/app/imagenes/" + imagen._id);
               } else {
                    res.render(err);
               }
          });
     });

module.exports = router;
