//========================================================================================
// NOTA: Acá para continuar se toma como base el ejercicio de la clase 16. 
//========================================================================================

import { Observable, Observer } from "rxjs"; 

const observer: Observer<any> = {
    next    : value => console.log('next:', value),
    error   : error => console.warn('error:', error),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subscriber => {

    let cont = 0;

    const interval = setInterval( () => {
        cont++
        subscriber.next(cont);
        console.log(cont);

    }, 1000);

    setTimeout(() => {
        subscriber.complete();
    }, 2500);

    return () => {
        clearInterval( interval );
        console.log( 'Intérvalo destruido' );
    }

});

//========================================================================================
// 17. Terminar observables en cadena
//========================================================================================
// Podemos encadenar suscripciones a la suscripción original

const subs1 =  intervalo$.subscribe( observer );
const subs2 =  intervalo$.subscribe( observer );
const subs3 =  intervalo$.subscribe( observer );

// Encadenamos las suscripciones y como se observa se emite el en el return con el console.log(Intérvalo destruido) correspondiente
// a los unsubscribe de los 3 observables pero el compelte solo se emitió para el primero 
subs1.add( subs2 )
subs1.add( subs3 );

setTimeout(() => {
    
    subs1.unsubscribe()
    // subscription2.unsubscribe();
    // subscription3.unsubscribe();

    console.log('Completado timeout');

}, 6000);

