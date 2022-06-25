//========================================================
// 91. concat - Función
//========================================================

//NOTA: Esta es una función no es un operador ya que el operador está obsoleto. 
//      Básicamente lo que hace esta función que recibe observables como argumento, 
//      también puede recibir un iterable o bien un arreglo, pero usualmente se usa 
//      para trabajar con observables, con estos observables el concat va a crear 
//      un nuevo observable. Hay que tener en cuenta que hasta que no se complete el 
//      activo el siguiente no se van a ejecutar.

import { concat, interval, of } from 'rxjs';
import { take } from 'rxjs/operators';

const interval$ = interval(1000);

concat(
    interval$.pipe( take(3) ),
    interval$.pipe( take(2) ),
    [1,2,3,4],
    of(1),
    of('a')
).subscribe( console.log );