//========================================================
// 81. switchMap vs mergeMap
//========================================================

// NOTA: El switchMap solo mantiene una suscripción interna activa
//       mientras que el mergeMap puede mantener todas las que necesitems
//       o todas la que queramos activas simultaneamente corriendo, y por
//       lo tanto hay que tener cuidado con el mergeMap ya que mal implementado
//       puede causar un problema de memoria en nuestra aplicación.
 
import { fromEvent, interval, mergeMap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const click$ = fromEvent( document, 'click' );
const interval$ = interval(1000);

click$
.pipe(
    // mergeMap( () => interval$ )
    switchMap( () => interval$ )
).subscribe( console.log );