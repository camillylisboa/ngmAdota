$(document).ready(function() {

    var nomeAnimal = window.localStorage.getItem('animalNome')
    $('#nomeAnimal').text(nomeAnimal)
    // Função para mostrar/ocultar a pergunta sobre a autorização do proprietário
    function atualizarPerguntaAutorizacao() {
        const moradiaSelecionada = $('input[name="flexRadioAlugada"]:checked').val();
        if (moradiaSelecionada === 'Alugada') {
            $('#perguntaAutorizacao').removeClass('hidden');
        } else {
            $('#perguntaAutorizacao').addClass('hidden');
        }
    }

    // Adiciona evento de mudança aos botões de rádio
    $('input[name="flexRadioAlugada"]').change(atualizarPerguntaAutorizacao);

    // Inicializa o estado da pergunta sobre autorização
    atualizarPerguntaAutorizacao();

    // Adiciona a função para enviar o formulário
    function enviarFormulario() {
        var declaracaoCheckbox = $('#declaracaoCheckbox').is(':checked');
        var cachorro = $('#inlineCheckbox1').is(':checked');
        var gato = $('#inlineCheckbox2').is(':checked');
        var outro = $('#inlineCheckbox3').is(':checked');
        var primeiroPet = $('#inlineCheckbox4').is(':checked');

        if (!cachorro && !gato && !outro && !primeiroPet) {
            mostrarAlertaErro('Você deve selecionar pelo menos uma opção entre cachorro, gato, outro ou primeiro pet.');
            return; // Impede o envio do formulário
        }

        if (!declaracaoCheckbox) {
            mostrarAlertaErro('Você deve marcar a declaração antes de enviar o formulário.');
            return; // Impede o envio do formulário
        }

        var animalId = parseInt($('#animalId').val()); 
        var userId = parseInt($('#userId').val());

        // Verificação adicional para garantir que os IDs não sejam nulos ou NaN
        if (isNaN(animalId) || isNaN(userId)) {
            mostrarAlertaErro('Os IDs de Animal e Usuário são inválidos.');
            return;
        }

        var interesseData = {
            temCrianca: $('input[name="flexRadioCrianca"]:checked').val(),
            acordoAdocao: $('input[name="flexRadioAcordo"]:checked').val(),
            presente: $('input[name="flexRadioPresente"]:checked').val(),
            moradia: $('input[name="flexRadioAlugada"]:checked').val(),
            tipoCasa: $('input[name="tipoMoradia"]:checked').val(),
            moradiaAberta: $('input[name="flexRadioAberta"]:checked').val(),
            temTelas: $('input[name="flexRadioDefault"]:checked').val(),
            cachorro: cachorro,
            gato: gato,
            outro: outro,
            primeiroPet: primeiroPet,
            declaracaoCheckbox: declaracaoCheckbox,
            animalId: animalId,
            usuarioId: userId,
            quintal: $('input[name="quintal"]:checked').val(), // Adiciona a resposta sobre o quintal
            autorizacaoProprietario: $('input[name="autorizacaoProprietario"]:checked').val() // Adiciona a resposta sobre a autorização do proprietário
        };

        console.log("Dados enviados: ", interesseData);

        $.ajax({
            url: 'http://localhost:8080/interesse/cadastro',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(interesseData),
            dataType: 'json',
            success: function(data) {
                console.log('Formulário enviado com sucesso', data);
                mostrarAlertaSucesso();
                $('#numeroProtocolo').text(data.id);
                $('#modalFormularioInteresse').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                mostrarAlertaErro('Erro ao enviar o formulário.'); // Passe a mensagem de erro para a função de alerta
            }
        });
    }

    function mostrarAlertaSucesso() {
        $('#alertaSucesso').removeClass('d-none');
        setTimeout(function() {
            $('#alertaSucesso').addClass('d-none');
        }, 3000); // O alerta desaparecerá após 3 segundos
    }

    function mostrarAlertaErro(message) {
        $('#alertaErro').text(message).removeClass('d-none');
        setTimeout(function() {
            $('#alertaErro').addClass('d-none');
        }, 3000); // O alerta desaparecerá após 3 segundos
    }

    // Adiciona a lógica para mostrar/ocultar a pergunta sobre quintal
    function atualizarPerguntaQuintal() {
        const tipoSelecionado = $('input[name="tipoMoradia"]:checked').val();
        if (tipoSelecionado === 'Casa') {
            $('#perguntaQuintal').removeClass('hidden');
        } else {
            $('#perguntaQuintal').addClass('hidden');
        }
    }

    // Adiciona evento de mudança aos botões de rádio
    $('input[name="tipoMoradia"]').change(atualizarPerguntaQuintal);

    // Inicializa o estado da pergunta sobre quintal
    atualizarPerguntaQuintal();

    $('#modalFormularioInteresse').on('hidden.bs.modal', function () {
        window.location.href = 'index.html'; // Substitua 'index.html' pela URL da sua página de índice
    });
});
 // Função para mostrar/ocultar a pergunta sobre a autorização do proprietário
 function atualizarPerguntaAutorizacao() {
    const tipoMoradiaSelecionado = $('input[name="flexRadioAlugada"]:checked').val();
    if (tipoMoradiaSelecionado === 'Alugada') {
        $('#perguntaAutorizacao').removeClass('hidden');
    } else {
        $('#perguntaAutorizacao').addClass('hidden');
    }
}

// Adiciona evento de mudança aos botões de rádio
$('input[name="flexRadioAlugada"]').change(atualizarPerguntaAutorizacao);

// Inicializa o estado da pergunta sobre autorização
atualizarPerguntaAutorizacao();


    // Adiciona evento para mostrar alerta quando selecionar "Não" na autorização do proprietário
    $('input[name="autorizacaoProprietario"]').change(function() {
        if ($(this).val() === 'Não' && $(this).is(':checked')) {
            alert('É importante que o proprietário autorize.');
        }
    });
 // Adiciona evento de mudança ao checkbox "Nenhum"
 $('#inlineCheckbox4').change(function() {
    if ($(this).is(':checked')) {
        // Limpa os outros checkboxes quando "Nenhum" é selecionado
        $('input[name="checkboxCachorro"]').prop('checked', false);
        $('input[name="checkboxGato"]').prop('checked', false);
        $('input[name="checkboxOutro"]').prop('checked', false);
    }
});

// Adiciona evento de mudança aos outros checkboxes
$('input[name="checkboxCachorro"], input[name="checkboxGato"], input[name="checkboxOutro"]').change(function() {
    if ($('#inlineCheckbox4').is(':checked')) {
        $('#inlineCheckbox4').prop('checked', false);
    }
});
 // Evento de mudança para o checkbox "Sim autorizo"
 $('#declaracaoCheckbox1').change(function() {
    if ($(this).is(':checked')) {
        $('#declaracaoCheckbox2').prop('checked', false); // Desmarca o outro checkbox
    }
});

// Evento de mudança para o checkbox "Não autorizo"
$('#declaracaoCheckbox2').change(function() {
    if ($(this).is(':checked')) {
        $('#declaracaoCheckbox1').prop('checked', false); // Desmarca o outro checkbox
    }
});