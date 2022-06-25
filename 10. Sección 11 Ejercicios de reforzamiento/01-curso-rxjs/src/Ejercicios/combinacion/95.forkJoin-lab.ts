//========================================================
// 95. forkJoin Lab - Caso de uso más común
//========================================================

// Realizar petición ajax de manera simultanea

import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'Alquimista-07';

forkJoin({
    // NOTA: Acá mandamos tres peticiones simultaneas de manera ordenada
    usuario: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}`
    ),
    repos: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}/repos`
    ),
    // NOTA: los gists son como pequeños bloques de código
    gists: ajax.getJSON(
        `${GITHUB_API_URL}/${GITHUB_USER}/gists`
    )
})
// NOTA: Adicionalmente hay que tener en cuenta que todas las peticiones
//       se van a realizar ya que si falla una lo demás falla por lo tanto
//       controlamos el error de la siguiente manera:
.pipe(
    catchError( err => of(err.message) )
)
.subscribe( console.log );