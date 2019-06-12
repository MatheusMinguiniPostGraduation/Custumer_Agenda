var mysql = require('mysql');

module.exports = function connection(){

    //AMBIENTE DESENVOLVIMENTO
    var connection = mysql.createConnection({
            host : '127.0.0.1',
            user : 'root',
            password : 'pos',
            database : 'clientes'
    });

    return connection;
}