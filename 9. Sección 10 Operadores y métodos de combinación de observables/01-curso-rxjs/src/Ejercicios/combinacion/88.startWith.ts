//========================================================
// 88. startWith
//========================================================

//NOTA: El operador startWih nos permite hacer una emisión antes de que el observable inicie a emitir, 
//      aunque sea un valor síncrono. En pocas palabras lo que hace el operador es que la primera emisión 
//      va a tener el valor que se le especifique los cuales pueden ser strings, pueden ser números, pueden 
//      ser objetos, puede ser inclusive otro observable, pero en este caso tendríamos que pasarlo por el 
//      operador mergeAll.

import { of, startWith } from "rxjs";

// NOTA: Recordemos que el of por naturaleza es síncrono por lo tanto el startWith lo esta
//       haciendo antes de que el of emita un valor
const numeros$ = of(1,2,3).pipe(
    startWith( 0 )
);

numeros$.subscribe( console.log );