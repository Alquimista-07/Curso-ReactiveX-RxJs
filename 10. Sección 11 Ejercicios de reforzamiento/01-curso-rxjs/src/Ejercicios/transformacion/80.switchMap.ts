//========================================================
// 80. switchMap
//========================================================

// NOTA: El operador switchMap es muy parecido al mergeMap pero en lo que se diferencia 
//       es la forma en la que se maneja cuando el source emite un nuevo valor ya que 
//       cuando se genera una nueva línea de tiempo la anterior automáticamente se va a 
//       completar cosa que con el mergeMap no sucede. El switchMap es un operador que 
//       recibe un callback y retorna un observable, ese nuevo observable es el que se 
//       va a suscribir para hacer la emisión en la salida.

import { fromEvent } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';


// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append( textInput, orderList );

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

const url = 'https://httpbin.org/delay/1?arg=';

input$ .pipe(
    pluck('target', 'value'),
    switchMap( texto => ajax.getJSON( url + texto ) )
).subscribe( console.log );