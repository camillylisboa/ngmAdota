$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
});



function populateSelectRaca() {
    const select = document.getElementById("racaSelect");

    fetch('http://localhost:8080/raca/get') // Use a URL completa se necessário
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.idEspecie;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectEspecie() {
    const select = document.getElementById("especieSelect")

    fetch('http://localhost:8080/especie/get') // Use a URL completa se necessário
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        })

}

function populateSelectPelagem() {
    const select = document.getElementById("pelagemSelect")

    fetch('http://localhost:8080/pelagem/get') // URL do java
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error)
        })
}

function populateSelectPorte() {
    const select = document.getElementById("porteSelect")

    fetch('http://localhost:8080/porte/get') // URL do java
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos: ", data);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error)
        })
}

function enviarFormulario() {
    var token = window.localStorage.getItem('token');
    var nome = $('#nome').val();
    var peso = parseFloat($('#peso').val());
    var identificador = $('#identificador').val();
    var dataNascimento = $('#dataNascimento').val();
    var sexo = $('#sexo').val();
    var idRaca = parseInt($('#racaSelect').val());
    var idEspecie = parseInt($('#especieSelect').val());
    var idPelagem = parseInt($('#pelagemSelect').val());
    var idPorte = parseInt($('#porteSelect').val());
    var imagem = "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg";
    var descricao = $('#descricao').val();

    var interesseData = {
        nome: nome,
        peso: peso,
        // identificador: identificador,
        dataNascimento: dataNascimento,
        sexo: sexo,
        idRaca: idRaca,
        idEspecie: idEspecie,
        idPelagem: idPelagem,
        idPorte: idPorte,
        imagem: imagem,
        descricao: descricao
    };

    console.log("Dados enviados: ", interesseData);

    $.ajax({
        url: 'http://localhost:8080/animal/',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Adiciona o token no cabeçalho da requisição
        },
        contentType: 'application/json',
        data: JSON.stringify(interesseData),
        dataType: 'json',
        success: function(data) {
          console.log('Formulário enviado com sucesso', data);
          mostrarAlertaSucesso();
        },
        error: function(jqXHR, textStatus, errorThrown) { // Registre os detalhes do erro para depuração
          mostrarAlertaErro(); // Passe a mensagem de erro para a função de alerta
        }
      });
}

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function() {
      $('#alertaSucesso').addClass('d-none');
    }, 3000); // Alert will disappear after 3 seconds
  }
  
  function mostrarAlertaErro(message) {
    $('#alertaErro').text(message).removeClass('d-none');
    setTimeout(function() {
      $('#alertaErro').addClass('d-none');
    }, 3000); // Alert will disappear after 3 seconds
  }