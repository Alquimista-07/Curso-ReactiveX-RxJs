//========================================================
// 77. Tipando los operadores
//========================================================

// NOTA: Para el tipado en este caso lo más inportante es tipar el inicio y el fin
//       del stream de información que va a través de los operadores, pero para este
//       caso en el ejemplo vamos a tipar cada uno de los operadores de inicio a fin

import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, mergeAll } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { GithubUser } from '../../interfaces/github-user.interface';
import { GithubUsersResp } from '../../interfaces/github-users';

// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append( textInput, orderList );

// Helpers
// Creamos una función que sirva para colocar la información de la respuesta en el html
const mostrarUsuarios = ( usuarios: GithubUser[] ) => {

        console.log(usuarios);
        orderList.innerHTML = '';

        for( const usuario of usuarios ){

                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = usuario.avatar_url;

                const anchor = document.createElement('a');
                anchor.href = usuario.html_url;
                anchor.text = 'Ver Página';
                anchor.target = '_blank';

                li.append( img );
                li.append( usuario.login + ' ' );
                li.append( anchor );

                orderList.append( li );

        }

}

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

input$.pipe(
        // NOTA: En este caso a diferencia del anterior ejercicio acá si cada uno de nuestros operadores
        //       esta realizando una única tarea.
        debounceTime<KeyboardEvent>( 500 ),
        map<KeyboardEvent,string>( key => key.target['value'] ),
        map<string, Observable<GithubUsersResp>>( texto => ajax.getJSON(
             `https://api.github.com/search/users?q=${ texto }`
            )
        ),
        // NOTA: Usamos el operador mergeAll para que se suscriba y unifique los valores del observable 
        //       que nos esta regresando el map.
        mergeAll<Observable<GithubUsersResp>>(),
        map<GithubUsersResp, GithubUser[]>(item => item.items)
).subscribe( mostrarUsuarios );