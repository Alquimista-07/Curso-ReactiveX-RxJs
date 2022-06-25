//========================================================
// 94. forkJoin
//========================================================

//NOTA: El forkjoin también puede recibir varios observables como argumentos para trabajar 
//      los cuales van a ser retornados como un arreglo, pero con una configuración se pueden 
//      retornar como un objeto. Otra cosa que hay que tener en cuenta es que cada uno de los 
//      operadores que reciba el forkJoin tienen que ser finitos, de lo contrario este no emitirá 
//      ningún valor.

import { forkJoin, interval, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

const numeros$ = of(1,2,3,4); // Síncrono y finito
const intervalo$ = interval(1000).pipe( take(3) ); // Asíncrano e infinito entonces controlamos las emisiones con un take
const letras$ = of('a','b','c').pipe(delay(3500)); // Síncrono, finito y con un retardo de tiempo por lo tanto es el ultimo en completarse

forkJoin( 
    numeros$,
    intervalo$,
    letras$
).subscribe( console.log );

// Ahora si queremos usar los valores hacemos referencia a cada posición del arreglo
forkJoin( 
    numeros$,
    intervalo$,
    letras$
).subscribe( resp =>{
    console.log('numeros:', resp[0]);
    console.log('intervalo:', resp[1]);
    console.log('letras:', resp[2]);
});

// Hay otra manera mandando como un objeto
forkJoin({
    numeros$,
    intervalo$,
    letras$
}).subscribe( resp =>{
    console.log('respuesta:', resp );
    console.log('intervalo:', resp.intervalo$ );
    console.log('numeros:', resp.numeros$ );
    console.log('letras:', resp.letras$ );
});

// Ahora si necesitamos cambiar el nombre a las llaves
forkJoin({
    num  : numeros$,
    inter: intervalo$,
    lets : letras$
}).subscribe( resp =>{
    console.log('respuesta:', resp );
    console.log('intervalo:', resp.inter );
    console.log('numeros:', resp.num );
    console.log('letras:', resp.lets );
});