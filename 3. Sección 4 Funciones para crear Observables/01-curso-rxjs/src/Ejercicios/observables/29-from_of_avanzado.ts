//========================================================
// 29. Más ejemplos con from y of
//========================================================

import { of, from } from 'rxjs';

/**
 * of = toma argumentos y genera una secuencia de valores
 * from = crea un observable en base a un array, promie, iterable, observable
 */

const observer = {
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
}

const source$ = from( [1,2,3,4,5] ); // Hace varias emisiones
const source2$ = of( [1,2,3,4,5] ); // Hace una sola emisión

const source3$ = from('Ariadna'); // Hace varias emisiones con cada una de las letras
const source4$ = of('Ariadna'); // Hace una emisiones con el valor completo

// El from nos permite tomar casi cualquier cosa y convertirla en un observable
// En el siguiente ejemplo vamos a mandar una promesa usando el fetch que permite realizar
// una petición http.
// Para saber más sobre el Fetch API podemor ir a https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// Para saber sobre la compatibilidad del fetch podemir ir a https://caniuse.com/?search=fetch
const source5$ = from( fetch('https://api.github.com/users/klerith') );

source$.subscribe( observer );
console.log('---------------------------');

source2$.subscribe( observer );
console.log('---------------------------');

source3$.subscribe( observer );
console.log('---------------------------');

source4$.subscribe( observer );
console.log('---------------------------');

source5$.subscribe( observer );
console.log('---------------------------');

source5$.subscribe( async(resp) => {
    console.log( resp.ok );
    console.log( resp.url );

    // Para obtener la data usamos el async y el await
    const dataResp = await resp.json();
    console.log( dataResp );
    
});

//-----------------------------------------------------------------------

// Creamos una función generadora o mejor dicho un iterable en JavaScript, para ver más información podemos
// visitar: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Generator
const miGenerador = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const miIterable = miGenerador();

// Si quiero barrer cada uno de los valores de la forma tradicional hariamos
for( let id of miIterable ){
    console.log( id );
}

// Pero realmente puedo usar el form para obtener el mismo resultado
from( miIterable ).subscribe(observer);