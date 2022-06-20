//========================================================
// 51. skip
//========================================================

import { fromEvent, interval, skip, takeUntil, tap } from 'rxjs';

//NOTA: El operador skip básicamente sirve para saltar u omitir x cantidad 
//      de emisiones iniciales.

const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';

document.querySelector('body').append(boton);

const counter$ = interval(1000);

// Entonces con el siguiente codigo lo que vamos a hacer es detener el contador 
// al hacer dos veces click sobre el botón
const clickBtn$ = fromEvent( boton, 'click' ).pipe(
    tap( () => console.log('tap antes de skip') ),
    skip(1),
    tap( () => console.log('tap después de skip') )
);

counter$.pipe(
    takeUntil( clickBtn$ )
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('Complete')
});