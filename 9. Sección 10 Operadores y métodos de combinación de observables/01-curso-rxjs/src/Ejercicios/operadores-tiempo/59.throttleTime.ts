//========================================================
// 59. throttleTime
//========================================================

//NOTA: El operador throttleTime es un operador muy similar al debounceTime pero funciona un poquito diferente. 
//      Ya que si por ejemplo se emite un valor va a empezar a contar 1 segundo y si dentro de ese segundo se 
//      emiten varios valores estos van a ser ignorados, pero existe una forma de obtener el primer y último valor.
//      Otra cosa es que podemos considerar que el operador throttleTime es exáctamente lo opuesto al debounceTime ya 
//      que el debounceTime espera el tiempo especificado para emitir el valor, mientras que el throttleTime emite 
//      inmediantamente el valor y luego espera el tiempo especificado.
//      Adicionalmente este es otro operado bastante útil para controlar las emisiones de observables que emiten demasiados
//      valores muy frecuentemente.

import { fromEvent, distinctUntilChanged, asyncScheduler } from 'rxjs';
import { throttleTime, pluck } from 'rxjs/operators';

//-----------------------------
// Ejemplo 1
//-----------------------------

const click$ = fromEvent( document, 'click' );

click$.pipe(
        throttleTime( 3000 )
).subscribe( console.log );

//-----------------------------
//Ejemplo 2
//-----------------------------

document.querySelector('body').append('Ejemplo 2');

const input = document.createElement('input');
document.querySelector('body').append(input);

// Creamos un observable que este pendiente del input
const input$ = fromEvent<KeyboardEvent>( input, 'keyup' );

input$
    .pipe(
        throttleTime( 1000 ),
        pluck( 'target', 'value' ),
        // Usamos el distict para evitar que se emita el valor en caso de que el usuario vuelva y escriba lo mismo
        distinctUntilChanged()
    )
    .subscribe( console.log );

//-----------------------------
//Ejemplo 3
//-----------------------------

// NOTA: Exite una manera para configurar el throttleTime para que regrese tanto el primero
//       como el último valor.

document.querySelector('body').append('Ejemplo 3');

const input2 = document.createElement('input');
document.querySelector('body').append(input2);

// Creamos un observable que este pendiente del input
const input2$ = fromEvent<KeyboardEvent>( input2, 'keyup' );

input2$
    .pipe(
        throttleTime( 1000, asyncScheduler, {
            leading: true, // Si quiero el primer elemento
            trailing: true // Si quiero el ultimo elemento
        }),
        pluck( 'target', 'value' ),
        // Usamos el distict para evitar que se emita el valor en caso de que el usuario vuelva y escriba lo mismo
        distinctUntilChanged()
    )
    .subscribe( console.log );
