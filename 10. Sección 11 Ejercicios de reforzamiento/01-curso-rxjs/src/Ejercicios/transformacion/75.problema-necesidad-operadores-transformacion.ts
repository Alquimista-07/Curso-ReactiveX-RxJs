//==========================================================================
// 75. Introducción al problema y necesidad de operadores de transformación
//==========================================================================
import { fromEvent } from 'rxjs';
import { debounceTime, map, pluck } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append( textInput, orderList );

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

input$
    .pipe(
        debounceTime( 500 ),
        // NOTA: Vamos a hacer realizar varias transformaciones dentro del map, pero lo ideal sería
        //       que cada operador se ocupe de un unica tarea
        map( event => {
            // NOTA: Extraemos el valor y realizamos una petición ajax
            const texto = event.target['value'];
            return ajax.getJSON(
                `https://api.github.com/users/${ texto }`
            );
        })
    )
    // NOTA: Entonces aca nos esta llegando un observable por lo tanto lo pasamos por otros subscribe
    .subscribe( resp => {
        // NOTA: Ahora acá tenemos un problema ya que si a dicah respuesta necesito extraerle una propiedad
        //       entonces tendríamos que hacer algo un poco más elaborado como agregar otro pipe pero acá ya
        //       empezamos a ver los inconvenientes ya que se esta haciendo un poco complejo manejar esta cadena
        //       de observables y a su vez la cadena de operadores. Sería genial que al emitir un valor en el input
        //       se disparara la petición ajax y que en este subscribe yo ya tuviera toda la información del objeto
        //       que necesito, entonces acá es donde entra el tema de los operadores de transformación, los cuales 
        //       permiten transformar el observable completamente o bien cambiar la emisión para que nosotros podamos
        //       unificar las emisiones de los observables para si simplificar el código
        resp
            .pipe(
                pluck('url')
            )
            .subscribe( console.log )
    });