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

    // Não precisa adicionar outro listener de clique aqui, 
    // pois o botão já chama a função formPesquisa via 'onclick' no HTML.
});

function formPesquisa() {
    var token = window.localStorage.getItem('token');
    alert("Passou aqui!");  // Esta linha está apenas para testar se a função é chamada
    const nome = $('#nomeAnimal').val();

    $.ajax({
        url: `http://localhost:8080/animal/lista/nome?nome=${nome}`, // Mantém a URL limpa sem passar parâmetros diretamente
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + token // Adicione o token nos headers
        },
        success: function (data) {
            // Limpa os resultados anteriores
            $('#resultado').empty();
            $('#lista-ong-animais').empty();

            if (data.length > 0) {
                // Exibe cada animal encontrado
                $.each(data, function (index, animal) {
                    var cardHtml =
                        '<div class="animal-card">' +
                        '<img src="' + window.location.origin + '/' + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                        '<h2>' + animal.nome + '</h2>' +
                        '<button class="btn-edit" data-id="' + animal.id + '">Editar animal</button>' +
                        '</div>';
                    $('#lista-ong-animais').append(cardHtml);
                });

                // Adiciona o evento para capturar e salvar os dados do animal ao clicar no botão "Editar"
                $('.btn-edit').on('click', function () {
                    var animalId = $(this).data('id'); // Pega o ID do animal
                    var animal = data.find(a => a.id === animalId); // Encontra o animal correspondente
                    if (animal) {
                        // Armazena os dados do animal no localStorage
                        window.localStorage.setItem('animalId', animal.id);
                        window.localStorage.setItem('animalNome', animal.nome);
                        window.localStorage.setItem('animalPeso', animal.peso);
                        window.localStorage.setItem('animalSexo', animal.sexo);
                        window.localStorage.setItem('animalRaca', animal.racaAnimal.id);
                        window.localStorage.setItem('animalEspecie', animal.especieAnimal.id);
                        window.localStorage.setItem('animalPelagem', animal.pelagemAnimal.id);
                        window.localStorage.setItem('animalPorte', animal.porteAnimal.id);
                        window.localStorage.setItem('animalStatus', animal.statusAnimal.id);
                        window.localStorage.setItem('animalDescricao', animal.descricao);
                        window.localStorage.setItem('animalImagem', animal.imagem);

                        console.log('Dados do animal armazenados no localStorage:', {
                            id: animal.id,
                            nome: animal.nome,
                            peso: animal.peso,
                            sexo: animal.sexo,
                            raca: animal.racaAnimal.id,
                            especie: animal.especieAnimal.id,
                            pelagem: animal.pelagemAnimal.id,
                            porte: animal.porteAnimal.id,
                            status: animal.statusAnimal.id,
                            descricao: animal.descricao,
                            imagem: animal.imagem
                        });

                        // Redireciona para a página informacoesAnimal.html
                        window.location.href = 'informacoesAnimal.html';
                    }
                });
            } else {
                // Se não houver animais, exibe uma mensagem no #resultado
                $('#resultado').append('<p>Nenhum animal encontrado.</p>');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro:', error);
            $('#resultado').empty().append('<p>Ocorreu um erro ao buscar os animais.</p>');
        }
    });
}


