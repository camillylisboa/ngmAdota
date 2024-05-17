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
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('nomeUsuario', nome);
            window.location.href = './index.html';
            alert("Login feito com sucesso");
        },
        error: function (request, message, error) {
            alert("Erro ao se autenticar");
        }
    });
}
