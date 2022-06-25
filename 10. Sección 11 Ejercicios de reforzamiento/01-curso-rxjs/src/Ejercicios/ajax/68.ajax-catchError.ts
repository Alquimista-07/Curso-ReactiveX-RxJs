//========================================================
// 68. Petición usando ajax de RxJs - catchError
//========================================================

// NOTA: Ahora si vamos a usar rxjs para realizar peticiones AJAX
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

// const url3 = 'https://api.github.com/users?per_page=5';
const url3 = 'https://api.github.com/usersX?per_page=5';

// Creamos uan función de flecha para enviarla al catchError
const atrapaError = (err: AjaxError) => {
    // Ahora acá viene lo que quiero hacer cuando recibo el error
    console.warn( 'Error en:', err.message );
    // NOTA: Retornamos cualquier cosa en este caso un observable usando of con 
    //       un arreglo vacío o un objeto en caso de que fuera un solo usuario
    return of([]); 
}

// NOTA: Usamos rxjs para hacer la petición y acá ya nos damos cuenta que la respuesta no viene
//       como un ReadableStream como sucedía con el fetchAPI sino que ya nos devuelve el objeto 
//       con la data directamente.
// NOTA 2: El operador catchError no solo sirve para atrapar errores en las peticiones http, sino 
//         que sirve para atrapar cualquier error que suceda en el observable. Cuando ocurre un 
//         error (X) nosotros podemos decidir que hacer inmediatamente, ya sea retornar un mensaje 
//         de error o bien retornar un observable el cual puede emitir cualquier valor.
//         Adicionalmente cabe resaltar que el catch error siempre tiene que retornar algo, ya sea 
//         el mensaje de error o un nuevo observable.
ajax( url3 )
    .pipe(
        // map( resp => resp.response ),
        pluck( 'response' ), // Usando el pluck aún es más sencillo para obtener la información
        // Ahora para manejar el error tenemos otro metodo de rxjs 
        catchError( atrapaError )
    )
    .subscribe( users => console.log('usuarios:', users) );