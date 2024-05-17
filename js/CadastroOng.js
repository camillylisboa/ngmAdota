function enviarOng() {
    var ongData = {
        razaosocial: $('#razaosocial').val(),
        email: $('#email').val(),
        cnpj: $('#cnpj').val(),
        telefone: $('#telefone').val(),
        cep: $('#cep').val(),
        estado: $('#estado').val(),
        cidade: $('#cidade').val(),
        bairro: $('#bairro').val(),
        logradouro: $('#logradouro').val(),
        numero: $('#numero').val(),
        complemento: $('#complemento').val()
    };
    console.log('Dados a serem enviados:', ongData);
    $.ajax({
        url: 'http://localhost:8080/ong/cadastro',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ongData),
        dataType: 'json',
        success: function () {
            console.log('Blog enviado com sucesso');
            limparCampos();
            mostrarAlertaSucesso();
        },
        error: function (xhr, status, error) {
            console.error('Erro ao enviar blog:', xhr.responseText);
            mostrarAlertaErro();
        }
    });
}

function limparCampos() {
    $('#razaosocial, #email, #cnpj, #telefone, #cep, #estado, #cidade, #bairro, #logradouro, #numero, #complemento').val('');
}

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function() {
        $('#alertaSucesso').addClass('d-none');
    }, 3000); // O alerta desaparecerá após 3 segundos
}

function mostrarAlertaErro() {
    $('#alertaErro').removeClass('d-none');
    setTimeout(function() {
        $('#alertaErro').addClass('d-none');
    }, 3000); // O alerta desaparecerá após 3 segundos
}
