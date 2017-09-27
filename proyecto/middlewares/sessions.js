var User = require("../models/user").User;

module.exports = function (req, res, next) {
     if (!req.session.user_id) {
          res.redirect("/login");
     } else {
          //almacena info
          User.findById(req.session.user_id, function (err, user1) {
               if (err) {
                    console.log(err);
                    res.redirect("/login");
               } else {
                    res.locals = {
                         //el primer user es la variable en el que el jade se basa para buscar por el #
                         user: user1
                    };
                    next();
               }
          });

     }
}
