//========================================================
// 76. mergeAll
//========================================================

//NOTA: El operador mergeAll es un operador que sirve para trabajar con observables que internamente retornan 
//      observables y este no se completa hasta que todos sus observables hijos se completen este no se va a 
//      completar en total. Este procedimiento de unificar observables e una sola salida se conoce como operador 
//      de aplanamiento (flattening operator).

import { fromEvent } from 'rxjs';
import { debounceTime, map, mergeAll, pluck } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append( textInput, orderList );

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

input$.pipe(
        // NOTA: En este caso a diferencia del anterior ejercicio acá si cada uno de nuestros operadores
        //       esta realizando una única tarea.
        debounceTime( 500 ),
        pluck('target', 'value'),
        map( texto => ajax.getJSON(
             `https://api.github.com/search/users?q=${ texto }`
            )
        ),
        // NOTA: Usamos el operador mergeAll para que se suscriba y unifique los valores del observable 
        //       que nos esta regresando el map.
        mergeAll(),
        pluck('items')
).subscribe( resp => console.log('Respuesta', resp) );