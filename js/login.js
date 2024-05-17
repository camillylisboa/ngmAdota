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
            var token = response.token;
            var nome = response.nome;
            var email = response.email;
            var idade = response.idade;
            var telefone = response.telefone;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('nomeUsuario', nome);
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('idade', idade);
            window.localStorage.setItem('telefone', telefone);
            window.location.href = './index.html';
            alert("Login feito com sucesso");
        },
        error: function (request, message, error) {
            alert("Erro ao se autenticar");
        }
    });
}

