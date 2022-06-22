//========================================================
// 42. reduce
//========================================================

// NOTA: El operador reduce básicamente hace lo mismo que el reduce en JavaScript, es decir, este lo que hace es 
//       aplicar una función acumuladora a las emisiones producidas por el observable. 

//---------------------------------------------------------------------
// Demostración de como funciona el reduce en JavaScript.
//---------------------------------------------------------------------
// Podemos ver el reduce como si fuera una bola de nieve que sale desde la punta de la montaña y a medida que va 
// rodando va a trapando más nieve y va creciendo, y realmente no vamos a saber que tan grande va a ser la bola
// de nieve hasta que llegue al final, entonces esto es más o menos la idea del reduce.
const numbers = [1,2,3,4,5];

const totalReducer = ( acumulador: number, valorActual: number ) => {
    return acumulador + valorActual;
};

const total = numbers.reduce( totalReducer, 0 );

console.log('Total arr', total);

//---------------------------------------------------------------------
// Demostración de como funciona el reduce con rxjs
//---------------------------------------------------------------------
import { interval, reduce, take, tap } from 'rxjs';

const totalReducerRxjs = ( acumulador: number, valorActual: number ) => {
    return acumulador + valorActual;
};

interval(1000).
    pipe(
        // Este operador take que luego se explica más adelante, básicamnete lo que hace es competar
        // el operador después de la cantidad de veces que se le especifique
        take( 3 ),
        // Usamos el tap para ver que esta sucediendo
        tap( console.log ),
        // Ahora si usamos el reduce de rxjs al cual como función acumuladora
        // le mandamos el totalReducerRxjs que se creo y como segundo parametro el valor inicial del acumulador
        // o simplemente no se puede especificar y este inicia en cero por defecto
        reduce( totalReducerRxjs, 5 )
    )
    .subscribe({
        next: val => console.log('next:', val),
        complete: () => console.log('Complete')
    });

// NOTA: Hay un pequeño inconveniente con el operador reduce y es que posiblemente nosotros necesitemos el valor
//       acumulado en el momento de la emisión, por ejemplo en el caso del interval del ejemplo necesitamos que 
//       cuando este emita un valor en ese preciso momento necesito saber el acumulado sin esperaar a que este
//       se complete para ir trabajando con él entonces en este caso el reduce no nos sirve pero existen otros
//       operadores que se explican más adelante que si nos permiten hacer esto.