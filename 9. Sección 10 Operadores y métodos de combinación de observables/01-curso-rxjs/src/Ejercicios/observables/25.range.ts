//========================================================
// 25. range
//========================================================

// NOTA: La función range nos crea un observable que emite una secuencia de números en base a un rango. 
//       Por defecto son síncronos, pero a su vez se pueden transformar en asíncronos usando un async 
//       scheduler.

import { asyncScheduler, of, range } from 'rxjs';

// Supongamos que tuvieramos que emitir valores de 1 a 5 acá podríamos usar el of pero esto se complicaría
// si necesitarmaos emitir 100 valores entonces para esto existe el range

// const src$ = of( 1,2,3,4,5 );

// NOTA: Acá nos pide que sea desde una posición inicial (que por defecto es 0) y luego 
//       tantas emisiones como necesite
const src$ = range( -5, 10 ); 

console.log('Inicio scr');
src$.subscribe( console.log );
console.log('Fin scr');
console.log('-------------------------------------')

// Ahora recordando que por defecto es síncrona pero podemos volverla asíncrona
// mandando el asyncScheduler entonces tenemos lo siguiente:

const src2$ = range( 1, 5, asyncScheduler ); 

console.log('Inicio scr2');
src2$.subscribe( console.log );
console.log('Fin scr2');
