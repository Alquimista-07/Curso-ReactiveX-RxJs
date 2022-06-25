//========================================================
// 93. combineLatest
//========================================================

//NOTA: Esta es una función que nos permite enviar observables como argumento, combinarlos y emitir 
//      los valores de todos los observables internos simultáneamente, es importante recalcar que el 
//      combineLatest regresa un nuevo observable el cual va a emitir valores hasta que todos los 
//      observables internos hayan emitido por lo menos un valor, adicionalmente no se va a completar 
//      la suscripción hasta que todos los observables se completen.

import { combineLatest, fromEvent } from "rxjs";
import { pluck } from 'rxjs/operators';

//----------------------------------------
// Ejemplo 1
//----------------------------------------
/*
const keyup$ = fromEvent( document, 'keyup' );
const click$ = fromEvent( document, 'click' );

// NOTA: El orden de la salida va a ser exactamente el primero que emita
//       un valor
combineLatest( 
    keyup$.pipe( pluck('type') ), 
    click$.pipe( pluck('type') )
).subscribe( console.log );
*/

//----------------------------------------
// Ejemplo 2
//----------------------------------------
const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder='email@gmail.com';

input2.placeholder='********';
input2.type= 'password';

document.querySelector('body').append(input1, input2);

// Helper
const getInputStream = ( elem: HTMLElement ) => 
      fromEvent<KeyboardEvent>( elem, 'keyup' ).pipe(
        pluck( 'target', 'value' )
    );


combineLatest( 
    getInputStream( input1 ),
    getInputStream( input2 )
).subscribe( console.log );