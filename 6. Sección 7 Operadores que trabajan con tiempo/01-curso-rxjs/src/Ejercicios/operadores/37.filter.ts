//========================================================
// 37. filter
//========================================================

//NOTA: El operador filtre como su nombre lo indica nos sirve para filtrar 
//      las emisiones de los valores que emite el observable. 

import { range, from } from 'rxjs';
import { filter } from 'rxjs/operators';

console.log('--------------------------');
console.log('Ejemplo 1')
console.log('--------------------------');

range(1, 10)
    .pipe(
        // Emite solo valores impares
        filter( val => val % 2 === 1 )
    )
    .subscribe( console.log );

console.log('--------------------------');
console.log('Ejemplo 2')
console.log('--------------------------');

range(20, 30)
    .pipe(
        filter( (val, i) => {
            console.log('index', i);
            return val % 2 === 1;
        })
    )
    .subscribe( console.log );

console.log('--------------------------');
console.log('Ejemplo 3')
console.log('--------------------------');

interface Personaje {
    tipo  : string;
    nombre: string;
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    }
];

// Voy a barrelos y solo quiero que salgan los que son héroes
from( personajes )
    .pipe(
        filter( personaje => personaje.tipo === 'heroe' )
    )
    .subscribe(console.log);