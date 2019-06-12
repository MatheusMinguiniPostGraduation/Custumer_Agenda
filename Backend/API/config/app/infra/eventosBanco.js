const fs = require("fs");

module.exports =  function(){

  this.listar = function(connection, callback){
      connection.query("SELECT * FROM cliente ORDER BY nome LIMIT 30", callback);
  }

  this.salvar = function(connection, objeto, callback){
    let sql = this.montarSQLparaInserir(objeto);
    connection.query(sql, callback);
  }

  this.existeDuplicidadeNome = function(connection, cliente, callback){
    connection.query(`SELECT * FROM cliente WHERE nome LIKE '${cliente.nome}' && sobrenome LIKE '${cliente.sobrenome}' `, callback);
  }

  this.montarSQLparaInserir =  function(objeto){

    const data_atual = new Date();
    let data_banco = data_atual.toISOString().substring(0, 10);
    let sql = `INSERT INTO cliente (nome, sobrenome, celular, email, data_nascimento, sexo, data_cadastro`;

    if(objeto.img != undefined) sql = sql + `, img`;

    sql = sql + `)`;

    sql = sql + ` VALUES
      ('${objeto.nome}', '${objeto.sobrenome}', '${objeto.celular}',
      '${objeto.email}', '${objeto.data_nascimento}', '${objeto.sexo}', '${data_banco}'`;

    if(objeto.img != undefined) sql = sql + `, '${caminho}'`;

    sql = sql + `)`;

    return sql;
  }

  this.remover = function(connection, objeto, callback){

    var string = "DELETE FROM cliente WHERE id = " + objeto.id;

    connection.query(string, callback);
  }

  return this;
}
