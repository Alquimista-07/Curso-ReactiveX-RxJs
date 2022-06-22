import { from, reduce, scan } from 'rxjs';
import { map } from 'rxjs/operators';
//========================================================
// 43. scan
//========================================================

// NOTA: El operador scan es casi lo mismo que el operador reduce solo con una única 
//       diferencia que es que cuando los valores son emitidos por el observable 
//       inmediatamente van saliendo conforme van ingresando, y regresan su valor acumulado. 

//-------------------------------------------------
// Demostración como funciona el scan comparado con
// el reduce
//-------------------------------------------------
const numeros = [1,2,3,4,5];

/*
const totalAcumulador = ( acc, curr ) => {
    return acc + curr;
};
*/

// Lo siguiente es lo mismo solo que como solo tenemos un retorno entonces lo
// podemos resumir
const totalAcumulador = ( acc, curr ) => acc + curr;

console.log('--------------------------');
console.log('reduce');
console.log('--------------------------');
// Creamos un observable que va a emitir valores
// Implementeamos el reduce primero para poderlo comparar con el scan
// Reduce
from( numeros ).pipe(
    reduce( totalAcumulador, 0 )
)
.subscribe( console.log );

console.log('--------------------------');
console.log('scan');
console.log('--------------------------');

// Creamos un observalbe que va a emitri valores
// Impementamos el scan
// scan
from( numeros ).pipe(
    scan( totalAcumulador )
)
.subscribe( console.log );

console.log('--------------------------');
console.log('Simulación Redux');
console.log('--------------------------');

// Redux
// Pequeño ejemplo demostrando algo que podría parecido al patron Redux.
// Entonces el Redux es un patrón que permite manejar el estado global de 
// la aplicación en un único objeto.

interface Usuario {
    id         ?: string;
    autenticado?: boolean;
    token      ?: string;
    edad       ?: number;
}

const user: Usuario[] = [
    // Simulamos que vamos a tener varias operaciones de cambios que va a tener este usuario
    { id: 'ange', autenticado: false, token: null }, // Esto es un estado
    { id: 'ange', autenticado: true, token: 'ABC' }, // Esto es otro estado
    { id: 'ange', autenticado: true, token: 'ABC123' } // Esto es otro
];

// Creamos un observalbe que simule que cada una de estas peticiones se ejecutaron
// en diferetentes momentos de tiempo
const state$ = from( user ).pipe(
    // Este state lo que quiero hacer es que me mantenga todas las modificaciones
    // que cambian en el estado y me gustaría saber cual fue la ultima emisión
    scan<Usuario, Usuario>( ( acc, curr ) => {
        return { ...acc, ...curr }
    }, { edad: 33 }) // El valor inicial podemos especificarlo como vacío o en este caso con la edad
);

const id$ = state$.pipe(
    map( state => state )
);

id$.subscribe( console.log );