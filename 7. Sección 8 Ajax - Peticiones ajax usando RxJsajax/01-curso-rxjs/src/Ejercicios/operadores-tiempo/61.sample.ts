//========================================================
// 61. sample
//========================================================

//NOTA: El operador sample es un operador que emite el último valor emitido 
//      por el observable hasta que el otro observable que tenemos dentro del 
//      operador sample emita un valor.

import { fromEvent, interval, sample } from 'rxjs';

const interval$ = interval(500);
const click$ = fromEvent( document, 'click' );

interval$
    .pipe(
        // Entonces con el sample obtenemos la muestra de como esta el primer observable
        sample( click$ )
    )
    .subscribe(console.log);