//========================================================
// 36. mapTo
//========================================================

// NOTA: El operador mapTo es bien interesante y al principio cuesta verle la utilidad ya que este nos permite transformar 
//       la entrada en una salida específica la cual pueden ser números, objetos, es decir, lo que sea lo que puede regresar 
//       este operador.
//       Para ver más información sobre el mapTo o cualquier otro operador nos podemos dirigir al siguiente enalce:
//       https://rxjs-dev.firebaseapp.com/api/operators/mapTo

import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyUpMapTo$ = keyUp$.pipe(
    // Podemos retornar un string
    mapTo( 'tecla presionada' )
    // Podemos reotrnar un número
    /*
    mapTo( 1 )
    */
    // Podemos retornar un objeto literal
    /*
    mapTo( { v: 1 } )
    */
);

keyUpMapTo$.subscribe( code => console.log('mapTo', code) );