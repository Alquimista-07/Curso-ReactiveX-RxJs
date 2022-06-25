import { fromEvent, merge } from 'rxjs';
import { pluck } from 'rxjs/operators';
//========================================================
// 92. merge - Método
//========================================================

//NOTA: El método merge recibe uno o más observables y el resultado va a ser el producto 
//      de ambos observables combinados simultáneamente. Hay que tener en cuenta que hasta 
//      que todos los observables no se completen la suscripción no se va a completar.

const keyup$ = fromEvent( document, 'keyup' );
const click$ = fromEvent( document, 'click' );

// NOTA: El orden de la salida va a ser exactamente el primero que emita
//       un valor
merge( 
    keyup$.pipe( pluck('type') ), 
    click$.pipe( pluck('type') )
).subscribe( console.log );