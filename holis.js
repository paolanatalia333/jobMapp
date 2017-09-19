// traer modulos http y fs
var http = require("http"),
    fs = require ("fs"),
    parser = require("./params_parser.js"),
    render = require("./render_view.js");
var p = parser.parse,
    r = render.render;
//crear servidor
http.createServer(function(req,res){

    if(req.url.indexOf("favicon.ico") > 0 ){ return; };

    //Crear variable para guardar el archivo y una funcion de lo que se hace despues
    fs.readFile("./index.html", function(err,html){
        var html_string = html.toString();
        //separa los parametros que se sacan del usuario por la url
        var parametros = p(req);

        res.writeHead(200,{"Content-Type": "text/html"});
        res.write(r(html_string,parametros));
        res.end();
    });
}).listen(8080);
