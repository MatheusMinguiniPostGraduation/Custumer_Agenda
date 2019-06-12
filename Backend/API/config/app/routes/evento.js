var dbConnection = require('../infra/dbConnection');
var eventoBanco = require("../infra/eventosBanco")();


module.exports = function rotas(app){

    app.get("/clientes", function(request, response){
        var connection = dbConnection();

        eventoBanco.listar(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });

    app.get("/verificaDuplicidadeNome", function(request, response){
        let nome = request.query.nome;
        let sobrenome = request.query.sobrenome;

        let cliente = {
          nome : nome.trim(),
          sobrenome : sobrenome.trim()
        }

        let connection = dbConnection();

        eventoBanco.existeDuplicidadeNome(connection, cliente, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });


    app.post("/salvar", function(request, response){

      var cliente = request.body;

      var connection = dbConnection();

      eventoBanco.salvar(connection, cliente, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });

    app.post("/remover", function(request, response){

      var cliente = request.body;

      var connection = dbConnection();

      eventoBanco.remover(connection, cliente, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });
}
