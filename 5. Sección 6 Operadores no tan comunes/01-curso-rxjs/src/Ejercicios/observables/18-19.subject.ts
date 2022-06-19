//========================================================================================
// 18. Subject y 19. Subject - Parte 2
//========================================================================================

// El subject tiene varias características importántes las cuales son: 

/* 
1- Casteo múltiple: Esto se refiere a que muchas subscripciones van a estar sujetas al mismo subject
o a ese mismo observable y va a servir para distribuir la misma información a todos
los lugares donde estén suscritos o a todos los lugares que les interese ese valor.

2- También es un observer: Esta es una característica muy interesante yq que va a permitir mandarlo como 
argumento al subscribe.

3- También se puede manejar lo que es el next, error y complete
*/

// NOTA: Cuando la data es producida por el observable en sí mismo, es considerado un "Cold Observable".
//       Pero cuando la data es producida FUERA del observable es llamdo "Hot Observable". Y en pocas
//       palabras un Subject nos permite transformar un "Cold Observable" en un "Hot Observable"

import { Observable, Observer, Subject } from "rxjs"; 

const observer: Observer<any> = {
    next    : value => console.log('next:', value),
    error   : error => console.warn('error:', error),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subs => {

    //Quiero que esto emite numeros aleatorios cada segundo
    const intervalId = setInterval( 
        () => subs.next( Math.random() ), 1000 
    );

    return () => {
        clearInterval( intervalId );
        console.log( 'Intervalo destruido' );
    };

}); 

//---------------------------------------------------------------------------------------------------------------------------
// NOTA: Ahora como vemos en consola tenemos 2 subscipciones suscritas al mismo intervalo pero si se observa en la consola
//       vemos que los valores emitidos por ambas son totalmente diferentes
/*
// De momento comentamos esto pero se puede ver el comportamiento que deciamos que genera valores
// diferentes descomentando las siguientes 2 lineas de código

const subs1 = intervalo$.subscribe( rnd => console.log( 'Subs1: ', rnd ) );
const subs2 = intervalo$.subscribe( rnd => console.log( 'Subs2: ', rnd ) );
*/
//---------------------------------------------------------------------------------------------------------------------------

// NOTA: Entonces en base a lo anterior que pasaría si necesitaramos crear subscripciones y que los valores emitidos dentro de la
//       suscripción sean exáctamente los mismos. Entonces para hacer eso necesitamos hacer lo siguiente:

// Creamos el subject
const subject$ = new Subject();

const subscription = intervalo$.subscribe( subject$ );

// Por lo tanto ahora con el subject nos subscribimos al subject y vemos que ahora los valores son exáctamente los mismos.
const subs3 = subject$.subscribe( rnd => console.log( 'Subject Subs3: ', rnd ) );
const subs4 = subject$.subscribe( rnd => console.log( 'Subject Subs4: ', rnd ) );

const subs5 = subject$.subscribe( observer );
const subs6 = subject$.subscribe( observer );

setTimeout( () =>{

    // Recordando que el subject es un observer entonces tenemos disponible el next, error y complete
    subject$.next(10);

    subject$.complete();

    // Con esto deberíamos ver la limpieza del interval ya que recordando el metodo del return del observable
    // no es llamado hasta que no se ejecute el unsubscribe por lo tanto el intervalval continua consumiendo
    // memoria en el background aunque sea un consumo menor continua consumiendo.
    subscription.unsubscribe();

}, 3500);

//-------------------------------------------------------------------------------------------------------------------
// NOTA GENERAL: Todo lo que acabamos de ver a lo largo des estas 2 clases de los subject da preámbulo al siguiente
//               tema de la siguiente sección ya que acá vamos pensando que crearse estos observables manualmente es
//               muy tedioso y hay muchas cosas que pueden salir mal sin darnos cuenta, como en el caso que tenemos 
//               que nuestro intevalo iba a seguir ejecutandose en el fondo sin que nos dieramos cuenta, pero una de
//               las características del rxjs o de las extensiones reactivas en general es que nos faciliten a nosotros
//               la construcción de observables ya que no es común dedicar tanto tiempo a crear un observable ya que
//               reactive extensions tiene un montón de funciones para crear observables dependiendo de las necesitades
//               que tengamos y manejar un intervalo de forma limpia y sencilla es una de ellas pero esto es tema para la
//               siguiente sección.
//-------------------------------------------------------------------------------------------------------------------