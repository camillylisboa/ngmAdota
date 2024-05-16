function login() {
    var requestAutenticacao = {
        "email" : $("#txt_email").val(),
        "senha" : $("#txt_senha").val()
    }

    $.ajax({
        url : "http://localhost:8080/auth/login",
        type : "POST",
        data : JSON.stringify(requestAutenticacao),
        contentType : "application/json",
        dataType : "json",
        success : function (response){
            var token = response.token;
            window.localStorage.setItem('token', token);
            window.location.href = './index.html';
            alert("login feito com sucesso");
        },
        error: function(request, message, error){
            alert("Erro ao se autenticar")
        }
    })
}