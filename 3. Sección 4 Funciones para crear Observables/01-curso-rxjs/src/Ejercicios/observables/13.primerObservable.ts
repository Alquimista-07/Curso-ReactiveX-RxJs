//========================================================
// 13. Nuestro primer observable
//========================================================

// Para crear un observable es necesario hacer la importación.
// Adicionalmente cuando observemos que el objeto se extrae directamente del rxjs significa
// que es algo para crear observables.
import { Observable } from 'rxjs';

// Existen varias formas para crear observables:

// -------------------------------------
// La siguiente es una forma:
// -------------------------------------

// NOTA: El símbolo $ indica que es un observable, pero esto es un estándar y no es obligatorio
/*
const obs$ = Observable.create();
*/

// -------------------------------------
// La siguiente es otra forma:
// -------------------------------------

// NOTAS: * El símbolo $ indica que es un observable, pero esto es un estándar y no es obligatorio.
//
//        * El observable recibe un objeto llamado subscriber (Abreviado a subs pero no es necesario que
//          tenga ese nombre esot es solo para efectos ilustrativos). 
//
//        * Adicionalmente los observables tiene su tipado y es recomendado indicar el tipo el cual se indica 
//          entre <> y pueden ser string, objetos, alguna clase, listados, arreglos, etc.
const obs$ = new Observable<String>( subs => {

    // Esta definición de mi observable me va a permitir crear subscripciones (algo que va a estar
    // pendiente de las emisiones del observable)
    subs.next( 'Hola' ); //El next() basicamente va a emitir el valor que yo quiero a los suscriptores
    subs.next( 'Mundo' ); 

    subs.next( 'Hola' ); 
    subs.next( 'Mundo' ); 

    // Sucede algo importante cuando se llama el complete ya que ninguna emisión posterior a la llamada
    // del complete va a ser notificada a sus suscriptores
    subs.complete();

    // Por lo tanto esto ya no es notificado debido a que se dio el complete
    subs.next( 'Hola' ); 
    subs.next( 'Mundo' ); 

    
});

// Para que un observable se ejecute tiene que tener una subscripción
obs$.subscribe( console.log );