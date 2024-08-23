$(document).ready(function () {
    var ongId = window.localStorage.getItem('ongId');
    var token = window.localStorage.getItem('token');
    var email = window.localStorage.getItem('email');
    console.log("Token e Email lidos do localStorage:", token, email); // Verifique se ambos os valores estão presentes

    if (!token || !email) {
        console.error('Token ou Email não encontrados no localStorage.');
        return;
    }

    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
    populateSelectOng(token, email);  // Passe o token e o email
    
    if (!ongId) {
        console.error('ID de usuário/ONG não encontrado no localStorage.');
        return;
    }

        var url = `http://localhost:8080/ong/animal/${ongId}`;

        // Faz a requisição AJAX para buscar os animais
        $.ajax({
            url: url,
            type: 'GET',
            success: function (animais) {
                // Limpa a lista de animais antes de adicionar novos cards
                $('#lista-animais').empty();

                // Itera sobre os animais retornados e cria os cards
                animais.forEach(function (animal, index) {
                    var cardHtml =
                        `<div class="col-md-4">
                        <div class="animal-card">
                            <img src="${animal.imagem}" alt="Imagem de ${animal.nome}">
                            <h2>${animal.nome}</h2>
                            <button class="btn-adocao" data-toggle="modal" data-target="#modalAnimal" 
                                data-imagem="${animal.imagem}" data-nome="${animal.nome}" data-descricao="${animal.descricao}">
                                Editar animal
                            </button>
                        </div>
                    </div>`;

                    // Adiciona o card à lista de animais
                    $('#lista-animais').append(cardHtml);
                });
            },
            error: function (request, message, error) {
                console.error('Erro ao buscar os animais:', request, message, error);
                alert('Erro ao buscar os animais. Por favor, tente novamente.');
            }
        });

    // Exibe o modal com os detalhes do animal ao clicar no botão "Ver mais"
    $('#modalAnimal').on('show.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var imagem = button.data('imagem');
        var nome = button.data('nome');
        var descricao = button.data('descricao');

        $('#modal-animal-imagem').attr('src', imagem);
        $('#modal-animal-nome').text(nome);
        $('#modal-animal-descricao').text(descricao);
    });
});

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

function populateSelectOng(token, email) {
    const select = document.getElementById("ongSelect");

    fetch(`http://localhost:8080/ong/lista/${email}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) { // Se `data` for um objeto, não um array
            const option = document.createElement("option");
            option.value = data.id;
            option.text = data.razaosocial;
            select.appendChild(option);
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
    var OngId = parseInt($('#ongSelect').val());
    var dataNascimento = $('#dataNascimento').val();
    var sexo = $('#sexo').val();
    var idRaca = parseInt($('#racaSelect').val());
    var idEspecie = parseInt($('#especieSelect').val());
    var idPelagem = parseInt($('#pelagemSelect').val());
    var idPorte = parseInt($('#porteSelect').val());
    var imagem = "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg";
    var descricao = $('#descricao').val();

    if (!nome || !peso || !identificador || !dataNascimento || !sexo || !idRaca || !idEspecie || !idPelagem || !idPorte || !imagem || !descricao) {
        mostrarAlertaErro('Você deve preencher todas as informações solicitadas no formulário.');
        return;
    }

    var interesseData = {
        nome: nome,
        peso: peso,
        OngId: OngId,
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
