$(document).ready(function () {

    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    if (token && nomeUsuario) {
        // Remover botão de entrar
        $('.btn-custom').remove();
 
        // Adicionar ícone com nome do usuário
        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalNgmPerfil"><img src="img/avatar.png" style="width : 23px;" class="menu-icon" alt=""></a>';
        $('.navbar-nav').after(userIconHtml);
 
        // Preencher o modal de informações do usuário
        $('#info-nome-usuario').text(nomeUsuario);
        $('#info-email-usuario').text(emailUsuario);
        $('#info-idade-usuario').text(idadeUsuario);
        $('#info-telefone-usuario').text(telefoneUsuario);
    }

});

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
        url: 'http://localhost:8080/ong/',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ongData),
        dataType: 'json',
        success: function () {
            console.log('enviado com sucesso');
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
