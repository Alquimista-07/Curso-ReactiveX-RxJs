//========================================================================================
// 16. Subscription y unsubscribe
//========================================================================================

import { Observable, Observer } from "rxjs"; 

const observer: Observer<any> = {
    next    : value => console.log('next:', value),
    error   : error => console.warn('error:', error),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subscriber => {

    // Crear un contador, 1,2,3,4,5,...
    let cont = 0;

    const interval = setInterval( () => {
        // cada segundo
        cont++
        subscriber.next(cont);
        console.log(cont);

    }, 1000); // Emite cada segundo

    setTimeout(() => {
        // Cuando llamamos el subscriber complete, inmediatamente luego de que se ejecuta el código
        // del complete que se tiene en el observer se va a disparar la función que se tiene en el 
        // return
        subscriber.complete();
    }, 2500);

    // Ahora el observable tiene un return en el cual voy a poner el procedimiento
    // que quiero que se ejecute cuando se hace el unsuscribe
    return () => {
        clearInterval( interval );
        console.log( 'Intérvalo destruido' );
    }

});

// NOTA: Si dejamos el cursos sobre el subscribe lo que vemos es que todo el metodo del subscribe
//       retorna una subscription, osea una suscripción.
const subscription1 =  intervalo$.subscribe( observer );
const subscription2 =  intervalo$.subscribe( observer );
const subscription3 =  intervalo$.subscribe( observer );

// Y si notamos en la consola el aunque lo tenemos en una variable el código siempre se va a seguir ejecutando
// y no se detiene. Pero acá hay algo que si quiero cancelar la suscripción tengo que usar el unsubscribe

// Ahora supongamos que deseo cancelar la suscripción a los 3 segundos
setTimeout(() => {
    
    subscription1.unsubscribe();
    subscription2.unsubscribe();
    subscription3.unsubscribe();

    // Esto se dispara luego de que se ejecute el unsubscribe de cada una de las suscripciones
    // pero cuando se compñeta el observable, es decir cuando el susbscriber emite el complete
    // no se vuelve a ejecutar el código
    console.log('Completado timeout');

}, 6000);

// Ahora vemos que en la consola aparece 3 veces y la razón es porque tenemos 3 observables ya que cuando nos suscribimos a un
// observable ahí es donde empieza a ejecutar el código del observable

// NOTA: El unsuscribe no es lo mismo que el complete son cosas totalmente diferentes