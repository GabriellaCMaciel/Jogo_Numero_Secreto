// Gera um número aleatório entre 1 e 100
let numeroAleatorioDecimal = Math.random();
let numeroAleatorioEntre1e100 = Math.floor(numeroAleatorioDecimal * 100) + 1;
let tentativas = 0; // Variável para contar as tentativas

// Carrega os sons
const somVitoria = new Audio("src/sounds/victorySong.wav");
const somErro = new Audio("src/sounds/errorSong.wav");
const somClique = new Audio("src/sounds/clickSong.wav");
const somDigitação = new Audio("src/sounds/clickSong.wav");

// Seleciona o container do jogo
const container = document.querySelector(".container");

// Função para adicionar o efeito de digitação no feedback
function typeText(text, elementId) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.style.width = 'auto'; // Permite que o texto ocupe a largura total
    element.textContent = ''; // Limpa o conteúdo antes de iniciar a digitação
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i); // Adiciona uma letra por vez

            // Toca o som de digitação apenas se o áudio não estiver tocando
            if (somDigitação.paused) {
                somDigitação.play(); // Toca o som de digitação
            }

            i++;
        } else {
            clearInterval(interval); // Para a animação ao terminar
        }
    }, 100); // Ajuste a velocidade da digitação
}

// Função para receber a tentativa do jogador
function tentarAdivinhar() {
    somClique.play(); // Toca som ao clicar no botão
    // Pega o valor digitado no input
    let tentativa = document.getElementById("numeroJogador").value;

    // Verifica se o jogador digitou algo e é um número
    if (tentativa === "") {
        typeText("Por favor, insira um número!", "feedback");
        return;
    }

    tentativa = parseInt(tentativa); // Transforma a tentativa para um número inteiro
    tentativas++; // Conta a tentativa

    // Verifica se a tentativa está correta
    if (tentativa === numeroAleatorioEntre1e100) {
        typeText("Parabéns! Você acertou o número!", "feedback");
        document.getElementById("tentativas").innerHTML = `Número de tentativas: ${tentativas}`;
        // Adiciona a classe que faz a borda brilhar e pulsar
        container.classList.add("ganhou");

        somVitoria.play(); // Toca som de vitória

        mostrarBotaoJogarNovamente();

    } else {
        somErro.play(); // Toca som de erro
        if (tentativa < numeroAleatorioEntre1e100) {
            typeText("O número é maior. Tente novamente.", "feedback");
        } else {
            typeText("O número é menor. Tente novamente.", "feedback");
        }
    }
    // Limpa o input após a tentativa
    document.getElementById("numeroJogador").value = "";
}

// Função para adicionar o evento de pressionamento da tecla "Enter" no input
function adicionarEventoEnter() {
    document.getElementById("numeroJogador").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita o comportamento padrão de envio de formulário
            tentarAdivinhar(); // Chama a função ao pressionar "Enter"
        }
    });
}

// Função para mostrar o botão de jogar novamente
function mostrarBotaoJogarNovamente() {
    document.getElementById("jogarNovamente").style.display = "inline-block"; // Torna o botão visível
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Gera um novo número aleatório
    numeroAleatorioDecimal = Math.random();
    numeroAleatorioEntre1e100 = Math.floor(numeroAleatorioDecimal * 100) + 1;
    tentativas = 0; // Reseta o contador de tentativas

    // Reseta o feedback e o contador de tentativas
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("tentativas").innerHTML = "";

    // Oculta o botão de jogar novamente
    document.getElementById("jogarNovamente").style.display = "none";

    // Limpa o campo de input
    document.getElementById("numeroJogador").value = "";

    // Remove a classe que faz a borda pulsar ao reiniciar o jogo
    container.classList.remove("ganhou");
}

// Chama a função para adicionar o evento assim que a página for carregada
window.onload = function () {
    adicionarEventoEnter(); // Registra o evento de "Enter"
    // Evento de clique no botão "Tentar"
    document.getElementById("tentar").addEventListener("click", function () {
        tentarAdivinhar(); // Chama a função ao clicar no botão
    });
};