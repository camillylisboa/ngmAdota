// Function to submit the form
function enviarFormulario() {
  var declaracaoCheckbox = $('#declaracaoCheckbox').is(':checked');
  var cachorro = $('#inlineCheckbox1').is(':checked');
  var gato = $('#inlineCheckbox2').is(':checked');
  var outro = $('#inlineCheckbox3').is(':checked');
  var primeiroPet = $('#inlineCheckbox4').is(':checked');

  if (!cachorro && !gato && !outro && !primeiroPet) {
      mostrarAlertaErro('Você deve selecionar pelo menos uma opção entre cachorro, gato, outro ou primeiro pet.');
      return; // Impede o envio do formulário
    }

  if (!declaracaoCheckbox) {
    mostrarAlertaErro('Você deve marcar a declaração antes de enviar o formulário.');
    return; // Impede o envio do formulário
  }

  var animalId = parseInt($('#animalId').val()); 
  var userId = parseInt($('#userId').val());

  // Verificação adicional para garantir que os IDs não sejam nulos ou NaN
  if (isNaN(animalId) || isNaN(userId)) {
    mostrarAlertaErro('Os IDs de Animal e Usuário são inválidos.');
    return;
  }

  var interesseData = {
    temCrianca: $('input[name="flexRadioCrianca"]:checked').val(),
    acordoAdocao: $('input[name="flexRadioAcordo"]:checked').val(),
    presente: $('input[name="flexRadioPresente"]:checked').val(),
    moradia: $('input[name="flexRadioAlugada"]:checked').val(),
    tipoCasa: $('input[name="flexRadioCasa"]:checked').val(),
    moradiaAberta: $('input[name="flexRadioAberta"]:checked').val(),
    temTelas: $('input[name="flexRadioDefault"]:checked').val(),
    cachorro: cachorro,
    gato: gato,
    outro: outro,
    primeiroPet: primeiroPet,
    declaracaoCheckbox: declaracaoCheckbox,
    animalId: animalId,
    usuarioId: userId
  };

  console.log("Dados enviados: ", interesseData);

  $.ajax({
    url: 'http://localhost:8080/interesse/cadastro',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(interesseData),
    dataType: 'json',
    success: function(data) {
      console.log('Formulário enviado com sucesso', data);
      mostrarAlertaSucesso();
      $('#numeroProtocolo').text(data.id);
      $('#modalFormularioInteresse').modal('show');
    },
    error: function(jqXHR, textStatus, errorThrown) { // Registre os detalhes do erro para depuração
      mostrarAlertaErro(); // Passe a mensagem de erro para a função de alerta
    }
  });
}

// Função para desmarcar o 'Primeiro pet'
function desmarcarPrimeiroPet() {
  if ($(this).is(':checked')) {
    $('#inlineCheckbox4').prop('checked', false);
  }
}

// Adiciona os event listeners
var checkboxes = ['#inlineCheckbox1', '#inlineCheckbox2', '#inlineCheckbox3'];
$.each(checkboxes, function(index, checkbox) {
  $(checkbox).change(desmarcarPrimeiroPet);
});

$('#inlineCheckbox4').change(function() {
  if ($(this).is(':checked')) {
    $.each(checkboxes, function(index, checkbox) {
      $(checkbox).prop('checked', false);
    });
  }
});

function mostrarAlertaSucesso() {
  $('#alertaSucesso').removeClass('d-none');
  setTimeout(function() {
    $('#alertaSucesso').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}

function mostrarAlertaErro(message) {
  $('#alertaErro').text(message).removeClass('d-none');
  setTimeout(function() {
    $('#alertaErro').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}

$(document).ready(function() {
  var animalId = localStorage.getItem('animalId');
  var animalNome = localStorage.getItem('animalNome');
  var userId = localStorage.getItem('userId');

  if (animalId) {
    console.log("Animal ID: ", animalId);
    $('#animalId').val(animalId); // Supondo que você tenha um campo oculto para o ID do animal
  }
  if (animalNome) {
    $('#animalNome').val(animalNome);
  }
  if (userId) {
    console.log("Usuario ID: ", userId);
    $('#userId').val(userId);
  }
});

$('#modalFormularioInteresse').on('hidden.bs.modal', function () {
  window.location.href = 'index.html'; // Substitua 'index.html' pela URL da sua página de índice
});