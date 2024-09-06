$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var email = window.localStorage.getItem('email');
    console.log("Token e Email lidos do localStorage:", token, email);

    if (!token || !email) {
        console.error('Token ou Email não encontrados no localStorage.');
        return;
    }

    obterListaAnimais();
    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
    populateSelectStatusAnimal();
    populateSelectOng();
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
                    '<img src="' + window.location.origin + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                    '<h2>' + animal.nome + '</h2>' +
                    '<button class="btn-edit" data-id="' + animal.id + '">Editar animal</button>' +
                    '</div>';
                $('#lista-ong-animais').append(cardHtml);
            });

            // Adiciona o evento para capturar e salvar os dados do animal ao clicar no botão "Editar"
            $('.btn-edit').on('click', function() {
                var animalId = $(this).data('id'); // Pega o ID do animal
                var animal = data.find(a => a.id === animalId); // Encontra o animal correspondente
                if (animal) {
                    // Armazena os dados do animal no localStorage
                    window.localStorage.setItem('animalId', animal.id);
                    window.localStorage.setItem('animalNome', animal.nome);
                    window.localStorage.setItem('animalPeso', animal.peso);
                    window.localStorage.setItem('animalSexo', animal.sexo);
                    window.localStorage.setItem('animalRaca', animal.idRaca);
                    window.localStorage.setItem('animalEspecie', animal.idEspecie);
                    window.localStorage.setItem('animalPelagem', animal.idPelagem);
                    window.localStorage.setItem('animalPorte', animal.idPorte);
                    window.localStorage.setItem('animalStatus', animal.statusAnimal.id);
                    window.localStorage.setItem('animalDescricao', animal.descricao);
                    window.localStorage.setItem('animalImagem', animal.imagem);

                    console.log('Dados do animal armazenados no localStorage:', {
                        id: animal.id,
                        nome: animal.nome,
                        peso: animal.peso,
                        sexo: animal.sexo,
                        raca: animal.idRaca,
                        especie: animal.idEspecie,
                        pelagem: animal.idPelagem,
                        porte: animal.idPorte,
                        status: animal.statusAnimal.id,
                        descricao: animal.descricao,
                        imagem: animal.imagem
                    });

                    // Redireciona para a página informacoesAnimal.html
                    window.location.href = 'informacoesAnimal.html';
                }
            });
        }
    });
}

function populateSelectRaca() {
    const select1 = document.getElementById("racaSelect");
    const select2 = document.getElementById("racaSelect2");

    fetch('http://localhost:8080/raca/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = item.idEspecie;
                    option1.text = item.tipo;

                    option2.value = item.idEspecie;
                    option2.text = item.tipo;

                    select1.appendChild(option1);
                    select2.appendChild(option2);
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
    const select1 = document.getElementById("especieSelect");
    const select2 = document.getElementById("especieSelect2");

    fetch('http://localhost:8080/especie/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = item.id;
                    option1.text = item.tipo;

                    option2.value = item.id;
                    option2.text = item.tipo;

                    select1.appendChild(option1);
                    select2.appendChild(option2);
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
    const select1 = document.getElementById("pelagemSelect");
    const select2 = document.getElementById("pelagemSelect2");

    fetch('http://localhost:8080/pelagem/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = item.id;
                    option1.text = item.tipo;

                    option2.value = item.id;
                    option2.text = item.tipo;

                    select1.appendChild(option1);
                    select2.appendChild(option2);
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
    const select1 = document.getElementById("porteSelect");
    const select2 = document.getElementById("porteSelect2");

    fetch('http://localhost:8080/porte/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = item.id;
                    option1.text = item.tipo;

                    option2.value = item.id;
                    option2.text = item.tipo;

                    select1.appendChild(option1);
                    select2.appendChild(option2);
                });
            } else {
                console.error("Esperado um array, mas recebemos:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}

function populateSelectStatusAnimal() {
    const select1 = document.getElementById("statusAnimalSelect");
    const select2 = document.getElementById("statusAnimalSelect2");

    fetch('http://localhost:8080/statusAnimal/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");

                    option1.value = item.id;
                    option1.text = item.tipo;

                    option2.value = item.id;
                    option2.text = item.tipo;

                    select1.appendChild(option1);
                    select2.appendChild(option2);
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
    var statusAnimal = parseInt($('#statusAnimalSelect').val());
    var descricao = $('#descricao').val();
    var imagem = $('#imagem')[0].files[0];

    if (!nome || !peso || !ongId || !dataNascimento || !sexo || !idRaca || !idEspecie || !idPelagem || !idPorte || !statusAnimal || !descricao || !imagem) {
        console.log("Preencha todos os campos.");
        return;
    }

    var formData = new FormData();
    formData.append("nome", nome);
    formData.append("peso", peso);
    formData.append("ong", { id: ongId });
    formData.append("dataNascimento", dataNascimento);
    formData.append("sexo", sexo);
    formData.append("raca", { idRaca: idRaca });
    formData.append("especie", { idEspecie: idEspecie });
    formData.append("pelagem", { idPelagem: idPelagem });
    formData.append("porte", { idPorte: idPorte });
    formData.append("statusAnimal", { id: statusAnimal });
    formData.append("descricao", descricao);
    formData.append("imagem", imagem);

    $.ajax({
        url: 'http://localhost:8080/ong/animal',
        method: 'POST',
        data: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        processData: false,
        contentType: false,
        success: function (response) {
            console.log("Animal cadastrado com sucesso:", response);
        },
        error: function (xhr, status, error) {
            console.error("Erro ao cadastrar o animal:", xhr.responseText);
        }
    });
}
