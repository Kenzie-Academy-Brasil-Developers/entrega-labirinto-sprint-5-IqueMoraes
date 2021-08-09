const botaoInicio1 = document.querySelector("#button1")
const caixaInstrucoes1 = document.querySelectorAll(".pop-up1")
const botaoInicio2 = document.querySelector("#button2")
const caixaInstrucoes2 = document.querySelector("#pop-up2")

botaoInicio1.addEventListener('click', () => {
    for(let i=0; i<caixaInstrucoes1.length; i++){
        caixaInstrucoes1[i].setAttribute('class', "hidden");
    }
    criaLabirinto();

});
botaoInicio2.addEventListener('click', () => {
    caixaInstrucoes2.setAttribute('class', "hidden");
})



let map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

for(let i=0; i<map.length;i++){
    map[i] = map[i].split('')
}

const labirinto = document.querySelector("#areaLabirinto")

function estrutura(x){
    const bloco = document.createElement('div')
    bloco.setAttribute("class", x)
    if(x === "parede"){
        const coresParedes = ["guardasois/amarelo.png", "guardasois/azul.png", "guardasois/colorido.png","guardasois/laranja.png","guardasois/verdeclaro.png","guardasois/vermelho.png" ];
        const rotacaoParede = ["direcao1","direcao2","direcao3","direcao4"];
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        let imagemValor = coresParedes[valorAleatorio(5, 0)];
        let rotacaoValor = rotacaoParede[valorAleatorio(3, 0)];
        img.setAttribute("src", imagemValor)
        img.setAttribute("class", rotacaoValor)
        figure.appendChild(img)
        bloco.appendChild(figure)
    } 
    labirinto.appendChild(bloco)
}
let fimTop = 0
let fimLeft = 0
let jogadorTop = 0
let jogadorLeft = 0
let posicaoLinha = 0;
let posicaoColuna = 0;

function criaJogador(){
    const jogador = document.createElement('div')
                jogador.id = "jogador"
    const figure = document.createElement('figure')
    const img = document.createElement('img')
                img.setAttribute("src", "guardasois/pato.png")
                figure.appendChild(img)
                jogador.appendChild(figure)
                labirinto.appendChild(jogador)
                jogador.setAttribute("style", "position:absolute")
                jogador.style.top = jogadorTop +"px"
}
function criaSeta(linha, coluna){
    const seta = document.createElement('div')
                seta.id = "seta"
    const figure = document.createElement('figure')
    const img = document.createElement('img')
                img.setAttribute("src", "guardasois/seta.png")
                figure.appendChild(img)
                seta.appendChild(figure)
                labirinto.appendChild(seta)
                seta.setAttribute("style", "position:absolute")
                seta.style.top = linha +"px"
                seta.style.left = coluna + "px"
}

function criaFim(){
    const fim = document.createElement('div')
                fim.id = "fim"
    const figure = document.createElement('figure')
    const img = document.createElement('img')
                img.setAttribute("src", "guardasois/cerveja.png")
                figure.appendChild(img)
                fim.appendChild(figure)
                labirinto.appendChild(fim)
                fim.setAttribute("style", "position:absolute")
                fim.style.top = fimTop +"px"
                fim.style.left = fimLeft +"px"
}

function valorAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function criaLabirinto(){
    for(let i=0; i<map.length;i++){
        let linha = map[i]
        for(let j=0; j<linha.length; j++){
            if(linha[j]==="W"){
                estrutura("parede")
            }
            else if(linha[j]==="S"){
                estrutura("espaco")
                jogadorTop = i*35;
                posicaoLinha = i;
                posicaoColuna = j;
                criaJogador();
                criaSeta((posicaoLinha*35),(posicaoColuna*35));
            }
            else if(linha[j] ==="F"){
                estrutura("espaco")
                fimTop = (i-1)*35;
                fimLeft = (j+1)*35;
                criaFim();

            }
            else {
                const parede = document.createElement('div')
                parede.setAttribute("class", "espaco")
                labirinto.appendChild(parede)
            }
        }
    }
}


function vitoria(){
    const main = document.querySelector("main");
    const popUpVitoria = document.createElement("div")
    popUpVitoria.setAttribute("class", "pop-up vitoria")
    const textoVitoria = document.createElement("p")
    textoVitoria.innerText = "EEEEEIITAAA que o Zeca Patinho garantiu mais uma rodada! Obrigado por tornar esse momento inesquecível!";
    const textoVitoria2 =document.createElement("p")
    textoVitoria2.innerText ="Inesquecível para nós, porque acho que o Zeca não garante memória.";
    popUpVitoria.appendChild(textoVitoria)
    popUpVitoria.appendChild(textoVitoria2)
    main.appendChild(popUpVitoria)
}

function mover(keyName){
    if(map[posicaoLinha][posicaoColuna]=== "F"){
        vitoria()
    }

    if(keyName ==="ArrowUp" && map[posicaoLinha-1][posicaoColuna] !== "W"){
        jogador.style.top = jogadorTop - 35+ "px";
        jogadorTop -= 35;
        posicaoLinha -=1;
        }
    if(keyName ==="ArrowDown" && map[posicaoLinha+1][posicaoColuna] !== "W"){
        jogador.style.top = jogadorTop + 35+ "px";
        jogadorTop += 35;
        posicaoLinha +=1;

        }
    if(keyName ==="ArrowLeft" && map[posicaoLinha][posicaoColuna-1] !== "W"){
        jogador.style.left = jogadorLeft - 35+ "px";
        jogadorLeft -= 35;
        posicaoColuna -= 1;
        const imagemjogador = document.querySelector("#jogador > figure > img")
        imagemjogador.setAttribute("class", "esquerda");

        }
    if(keyName ==="ArrowRight" && map[posicaoLinha][posicaoColuna+1] !== "W"){
        jogador.style.left = jogadorLeft + 35+ "px";
        jogadorLeft += 35;
        posicaoColuna += 1;
        const imagemjogador = document.querySelector("#jogador > figure > img")
        imagemjogador.setAttribute("class", "direita");
        }
    
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

  mover(keyName);

});
