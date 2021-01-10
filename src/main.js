const $tiempoJugado=document.querySelector('#tiempo');
//maximo 1 hora de juego, es decir si son 60 minutos, se termina el juego
const $botonDeInicio = document.querySelector('#botonDeInicio');
const $divsTarjetas = document.querySelectorAll('.tarjeta');
let intervaloTiempo;
insertarImagenesAleatoriasATarjetas();

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

function iniciarJuego(){
    if (intervaloTiempo !== undefined) {
        pararCronometro(intervaloTiempo);
    }
    insertarImagenesAleatoriasATarjetas();
    ponerTarjetasConSignoDeInterrogacion();
    agregarEventoALasTarjetas();
    iniciarCronometro();
}

function pararCronometro(setInterval) {
    clearInterval(setInterval);
}

function insertarImagenesAleatoriasATarjetas(){
    const mapImagenPos = mapearImagenYPosicionesAleatorias();
    for(let numeroDeImagen = 1; numeroDeImagen<=8; numeroDeImagen++){
        mapImagenPos[numeroDeImagen].forEach((posicion)=>{
            const $imgConFruta = $divsTarjetas[posicion].querySelector('.imgFruta');
            $imgConFruta.src = `img/${numeroDeImagen}.jpg`;
        });
    }
}

function mapearImagenYPosicionesAleatorias(){
    const conjuntoDePosicionesAleatorias = generarConjuntoConPosicionesAleatorias();
    let dicImagenPosiciones = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]};
    let numeroDeImagen = 1;
    let indiceDeConjuntoAleatorio=0;

    for (let posicionAleatoria of conjuntoDePosicionesAleatorias){
        dicImagenPosiciones[numeroDeImagen].push(posicionAleatoria);
        indiceDeConjuntoAleatorio++; // son 16 imagenes, necesito cada foto 1-8 con una lista de dos valores
        if(indiceDeConjuntoAleatorio%2 === 0){
            numeroDeImagen++
        }
    }
    return dicImagenPosiciones;
}

function generarConjuntoConPosicionesAleatorias(){
    const cantidadDePosiciones = 16;
    let conjuntoPosicionesAleatorias = new Set();
    let posicionAleatoria = 0;

    while(conjuntoPosicionesAleatorias.size < 16){
        // se necesita que sea floor para no tener que restar -1 en los indices del array de divs
        posicionAleatoria = Math.floor(Math.random() * (cantidadDePosiciones));
        conjuntoPosicionesAleatorias.add(posicionAleatoria);
    }

    return conjuntoPosicionesAleatorias;
}
