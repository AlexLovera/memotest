const $tiempoJugado=document.querySelector('#tiempo');
//maximo 1 hora de juego, es decir si son 60 minutos, se termina el juego
const $botonDeInicio = document.querySelector('#botonDeInicio');
const $divsTarjetas = document.querySelectorAll('.tarjeta');
let cantidadDeClicksActuales = 0;
let paresDeTarjetasCompletadas = 0;
let $tarjetaPrevia = null;
let intervaloTiempo;
insertarImagenesAleatoriasATarjetas();

$botonDeInicio.addEventListener('click',()=>{
    cantidadDeClicksActuales = 0;
    paresDeTarjetasCompletadas = 0;
    $tarjetaMostradaPreviamente=null;
    iniciarJuego();
    // poner las tarjetas random
    // mostrar las tarjetas dadas vuelta
});

function agregarEventoALasTarjetas() {
    $divsTarjetas.forEach(($tarjeta) => {
        $tarjeta.addEventListener('click', () => {
            if ($tarjetaPrevia !== $tarjeta) { // compruebo que no sea la misma tarjeta
                cambiarImagenDeTarjetaAFruta($tarjeta);
                if ($tarjetaPrevia === null) {
                    $tarjetaPrevia = $tarjeta;
                    // cambiarImagenDeTarjetaAFruta($tarjetaMostradaPreviamente);
                } else {
                    // se toco la segunda carta, entonces compruebo
                    cantidadDeClicksActuales = 0; // vuelve a 0
                    // cambiarImagenDeTarjetaAFruta($tarjeta);
                    const $imagenPrimerTarjeta = $tarjetaPrevia.querySelector('.imgFruta');
                    const $imagenSegundaTarjeta = $tarjeta.querySelector('.imgFruta');
                    // pasar a una funcion que sea lasTarjetasTienenLasMismasImagenes
                    if ($imagenPrimerTarjeta.src === $imagenSegundaTarjeta.src) { // div tarjeta a oculto
                        setTimeout(() => {
                            $tarjetaPrevia.classList.add('oculto');
                            $tarjeta.classList.add('oculto');
                            $tarjetaPrevia = null;
                        }, 150);
                        if(terminoElJuego()){
                            pararCronometro(intervaloTiempo);
                        }
                    } else { // si no coinciden las tarjetas oculto imagenes y muestro imgInterrogacion
                        setTimeout(() => {
                            cambiarImagenDeTarjetaASignoInterrogacion($tarjeta);
                            cambiarImagenDeTarjetaASignoInterrogacion($tarjetaPrevia);
                            $tarjetaPrevia = null;
                        }, 150);
                    }
                }
            }
        });
    });
}
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
        if(segundos<10){
            $tiempoJugado.textContent = `${minutos}:0${segundos}`;
        } else {
            $tiempoJugado.textContent = `${minutos}:${segundos}`;
        }
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
// CAMBIAR NOMBRE
function ponerTarjetasConSignoDeInterrogacion(){
    console.log('entra');
    $divsTarjetas.forEach(($tarjeta)=>{
        $tarjeta.classList.remove('oculto');
        cambiarImagenDeTarjetaASignoInterrogacion($tarjeta);
    });
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

function cambiarImagenDeTarjetaAFruta($tarjetaRecibida){
    $tarjetaRecibida.querySelector('.imgFruta').classList.remove('oculto');
    $tarjetaRecibida.querySelector('.imgInterrogacion').classList.add('oculto');
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

function cambiarImagenDeTarjetaASignoInterrogacion($tarjetaRecibida){
    $tarjetaRecibida.querySelector('.imgFruta').classList.add('oculto');
    $tarjetaRecibida.querySelector('.imgInterrogacion').classList.remove('oculto');
}
