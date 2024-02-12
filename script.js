let numerosBingo = [];
let interval;
let alertaBingoMostrada = false;
let alertaPrimerCartonMostrada = false;
let generacionHabilitada = true;
let contadorTurnos= 0; //Contador global para llevar la cuenta de los turnos.

function mostrarCartones(cantidad) {
    // Se ocultan los botones y posteriormente se muestran los cartones.
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cartones').classList.remove('hidden');

     // Esta parte sirve para mostrar la cantidad de tablas solicitadas.
     for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);

        if (i <= cantidad && cantidad === 3) {
            const carton = generarNumerosCarton3X3();
            mostrarCartonEnTabla(carton, tabla);
            tabla.classList.remove('hidden');
        }else if (i<= cantidad && cantidad === 4){
            const carton = generarNumerosCarton4X4();
            mostrarCartonEnTabla(carton, tabla);
            tabla.classList.remove('hidden');
        }else if (i<= cantidad && cantidad === 5){
            const carton = generarNumerosCarton5X5();
            mostrarCartonEnTabla(carton, tabla);
            tabla.classList.remove('hidden');
        }else {
            // Esta parte sirve para ocultar las tablas restantes.
            tabla.classList.add('hidden');
        }
    }
}

function mostrarCartonEnTabla(carton, tabla) {
    // Se elimina todo el contenido anterior.
    tabla.innerHTML = '';

    // Se crea una fila para los números del cartón.
    const fila = document.createElement('div');
    fila.classList.add('grid', 'grid-cols-5', 'w-100', 'h-40');

    // Se muestran los números en la tabla.
    for (let i = 0; i < carton.length; i++) {
        const celda = document.createElement('div');
        celda.textContent = carton[i];
        celda.classList.add('border-2', 'border-gray-300', 'text-base', 'text-center', 'flex', 'justify-center', 'items-center');
        fila.appendChild(celda);
    }

    // Se agrega la fila a la tabla.
    tabla.appendChild(fila);
}

function generarNumerosCarton3X3() {
    const carton = [];
    
    // Se generan 3 números únicos del 1 al 17 para la primera fila.
    const fila1 = generarFilaOrdenada3X3(1, 17);
    carton.push(...fila1);

    // Se generan 3 números únicos del 18 al 34 para la segunda fila.
    const fila2 = generarFilaOrdenada3X3(18, 34);
    carton.push(...fila2);

    // Se generan 3 números únicos del 35 al 50 para la tercera fila.
    const fila3 = generarFilaOrdenada3X3(35, 50);
    carton.push(...fila3);
    return carton;
}


function generarNumerosCarton4X4() {
    const carton = [];
    
    // Se generan 4 números únicos del 1 al 13 para la primera fila.
    const fila1 = generarFilaOrdenada4X4(1, 13);
    carton.push(...fila1);

    // Se generan 4 números únicos del 14 al 26 para la segunda fila.
    const fila2 = generarFilaOrdenada4X4(14, 26);
    carton.push(...fila2);

    // Se generan 4 números únicos del 27 al 38 para la tercera fila.
    const fila3 = generarFilaOrdenada4X4(27, 38);
    carton.push(...fila3);

    // Se generan 4 números únicos del 39 al 50 para la cuarta fila.
    const fila4 = generarFilaOrdenada4X4(39, 50);
    carton.push(...fila4);
    return carton;
}

function generarNumerosCarton5X5() {
    const carton = [];
    
    // Se generan 5 números únicos del 1 al 10 para la primera fila.
    const fila1 = generarFilaOrdenada5X5(1, 10);
    carton.push(...fila1);

    // Se generan 5 números únicos del 11 al 20 para la segunda fila.
    const fila2 = generarFilaOrdenada5X5(11, 20);
    carton.push(...fila2);

    // Se generan 5 números únicos del 21 al 30 para la tercera fila.
    const fila3 = generarFilaOrdenada5X5(21, 30);
    carton.push(...fila3);

    // Se generan 5 números únicos del 31 al 40 para la cuarta fila.
    const fila4 = generarFilaOrdenada5X5(31, 40);
    carton.push(...fila4);

    // Se generan 5 números únicos del 34 al 50 para la quinta fila.
    const fila5 = generarFilaOrdenada5X5(41, 50);
    carton.push(...fila5);
    return carton;
}

function generarFilaOrdenada5X5(min, max) {
    const fila = [];
    for (let i = 0; i < 5; i++) {
        let numero = generarNumeroUnico(min, max, fila);
        fila.push(numero);
    }
    return fila.sort((a, b) => a - b);
}

function generarFilaOrdenada4X4(min, max) {
    const fila = [];
    for (let i = 0; i < 4; i++) {
        let numero = generarNumeroUnico(min, max, fila);
        fila.push(numero);
    }
    return fila.sort((a, b) => a - b);
}

function generarFilaOrdenada3X3(min, max) {
    const fila = [];
    for (let i = 0; i < 3; i++) {
        let numero = generarNumeroUnico(min, max, fila);
        fila.push(numero);
    }
    return fila.sort((a, b) => a - b);
}

