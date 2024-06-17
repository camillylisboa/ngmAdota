function enviarFormulario() {
    // Capture os dados do formulário
    const userId = document.getElementById('userId').value;
    const animalId = document.getElementById('animalId').value;
    const temCrianca = document.querySelector('input[name="flexRadioCrianca"]:checked').value;
    const acordoAdocao = document.querySelector('input[name="flexRadioAcordo"]:checked').value;
    const presente = document.querySelector('input[name="flexRadioPresente"]:checked').value;
    const moradia = document.querySelector('input[name="flexRadioAlugada"]:checked').value;
    const tipoCasa = document.querySelector('input[name="flexRadioCasa"]:checked').value;
    const moradiaAberta = document.querySelector('input[name="flexRadioAberta"]:checked').value;
    const temTelas = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    const cachorro = document.getElementById('inlineCheckbox1').checked;
    const gato = document.getElementById('inlineCheckbox2').checked;
    const outro = document.getElementById('inlineCheckbox3').checked;
    const primeiroPet = document.getElementById('inlineCheckbox4').checked;
    const declaracaoCheckbox = document.getElementById('declaracaoCheckbox').checked;

    // Crie o objeto de dados para enviar
    const data = {
        usuarioId: userId,
        animalId: animalId,
        temCrianca: temCrianca,
        acordoAdocao: acordoAdocao,
        presente: presente,
        moradia: moradia,
        tipoCasa: tipoCasa,
        moradiaAberta: moradiaAberta,
        temTelas: temTelas,
        cachorro: cachorro,
        gato: gato,
        outro: outro,
        primeiroPet: primeiroPet,
        declaracaoCheckbox: declaracaoCheckbox
    };

    // Envie os dados via AJAX
    $.ajax({
        url: 'http://localhost:8080/interesse/teste',  // Substitua pelo endpoint correto no seu backend
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            // Exiba a mensagem de sucesso e o número de protocolo
            $('#alertaSucesso').removeClass('d-none');
            $('#numeroProtocolo').text(response.numeroProtocolo);
            $('#modalFormularioInteresse').modal('show');
        },
        error: function() {
            // Exiba a mensagem de erro
            $('#alertaErro').removeClass('d-none');
        }
    });
}