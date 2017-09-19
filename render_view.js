function render(html, parametros){
    this.html= html;
    var variables = this.html.match(/[^\{\}]+(?=\})/g);

    for ( var i = variables.length - 1; i >=0; i--) {
          //para el {nombre} se le remplaza por el valor que parametros tiene por key nombre que se saca de variable [i]
         this.html = this.html.replace("{"+variables[i]+"}",parametros[variables[i]]);
     };
return this.html;
}

module.exports.render = render;
