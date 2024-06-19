document.addEventListener("DOMContentLoaded", function() {
    populateSelectRaca();
    populateSelectEspecie();
    populateSelectPelagem();
    populateSelectPorte();
});

function populateSelectRaca() {
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

function populateSelectEspecie() {
    const select = document.getElementById("especieSelect")

    fetch('http://localhost:8080/especie/get') // Use a URL completa se necessário
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        })

}

function populateSelectPelagem() {
    const select = document.getElementById("pelagemSelect")

    fetch('http://localhost:8080/pelagem/get') // URL do java
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos: ", data);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error)
        })
}

function populateSelectPorte() {
    const select = document.getElementById("porteSelect")

    fetch('http://localhost:8080/porte/get') // URL do java
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos: ", data);
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.text = item.tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error)
        })
}
