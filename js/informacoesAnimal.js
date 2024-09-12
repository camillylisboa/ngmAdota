$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var animalId = window.localStorage.getItem('animalId');
    console.log("Token e ID do Animal lidos do localStorage:", token, animalId);

    if (!token || !animalId) {
        console.error('Token ou ID do Animal não encontrados no localStorage.');
        return;
    }

    $('#lista-interessados').on('change', '.checkbox-interessado', function () {
        $('.checkbox-interessado').not(this).prop('checked', false);
    });

    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
    populateSelectStatusAnimal();

    $.ajax({
        url: `http://localhost:8080/interesse/animal/${animalId}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        success: function (data) {
            $('#lista-interessados').empty();

            if (data.length === 0) {
                $('#lista-interessados').append('<p>Nenhum interessado encontrado.</p>');
                return;
            }

            // Adiciona o cabeçalho da tabela com um checkbox
            var tabela =
                '<table class="table table-striped">' +
                '<thead>' +
                '<tr>' +
                '<th>Selecionar</th>' +  // Nova coluna para checkbox
                '<th>Nome</th>' +
                '<th>Email</th>' +
                '<th>Telefone</th>' +
                '<th>Tem criança</th>' +
                '<th>Tem quintal</th>' +
                '<th>Moradia</th>' +
                '<th>Data Interesse</th>' +
                '<th>Ação</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="interessadosTableBody"></tbody>' +
                '</table>';

            $('#lista-interessados').append(tabela);

            // Preenche a tabela com os dados dos interessados, adicionando checkbox
            $.each(data, function (index, interesse) {
                var dataInteresse = new Date(interesse.created).toLocaleDateString('pt-BR');
                var interessadoRow =
                    '<tr>' +
                    '<td><input type="checkbox" class="checkbox-interessado" data-id="' + interesse.id + '"></td>' + // Adiciona checkbox
                    '<td>' + interesse.usuarioModel.nome + '</td>' +
                    '<td>' + interesse.usuarioModel.email + '</td>' +
                    '<td>' + interesse.usuarioModel.telefone + '</td>' +
                    '<td>' + interesse.temCrianca + '</td>' +
                    '<td>' + interesse.temQuintal + '</td>' +
                    '<td>' + interesse.moradia + '</td>' +
                    '<td>' + dataInteresse + '</td>' +
                    '<td><button class="btn btn-info" data-toggle="modal" data-target="#modalInteressado" data-id="' + index + '">Ver mais</button></td>' +
                    '</tr>';
                $('#interessadosTableBody').append(interessadoRow);
            });

            $('#lista-interessados').on('click', '.btn-info', function () {
                var index = $(this).data('id');
                var interessado = data[index];

                $('#interessadoNome').text('Nome: ' + interessado.usuarioModel.nome);
                $('#interessadoEmail').text('Email: ' + interessado.usuarioModel.email);
                $('#interessadoTelefone').text('Telefone: ' + interessado.usuarioModel.telefone);

                // Preencher os novos campos
                $('#interessadoCrianca').text('Tem Criança: ' + interessado.temCrianca);
                $('#interessadoTodosAcordo').text('Todos de Acordo com Adoção: ' + interessado.acordoAdocao);
                $('#interessadoMoradia').text('Moradia: ' + interessado.moradia);
                $('#interessadoTipoCasa').text('Tipo de Casa: ' + interessado.tipoCasa);
                $('#interessadoTemQuintal').text('Tem Quintal: ' + interessado.temQuintal);
                $('#interessadoTemTelas').text('Tem Telas: ' + interessado.temTelas);
                $('#interessadoAutorizacaoProprietario').text('Autorização do Proprietário: ' + interessado.autorizacaoProprietario);

                // Animais no local
                $('#interessadoCachorro').text('Tem Cachorro: ' + (interessado.cachorro ? 'Sim' : 'Não'));
                $('#interessadoGato').text('Tem Gato: ' + (interessado.gato ? 'Sim' : 'Não'));
                $('#interessadoOutro').text('Tem Outro Animal: ' + (interessado.outro ? 'Sim' : 'Não'));

                $('#interessadoPrimeiroPet').text('Primeiro Pet: ' + (interessado.primeiroPet ? 'Sim' : 'Não'));
                $('#interessadoDeclaracaoCheckbox').text('Declaração Assinada: ' + (interessado.declaracaoCheckbox ? 'Sim' : 'Não'));

                // Preencher a data do interesse
                var dataInteresse = new Date(interessado.created).toLocaleDateString();
                $('#interessadoDataInteresse').text('Data do Interesse: ' + dataInteresse);

                $('#modalInteressado').modal('show');
            });
        }
    });

    $.ajax({
        url: `http://localhost:8080/animal/lista/${animalId}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token // Adiciona o token no cabeçalho da requisição
        },
        success: function (data) {
            // Preencher os detalhes do animal
            $('#imagemAnimal').attr('src', window.location.origin + data.imagem);
            $('#nome2').val(data.nome);
            $('#peso2').val(data.peso);
            $('#dataNascimento2').val(data.dataNascimento);
            $('#sexo2').val(data.sexo);
            $('#racaSelect2').val(data.racaAnimal.id);
            $('#especieSelect2').val(data.especieAnimal.id);
            $('#pelagemSelect2').val(data.pelagemAnimal.id);
            $('#porteSelect2').val(data.porteAnimal.id);
            $('#statusAnimalSelect2').val(data.statusAnimal.id);
            $('#descricao2').val(data.descricao);

            // Opcional: Preencher os detalhes da ONG se necessário
            if (data.ongModel) {
                $('#ongRazaoSocial').text(data.ongModel.razaosocial);
                $('#ongEmail').text(data.ongModel.email);
                $('#ongCnpj').text(data.ongModel.cnpj);
                $('#ongTelefone').text(data.ongModel.telefone);
                $('#ongEndereco').text(data.ongModel.logradouro, data.ongModel.numero, data.ongModel.bairro, data.ongModel.cidade - data.ongModel.estado, data.ongModel.cep);
            }

            // Verifica se o status do animal é "Adotado"
            if (data.statusAnimal.tipo === 'Adotado') {
                // Desativa a tabela de interessados
                $('#lista-interessados').addClass('disabled');
                $('#lista-interessados input[type=checkbox]').prop('disabled', true);
                $('#lista-interessados button').prop('disabled', true);
                console.log('O animal está adotado. A tabela de interessados foi desativada.');
            }
        },
        error: function (error) {
            console.error('Erro ao buscar detalhes do animal:', error);
        }
    });
});

