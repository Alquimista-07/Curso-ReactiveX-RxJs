//========================================================
// 23. of
//========================================================

// NOTA: El Of es una función que nos permite crear observables en base a un listado de elementos (números y cualquier tipo de objeto). 
//       Lo importante es que el operador Of va a emitir los valores en secuencia uno por uno de manera síncrona y cuando emite el último 
//       valor automáticamente se completa el observable.

// Recordemos que cuando algo se importa de rxjs es para crear observables o interfaces para regular los observables

import { of } from 'rxjs';

const obs1$ = of( 1,2,3,4,5,6 );

// NOTA: Acá hay que saber que como argumento es importante que sepamos que cada uno de los valores que colocamos dentro
//       tienen que estar separados por coma ya que si mandamos por ejemplo todo dentro de llaves estamos mandando un solo
//       argumento que es un arreglo de números y por lo tanto va a emitir un valor correspondiente al arreglo de los valores
//       que se envíen.
const obs2$ = of( [1,2,3,4,5,6] );

// Claro que si lo queremos mandar como originalmente se tenía se podría usar el operador spred
const obs3$ = of( ...[1,2,3,4,5,6],2,3,4,5 );

// NOTA: Ahora si el observable fuera asíncrono entonces el resultado en consola sería.
//       1. Inicio del obs$
//       2. Fin del obs$
//       3. Y luego el contenido que tenemos dentro del observable correspondiente a la secuencia de valores
//
//       Pero como se mencionó que el of es síncrono entonces tenemos todo en secuencia

console.log('Inicio del obs1$');
obs1$.subscribe(
    next => console.log('next', next),
    null,
    () => console.log('Terminamos la secuencia')
);

console.log('Fin del obs1$');
console.log('---------------------------------------'); 

//---------------------------------------------------------------

console.log('Inicio del obs2$');
obs2$.subscribe(
    next => console.log('next', next),
    null,
    () => console.log('Terminamos la secuencia')
);
    
console.log('Fin del obs2$');
console.log('---------------------------------------'); 

//---------------------------------------------------------------

console.log('Inicio del obs3$');
obs3$.subscribe(
    next => console.log('next', next),
    null,
    () => console.log('Terminamos la secuencia')
);
    
console.log('Fin del obs3$');
console.log('---------------------------------------'); 

//---------------------------------------------------------------
// Ahora tenemos el siguiente ejemplo

const obs4$ = of( [1,2], {a: 1, b: 2}, function(){}, true, Promise.resolve(true) );

console.log('Inicio del obs4$');
obs4$.subscribe(
    next => console.log('next', next),
    null,
    () => console.log('Terminamos la secuencia')
);
    
console.log('Fin del obs4$');
console.log('---------------------------------------'); 
