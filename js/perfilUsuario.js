$(document).ready(function () {
    var userId = window.localStorage.getItem('userId')
    var nomeUsuario = window.localStorage.getItem('nomeUsuario')
    var emailUsuario = window.localStorage.getItem('email')
    var telefoneUsuario = window.localStorage.getItem('telefone')
    var idadeUsuario = window.localStorage.getItem('idade')
    var dataNascimentoUsuario = window.localStorage.getItem('dataNascimento')
    var cepUsuario = window.localStorage.getItem('cep')
    var ufUsuario = window.localStorage.getItem('uf')
    var cidadeUsuario = window.localStorage.getItem('cidade')
    var bairroUsuario = window.localStorage.getItem('bairro')
    var logradouroUsuario = window.localStorage.getItem('logradouro')
    var numeroUsuario = window.localStorage.getItem('numero')
    var complementoUsuario = window.localStorage.getItem('complemento')
    var ongId = window.localStorage.getItem('ongId')
    window.localStorage.getItem('role')
    window.localStorage.getItem('token')

    $('#info-nome-usuario').text(nomeUsuario);
    $('#info-email-usuario').text(emailUsuario);
    $('#info-idade-usuario').text(idadeUsuario);
    $('#info-telefone-usuario').text(telefoneUsuario);

    $('#editar-perfil-btn').on('click', function () {
        $('#modal-nome').val(nomeUsuario);
        $('#modal-email').val(emailUsuario);
        $('#modal-data-nascimento').val(dataNascimentoUsuario);
        $('#modal-telefone').val(telefoneUsuario);
        $('#modal-cep').val(cepUsuario)
        $('#modal-uf').val(ufUsuario)
        $('#modal-cidade').val(cidadeUsuario)
        $('#modal-bairro').val(bairroUsuario)
        $('#modal-logradouro').val(logradouroUsuario)
        $('#modal-numero').val(numeroUsuario)
        $('#modal-complemento').val(complementoUsuario)
        $('#modal-senha').val(''); // Limpar o campo de senha para a nova entrada

        $('#updateProfileModal').modal('show');
    });

    $('#updateProfileForm').on('submit', function (e) {
        e.preventDefault();
    
        var updatedProfileData = {
            nome: $('#modal-nome').val(),
            email: $('#modal-email').val(),
            dataNascimento: $('#modal-data-nascimento').val(),
            telefone: $('#modal-telefone').val(),
            senha: $('#modal-senha').val(),
            cep: $('#modal-cep').val(),
            uf: $('#modal-uf').val(),
            cidade: $('#modal-cidade').val(),
            bairro: $('#modal-bairro').val(),
            logradouro: $('#modal-logradouro').val(),
            numero: parseInt($('#modal-numero').val()),
            complemento: $('#modal-complemento').val()
        };
    
        $.ajax({
            url: `http://89.116.73.130:8080/auth/edit/${userId}`,
            type: 'PUT',
            data: JSON.stringify(updatedProfileData),
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json',
            success: function (response) {
                alert('Perfil atualizado com sucesso!');
                
                // Calcular a idade
                var idadeCalculada = calcularIdade(response.dataNascimento);
    
                // Atualizar os dados no localStorage
                window.localStorage.setItem('nomeUsuario', response.nome);
                window.localStorage.setItem('email', response.email);
                window.localStorage.setItem('dataNascimento', response.dataNascimento);
                window.localStorage.setItem('telefone', response.telefone);
                window.localStorage.setItem('idade', idadeCalculada);
                window.localStorage.setItem('cep', response.cep);
                window.localStorage.setItem('uf', response.uf);
                window.localStorage.setItem('cidade', response.cidade);
                window.localStorage.setItem('bairro', response.bairro);
                window.localStorage.setItem('logradouro', response.logradouro);
                window.localStorage.setItem('numero', response.numero);
                window.localStorage.setItem('complemento', response.complemento);
    
                // Atualizar os dados no perfil
                $('#info-nome-usuario').text(response.nome);
                $('#info-email-usuario').text(response.email);
                $('#info-idade-usuario').text(idadeCalculada);
                $('#info-telefone-usuario').text(response.telefone);
    
                // Fechar o modal
                $('#updateProfileModal').modal('hide');
            },
            error: function (request, message, error) {
                console.error('Erro ao atualizar perfil:', request, message, error);
                alert('Erro ao atualizar perfil. Por favor, tente novamente.');
            }
        });
    });
    
});

function calcularIdade(dataNascimento) {
    var hoje = new Date();
    var nascimento = new Date(dataNascimento);
    var idade = hoje.getFullYear() - nascimento.getFullYear();
    var mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}
