var xhr = new XMLHttpRequest();
var body = {};

document.querySelector('#formulario_email').addEventListener('submit', function(event){
  
  event.preventDefault();
  

  body.nome = event.target[0].value;
  body.email = event.target[1].value;
  body.mensagem = event.target[2].value.replace(/\n/g, "<br />");

  console.log('body', body);

  xhr.open("post", "/sendemail", true);

  xhr.setRequestHeader("content-type", "application/json");
  xhr.onreadystatechange = function(res) {
    console.log(this.status);

    if (this.readyState == 4 & this.status == 200) {
      console.log(this.response);

      event.target[0].value = '';
      event.target[1].value = '';
      event.target[2].value = '';

      alert("Mensagem enviada com sucesso!");

      
    }
  };

  xhr.send(JSON.stringify(body)); 
  
});

