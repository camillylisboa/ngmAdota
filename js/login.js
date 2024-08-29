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
            var nome = response.nome;
            var email = response.email;
            var telefone = response.telefone;
            var idade = response.idade;
            var dataNascimento = response.dataNascimento;
            var cep = response.cep;
            var uf = response.uf;
            var cidade = response.cidade;
            var bairro = response.bairro;
            var logradouro = response.logradouro;
            var numero = response.numero;
            var complemento = response.complemento;
            var ongId = response.ongId;
            var role = response.role;
            var token = response.token;

            window.localStorage.setItem('userId', userId)
            window.localStorage.setItem('nomeUsuario', nome)
            window.localStorage.setItem('email', email)
            window.localStorage.setItem('telefone', telefone)
            window.localStorage.setItem('idade', idade)
            window.localStorage.setItem('dataNascimento', dataNascimento)
            window.localStorage.setItem('cep', cep)
            window.localStorage.setItem('uf', uf)
            window.localStorage.setItem('cidade', cidade)
            window.localStorage.setItem('bairro', bairro)
            window.localStorage.setItem('logradouro', logradouro)
            window.localStorage.setItem('numero', numero),
            window.localStorage.setItem('complemento', complemento)
            window.localStorage.setItem('ongId', ongId)
            window.localStorage.setItem('role', role)
            window.localStorage.setItem('token', token)

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