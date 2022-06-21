//========================================================
// 24. fromEvent
//========================================================

import { fromEvent } from 'rxjs';

// Ahora creamos dos observables en base a unas acciones que se hagan en el DOM (Document Object Model)

/* 
Eventos de DOM
*/
// NOTA: Para ver el tipo del evento podemos primero dejarlo generico (sin indicarlo con las <>), e impimirlo en la consola
//       y ahí nos damos cuenta que tipo de evento es para posteriormente si poder asignarlo entre <>
const src1$ = fromEvent<MouseEvent>( document, 'click' );
const src2$ = fromEvent<KeyboardEvent>( document, 'keyup' );

// Creamos un observer
const observer = {
    next: val => console.log('next', val)
};

// Ya teniendo el tipo podemos obtener el intellince de lo que podemos obtener del objeto como por ejemplo las coordenadas
// donde di click o la letra que se esta presionando
src1$.subscribe( ev => {
    console.log( ev.x );
    console.log( ev.y );
});

src2$.subscribe( evento => {
    console.log( evento.key );
});


// NOTA: Ahora para dar un plus existe una manera bien convemiente de trabajar con los argumentos usando la 
//       desestructuración de ES6
src1$.subscribe( ({ x,y }) =>{
    console.log( `Valor desestructurado X: ${x}, Y: ${y}` );
});

// NOTA: Otro tip es que en el caso de que por alguna razón tuvieramos un error grande y no podemos obtener el tipo de dato
//       pero sabemos que cuando ya se esta ejecutando todo funciona podemos bajar la restricción indicando que el fromEvent
//       es de tipo any (fromEvent<any>) y no nos marca erro y la aplicación continua funcionando pero obviamente esto no es 
//       muy convenitente de indicarlo como any ya que no es el objetivo de trabajar con typescript o lenguajes de tipado estricto
//       ya que la idea es que nos ayuden a escribir un mejor código.