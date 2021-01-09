const $tiempoJugado=document.querySelector('#tiempo');
//maximo 1 hora de juego, es decir si son 60 minutos, se termina el juego
const $botonDeInicio = document.querySelector('#botonDeInicio');
let intervaloTiempo;


$botonDeInicio.addEventListener('click',()=>{
    if(intervaloTiempo !== undefined){
        pararCronometro(intervaloTiempo);
    }
    iniciarCronometro();
    // poner las tarjetas random
    // mostrar las tarjetas dadas vuelta
});
//para parar setInterval hay que usar el valor retornado por esta, usandolo como mparametro de clearInterval()
function iniciarCronometro(){
    let segundos=0;
    let minutos=0;

    intervaloTiempo = setInterval(function (){
        segundos++;
        if(segundos === 60){
            minutos++;
            segundos=0;
        }
        $tiempoJugado.textContent = `${minutos}:${segundos}`;
    },1000);
}

function pararCronometro(setInterval){
    clearInterval(setInterval);
}

function generarConjuntoConPosicionesAleatorias(){
    const cantidadDePosiciones = 16;
    let conjuntoPosicionesAleatorias = new Set();
    let posicionAleatoria = 0;

    while(conjuntoPosicionesAleatorias.size < 16){
        posicionAleatoria = Math.ceil(Math.random() * (cantidadDePosiciones));
        conjuntoPosicionesAleatorias.add(posicionAleatoria);
    }

    return conjuntoPosicionesAleatorias;
}
