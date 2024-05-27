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

// Function to submit the form
function enviarFormulario() {
  // Check if at least one pet option is selected
  var cachorro = $('#inlineCheckbox1').is(':checked');
  var gato = $('#inlineCheckbox2').is(':checked');
  var outro = $('#inlineCheckbox3').is(':checked');
  var primeiroPet = $('#inlineCheckbox4').is(':checked');
  var declaracaoCheckbox = $('#declaracaoCheckbox').is(':checked');

  if (!cachorro && !gato && !outro && !primeiroPet) {
    mostrarAlertaErro('Por favor, selecione pelo menos uma opção de pet.');
    return;
  }

  if (!declaracaoCheckbox) {
    mostrarAlertaErro('Por favor, aceite os termos e condições.');
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
    declaracaoCheckbox: declaracaoCheckbox
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
      $('#modalFormularioInteresse').modal('show');
    },
    error: function(xhr, status, error) {
      console.error('Erro ao enviar formulário:', xhr.responseText);
      mostrarAlertaErro('Erro ao enviar formulário.');
    }
  });
}

// Function to show success alert
function mostrarAlertaSucesso() {
  $('#alertaSucesso').removeClass('d-none');
  setTimeout(function() {
    $('#alertaSucesso').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}

// Function to show error alert
function mostrarAlertaErro(message) {
  $('#alertaErro').text(message).removeClass('d-none');
  setTimeout(function() {
    $('#alertaErro').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}
