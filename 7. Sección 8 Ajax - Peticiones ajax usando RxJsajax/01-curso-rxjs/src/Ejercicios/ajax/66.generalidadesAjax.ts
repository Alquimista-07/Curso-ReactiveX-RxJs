//===========================================================
// 66. Conceptos generales de una petición ajax usando Fetch
//===========================================================

// const url = 'https://api.github.com/users?per_page=5';
const url = 'https://api.github.com/userXs?per_page=5';

// Hacemos al llamado de la petición al la url usando FetchAPI
const fetchPromesa = fetch( url );

fetchPromesa
    .then( resp => resp.json() )
    .then( data => console.log('data:', data) )
    // NOTA: Acá tenemos un inconveniente bastante serio ya que si el url no es correcto en la promeda donde tenemo la data
    //       nos muestra es el error pero se supone que ahí debería manejar la información de los usuarios. Y lo correcto es
    //       que el catch lo manejara y nos mostrara el error en amarrillo pero resulta que hasta este punto no se eta llegando
    //       y por lo tanto este error a esta api de la forma que se esta haciendo no se esta interceptando de forma clara y peor
    //       aún ya que perderíamos la oportunidad de reintentar hacer la petición en caso de que fuera algún timeout porque el 
    //       la conexión estaba algo lenta o no se tenia internet, en fin varias cosas.
    .catch( err => console.warn( 'Error en usuarios', err ) );