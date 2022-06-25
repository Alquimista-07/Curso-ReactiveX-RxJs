//========================================================
// 47. take
//========================================================

//NOTA: El operador take es sumamente útil cuando queremos limitar la cantidad de emisiones 
//      que un observable puede tener. Otra característica del take es que cancela la 
//      ejecución del observable.

import { of, take, tap } from 'rxjs';

const numeros$ = of(1,2,3,4,5);

numeros$.pipe(
    tap( t => console.log('tap', t)),
    take(3)
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
});