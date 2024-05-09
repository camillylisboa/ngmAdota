function enviarComentario() {
    const comentarioTexto = document.getElementById("comentario").value;
    const avaliacao = document.querySelectorAll(".estrela.active").length;

    if (comentarioTexto.trim() !== "" && avaliacao > 0) {
        const comentarioDiv = document.createElement("div");
        comentarioDiv.classList.add("comentario");

        const textoAvaliacao = document.createElement("div"); // Criar um elemento div para conter o texto do comentário e as estrelas de avaliação
        textoAvaliacao.classList.add("texto-avaliacao");

        const texto = document.createElement("p");
        texto.classList.add("texto");
        texto.textContent = comentarioTexto;

        const avaliacaoDiv = document.createElement("div");
        avaliacaoDiv.classList.add("avaliacao");
        for (let i = 0; i < 5; i++) {
            const estrela = document.createElement("span");
            estrela.innerHTML = i < avaliacao ? "&#9733;" : "&#9734;";
            avaliacaoDiv.appendChild(estrela);
        }

        textoAvaliacao.appendChild(texto);
        textoAvaliacao.appendChild(avaliacaoDiv); // Adicionar as estrelas de avaliação ao mesmo elemento

        comentarioDiv.appendChild(textoAvaliacao); // Adicionar o texto do comentário e as estrelas de avaliação ao comentário

        document.getElementById("comentarios").appendChild(comentarioDiv);

        // Limpar o campo de comentário após enviar
        document.getElementById("comentario").value = "";

        // Limpar as estrelas de avaliação após enviar
        document.querySelectorAll(".estrela.active").forEach(function (estrela) {
            estrela.classList.remove("active");
        });
    } else {
        mostrarAlertaErro("Por favor, digite um comentário e faça uma avaliação.");
    }
}

function mostrarAlertaErro(mensagem) {
    const alertaErro = document.getElementById("alertaErro");
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.textContent = mensagem;
    alertaErro.style.display = "block";
}

function fecharAlertaErro() {
    const alertaErro = document.getElementById("alertaErro");
    alertaErro.style.display = "none";
}

// document.addEventListener("DOMContentLoaded", function () {
//     const estrelas = document.querySelectorAll(".estrela");

//     estrelas.forEach(function (estrela, index) {
//         estrela.addEventListener("click", function () {
//             const valor = index + 1;

//             estrelas.forEach(function (outraEstrela, i) {
//                 if (i < valor) {
//                     outraEstrela.classList.add("active");
//                 } else {
//                     outraEstrela.classList.remove("active");
//                 }
//             });
//         });
//     });
// });
const estrelas = document.querySelectorAll('.estrela')

estrelas.forEach(function(estrela){
    estrela.addEventListener('click', function () {
        const valor = parseInt(estrela.getAttribute('data-valor'))
        removerEstrelas()
        for (let i = 0; i < valor; i++) {
             estrelas[i].classList.add('active')
        }
    })
})
function removerEstrelas() {
    estrelas.forEach(function (estrela){
     estrela.classList.remove('active')
    })
}