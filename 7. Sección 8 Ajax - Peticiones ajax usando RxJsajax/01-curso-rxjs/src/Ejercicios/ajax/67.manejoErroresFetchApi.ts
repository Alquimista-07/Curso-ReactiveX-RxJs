//========================================================
// 67. Manejo de errores con el Fetch Api
//========================================================

// const url = 'https://api.github.com/users?per_page=5';
const url2 = 'https://api.github.com/userXs?per_page=5';

// Creamos una función que permita manejar los errores
const manejaErrores = ( response: Response ) => {

    if ( !response.ok ){
        throw new Error( response.statusText )
    }

    return response;

}

// Hacemos al llamado de la petición al la url usando FetchAPI
const fetchPromesa2 = fetch( url2 );

// fetchPromesa2
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn( 'Error en usuarios', err ) );

fetchPromesa2
    .then( manejaErrores )
    .then( resp => resp.json() )
    .then( data => console.log('data:', data) )
    .catch( err => console.warn( 'Error en usuarios', err ) );