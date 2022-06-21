//========================================================
// 35. pluck
//========================================================

// NOTA: El operador pluck es sumamente útil cuando nosotros ocupamos extraer simplemente 
//       un valor del objeto que estamos recibiendo y que ese sea la nueva emisión o salida 
//       del observable. El pluck adicionalmente también puede trabajar con objetos anidados.

import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';


const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' );

// Ahora vamos a usar el pluck en base al anterior obserbale
const keyUpPluck$ = keyUp$.pipe(
    // Si vemos la documentación que nos ofrece VS Code vemos que recibe una gran cantidad de propiedades o argumentos.
    
    /*
    // Acá obtenemos el key
    pluck('key')
    */

    // Entonces ahora que pasaría si necesito una propiedad que esta dentro de otra propiedad dentro de un objeto, es decir,
    // un objeto dentro de otro objeto y una propiedad de ese objeto.
    // Y básicamente lo siguiente sería como usar la notación de punto pero en lugar de punto estamos usando una coma y tienen
    // que ser string lo que mando
    pluck('target', 'baseURI')
);

keyUp$.subscribe( console.log );

keyUpPluck$.subscribe( code => console.log('pluck', code) );