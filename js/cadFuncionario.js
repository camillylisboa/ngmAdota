var ongId = window.localStorage.getItem('ongId');
$(document).ready(function () {
    $('.btn-edit').on('click', function () {
        var ongId = window.localStorage.getItem('ongId');

        if (!ongId) {
            alert("Erro: ONG ID não encontrado");
            return;
        }

        // Captura dos valores dos inputs
        var request = {
            "nome": $('#txt_nome').val(),
            "email": $('#txt_email').val(),
            "dataNascimento": $('#txt_dataNascimento').val(),
            "telefone": $('#txt_telefone').val().replace(/\D/g, ''), // Remove caracteres não numéricos
            "senha": $('#txt_senha').val(),
            "role": "ONG", // Altere para "USER" conforme necessário
            "ongId": parseInt(ongId), // Certifique-se de que o ID seja um número
            "cep": $('#txt_cep').val(),
            "uf": $('#txt_uf').val(),
            "cidade": $('#txt_cidade').val(),
            "bairro": $('#txt_bairro').val(),
            "logradouro": $('#txt_logradouro').val(),
            "numero": parseInt($('#txt_numero').val()), // Certifique-se de que o número seja um inteiro
            "complemento": $('#txt_complemento').val()
        };

        // Envio dos dados via AJAX
        $.ajax({
            url: 'http://localhost:8080/auth/register', // Altere a URL conforme necessário
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: function (response) {
                mostrarAlertaSucesso();
                console.log('Response:', response);
            },
            error: function (xhr, status, error) {
                mostrarAlertaErro();
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