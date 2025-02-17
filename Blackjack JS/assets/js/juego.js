// Patrón módulo

(() => {
  "use strict";

  /**
   * 2C = Two of Clubs (Tréboles)
   * 2D = Two od Diamonds (Diamantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */

  // Vamos a crear el array completo de cartas mediante una función

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0,
  //     puntosComputadora = 0;
  let puntosJugadores = [];

  // Referencias del HTML

  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugador = document.querySelector("#jugador-cartas"),
    divCartasComputadora = document.querySelector("#computadora-cartas");

  const puntosHTML = document.querySelectorAll("small"); // selecciona todos los small que hay (2), para poder cambiar los puntos

  // Esta función inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = new Array(numJugadores).fill(0); // Reinicia los puntos de cada jugador
    puntosHTML.forEach((puntos) => (puntos.innerText = 0));
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
  };

  // Esta función crea una nueva baraja
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    return _.shuffle(deck); // Baraja las cartas
  };
  // Esta función me permite tomar una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck"; // medida de seguridad
    }
    return deck.pop(); // extrae de la baraja y la devuelve
  };

  // pedirCarta();

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    //  let puntos = 0;

    // console.log({ valor });
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10; // como todas las cartas especiales valen 10 puntos menos el as que vale 11, mediante el operador ternario fijamos el valor de A y del resto que es 10
    // } else {
    //     puntos = valor * 1; // para transformar string en número
    // }
    // // se toma el primer valor del string y si es un número, lo multiplica por 1 para retorna número

    // console.log(puntos);

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; // código anterior simplificado. operador ternario dentro de otro
  };

  const acumularPuntos = () => {};

  const determinarGanador = () => {
    const [puntosJugador, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosJugador) {
        alert("🤝 Empate!");
      } else if (puntosJugador > 21) {
        alert("😞 Perdiste, la computadora gana.");
      } else if (puntosComputadora > 21) {
        alert("🎉 ¡Ganaste!");
      } else if (puntosComputadora >= puntosJugador) {
        alert("😞 La computadora gana.");
      } else {
        alert("🎉 ¡Ganaste!");
      }
    }, 300);
  };

  // turno del CPU
  const turnoComputadora = (puntosMinimos) => {
    let computadoraIndex = puntosJugadores.length - 1;

    do {
      const carta = pedirCarta();
      puntosJugadores[computadoraIndex] += valorCarta(carta);
      puntosHTML[1].innerText = puntosJugadores[computadoraIndex];

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) break;
    } while (
      puntosJugadores[computadoraIndex] < puntosMinimos &&
      puntosMinimos <= 21
    );

    // Llamar a determinarGanador() después del turno de la computadora
    setTimeout(determinarGanador, 1000);
  };

  // Eventos

  btnPedir.addEventListener("click", () => {
    const jugadorIndex = 0; // Primer jugador
    const carta = pedirCarta();

    puntosJugadores[jugadorIndex] += valorCarta(carta);
    puntosHTML[jugadorIndex].innerText = puntosJugadores[jugadorIndex];

    // Mostrar la carta en la interfaz
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugadores[jugadorIndex] > 21) {
      console.warn("Perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores[jugadorIndex]);

      // Llamar a determinarGanador() después del turno de la computadora
      setTimeout(determinarGanador, 1000);
    } else if (puntosJugadores[jugadorIndex] === 21) {
      console.warn("21, ¡genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores[jugadorIndex]);

      setTimeout(determinarGanador, 1000);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]); // Usa el primer jugador
  });

  btnNuevo.addEventListener("click", () => {
    console.clear(); // limpia la consola para que no se acumule info

    inicializarJuego(); // para que sea un deck barajado

    puntosJugadores = [0, 0]; // Reinicia puntos del jugador (índice 0) y de la computadora (índice 1)
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0; // reestablece la puntuación

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = ""; // limpia la mesa de cartas

    btnPedir.disabled = false;
    btnDetener.disabled = false; // habilita los botones
  });
})();
