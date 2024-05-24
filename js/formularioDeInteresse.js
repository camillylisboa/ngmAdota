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
  
$('#inlineCheckbox4').change(function() {
  var checkboxes = ['#inlineCheckbox1', '#inlineCheckbox2', '#inlineCheckbox3'];
  if ($(this).is(':checked')) {
    $.each(checkboxes, function(index, checkbox) {
      $(checkbox).prop('checked', false);
    });
  }
});

// Function to submit the form
function enviarFormulario() {
  // Check if at least one pet option is selected
  var cachorro = $('input[name="checkboxCachorro"]').is(':checked');
  var gato = $('input[name="checkboxGato"]').is(':checked');
  var outro = $('input[name="checkboxOutro"]').is(':checked');
  var primeiroPet = $('input[name="checkboxPrimeiroPet"]').is(':checked');

  if (!cachorro && !gato && !outro && !primeiroPet) {
    alert("Por favor, selecione pelo menos uma opção: cachorro, gato, outro ou primeiro pet.");
    return; // Stop form submission
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
    primeiroPet: primeiroPet
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

// Function to show success alert
function mostrarAlertaSucesso() {
  $('#alertaSucesso').removeClass('d-none');
  setTimeout(function() {
    $('#alertaSucesso').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}

// Function to show error alert
function mostrarAlertaErro() {
  $('#alertaErro').removeClass('d-none');
  setTimeout(function() {
    $('#alertaErro').addClass('d-none');
  }, 3000); // Alert will disappear after 3 seconds
}
