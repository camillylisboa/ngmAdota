document.addEventListener("DOMContentLoaded", function() {
    populateSelect();
});

function populateSelect() {
    const select = document.getElementById("racaSelect");

    fetch('http://localhost:8080/raca/get') // Use a URL completa se necessário
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.idEspecie;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        });
}
