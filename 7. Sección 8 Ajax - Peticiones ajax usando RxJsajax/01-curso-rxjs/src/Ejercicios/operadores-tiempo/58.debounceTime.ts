//========================================================
// 58. debounceTime
//========================================================

// NOTA: El operador debounceTime es un operador que trabaja en base a intervalos de tiempo, 
//       y básicamente este nos ayuda a contar cuantas milésimas de segundo han pasado desde 
//       la última emisión, y si esas milésimas de segundo sobrepasan el parámetro que tengamos 
//       en los paréntesis entonces emitirá dicho valor. También el debounceTime nos va a ayudar 
//       a nosotros a poder restringir la cantidad de emisiones que nuestro source o nuestro 
//       observable inicial esta emitiendo.
//       Este es sumamente útil cuando queremos controlar observables que emiten una gran cantidad
//       de mensajes rápidamente.

import { fromEvent, distinctUntilChanged } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';

//-----------------------------
// Ejemplo 1
//-----------------------------

const click$ = fromEvent( document, 'click' );

click$.pipe(
        debounceTime( 3000 )
).subscribe( console.log );

//-----------------------------
//Ejemplo 2
//-----------------------------

const input = document.createElement('input');
document.querySelector('body').append(input);

// Creamos un observable que este pendiente del input
const input$ = fromEvent<KeyboardEvent>( input, 'keyup' );

input$
    .pipe(
        debounceTime( 1000 ),
        pluck( 'target', 'value' ),
        // Usamos el distict para evitar que se emita el valor en caso de que el usuario vuelva y escriba lo mismo
        distinctUntilChanged()
    )
    .subscribe( console.log )