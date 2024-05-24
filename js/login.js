function login() {
    var requestAutenticacao = {
        "email": $("#txt_email").val(),
        "senha": $("#txt_senha").val()
    };

    $.ajax({
        url: "http://localhost:8080/auth/login",
        type: "POST",
        data: JSON.stringify(requestAutenticacao),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var userId = response.id; // Certifique-se de que está obtendo o userId corretamente
            var token = response.token;
            var nome = response.nome;
            var email = response.email;
            var dataNascimento = response.dataNascimento; // Obtendo a data de nascimento
            var telefone = response.telefone;
            var idade = response.idade; // Obtendo a idade
            window.localStorage.setItem('userId', userId); // Salva o userId no localStorage
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('nomeUsuario', nome);
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('dataNascimento', dataNascimento); // Salvando a data de nascimento
            window.localStorage.setItem('telefone', telefone);
            window.localStorage.setItem('idade', idade); // Salvando a idade
            
            mostrarAlertaSucesso();
        },
        error: function (request, message, error) {
            mostrarAlertaErro();
        }
    });
}

function mostrarAlertaSucesso() {
    $('#alertaSucesso').removeClass('d-none');
    setTimeout(function() {
        $('#alertaSucesso').addClass('d-none');
        window.location.href = 'index.html';
    }, 3000); // O alerta desaparecerá após 3 segundos
}

function mostrarAlertaErro() {
    $('#alertaErro').removeClass('d-none');
    setTimeout(function() {
        $('#alertaErro').addClass('d-none');
    }, 3000); // O alerta desaparecerá após 3 segundos
}