function abrirModalInteressado(index) {
    $('#modalInteressado').modal('show');
}

function populateSelectRaca() {
    const select2 = document.getElementById("racaSelect2");

    fetch('http://localhost:8080/raca/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option2 = document.createElement("option");
                    option2.value = item.id;
                    option2.text = item.tipo;
                    select2.appendChild(option2);
                });
            } else {
                console.error('O formato dos dados da raça está incorreto.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as raças:', error);
        });
}

function populateSelectEspecie() {
    const select2 = document.getElementById("especieSelect2");

    fetch('http://localhost:8080/especie/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option2 = document.createElement("option");
                    option2.value = item.id;
                    option2.text = item.tipo;
                    select2.appendChild(option2);
                });
            } else {
                console.error('O formato dos dados da espécie está incorreto.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as espécies:', error);
        });
}

function populateSelectPelagem() {
    const select2 = document.getElementById("pelagemSelect2");

    fetch('http://localhost:8080/pelagem/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option2 = document.createElement("option");
                    option2.value = item.id;
                    option2.text = item.tipo;
                    select2.appendChild(option2);
                });
            } else {
                console.error('O formato dos dados da pelagem está incorreto.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as pelagens:', error);
        });
}

function populateSelectPorte() {
    const select2 = document.getElementById("porteSelect2");

    fetch('http://localhost:8080/porte/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option2 = document.createElement("option");
                    option2.value = item.id;
                    option2.text = item.tipo;
                    select2.appendChild(option2);
                });
            } else {
                console.error('O formato dos dados do porte está incorreto.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os portes:', error);
        });
}

let statusAdotadoId; // Variável global para armazenar o ID do status "Adotado"

function populateSelectStatusAnimal() {
    const select2 = document.getElementById("statusAnimalSelect2");

    fetch('http://localhost:8080/statusAnimal/get')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const option2 = document.createElement("option");
                    option2.value = item.id;
                    option2.text = item.tipo;
                    select2.appendChild(option2);

                    // Armazenar o ID do status "Adotado" dinamicamente
                    if (item.tipo === 'Adotado') {
                        statusAdotadoId = item.id; // Salva o ID do status "Adotado"
                    }
                });
            } else {
                console.error('O formato dos dados do status animal está incorreto.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os status dos animais:', error);
        });
}

function finalizarAdocao(interesseId) {
    var token = window.localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado no localStorage.');
        return;
    }

    if (interesseId) {
        alert("entrou " + interesseId)
    }

    $.ajax({
        url: `http://localhost:8080/interesse/finalizar/${interesseId}`,
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            console.log('Adoção finalizada com sucesso:', data);
            mostrarAlertaSucesso('Adoção finalizada com sucesso.');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao finalizar adoção:', jqXHR, textStatus, errorThrown);
            mostrarAlertaErro('Erro ao finalizar adoção. Tente novamente.');
        }
    });
}

function atualizarAnimal() {
    var token = window.localStorage.getItem('token');
    var animalId = window.localStorage.getItem('animalId');
    var nome = $('#nome2').val();
    var peso = parseFloat($('#peso2').val());
    var dataNascimento = $('#dataNascimento2').val();
    var sexo = $('#sexo2').val();
    var racaAnimal = parseInt($('#racaSelect2').val());
    var especieAnimal = parseInt($('#especieSelect2').val());
    var pelagemAnimal = parseInt($('#pelagemSelect2').val());
    var porteAnimal = parseInt($('#porteSelect2').val());
    var statusAnimal = parseInt($('#statusAnimalSelect2').val());
    var descricao = $('#descricao2').val();
    var imagem = $('#imagem2')[0].files[0];

    // Verifica se algum interessado foi selecionado
    var interessadoSelecionado = $('.checkbox-interessado:checked').length > 0;

    if (!nome || !peso || !dataNascimento || !sexo || !racaAnimal || !especieAnimal || !pelagemAnimal || !porteAnimal || !imagem || !descricao || !statusAnimal) {
        mostrarAlertaErro('Você deve preencher todas as informações solicitadas no formulário.');
        return;
    }

    // Se um interessado foi selecionado, altera o status do animal para "Adotado" (usando o ID dinâmico)
    if (interessadoSelecionado) {
        statusAnimal = statusAdotadoId; // Usa o ID dinâmico de "Adotado"
    }

    // Cria o objeto FormData e adiciona os campos
    var formData = new FormData();
    formData.append('animal', new Blob([JSON.stringify({
        nome: nome,
        peso: peso,
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

    $.ajax({
        url: `http://localhost:8080/animal/edit/${animalId}`,
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log('Formulário enviado com sucesso', data);
            mostrarAlertaSucesso('finalizado');

            // Se um interessado foi selecionado, finalize a adoção
            if (interessadoSelecionado) {
                var interessadoId = $('.checkbox-interessado:checked').first().data('id');
                finalizarAdocao(interessadoId);
            }
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