function obterListaAnimais() {
    var ongId = window.localStorage.getItem('ongId');
    $.ajax({
        url: `http://localhost:8080/ong/animal/${ongId}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#lista-animais').empty();

            $.each(data, function (index, animal) {
                console.log(data)
                var cardHtml =
                    '<div class="animal-card">' +
                    '<img src="' + window.location.origin + animal.imagem + '" alt="Imagem de ' + animal.nome + '">' +
                    '<h2>' + animal.nome + '</h2>' +
                    '<h5>' + animal.statusAnimal + '</h5>' +  // Acessando o campo correto dentro de statusAnimal
                    '<p>Interessados: ' + (animal.quantidadeInteressados || 0) + '</p>' +  // Garantindo que a quantidade de interessados seja exibida corretamente
                    '<button class="btn-edit" data-id="' + animal.id + '">Editar animal</button>' +
                    '</div>';
                $('#lista-ong-animais').append(cardHtml);
            });

            // Adiciona o evento para capturar e salvar os dados do animal ao clicar no botão "Editar"
            $('.btn-edit').on('click', function () {
                var animalId = $(this).data('id'); // Pega o ID do animal
                var animal = data.find(a => a.id === animalId); // Encontra o animal correspondente
                if (animal) {
                    // Armazena os dados do animal no localStorage
                    window.localStorage.setItem('animalId', animal.id);
                    window.localStorage.setItem('animalNome', animal.nome);
                    window.localStorage.setItem('animalPeso', animal.peso);
                    window.localStorage.setItem('animalSexo', animal.sexo);
                    window.localStorage.setItem('animalRaca', animal.racaAnimal.id);
                    window.localStorage.setItem('animalEspecie', animal.especieAnimal.id);
                    window.localStorage.setItem('animalPelagem', animal.pelagemAnimal.id);
                    window.localStorage.setItem('animalPorte', animal.porteAnimal.id);
                    window.localStorage.setItem('animalStatus', animal.statusAnimal.id);
                    window.localStorage.setItem('animalDescricao', animal.descricao);
                    window.localStorage.setItem('animalImagem', animal.imagem);

                    console.log('Dados do animal armazenados no localStorage:', {
                        id: animal.id,
                        nome: animal.nome,
                        peso: animal.peso,
                        sexo: animal.sexo,
                        raca: animal.racaAnimal.id,
                        especie: animal.especieAnimal.id,
                        pelagem: animal.pelagemAnimal.id,
                        porte: animal.porteAnimal.id,
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
    const select = document.getElementById("racaSelect");

    fetch('http://localhost:8080/raca/get')
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

function populateSelectStatusAnimal() {
    const select = document.getElementById("statusAnimalSelect");

    fetch('http://localhost:8080/statusAnimal/get')
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
    var racaAnimal = parseInt($('#racaSelect').val());
    var especieAnimal = parseInt($('#especieSelect').val());
    var pelagemAnimal = parseInt($('#pelagemSelect').val());
    var porteAnimal = parseInt($('#porteSelect').val());
    var statusAnimal = parseInt($('#statusAnimalSelect').val());
    var descricao = $('#descricao').val();
    var imagem = $('#imagem')[0].files[0];

    // Log dos valores capturados
    console.log({
        nome,
        peso,
        ongId,
        dataNascimento,
        sexo,
        racaAnimal,
        especieAnimal,
        pelagemAnimal,
        porteAnimal,
        statusAnimal,
        descricao,
        imagem
    });

    // Verifica se todos os campos estão preenchidos
    if (!nome || !peso || !dataNascimento || !sexo || !racaAnimal || !especieAnimal || !pelagemAnimal || !porteAnimal || !imagem || !descricao || !statusAnimal) {
        mostrarAlertaErro('Você deve preencher todas as informações solicitadas no formulário.');
        return;
    }

    // Cria o objeto FormData e adiciona os campos
    var formData = new FormData();
    formData.append('animal', new Blob([JSON.stringify({
        nome: nome,
        peso: peso,
        ongId: ongId,
        dataNascimento: dataNascimento,
        sexo: sexo,
        racaAnimal: { id: racaAnimal },
        especieAnimal: { id: especieAnimal },
        pelagemAnimal: { id: pelagemAnimal },
        porteAnimal: { id: porteAnimal },
        statusAnimal: { id: statusAnimal },
        descricao: descricao
    })], { type: "application/json" }));
    formData.append('file', imagem);

    console.log("Dados enviados: ", formData);

    $.ajax({
        url: 'http://localhost:8080/animal/',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token // Adiciona o token no cabeçalho da requisição
        },
        data: formData,
        processData: false, // Não processa o FormData automaticamente
        contentType: false, // Define o tipo de conteúdo como multipart/form-data
        success: function (data) {
            console.log('Formulário enviado com sucesso', data);
            mostrarAlertaSucesso();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao enviar formulário:', jqXHR, textStatus, errorThrown);
            mostrarAlertaErro('Erro ao enviar formulário. Tente novamente.');
        }
    });
}



function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function () {
        $('#alertaSucesso').addClass('d-none');
    }, 3000);
}

function mostrarAlertaErro(message) {
    $('#alertaErro').text(message).removeClass('d-none');
    setTimeout(function () {
        $('#alertaErro').addClass('d-none');
    }, 3000);
}