
// ========================================
// VARIABLES
// ========================================

let jugador = "";
let puntos = 0;
let preguntaActual = 0;
let respuestaSeleccionada = false;

let numeroSecreto = Math.floor(Math.random() * 10) + 1;


// ========================================
// PREGUNTAS
// ========================================

const preguntas = [

    {
        pregunta: "¿Qué significa CPU?",
        respuestas: [
            "Unidad Central de Procesamiento",
            "Control Principal de Usuario",
            "Computadora Personal Universal",
            "Centro de Programación"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Cuál de estos es un lenguaje de programación?",
        respuestas: [
            "HTML",
            "JavaScript",
            "Windows",
            "Google"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué dispositivo se utiliza para escribir?",
        respuestas: [
            "Monitor",
            "Mouse",
            "Teclado",
            "Parlante"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Cuánto es 10 + 15?",
        respuestas: [
            "20",
            "25",
            "30",
            "35"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Cuál es el sistema operativo de Microsoft?",
        respuestas: [
            "Windows",
            "Android",
            "Linux",
            "iOS"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué se utiliza para navegar por Internet?",
        respuestas: [
            "Navegador web",
            "Calculadora",
            "Paint",
            "Bloc de notas"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué significa RAM?",
        respuestas: [
            "Red Automática Mundial",
            "Memoria de Acceso Aleatorio",
            "Registro Automático de Memoria",
            "Memoria Avanzada"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Cuál es el planeta conocido como planeta rojo?",
        respuestas: [
            "Venus",
            "Júpiter",
            "Marte",
            "Saturno"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Qué símbolo se utiliza normalmente para crear un comentario en JavaScript?",
        respuestas: [
            "//",
            "##",
            "<!--",
            "**"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Cuál de estos sirve para almacenar archivos?",
        respuestas: [
            "Disco duro",
            "Monitor",
            "Teclado",
            "Micrófono"
        ],
        correcta: 0
    }

];


// ========================================
// COMENZAR
// ========================================

function comenzarJuego() {

    let nombre = document.getElementById("nombreJugador").value.trim();

    if (nombre === "") {

        document.getElementById("mensaje").textContent =
            "⚠️ Primero escribe tu nombre.";

        return;
    }

    jugador = nombre;
    puntos = 0;
    preguntaActual = 0;

    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("quiz").classList.remove("oculto");

    mostrarPregunta();
}


// ========================================
// MOSTRAR PREGUNTA
// ========================================

function mostrarPregunta() {

    respuestaSeleccionada = false;

    let pregunta = preguntas[preguntaActual];

    document.getElementById("pregunta").textContent =
        pregunta.pregunta;

    document.getElementById("numeroPregunta").textContent =
        "Pregunta " + (preguntaActual + 1) + " de " + preguntas.length;

    document.getElementById("puntos").textContent = puntos;

    document.getElementById("progreso").style.width =
        ((preguntaActual + 1) / preguntas.length * 100) + "%";


    let contenedor = document.getElementById("respuestas");

    contenedor.innerHTML = "";


    pregunta.respuestas.forEach(function(respuesta, indice) {

        let boton = document.createElement("button");

        boton.textContent = respuesta;
        boton.className = "respuesta";

        boton.onclick = function() {
            seleccionarRespuesta(indice, boton);
        };

        contenedor.appendChild(boton);

    });
}


// ========================================
// SELECCIONAR RESPUESTA
// ========================================

function seleccionarRespuesta(indice, boton) {

    if (respuestaSeleccionada) {
        return;
    }

    respuestaSeleccionada = true;

    let correcta = preguntas[preguntaActual].correcta;

    if (indice === correcta) {

        puntos += 10;

        boton.classList.add("correcta");

    } else {

        boton.classList.add("incorrecta");

        let botones =
            document.querySelectorAll(".respuesta");

        botones[correcta].classList.add("correcta");
    }

    document.getElementById("puntos").textContent = puntos;
}


// ========================================
// SIGUIENTE PREGUNTA
// ========================================

function siguientePregunta() {

    if (!respuestaSeleccionada) {

        alert("⚠️ Primero selecciona una respuesta.");

        return;
    }

    preguntaActual++;

    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    } else {

        terminarPreguntas();

    }
}


// ========================================
// TERMINAR PREGUNTAS
// ========================================

function terminarPreguntas() {

    document.getElementById("quiz").classList.add("oculto");

    document.getElementById("minijuego").classList.remove("oculto");

    numeroSecreto =
        Math.floor(Math.random() * 10) + 1;
}


// ========================================
// MINI JUEGO
// ========================================

function adivinar() {

    let numero =
        parseInt(document.getElementById("numero").value);

    let resultado =
        document.getElementById("resultadoJuego");


    if (numero < 1 || numero > 10 || isNaN(numero)) {

        resultado.textContent =
            "⚠️ Escribe un número entre 1 y 10.";

        return;
    }


    if (numero === numeroSecreto) {

        puntos += 20;

        resultado.textContent =
            "🎉 ¡Correcto! Ganaste 20 puntos.";

    } else {

        resultado.textContent =
            "❌ No era ese número. El número era " +
            numeroSecreto;
    }


    document.getElementById("minijuego")
        .classList.add("oculto");

    mostrarResultado();
}


// ========================================
// RESULTADO
// ========================================

function mostrarResultado() {

    document.getElementById("resultado")
        .classList.remove("oculto");

    document.getElementById("nombreResultado")
        .textContent = "Jugador: " + jugador;

    document.getElementById("puntuacionFinal")
        .textContent = puntos;


    if (puntos >= 90) {

        document.getElementById("mensajeFinal").textContent =
            "🔥 ¡Excelente! Eres un experto.";

    } else if (puntos >= 60) {

        document.getElementById("mensajeFinal").textContent =
            "😎 ¡Muy bien! Tienes buenos conocimientos.";

    } else {

        document.getElementById("mensajeFinal").textContent =
            "💪 ¡Buen intento! Sigue practicando.";
    }
}


// ========================================
// GUARDAR JUGADOR
// ========================================

function guardarJugador() {

    let jugadores =
        JSON.parse(localStorage.getItem("jugadoresReto")) || [];


    jugadores.push({

        nombre: jugador,
        puntos: puntos

    });


    // Ordenar de mayor a menor
    jugadores.sort(function(a, b) {

        return b.puntos - a.puntos;

    });


    // Dejar solamente los 10 mejores
    jugadores = jugadores.slice(0, 10);


    localStorage.setItem(
        "jugadoresReto",
        JSON.stringify(jugadores)
    );


    mostrarRanking();


    document.getElementById("resultado")
        .classList.add("oculto");


    document.getElementById("inicio")
        .classList.remove("oculto");


    document.getElementById("nombreJugador").value = "";

    document.getElementById("mensaje").textContent =
        "✅ Resultado guardado. ¡Juega otra vez!";
}


// ========================================
// MOSTRAR RANKING
// ========================================

function mostrarRanking() {

    let jugadores =
        JSON.parse(localStorage.getItem("jugadoresReto")) || [];


    let tabla =
        document.getElementById("tablaJugadores");


    tabla.innerHTML = "";


    if (jugadores.length === 0) {

        tabla.innerHTML =
            "<tr><td colspan='3'>Todavía no hay jugadores</td></tr>";

        return;
    }


    jugadores.forEach(function(jugador, indice) {

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${jugador.nombre}</td>
            <td>⭐ ${jugador.puntos}</td>
        `;

        tabla.appendChild(fila);

    });
}


// ========================================
// BORRAR RANKING
// ========================================

function borrarRanking() {

    let confirmar =
        confirm("¿Seguro que quieres borrar el ranking?");


    if (confirmar) {

        localStorage.removeItem("jugadoresReto");

        mostrarRanking();

    }
}


// ========================================
// MODO OSCURO
// ========================================

function modoOscuro() {

    document.body.classList.toggle("oscuro");

}


// ========================================
// CARGAR RANKING AL ABRIR
// ========================================

mostrarRanking();

