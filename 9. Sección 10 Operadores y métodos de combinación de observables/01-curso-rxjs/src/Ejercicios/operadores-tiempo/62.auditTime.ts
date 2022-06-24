//========================================================
// 62. auditTime
//========================================================

//NOTA: El operador auditTime lo que hace es emitir el último valor que ha sido 
//      emitido por el observable en un periodo de tiempo determinado, es decir, 
//      inicia a contar y escuchar cuando se emite un valor y mira si hay más valores 
//      en dicho tiempo, en caso de ser así emite el último valor. Adicionalmente 
//      si el observable se completa antes del tiempo determinado este no va a emitir 
//      nada.

import { auditTime, fromEvent, tap } from 'rxjs';
import { map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
    .pipe(
        map( ({ x }) => x ),
        tap( val => console.log('tap', val) ),
        auditTime( 3000 )
    )
    .subscribe(console.log)