var letra1 = document.getElementById('button1');
var letra2 = document.getElementById('button2');
var letra3 = document.getElementById('button3');
var letra4 = document.getElementById('button4');

// var lista_quantidade = [3,4,5,6,7,8];
// function sortear(){
//     var num_sort = Math.floor(Math.random() * lista_quantidade.length);
//     return lista_quantidade[num_sort];
// };

var lista = [letra1, letra2, letra3, letra4];
var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var lista_letra = [];
var contador = 1;

function comecar(){
    var contador_letras_criadas = 0; 
    var criacao = setInterval(
        function criar_quadrado() {

            if(contador_letras_criadas==6){
                clearInterval(criacao);
                document.getElementById('semaforo').style.backgroundColor = 'green';
            };

            // define posição horizontal e letra  
            var position = Math.floor(Math.random() * lista.length);
            var quadrado = document.createElement('div');
            var random = Math.random() * 60;
            var letra_escolha = Math.floor(Math.random() * letras.length);
            quadrado.setAttribute("id", "Div" + contador);
            quadrado.textContent = letras[letra_escolha];
            quadrado.classList.add('letra1');
            quadrado.style = 'left:'+random + 'px; animation: block 10s  linear;';
            lista[position].appendChild(quadrado);
            lista_letra.push(quadrado);

            contador = contador + 1;
            contador_letras_criadas++;

            // continua se letra chegar escondida, caso contrário termina jogo
            $('.letra1').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) {

                if(quadrado.hidden === false){
                    window.open('start.html',"_self");
                }else{
                $(this).remove(); 
                };
            });
        }
    , 850);
};

var pontuacao = 0
var contador_deletar = 1;
var num_teclado = 0;
var jogando = false;
function validar(){
    var x = String.fromCharCode(event.keyCode);
    if(jogando === false){
        // escolha música de fundo + remoção botão + inicia jogo
        var num = [0,1,2,3,4,5,6,7]
        var num_esc = Math.floor(Math.random() * num.length);
        var audio = new Audio('letras/'+num_esc+'.mp3');
        audio.play(); 
        document.getElementById('button5').remove();
        jogando = true;
        comecar();
    }else{
        // tecla correta + cor verde para considerar acerto
        if (x.toUpperCase() === lista_letra[0].textContent && document.getElementById('semaforo').style.backgroundColor === 'green'){
            // busca toque aleatório
            var num = [0,1,2,3,4,5,6]
            var num_esc1 = Math.floor(Math.random() * num.length);
            var audio = new Audio('letras/bell'+num_esc1+'.mp3');
            audio.play();  

            // altera cor semaforo
            if (num_teclado === 0){
                num_teclado = num_teclado + 1;
            }else if(num_teclado == 6){
                num_teclado = 0;
                setTimeout(comecar,600);
                document.getElementById('semaforo').style.backgroundColor = 'rgb(255, 0, 0)';
            }else{
                num_teclado = num_teclado + 1;
            };

            // muda borda a cada tecla
            document.getElementById('tela').style = 'border-color:rgb(13, 255, 255); outline: none; box-shadow: 0px 0px 50px 20px rgb(13, 255, 255);';
            setTimeout(function(){document.getElementById('tela').style = 'border-color:white'}, 100);

            // esconde e remove tecla
            var deletar = document.getElementById('Div' + contador_deletar);
            deletar.hidden = true;
            lista_letra.shift(lista[0]);
            contador_deletar = contador_deletar + 1;

            pontuacao = pontuacao + 10;
            document.getElementById('pontos').textContent = pontuacao;
            
        } else{
            window.open('start.html',"_self");
        };
    };
};

// escolhe musica fundo
function musica(){
    var num = [0,1,2,3,4,5,6,7]
    var num_esc = Math.floor(Math.random() * num.length);
    var audio = new Audio('letras/'+num_esc+'.mp3');
    audio.muted = true;  
    return audio;
}

var maximo = document.getElementById('button5');
function criar_start(){
    var inicia = setTimeout(
    function criar_press() {
        var quadrado = document.createElement('div');
        quadrado.textContent = "press any key";
        quadrado.classList.add('letra2');
        quadrado.style.animation = 'block '+15+'s  linear infinite';
        maximo.appendChild(quadrado);
    }, 900);
};


criar_start();