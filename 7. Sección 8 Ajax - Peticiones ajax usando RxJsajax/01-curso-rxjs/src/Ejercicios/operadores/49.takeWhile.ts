//========================================================
// 49. takeWhile
//========================================================

// NOTA: El operador takeWhile permite recibir valores mientras la condición se cumpla. 
//       Cabe anotar que si queremos el ultimo valor que cumplió la condición tenemos 
//       otro parámetro el cual es el inclusive que por defecto viene en false, pero lo 
//       podemos alterar para que nos devuelva el último valor que rompió la condición.

import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
    .pipe(
        map( ({ x, y }) => ({x, y}) ),
        // Supongamos que quiero recibir valores hasta que Y sea mayor a 150
        // Entonces el primer parámentro es el predicado y el otro valor es el inclusive
        /*
        takeWhile( ({ y }) => y <= 150 
        */
        // El siguiente es el ejemplo con el parámetro inclusive 
        takeWhile( ({ y }) => y <= 150, true )
    )
    .subscribe({
        next: val => console.log('next: ', val),
        complete: () => console.log('Complete')
});

