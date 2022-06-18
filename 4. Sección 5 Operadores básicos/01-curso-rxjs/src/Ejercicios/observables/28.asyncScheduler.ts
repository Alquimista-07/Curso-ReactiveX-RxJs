//========================================================
// 28. asyncScheduler
//========================================================

// NOTA: El asyncScheduler no crea un observable sino que crea es una
//       suscripción (una suscripción es el producto de un subscribe).

import { asyncScheduler } from 'rxjs';

// Básicamente estas dos instrucciones es lo que vamos a poder realizar con el asyncScheduler,
// pero aparte de tenere más control de lo que está sucediendo podemos usar el producto, podemos
// manejar la suscripción como cualquier otra suscripción en rxjs. Y básicamente estas dos funciones
// las podemos hacer con el asyncScheduler

// setTimeout( () => { }, 3000);
// setInterval( () => { }, 3000);

// Ejemplo
// Creamos una lamda function o función de flecha
const saludar = () =>  console.log('Hola Mundo!!!...');
const saludar2 = nombre => console.log(`Hola ${nombre}`);

// Creamos el asyncScheduler: Donde el primer argumento es la función que queremos ejecutar y el segundo
// es la cantidad de tiempo o delay que nosotros queremos ejecutar, es decir en el siguiente ejemplo después
// de dos segundos vemos el hola mundo
asyncScheduler.schedule( saludar, 2000 );

// Ahora que pasa si necesitamos mandar argumentos. Entonces para esto existe un tercer argumento que es el state,
// pero hay que dejar claro que no puedo mandar más parámetros, es decir si la función recibe más de un argmento nos
// va a dar un error
asyncScheduler.schedule( saludar2, 4000, 'Ariadna' );

// Entonces en pocas palabras el estado debería ser un objeto, un arreglo, un número
// pero solo es un argumento esa es la condición.
asyncScheduler.schedule( saludar2, 4000, {a: 'Ariadna', b: 'Hernández'} );

// Ahora como configuro un setInterval usando un asyncScheduler.
// Hay que tener en cuenta que en este caso la función que recibe no puede ser una función de fleca o lambda funciton
const subs = asyncScheduler.schedule( function( state ){

    // Acá viene el cuerpo de lo que quero ejecutar
    console.log('state;', state);
    // Entonces para transformarlo en un interval lo que habría que hacer es volver a llamar el schecule
    // actualizando el valor del estado que va a ser pasado para la siguiente llamada
    this.schedule( (state + 1), 1000 ) // Adicionalmente también podemoas mandar el delay

}, 6000, 0);

// Ahora para pararlo como sabemos el asycScheduler regresa una subscripción
// entonces cancelamos la suscripción como se hace con los observables
/*
setTimeout(() => {
    subs.unsubscribe();
}, 10000);
*/

// Ahora podemos también cancelar la subscripción con un asyncScheduler
asyncScheduler.schedule( () => subs.unsubscribe(), 10000 ); 