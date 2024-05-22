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

// Função para enviar o formulário
function enviarFormulario() {
  var interesseData = {
    temCrianca: $('input[name="flexRadioCrianca"]:checked').val(),
    acordoAdocao: $('input[name="flexRadioAcordo"]:checked').val(),
    presente: $('input[name="flexRadioPresente"]:checked').val(),
    moradia: $('input[name="flexRadioAlugada"]:checked').val(),
    tipoCasa: $('input[name="flexRadioCasa"]:checked').val(),
    moradiaAberta: $('input[name="flexRadioAberta"]:checked').val(),
    temTelas: $('input[name="flexRadioDefault"]:checked').val(),
    pets: {
      cachorro: $('#inlineCheckbox1').is(':checked'),
      gato: $('#inlineCheckbox2').is(':checked'),
      outro: $('#inlineCheckbox3').is(':checked'),
      primeiroPet: $('#inlineCheckbox4').is(':checked')
    }
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
    },
    error: function(xhr, status, error) {
      console.error('Erro ao enviar formulário:', xhr.responseText);
      mostrarAlertaErro();
    }
  });
}

// Função para mostrar alerta de sucesso
function mostrarAlertaSucesso() {
  $('#alertaSucesso').removeClass('d-none');
  setTimeout(function() {
      $('#alertaSucesso').addClass('d-none');
  }, 3000); // O alerta desaparecerá após 3 segundos
}

// Função para mostrar alerta de erro
function mostrarAlertaErro() {
  $('#alertaErro').removeClass('d-none');
  setTimeout(function() {
      $('#alertaErro').addClass('d-none');
  }, 3000); // O alerta desaparecerá após 3 segundos
}