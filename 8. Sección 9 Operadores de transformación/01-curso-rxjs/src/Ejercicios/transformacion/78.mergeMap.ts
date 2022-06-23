//========================================================
// 78. mergeMap
//========================================================

import { fromEvent, interval, mergeMap, of, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

//NOTA: El mergeMap es otro operador de aplanamiento, es decir, que aunque estamos emitiendo
//      un nuevo observable no tenemos un observable como salido sino que tenemos el producto
//      de la suscripción del mismo.

const letras$ = of( 'a', 'b', 'c' );

//----------------------------------------------------
// Ejemplo 1
//----------------------------------------------------

letras$
.pipe(
    mergeMap( (letra) => interval(1000).pipe(
        map( i => letra + i ),
        take(3)
    ))
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});

//----------------------------------------------------
// Ejemplo 2
//----------------------------------------------------
// Hacemos un ejercicio para que muestre cuanto tiempo el usuario presionó el mouse
const mousedown$ = fromEvent( document, 'mousedown' );
const mouseup$   = fromEvent( document, 'mouseup' );
const interval$  = interval();

mousedown$
.pipe(
    mergeMap( () => interval$.pipe(
        // Detenemos duando se suelte el click
        takeUntil( mouseup$ )
    ))
)
.subscribe( console.log );