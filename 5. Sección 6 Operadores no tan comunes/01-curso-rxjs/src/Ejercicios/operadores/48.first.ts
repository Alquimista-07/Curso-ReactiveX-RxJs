//========================================================
// 48. first
//========================================================

import { first, fromEvent, tap } from 'rxjs';

//NOTA: El operador first es un operador bastante sencillo, pero se le pueden 
//      hacer un par de configuraciones muy interesantes.

const click$ = fromEvent<MouseEvent>( document, 'click' );


// Supongamos que solo me interesa la primera emisión
click$
    .pipe(
        tap(() => console.log('tap')),
        // Bien lo podróamos hacer usando el take
        /*
        take(1)
        */
        // Pero lo vamos a hacer usando el first
        /*
        first()
        */
        // Otra forma de hacerlo y digamos que nos interessa trabajar con las coordenadas.
        // Supongamos que me interesa el primer evento que cumpla la condición de que la 
        // coordenada y sea mayor o igual a 150
        first<MouseEvent>( event => event.clientY >= 150 )

        // NOTA: Lo siguiente es un tip para trabajar con la desestructuración en JavaScript
        /*
         * tap<MouseEvent>( console.log ),
         * map<MouseEvent>( event => ({
         *     clientY: event.clientY,
         *     clientX: event.clientX
         * }) )
         * 
         * // Todavía lo anterior se puede resumir aún más y lo hacemos de la siguiente manera usando nuevamente desestructuración.
         * // Y como tenemos una propiedad que se llama exactamente igual al nombre de una variable
         * // entonces también lo podemos omitir
         * 
         *  map<MouseEvent>( ({ clientX, clientY }) => ({ clientY, clientX }) )
         */
    )
    .subscribe({
        next: val => console.log('next:', val),
        complete: () => console.log('Completado!!!...') 
});
