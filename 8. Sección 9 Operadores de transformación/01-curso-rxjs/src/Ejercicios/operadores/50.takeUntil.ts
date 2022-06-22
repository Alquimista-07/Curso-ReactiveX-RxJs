//========================================================
// 50. takeUntil
//========================================================

import { fromEvent, interval, takeUntil } from "rxjs";

//NOTA: El operador takeUntil tiene una particularidad ya que este operador recibe como argumento otro 
//      observable. Y en sí este operador se traduciría a sigue recibiendo los valores y sigue emitiéndolos 
//      hasta que el segundo observable emita su primer valor.

const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';

document.querySelector('body').append( boton );

// Creamos el primer observable
const counter$ = interval(1000);
// Creamos el segundo observable
const clickBtn$ = fromEvent( boton, 'click' );

// Implementamos el takeUntil
counter$
    .pipe(
        // Detenemos el timer cuando haga click sobre el botón
        takeUntil( clickBtn$ )
    )
    .subscribe({
        next: val => console.log('next: ', val),
        complete: () => console.log('Complete')
});