// Este array contiene las posibles opciones del juego: piedra, papel y tijera.
var posibilidades = ["piedra", "papel", "tijera"];

// Seleccionamos los botones de la interfaz y añadimos event listeners para tres acciones:
// 1. Introducir el nombre del usuario.
// 2. Generar una tirada de la máquina.
// 3. Resetear el juego.
document.getElementsByTagName("button")[0].addEventListener("click", introducirNombre, false);
document.getElementsByTagName("button")[1].addEventListener("click", generarTirada, false);
document.getElementsByTagName("button")[2].addEventListener("click", reset, false);

// Seleccionamos las imágenes (representando las opciones del jugador) de la interfaz y les asignamos un ID y una ruta de imagen según la opción correspondiente (piedra, papel o tijera).
// También añadimos un event listener para cuando el usuario selecciona una opción.
var opciones = document.getElementsByTagName("img");
for (var i = 0; i < opciones.length-1; i++) {
	opciones[i].id = posibilidades[i];
	opciones[i].src = crearRutaImagen(posibilidades[i], "Jugador");
	opciones[i].addEventListener("click", seleccionaTiradaJugador, false);
}

// Función para comprobar y guardar el nombre del usuario.
// Si el nombre tiene más de 3 caracteres y no comienza con un número, se guarda.
// También desactivamos los campos de nombre y número de partidas, y se muestra el número de partidas totales.
var nombre = "";

function comprobarNombre(nombreAComprobar) {
	if ((nombreAComprobar.length > 3) && (isNaN(nombreAComprobar[0]))) {
		return true;
	} else {
		return false;
	}
}

// Si el nombre no es válido, se añade la clase CSS "fondoRojo" a nombreIntroducido para resaltar que el nombre es inválido.
function introducirNombre() {
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];
	if (!comprobarNombre(nombreIntroducido.value)) {
		nombreIntroducido.classList.add("fondoRojo");
	} else if (partidas.value <= 0) {
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.add("fondoRojo");
	} else {
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.remove("fondoRojo");
		nombre = nombreIntroducido.value;
		total.innerHTML = partidas.value;
		nombreIntroducido.disabled = true;
		partidas.disabled = true;
	}
}

// Función para generar la tirada de la máquina de forma aleatoria.
// También crea una función para seleccionar la tirada del jugador cuando hace clic en una opción.
var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1];

function valorAleatorio(listaPosibilidades) {
	let aleatorio = Math.floor(Math.random() * listaPosibilidades.length);
	return listaPosibilidades[aleatorio] ;
}

function crearRutaImagen(valor, tipo) {
	return "img/" + valor + tipo + ".png";
}

// Genera la tirada de la máquina y calcula el resultado del juego.
function generarTirada() {
	if (actual.innerHTML < total.innerHTML) {
		tiradaMaquina = valorAleatorio(posibilidades);
		maquina.src = crearRutaImagen(tiradaMaquina, "Ordenador");
		maquina.id = tiradaMaquina;
		actual.innerHTML = Number(actual.innerHTML) + 1;
		calcularResultado(tiradaMaquina);
	}
}

// Cambia la apariencia de la opción seleccionada por el jugador y actualiza el historial de selecciones.
function seleccionaTiradaJugador(e) {
	e.target.classList.add("seleccionado");
	e.target.classList.remove("noSeleccionado");
	for (var j = 0; j < opciones.length-1; j++) {
		if (opciones[j] != e.target) {
			opciones[j].classList.remove("seleccionado");
			opciones[j].classList.add("noSeleccionado");
		}
	}
}

// Calcula el resultado de la partida (si el jugador gana, pierde o hay empate) y muestra el resultado en el historial.
function calcularResultado(tirada) {
	for (var i = 0; i < opciones.length-1; i++) {
		if (opciones[i].classList == "seleccionado") {
			var seleccionado = opciones[i].id;
		}
	}

	if ((posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)-1) || ((posibilidades.indexOf(maquina.id) == posibilidades.length-1) && (posibilidades.indexOf(seleccionado) == 0))) {
		historial.innerHTML += "<li>Gana " + nombre +"</li>\n";
	} else if (posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)) {
		historial.innerHTML += "<li>Empate</li>\n";
	} else {
		historial.innerHTML += "<li>Gana la máquina</li>\n";
	}
}

// Resetea el juego, permitiendo al usuario comenzar una nueva partida.
function reset() {
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];
	nombreIntroducido.disabled = false;
	partidas.disabled = false;
	partidas.value = 0;
	total.innerHTML = "0";
	actual.innerHTML = "0";
	for (var j = 0; j < opciones.length-1; j++) {
		opciones[j].classList.remove("seleccionado");
		opciones[j].classList.remove("noSeleccionado");
	}
	opciones[0].classList.add("seleccionado");
	opciones[opciones.length-1].src = crearRutaImagen("", "defecto");;
	historial.innerHTML += "<li>Nueva partida</li>\n";
}
