//========================================================
// 60. sampleTime
//========================================================

// NOTA: El operador sampleTime es un operador que nos permite obtener el último valor emitido 
//       en un intervalo de tiempo y adicionalmente si en ese periodo de tiempo no se emite ningún 
//       valor entonces no se emite nada. En pocas palabras este operador nos permite tener una 
//       suscripción que esta pendiente de cada una de las emisiones en periodos de tiempo.

import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
    .pipe(
        // NOTA: Hay que tener en cuenta el orden donde colocquemos el sampleTime
        //       ya que si lo colocamos de primero hay un consumo diferente de memoria
        //       a si lo colocaramos después, ya que por ejemplo en este caso se ejecuta 
        //       primero el map y luego el sampleTime entonces el map esta consumiendo 
        //       memoria ya que esta pendiente de cada una de las emisiones por lo tanto
        //       hay que tener en cuenta donde lo ponemos para hacerlo más eficiente.
        map( ({x,y}) => ({x,y}) ),
        sampleTime(2000)
    )
    .subscribe( console.log );