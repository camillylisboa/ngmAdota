$(document).ready(function () {
    var token = window.localStorage.getItem('token');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');

    const email = localStorage.getItem('email');

    if (email) {
        document.getElementById('email').value = email;
    }

    if (token && nomeUsuario) {
        $('#entrar').remove();
        var userIconHtml = '<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalNgmPerfil"><img src="img/avatar.png" style="width: 23px;" class="menu-icon" alt=""></a>';
        $('.navbar-nav').after(userIconHtml);
        $('#info-nome-usuario').text(nomeUsuario);
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

    const email = localStorage.getItem('userEmail');
        
    // Se o e-mail existir no localStorage, preencha o input com ele
    if (email) {
        document.getElementById('email').value = email;
    }

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
    }, 3000);
}

function mostrarAlertaErro() {
    $('#alertaErro').removeClass('d-none');
    setTimeout(function() {
        $('#alertaErro').addClass('d-none');
    }, 3000);
}
