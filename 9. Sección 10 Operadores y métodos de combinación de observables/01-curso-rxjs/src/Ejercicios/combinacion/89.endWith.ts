//========================================================
// 89. endWith
//========================================================

//NOTA: El operador endWith es muy similar al startWith ya que es un operador 
//      que básicamente lo que hace es que antes de que se compete el observable 
//      va a emitir el valor que tengamos asignado los cuales pueden ser strings, 
//      pueden ser números, pueden ser objetos, puede ser inclusive otro observable, 
//      pero en este caso tendríamos que pasarlo por el operador mergeAll.

import { endWith, of } from 'rxjs';

// NOTA: Recordemos que el of por naturaleza es síncrono por lo tanto el startWith lo esta
//       haciendo antes de que el of emita un valor
const numeros$ = of(1,2,3).pipe(
    endWith( 'x','y','z' )
);

numeros$.subscribe( console.log );