import { Observable, Observer } from 'rxjs';

const obs$ = new Observable<String>( subs => {
    
    subs.next( 'Hola' ); 
    subs.next( 'Mundo' ); 
    
    subs.next( 'Hola' ); 
    subs.next( 'Mundo' ); 

    //-----------------------------------------
    // Forzamos a que dispare un error y ver
    // el comportamiento del error en el observer
    //-----------------------------------------
    /*
    const a = undefined;
    a.nombre = 'Ariadna';

    // No llego al complete
    */
    
    subs.complete();
    
    subs.next( 'Hola' ); 
    subs.next( 'Mundo' ); 
    
    
});


//========================================================
// 14. Observer y subscriber
//========================================================
// NOTA: Hay tres posibles argumentos que se pueden enviar a un subscribe:

/*
//--------------------------------------------------------------------------------------------------------------------------------------
// El primero es este del argumento del subscribe que es una función y que se tiene definido y basicamente lo que hace
// es procesar el next del subscriber. Y se puede interpretar que la función la estoy transformando el en un subscriber
//--------------------------------------------------------------------------------------------------------------------------------------
obs$.subscribe( resp => {
    console.log( resp );
});
*/

//--------------------------------------------------------------------------------------------------------------------------------------
// Hay otra opción para hacer esto
//--------------------------------------------------------------------------------------------------------------------------------------
/*
obs$.subscribe(
    // Lo que se va a mandar acá es algo llamado observer.
);
*/
   
//--------------------------------------------------------------------------------------------------------------------------------------
// Otra forma que nosotros tenemos para mandar información en el subscribe es definir tres callbacks o funciones.
// Y la primera sería como manejar el next, luego el error y luego el complete
//--------------------------------------------------------------------------------------------------------------------------------------
/*
obs$.subscribe(
    valor => console.log('next: ', valor),
    error => console.warn('error: ', error),
    () => console.info('Completado')
);
*/

//--------------------------------------------------------------------------------------------------------------------------------------
// Existe una tercera forma que le puedo mandar al subscribe para ejecutar lo mismo de
// lo anterior y ese algo se llama observer el cual lo vamos a definir como un objeto
// independiente y es una interface, es decir, me obliga a establecer lo que se necesita
// para que el observer o variable definida tenga todo lo que se necesita para que sea un
// observer válido
//--------------------------------------------------------------------------------------------------------------------------------------

// NOTA: El observer lo puedo mandar a una suscripción para que el subscribe ejecute automáticamente la instrucción
//       del next, error y complete
const observer: Observer<any> = {

    next    : valor => console.log('Siguiente [next]: ', valor),
    error   : error => console.warn('error [obs]: ', error),
    complete: () => console.info('Completado [obs]')  

};

// Recordando para ejectar un observable tenemos que colocale su subscribe y enviamos el observer que se definio
// y tenemos exáctamente el mismo resultado de las otras formas anteriores.
obs$.subscribe( observer );
