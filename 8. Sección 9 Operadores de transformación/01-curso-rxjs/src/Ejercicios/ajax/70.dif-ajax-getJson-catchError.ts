//========================================================
// 70. Diferencias entre getJson y ajax
//========================================================

import { of, pipe } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

const url = 'https://httpbin.org/delay/1';
const url2 = 'https://httpbinx.org/delay/1';

// Función para el manejo del error
const manejaError = ( resp: AjaxError ) => {
    console.warn('error', resp.message);
    return of({
        ok: false,
        usuarios: []
    });
}

//-----------------------------------------
// Ejemplo
//-----------------------------------------

const obs$ = ajax.getJSON( url )
        .pipe(
            catchError( manejaError )
        );
        
const obs2$ = ajax( url )
        .pipe(
            catchError( manejaError )
        );

obs$.subscribe( data => console.log('getJSON:', data) );
obs2$.subscribe( data => console.log('ajax:', data) );

//-----------------------------------------
// Ejemplo
//-----------------------------------------
// NOTA: Hay otra forma de manejar el error si no lo queremos hacer como está en las anteriores línead
//       de código y se hace de la forma que habíamos visto cuando vimos que en el subscribe podemos 
//       mandar un observer el cual recibe el next, el complete y el error.

const obs3$ = ajax.getJSON( url2 );

obs3$
    .pipe(
        catchError( manejaError )
    )
    .subscribe({
        next: val => console.log('next:', val),
        error: err => console.warn('Error en subs:', err),
        complete: () => console.log('complete')
});