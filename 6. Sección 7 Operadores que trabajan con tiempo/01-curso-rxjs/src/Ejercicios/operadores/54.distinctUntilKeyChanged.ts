//========================================================
// 54. distinctUntilKeyChanged
//========================================================

// NOTA: El operador distinctUntilKeyChanged tiene el mismo concepto 
//       que el distinctUntilChanged solo que este va a estar pendiente 
//       de la propiedad que se le indique.

import { distinctUntilKeyChanged, from } from 'rxjs';


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
        distinctUntilKeyChanged( 'nombre' )
    )
    .subscribe( console.log );