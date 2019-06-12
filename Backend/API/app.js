var app = require('./config/express')();
var rotas = require('./config/app/routes/evento')(app);

app.listen(8080, function(){
	console.log("Server running");
});
