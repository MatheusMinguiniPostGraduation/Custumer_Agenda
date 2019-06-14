# Custumer_Agenda

#How to Run Backend
cd [PROJECT_DIRECTORY]/Backend/API
node app.js

#You should see the message of the server running

#How to Run Ionic application
cd [PROJECT_DIRECTORY]/
npm -g install
ionic server --lab

> WARNING: Please, make sure that you've got the mysql service running along with both database and custumer created. In case you dont have the database created, open your SGBD and run the folllowing script:
CREATE DATABASE clientes;

CRATE TABLE cliente(
 	id int(11) AUTO_INCREMENT;
	nome varchar(50)
	email varchar(50)
	img varchar(50)
	data_nascimento date
	sobrenome varchar(50)
	celular varchar(50)
	sexo varchar(50)
	data_cadastro datetime, 

	CONSTRAINT pk_cliente PRIMARY KEY(id)
);
