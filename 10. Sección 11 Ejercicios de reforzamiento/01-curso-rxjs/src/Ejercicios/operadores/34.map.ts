//========================================================
// 34. map
//========================================================

// NOTA: Es uno de los más comunes y más usado ya que nos permite transformar lo que recibimos o lo que emite el observable en algo que necesitemos, 
//       nos puede servir para extraer información, o bien para transformarla o si se desea regresar otra cosa totalmente diferente.
//       El operador map trabaja con cualquier tipo de dato que emita y puede regresar cualquier otro tipo de dato también diferente.
import { fromEvent, range } from 'rxjs';
import { map } from 'rxjs/operators';

//-----------------------------
// Ejemplo 1
//-----------------------------
// Usamos un range para crear un observable que luego vamos a transformar con el map
range(1,5)
    // Para trabajar con los operadores lo vamos a pasara por un método que es el pipe
    // y dentro de este vamos a colocar nuestro o nuestros operadores
    .pipe(
        // Acá vamos a recibir el valor correspondiente a la emisión que viene del operador anterior
        // ya que estos se ejecutan secuencialmente, es decir, el anterior le deja el valor al siguiente
        // y así sucesivameten. Pero para este caso como no los estamos encadenando entonces el map va a
        // recibir lo que le esta dejando el observable que en este caso es el range.
        /*
        // Esto es cuando le queremos dar cuerpo
        map<number, number>( val => {
            return val * 10
        })
        */
       // Lo siguiente regresa un string y como solo tenemos un calculo lo podemos mandar directamente si colocar cuerpo y return
       map<number,string>( val => (val * 10).toString() )
    )
    .subscribe( console.log );

//-----------------------------
// Ejemplo 2
//-----------------------------
const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyUpCode$ = keyUp$.pipe(
    map( event => event.code )
);

keyUpCode$.subscribe( code => console.log('map', code) );