function generarNumeroUnico(min, max, numerosExcluidos) {
    // Se genera un número aleatorio único dentro del rango establecido.
    let numero;
    do {
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (numerosExcluidos.includes(numero));

    return numero;
}

function generarNumeroBingo() {
    if (!generacionHabilitada) {
        return;
    }
     //Se utiliza para verificar que no se ha excedido la maxima cantidad de turnos permitidos.
     if (contadorTurnos<25){
    
        // Se genera un número aleatorio del 1 al 50 que no se haya generado antes.
        let numero;
        do {
            numero = Math.floor(Math.random() * 50) + 1;
        } while (numerosBingo.includes(numero));
    
        contadorTurnos++;
        // Se agrega el número a la lista.
        numerosBingo.push(numero);
    
        // Se actualiza la visualización de los números de Bingo.
        mostrarNumerosBingo();
    
        // Se comprueba si algún número está en los cartones y se cambia el fondo a verde.
        comprobarNumerosEnCartones();
        comprobarCartonCompleto();
    }else{
        alert('Se superaron los 25 turnos, por lo cual se acaba el juego y hay empate');
        detenerGeneracion(); // Se procede a detener la generación cuando se completa un cartón.
        mostrarBotonReinicio();
    }
}

function mostrarNumerosBingo() {
    // Se encarga de mostrar solo los últimos 10 números generados en una sección.
    const numerosBingoSection = document.getElementById('numerosBingo');
    numerosBingoSection.innerHTML = '<h2>Números de Bingo</h2>';

    // Se obtienen los últimos 10 números.
    const ultimosNumeros = numerosBingo.slice(-10);

    for (const numero of ultimosNumeros) {
        const numeroElement = document.createElement('div');
        numeroElement.textContent = numero;
        numeroElement.classList.add('bg-gray-300', 'p-2', 'rounded', 'm-2', 'inline-block', 'animated-number');
        numerosBingoSection.appendChild(numeroElement);
    }
}

function iniciarBingo() {
    // Se inicia la generación de números aleatorios.
    interval = setInterval(generarNumeroBingo, 500); 
}

function detenerGeneracion() {
    // Se detiene la generación de números.
    generacionHabilitada = false;
}

function comprobarNumerosEnCartones() {
    // Se comprueba si se completa una línea horizontal en algún cartón.
    for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);
        
        if (tabla.classList.contains('hidden')) {
            // Si el cartón está oculto, no se realiza la comprobacion.
            continue;
        }

        const filas = tabla.querySelectorAll('.text-center');

        // Se verifica si se completa una línea horizontal.
        const lineaCompleta = Array.from(filas).some((celda, index, array) => {
            const filaIndex = Math.floor(index / 5);
            const fila = array.slice(filaIndex * 5, (filaIndex + 1) * 5);
            return fila.every(c => c.textContent !== '' && c.style.backgroundColor === 'green');
        });

        // Se muestra el mensaje solo si se completa una línea y no se ha mostrado antes.
        if (lineaCompleta && !alertaBingoMostrada) {
            alert(`¡Bingo! Se ha completado una línea en el Cartón ${i}!`);
            alertaBingoMostrada = true; // Se Marca el mensaje de bingo como mostrado.
        }

        // Se cambia el fondo a verde si el número coincide con algún número de Bingo.
        for (const celda of filas) {
            const numeroCarton = parseInt(celda.textContent, 10);
            if (numerosBingo.includes(numeroCarton)) {
                celda.style.backgroundColor = 'green';
            }
        }
    }
}

function comprobarCartonCompleto() {
    // Se comprueba si algún cartón está completo.
    for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);
        
        // Se verifica si el cartón es visible.
        if (!tabla.classList.contains('hidden')) {
            const filas = tabla.querySelectorAll('.text-center');

            // Se verifica si todas las celdas tienen fondo verde.
            const cartonCompleto = Array.from(filas).every(celda => celda.style.backgroundColor === 'green');

            // Se muestra el mensaje solo si el cartón se completa y no se ha mostrado antes.
            if (cartonCompleto && !alertaPrimerCartonMostrada) {
                alert(`¡Bingo! Se ha completado el Cartón ${i}!`);
                alertaPrimerCartonMostrada = true; // Se marca el mensaje del primer cartón como mostrado.
                detenerGeneracion(); // Se detiene la generación cuando se completa un cartón.
                mostrarBotonReinicio();
            }
        }
    }
}

function mostrarBotonReinicio() {
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    reiniciarBtn.classList.remove('hidden');
}

function reiniciarJuego() {
    // Se detiene la generación de números aleatorios.
    clearInterval(interval);

    // Se reinician las variables y se ocultan los cartones.
    numerosBingo = [];
    alertaBingoMostrada = false;
    alertaPrimerCartonMostrada = false;
    generacionHabilitada = true; // Restablecer la generación.
    document.getElementById('menu').style.display = 'block';
    document.getElementById('cartones').classList.add('hidden');
    document.getElementById('reiniciarBtn').classList.add('hidden');
    contadorTurnos= 0;
}

// LocalStorage
// Esta es la idea que tenia para implementar el localStorage pero tuve varias complicaciones para llevarlo a cabo. Por favor, tomar en cuenta.
// lst= [{jugador: 1, numeroVictorias: 0, puntosObtenidos: 0},{jugador: 2, numeroVictorias: 0, puntosObtenidos: 0},{jugador: 3, numeroVictorias: 0, puntosObtenidos: 0},{jugador: 4, numeroVictorias: 0, puntosObtenidos: 0}];
// localStorage.setItem("lista de almacenamiento", JSON.stringify(lst)); De esta forma se guardaria la informacion en el localStorage.
// puntaje= JSON.parse(localStorage.getItem("lista de almacenamiento")); Con esto se obtendria el contenido de lo que hay en el localStorage.
// actualizacionLinea= [{jugador: i, numeroVictorias: 0, puntosObtenidos: +1}];
// actualizacionCarton= [{jugador: i, numeroVictorias: +1, puntosObtenidos: +1}];
// lst.update(actualizacionLinea) o lst.update(actualizacion carton)
// localStorage.setItem("lista de almacenamiento", JSON.stringify(lst)); De esta forma se guardaria la informacion actualizada en el localStorage.
