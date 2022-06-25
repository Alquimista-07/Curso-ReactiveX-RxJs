//========================================================
// 83. exhaustMap
//========================================================

//NOTA: El operador exhaustMap es otro de los operadores de aplanamiento, es decir, recibe un observable y maneja 
//      la suscripción internamente. Cuando exhaustMap recibe una entrada este se suscribe automáticamente y empieza 
//      a emitir valores, pero si recibe una nueva entrada y la anterior no se ha completado esta nueva entrada va a 
//      ser ignorada y la que estaba suscrita primer continua con su trabajo hasta que se complete, posteriormente si 
//      vuelve a recibir una suscripción este valida si tiene una suscripción activa y como no la tiene ahí si automáticamente 
//      va a empezar a emitir valores nuevamente. En pocas palabras el exhaustMap solo mantiene una suscripción activa 
//      a la vez antes de poder añadir otra suscripción.

import { interval, take, fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

const interval$ = interval(500).pipe( take(3) );
const click$ = fromEvent( document, 'click' );

click$.pipe(
    exhaustMap( () => interval$ )
).subscribe( console.log );