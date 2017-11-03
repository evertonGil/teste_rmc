module.exports = function(app){
	var api = app.api.sendEmail;

	app.post('/sendemail', api.enviarEmail);

}