//========================================================
// 26. interval y timer
//========================================================

// NOTA: El interval y el timer son funciones que permiten crear observables 
//       que trabajan con intervalos de tiempo y son dos observables asíncronos por naturaleza. 

import { interval, timer } from 'rxjs';

const observerInterval = {
    next: val => console.log('next interval:', val),
    complete: () => console.log('Completado interval') 
};

const observerTimer = {
    next: val => console.log('next timer:', val),
    complete: () => console.log('Completado timer') 
};

// Creamos el interval
const interval$ = interval( 1000 );

// NOTA: Entonces como sabemos que el interval es asíncrono por naturaleza,
//       entonces simplemente lo comprobamos con 2 console.log y observamos 
//       que primero se imprimen los console de inicio y fin y luego el 
//       interval, en caso de que fuera sincrono veríamos el consolo e inicio
//       y cuando este terminara veriamos el de fin pero esto no es así y por
//       lo tanto es asíncrono.
console.log('Inicio interval');
interval$.subscribe( observerInterval );
console.log('Fin interval');

// Ahora creamos el timer
const timer$ = timer( 2000 );

console.log('Inicio timer');
timer$.subscribe( observerTimer );
console.log('Fin timer');
