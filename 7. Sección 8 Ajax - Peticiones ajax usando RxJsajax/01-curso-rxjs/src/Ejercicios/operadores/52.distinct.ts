//========================================================
// 52. distinct
//========================================================

// NOTA: El operador distinct es un operador el cual deja pasar únicamente los 
//       valores que no han sido previamente emitidos por el observable.
//      Cabe resalta que el distinct usa el operador o condición estrict de 
//      JavaScrpt (===)

import { distinct, of, from } from 'rxjs';

console.log('---------------------');
console.log('Ejemplo 1');
console.log('---------------------');

const numeros$ = of(1,1,1,3,3,2,2,4,4,5,3,1);

numeros$
.pipe(
    distinct() 
    ).subscribe( console.log );
    
console.log('---------------------');
console.log('Ejemplo 2');
console.log('---------------------');
// Por consecuencia como el distinct usa el operador de igualda estrcita
// lo siguiente nos emitiria un 1 en número y un 1 en string
const numeros2$ = of(1,'1',1,3,3,2,2,4,4,5,3,1,'1','1');
    
numeros2$
.pipe(
    distinct()
    ).subscribe( console.log );

// Ahora como sería aplicandolo con objetos, entonces tenemos lo siguiente
console.log('---------------------');
console.log('Ejemplo 3');
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
        nombre: 'Dr. Willy'
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
        // Como los objetos visualmente sean iguales, no son lo mismo ya que no
        // apuntan al mismo espacio en memoria, por lo tanto dejar el distinct
        // sin indicarle mas información no serviría para nada ya que deja pasar 
        // todos los valores. Entonces le indicamos más información de la siguiente
        // forma
        distinct( personaje => personaje.nombre )
    )
    .subscribe( console.log );