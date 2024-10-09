$(document).ready(function () {
    $('.btn.fw-bold').on('click', function () {
        // Captura dos valores dos inputs
        var request = {
            "nome": $('#txt_nome').val(),
            "email": $('#txt_email').val(),
            "dataNascimento" : $('#txt_dataNascimento').val(),
            "telefone" : $('#txt_telefone').val(),
            "senha" : $('#txt_senha').val(),
            "cep" : $('#txt_cep').val(),
            "uf" : $('#txt_uf').val(),
            "cidade" : $('#txt_cidade').val(),
            "bairro" : $('#txt_bairro').val(),
            "logradouro" : $('#txt_logradouro').val(),
            "numero" : $('#txt_numero').val(),
            "complemento" : $('#txt_complemento').val()
        }

        // Envio dos dados via AJAX
        $.ajax({
            url: 'http://89.116.73.130:8080/auth/register', // Altere a URL conforme necessário
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: function (response) {
                mostrarAlertaSucesso()
                console.log('Response:', response);
            },
            error: function (xhr, status, error) {
                mostrarAlertaErro()
                console.error('Erro:', xhr, status, error);
            }
        });
    });
});

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function () {
        $('#alertaSucesso').addClass('d-none');
        window.location.href = 'index.html';
    }, 3000); // O alerta desaparecerá após 3 segundos
}

function mostrarAlertaErro() {
    $('#alertaErro').removeClass('d-none');
    setTimeout(function () {
        $('#alertaErro').addClass('d-none');
    }, 3000); // O alerta desaparecerá após 3 segundos
}
