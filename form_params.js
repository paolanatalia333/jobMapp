// traer modulos http y fs
var http = require("http"),
     fs = require("fs");
//crear servidor
http.createServer(function (req, res) {

     if (req.url.indexOf("favicon.ico") > 0) {
          return;
     };


     //Crear variable para guardar el archivo y una funcion de lo que se hace despues
     fs.readFile("./index.html", function (err, html) {
          var html_string = html.toString();
          //variables es un a arreglo de todas las cosas que encuentra con {}
          var variables = html_string.match(/[^\{\}]+(?=\})/g);
          var arreglo_parametros = [],
               parametros = {};
          // /?nombre=Uriel&data=algo
          if (req.url.indexOf("?") > 0) {
               var url_data = req.url.split("?");
               arreglo_parametros = url_data[1].split("&");
          }
          for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
               var parametro = arreglo_parametros[i];
               //nombre = Uriel
               var param_data = parametro.split("=");
               // [nombre, Uriel]
               parametros[param_data[0]] = param_data[1];
               //{nombre: Uriel}
          }

          for (var i = variables.length - 1; i >= 0; i--) {
               //para el {nombre} se le remplaza por el valor que parametros tiene por key nombre que se saca de variable [i]
               html_string = html_string.replace("{" + variables[i] + "}", parametros[variables[i]]);
          };

          res.writeHead(200, {
               "Content-Type": "text/html"
          });
          res.write(html_string);
          res.end();
     });
}).listen(8080);
