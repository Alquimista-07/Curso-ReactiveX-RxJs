//========================================================
// 82. concatMap
//========================================================

//NOTA: El operador concatMap es otro operador de aplanamiento que nos sirve para concatenar los observables 
//      resultantes que pueden fluir a través de ese operador y hay que tener en cuenta que los va encolando 
//      y lo concatena al último valor emitido cuando el observable anterior se completa. Recordemos que al 
//      ser un operador de aplanamiento cuando se recibe un observable el operador automáticamente se va a 
//      suscribir a él y el resultado en la salida será el producto de dicho observable.

import { interval, take, fromEvent } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const interval$ = interval(500).pipe( take(3) );
const click$ = fromEvent( document, 'click' );

click$.pipe(
    concatMap( () => interval$ )
).subscribe( console.log );