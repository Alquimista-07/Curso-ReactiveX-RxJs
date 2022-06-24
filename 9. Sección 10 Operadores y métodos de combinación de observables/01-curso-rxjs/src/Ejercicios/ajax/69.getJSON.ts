//========================================================
// 69. getJSON
//========================================================

//NOTA: Existe una manera más corta de ejecutar una petición HTTP
//      y obtener la información

import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';
// const url = 'https://api.github.com/users?per_page=5';

// Adicionalmente podemos mandar los headers como segundo argumento
// en caso de que necesitemos mandar header, un token y otras cosas
// entonces el getJSON nos permite hacerlo
const obs$ = ajax.getJSON( url, {
    'Content-Tyope': 'application/json',
    'mi-token': 'ABC123'
});

obs$
    .subscribe( data => console.log('data:', data) );