//==========================================================================
// 84. Ejercicio de comparación entre el mergeMap, switchMap y exhaustMap
//==========================================================================

import { fromEvent, map, mergeMap, of, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, pluck, switchMap, exhaustMap } from 'rxjs/operators';

// Helper
const peticionHttpLogin = ( userPassword ) => ajax.post('https://reqres.in/api/login?delay=1', userPassword )
                                                  .pipe(
                                                    pluck('response', 'token'),
                                                    catchError( err => of('???') ) // Manejamos el error para que no se rompa la aplicación
                                                  );

// Creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitBtn = document.createElement('button');

// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append( inputEmail, inputPass, submitBtn );
document.querySelector('body').append( form );

// Streams
// Prevenimos el refresh del navegador al hacer el submit del formulario
const submitForm$ = fromEvent<Event>( form, 'submit' )
    .pipe(
        tap( ev => ev.preventDefault() ),
        map( ev => ({
            email: ev.target[0].value,
            password: ev.target[1].value
        })),
        // mergeMap( peticionHttpLogin ),  // Envía cuantas suscripciones se envíen (ver documentación en archivo de notas o ejercicios realizados)
        // switchMap( peticionHttpLogin ), // Cancela las suscripciones anteriores y solo manda una (ver documentación en archivo de notas o ejercicios realizados)
        exhaustMap( peticionHttpLogin )    // Envía solo 1 petición (ver documentación en archivo de notas o ejercicios realizados)
    );

submitForm$.subscribe( token => {
    console.log('Token:', token);
});