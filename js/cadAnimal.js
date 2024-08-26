$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var email = window.localStorage.getItem('email');
    console.log("Token e Email lidos do localStorage:", token, email); // Verifique se ambos os valores estão presentes

    if (!token || !email) {
        console.error('Token ou Email não encontrados no localStorage.');
        return;
    }

    obterListaAnimais();
    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
    populateSelectOng(); // Passe o token e o email
});

function obterListaAnimais() {
    var ongId = window.localStorage.getItem('ongId');
    $.ajax({
        url: `http://localhost:8080/ong/animal/${ongId}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#lista-animais').empty();

            $.each(data, function (index, animal) {
                var cardHtml =
                    '<div class="animal-card">' +
                    '<img src="' + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                    '<h2>' + animal.nome + '</h2>' +
                    '<button class="btn-edit" data-toggle="modal" data-target="#modalEditAnimal" data-id="' + index + '">Editar animal</button>' +
                    '</div>';
                $('#lista-ong-animais').append(cardHtml);
            });
        }
    })
}

function populateSelectRaca() {
    const select = document.getElementById("racaSelect");

    fetch('http://localhost:8080/raca/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.idEspecie;
                    option.text = item.tipo;
                    select.appendChild(option);
                });
            } else {
                console.error("Esperado um array, mas recebemos:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectEspecie() {
    const select = document.getElementById("especieSelect");

    fetch('http://localhost:8080/especie/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item.tipo;
                    select.appendChild(option);
                });
            } else {
                console.error("Esperado um array, mas recebemos:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectPelagem() {
    const select = document.getElementById("pelagemSelect");

    fetch('http://localhost:8080/pelagem/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item.tipo;
                    select.appendChild(option);
                });
            } else {
                console.error("Esperado um array, mas recebemos:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectPorte() {
    const select = document.getElementById("porteSelect");

    fetch('http://localhost:8080/porte/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item.tipo;
                    select.appendChild(option);
                });
            } else {
                console.error("Esperado um array, mas recebemos:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectOng() {
    const select = document.getElementById("ongSelect");

    fetch(`http://localhost:8080/ong/lista`) 
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.razaosocial;
                select.appendChild(option);
            });
        } else {
            console.error("Esperado um objeto, mas recebemos:", data);
        }
    })
    .catch(error => {
        console.error("Erro ao buscar dados:", error);
    });
}

function enviarFormulario() {
    var token = window.localStorage.getItem('token');
    var nome = $('#nome').val();
    var peso = parseFloat($('#peso').val());
    var ongId = $('#ongSelect').val();
    var dataNascimento = $('#dataNascimento').val();
    var sexo = $('#sexo').val();
    var idRaca = parseInt($('#racaSelect').val());
    var idEspecie = parseInt($('#especieSelect').val());
    var idPelagem = parseInt($('#pelagemSelect').val());
    var idPorte = parseInt($('#porteSelect').val());
    var imagem = "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg";
    var descricao = $('#descricao').val();

    if (!nome || !peso || !dataNascimento || !sexo || !idRaca || !idEspecie || !idPelagem || !idPorte || !imagem || !descricao) {
        mostrarAlertaErro('Você deve preencher todas as informações solicitadas no formulário.');
        return;
    }

    var interesseData = {
        nome: nome,
        peso: peso,
         ongId: ongId,
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

    console.log(token);

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
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Erro ao enviar formulário:', jqXHR, textStatus, errorThrown);
          mostrarAlertaErro('Erro ao enviar formulário. Tente novamente.');
        }
    });
}

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function() {
      $('#alertaSucesso').addClass('d-none');
    }, 3000); 
}

function mostrarAlertaErro(message) {
    $('#alertaErro').text(message).removeClass('d-none');
    setTimeout(function() {
      $('#alertaErro').addClass('d-none');
    }, 3000);
}