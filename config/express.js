var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');


module.exports = function(){
	var app = express();

    app.set('view engine', 'jade');
	app.set('views', './app/views');


	app.use(compression());
	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());




	return app;
}