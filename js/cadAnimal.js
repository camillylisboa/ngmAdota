document.addEventListener("DOMContentLoaded", function() {
    fetch('/animal/')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('raca');
            selectElement.innerHTML = '<option value="" disabled selected>RACA</option>'; // Limpa e adiciona o placeholder
            data.forEach(option => {
                const optionElement = document.createElement('sisRaca');
                optionElement.value = sisRaca.ID;
                optionElement.textContent = sisRaca.Tipo;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar opções:', error);
            const selectElement = document.getElementById('raca');
            selectElement.innerHTML = '<option value="" disabled selected>Erro ao carregar opções</option>';
        });
});

function getTeste() {
    const selectElement = document.getElementById("raca");
    const selectedValue = selectElement.value;
    document.getElementById("teste").innerText = selectedValue ? 
        "Valor selecionado: " + selectedValue : 
        "Por favor, selecione uma opção.";
}