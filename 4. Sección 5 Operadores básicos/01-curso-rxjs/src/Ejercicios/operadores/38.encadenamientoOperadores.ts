//========================================================
// 38. Cadenas de operadores
//========================================================

// NOTA: En el encadenamiento de operadores básicamente nosotros
//       podemos colocar cualquier cantidad de operadores dentro
//       del pipe teniendo en cuenta que el producto del anterior
//       operador va a ser la entrada del siguiente y por lo tanto
//       el orden es importante.

//       Adicionalmente también podríamos indicar varios pipe donde
//       cierra el anterior pero usualmente si se quiere transformar 
//       todo desde el inicio de un observable hasta la salida se hace 
//       en un solo pipe, pero hay que tener en cuenta que se pueden 
//       colocar varios o varias etapas si así se desea.

import { from, fromEvent } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';

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
        filter( personaje => personaje.tipo === 'heroe' ),
    )
    .subscribe(console.log);


const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' )
               .pipe(
               // NOTA: Los operadores se ejecutan de arriba hacia abajo
                    map( event => event.code ),  // keyboardEvent, string
                    filter( key => key === 'Enter' ),
                    mapTo('Enter presionado')
               );

keyUp$.subscribe( console.log );