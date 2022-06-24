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


//========================================================
// 27. timer - Configuraciones especiales
//========================================================

const observerTimer2 = {
    next: val => console.log('next timer:', val),
    complete: () => console.log('Completado timer') 
};

//--------------------------------------------------------------------------------------------------------------
// NOTA: Acá en este caso indica se va a ejecutar inmediatamente, pero no es instantanemente
//       del todo ya que se va a ejecutar es tan pronto el stock de callbacks y JavaScript lo 
//       permita.
/*
const timer2$ = timer( 0 );
*/
//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
// NOTA: Ahora que pasa si mandamos un segundo parámetro. Y esto es porque se habal de que el 
//       timer y el interval son parecidos ya que aca espera un tiempo determinado (primer parámetro)
//       y posteriormente empieza a emitir valores cada determinado tiempo (segundo parámetro).
//       En pocas palabras se crea un interval que inicia en una determinada cantidad de tiempo
/*
const timer2$ = timer( 5000, 1000 );
*/
//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
// NOTA: Ahora por ejemplo cuando queremos programar una notificación local no una push notification sino una normal
//       nosotros podemos especificar en que momento, en que fecha se dispara dicha notificación, y practicamente con
//       el timer yo puedo hacer eso de la siguiente manera:

const hoyen5 = new Date();  // Ahora

//Quiero sumarle tanto tiempo
hoyen5.setSeconds(hoyen5.getSeconds() + 5);

const timer2$ = timer( hoyen5 );
//--------------------------------------------------------------------------------------------------------------

console.log('Inicio timer');
timer2$.subscribe( observerTimer2 );
console.log('Fin timer');