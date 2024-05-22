// Seleciona o checkbox do 'Primeiro pet'
var primeiroPetCheckbox = document.getElementById('inlineCheckbox4');

// Adiciona um evento 'change' para lidar com a lógica de seleção
primeiroPetCheckbox.addEventListener('change', function() {
  // Se o 'Primeiro pet' for marcado, desmarque todos os outros
  if (primeiroPetCheckbox.checked) {
    document.getElementById('inlineCheckbox1').checked = false;
    document.getElementById('inlineCheckbox2').checked = false;
    document.getElementById('inlineCheckbox3').checked = false;
  }
});

// Adiciona eventos 'change' para os outros checkboxes para desmarcar o 'Primeiro pet'
document.getElementById('inlineCheckbox1').addEventListener('change', desmarcarPrimeiroPet);
document.getElementById('inlineCheckbox2').addEventListener('change', desmarcarPrimeiroPet);
document.getElementById('inlineCheckbox3').addEventListener('change', desmarcarPrimeiroPet);

// Função para desmarcar o 'Primeiro pet'
function desmarcarPrimeiroPet() {
  if (this.checked) {
    primeiroPetCheckbox.checked = false;
  }
}



function enviarFormulario() {
      var temCrianca = $('input[name="flexRadioCrianca"]:checked').val();
      var acordoAdocao = $('input[name="flexRadioAcordo"]:checked').val();
      var presente = $('input[name="flexRadioPresente"]:checked').val();
      var moradia = $('input[name="flexRadioAlugada"]:checked').val();
      var tipoCasa = $('input[name="flexRadioCasa"]:checked').val();
      var moradiaAberta = $('input[name="flexRadioAberta"]:checked').val();
      var temTelas = $('input[name="flexRadioDefault"]:checked').val();
      var pets = {
        cachorro: $('#inlineCheckbox1').is(':checked'),
        gato: $('#inlineCheckbox2').is(':checked'),
        outro: $('#inlineCheckbox3').is(':checked'),
        primeiroPet: $('#inlineCheckbox4').is(':checked')
      };
  
      // Aqui você pode adicionar a lógica para enviar os dados
      console.log(temCrianca, acordoAdocao, presente, moradia, tipoCasa, moradiaAberta, temTelas, pets);
  
      // Exemplo de envio de dados com AJAX
      $.ajax({
        url: 'URL_DO_SERVIDOR_AQUI', // Substitua com a URL do seu servidor
        type: 'post',
        data: {
          temCrianca: temCrianca,
          acordoAdocao: acordoAdocao,
          presente: presente,
          moradia: moradia,
          tipoCasa: tipoCasa,
          moradiaAberta: moradiaAberta,
          temTelas: temTelas,
          pets: pets
        },
        success: function(response){
          // Aqui você pode lidar com a resposta do servidor
          console.log(response);
        }
      });
}