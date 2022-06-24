//========================================================
// 39. tap
//========================================================

// NOTA: El operador tap es útil ya que nos sirve para ver como va fluyendo la información de nuestros observables. 
//       Básicamente el operador tap nos permite disparar efectos secundarios, pero hay que tener cuidado ya que puede 
//       ser que nosotros disparemos acciones accidentalmente. El principal uso del tap es disparar efectos secundarios 
//       como por ejemplo imprimir en consola el valor que tenemos, o bien que necesitemos disparar alguna acción cuando 
//       la información pasa a través o bien que necesitemos disparar alguna acción cuando sea emitido un nuevo valor en 
//       el cual está presente el tap.
//       También el tap es bien poderoso porque con este podemos deputar todo el proceso de inicio a fin, inclusive simular
//       errores, next y complete.

import { tap, range } from 'rxjs';
import { map } from 'rxjs/operators';

const numeros = range(1,5);

numeros.pipe(
    // NOTA: Cabe resaltar que el return en el tap es ignorado por lo tanto si mandamos un retorn por ejemplo de 100 este no se ve reflejado
    //       así lo tenga explícito dentor del cuerpo del operador tap
    tap( x => console.log( 'tap antes', x ) ),
    map( val => val * 10 ),
    tap( x => console.log('tap después', x) ),
    // Ahora vamos a usar el tap pero mandandole un observer
    tap({
        // Creamos un parcial observer o en pocas palabras las instrucciones que necesito ejecutar
        // cuando tenga el next y el complete. El next se va a ejecutar cada vez que el tap reciba 
        // el siguiente valor, y el complete se va a ejecutar cuando todo el observable se complete
        next: valor => console.log('tap observer', valor),
        complete: () => console.log('Se teminó todo')
    })
)
.subscribe( val => console.log('subs', val) );