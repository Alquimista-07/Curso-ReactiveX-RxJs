//========================================================
// 71. Métodos Post, Put, Delete
//========================================================

import { ajax } from "rxjs/ajax";

const url = 'https://httpbin.org/delay/1';

// NOTA: Como habíamos visto tenemos como primer argumento el url y como segundo argumento 
//       son los headers
// GET
const obsGet$ = ajax.get( url, {
    'Content-Tyope': 'application/json',
    'mi-token': 'ABC123'
});

// POST
// NOTA: En este caso tenemos como primer argumento la url, como segundo argumento el body
//       y como tercer argumento los headers.
const obsPost$ = ajax.post( url, {
    id: 1,
    nombre: 'Ariadna'
}, {
    'mi-token': 'ABC123'
});

// PUT
// NOTA: En este caso tenemos como primer argumento la url, como segundo argumento el body
//       y como tercer argumento los headers, es decir, funciona exactamente igual que el POST.
const obsPut$ = ajax.put( url, {
    id: 2,
    apellido: 'Herández'
}, {
    'mi-token': 'EFG456'
});

// DELETE
// NOTA: En este caso tenemos como primer argumento la url, y como segundo argumento tenemos los headers
const obsDelete$ = ajax.delete( url, {
    'mi-token': 'EFG456'
});

obsGet$.subscribe( resp => console.log('Resp GET', resp) );
obsPost$.subscribe( resp => console.log('Resp POST', resp) );
obsPut$.subscribe( resp => console.log('Resp PUT', resp) );
obsDelete$.subscribe( resp => console.log('Resp DELETE', resp) );

//--------------------------------------------------------------------------------------------
// NOTA: Hay otra forma de realizar peticiones en caso de que necesitemos un poco
//       más de dinamismo, es decir, si mientras programación queremos determinar
//       si es un POST o un PUT lo que queremos realizar.
//--------------------------------------------------------------------------------------------
ajax({
    url: url,
    method: 'DELETE',          // NOTA: Por ejemplo el metodo lo podemos almacenar en una variable y cambiarla dependiendo del caso
    headers: {                 //       y aca en este caso con el delete no nos marca error ya que como sabenos este metodo solo usa
        'mi-token': 'ABC123'   //       la url y los headers y no importa si tenemos el body definido
    },
    body: {
        id: 1,
        nombre: 'Ariadna'
    }
}).subscribe( resp => console.log('Ajax dinámico:', resp) );