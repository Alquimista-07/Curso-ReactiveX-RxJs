//========================================================
// 53. distinctUntilChanged
//========================================================

// NOTA: El operador distictUntilChanged es muy parecido al operador distinct 
//       pero tiene una diferencia marcada y es que el distinctUntilChanged emite 
//       valores siempre y cuando la emisión anterior no sea la misma.

import { distinctUntilChanged, from, of } from 'rxjs';
    
console.log('---------------------');
console.log('Ejemplo 1');
console.log('---------------------');

const numeros$ = of(1,'1',1,3,3,3,2,2,4,4,5,3,1,'1','1','1');
    
numeros$
.pipe(
    distinctUntilChanged()
    ).subscribe( console.log );

console.log('---------------------');
console.log('Ejemplo 2');
console.log('---------------------');

interface Personaje {
    nombre: string;
}

const personajes:Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    }
];

from( personajes )
    .pipe(
        // Como los objetos visualmente sean iguales, no son lo mismo ya que no apuntan 
        // al mismo espacio en memoria, por lo tanto dejar el distinctUntilChanged
        // sin indicarle mas información no serviría para nada ya que deja pasar 
        // todos los valores. Entonces le indicamos más información de la siguiente
        // forma indicando una comparación que retorna un booleano donde regresa un true
        // si son iguales por lo tanto lo bloqueamos y false si se quiere dejar pasar
        distinctUntilChanged( ( anterior, actual ) => anterior.nombre === actual.nombre )
    )
    .subscribe( console.log );