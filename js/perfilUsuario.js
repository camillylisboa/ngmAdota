$(document).ready(function () {
    var userId = window.localStorage.getItem('userId');
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    var emailUsuario = window.localStorage.getItem('email');
    var dataNascimentoUsuario = window.localStorage.getItem('dataNascimento');
    var idadeUsuario = window.localStorage.getItem('idade');
    var telefoneUsuario = window.localStorage.getItem('telefone');

    $('#info-nome-usuario').text(nomeUsuario);
    $('#info-email-usuario').text(emailUsuario);
    $('#info-idade-usuario').text(idadeUsuario);
    $('#info-telefone-usuario').text(telefoneUsuario);

    $('#editar-perfil-btn').on('click', function() {
        $('#modal-nome').val(nomeUsuario);
        $('#modal-email').val(emailUsuario);
        $('#modal-data-nascimento').val(dataNascimentoUsuario);
        $('#modal-telefone').val(telefoneUsuario);
        $('#modal-senha').val(''); // Limpar o campo de senha para a nova entrada
        
        $('#updateProfileModal').modal('show');
    });

    $('#updateProfileForm').on('submit', function (e) {
        e.preventDefault();

        console.log('Submit form initiated');

        var updatedProfileData = {
            "nome": $("#modal-nome").val(),
            "email": $("#modal-email").val(),
            "dataNascimento": $("#modal-data-nascimento").val(),
            "telefone": $("#modal-telefone").val(),
            "senha": $("#modal-senha").val()
        };

        console.log('Updated Profile Data:', updatedProfileData);

        $.ajax({
            url: `http://localhost:8080/auth/editar/${userId}`,
            type: 'PUT',
            data: JSON.stringify(updatedProfileData),
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json',
            success: function(response) {
                console.log('Update Success:', response);
                alert('Perfil atualizado com sucesso!');
                // Atualizar os dados no localStorage
                window.localStorage.setItem('nomeUsuario', response.nome);
                window.localStorage.setItem('email', response.email);
                window.localStorage.setItem('dataNascimento', response.dataNascimento);
                window.localStorage.setItem('telefone', response.telefone);
                window.localStorage.setItem('idade', response.idade); // Atualizar a idade se necessário
                // Atualizar os dados no perfil
                $('#info-nome-usuario').text(response.nome);
                $('#info-email-usuario').text(response.email);
                $('#info-idade-usuario').text(response.idade);
                $('#info-telefone-usuario').text(response.telefone);
                // Fechar o modal
                $('#updateProfileModal').modal('hide');
            },
            error: function(request, message, error) {
                console.error('Erro ao atualizar perfil:', request, message, error);
                alert('Erro ao atualizar perfil. Por favor, tente novamente.');
            }
        });
    });
});
