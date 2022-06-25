import { from, map } from 'rxjs';
/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */
(() =>{


  const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];

  const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());


  // Cambiar este FOR OF, por un observable y capitalizar las emisiones
  // for( let nombre of nombres ) {
  //   console.log( capitalizar(nombre) )
  // }

  from(nombres)
    .pipe(
        // Como la función tiene un unico argumento puedo mandar a llamar la función sin indicar el argumento
        // ya que sería lo mismo que hacer map( nombre => capitalizar(nombre) )
        map( capitalizar )
    )
    .subscribe( console.log );





})();

