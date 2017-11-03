const nodemailer = require('nodemailer');
const config = require('../../config/configEmail');
var api = {};

api.enviarEmail = function(req, res){
		let transporter = nodemailer.createTransport({
	        service: 'Gmail',
	        auth: {
	        	type: 'OAuth2',
                user: config.email,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken ,
                accessToken: config.accessToken,
                expires: 3600
	        }
	    });
	    let templateHtml = `
	    <table>
			<tr>
				<td>Email recebido através de formulário</td>
			</tr>
		    <tr>
			    <td class="label"><strong>Nome: </strong></td><td> ${req.body.nome}</td>
			</tr>
			<tr>
			    <td class="label"><strong>Email: </strong></td><td>${req.body.email}</td>
		    </tr>
		    <tr>
			    <td  class="label"><strong>Mensagem: </strong></td><td>${req.body.mensagem}</td>
		    </tr>
		</table>
	    `;

	    let mailOptions = {
	        from: config.from, 
	        to: `${config.to}, ${req.body.email}`, 
	        subject: 'Formulário de contato site: lorem ipsum',
	        text: 'Nome: ${req.body.nome} // Email: ${req.body.email} // Mensagem: ${req.body.mensagem}', 
	        html: templateHtml
	    };

	    transporter.sendMail(mailOptions, (error, info) => {
	        if (error) {
	        	res.sendStatus(400);
	            return console.log(error);
	        }
	        console.log('Mensagem enviada: %s', info.messageId);
	        res.sendStatus(200);
	    });

	}

module.exports = function(){
	return api;
}