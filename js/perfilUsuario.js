$(document).ready(function (){
    var nomeUsuario = window.localStorage.getItem('nomeUsuario');
    var emailUsuario = window.localStorage.getItem('email');
    var idadeUsuario = window.localStorage.getItem('idade');
    var telefoneUsuario = window.localStorage.getItem('telefone');
    
    $('#info-nome-usuario').text(nomeUsuario);
    $('#info-email-usuario').text(emailUsuario);
    $('#info-idade-usuario').text(idadeUsuario);
    $('#info-telefone-usuario').text(telefoneUsuario);
})
