import { fromEvent, tap } from 'rxjs';
import { map } from 'rxjs/operators';
//================================================================================
// 40. Laboratorio - ProgressBar y 41. Laboratorio - ProgressBar (segunda parte)
//================================================================================

// Creamos un contenido html generico
const texto = document.createElement('div');
texto.innerHTML = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, magna sed ultricies suscipit, velit neque tempor leo, ac auctor tortor magna vel diam. Aenean eu libero non tellus interdum pulvinar ac in lectus. Pellentesque suscipit semper condimentum. Donec sodales dolor vel mi pellentesque, quis eleifend nulla consectetur. Maecenas nulla erat, gravida sit amet leo vitae, dignissim condimentum turpis. Quisque non arcu id ligula bibendum fermentum nec at nulla. Fusce et ex sollicitudin, sollicitudin lorem quis, ultrices nibh. Ut facilisis nunc ac massa dignissim vehicula. Pellentesque ac sem vitae tellus sollicitudin tristique. Donec gravida velit eu tincidunt venenatis. Curabitur vitae urna nisl. Ut vestibulum a turpis sit amet porta.
<br/><br/>
Nulla lectus quam, congue laoreet lectus quis, volutpat interdum arcu. Suspendisse at rutrum ligula. Donec pellentesque, nibh sed consequat pulvinar, augue neque interdum urna, quis luctus dui libero id nisl. Suspendisse potenti. Integer porttitor metus sed pretium elementum. Praesent venenatis, lacus elementum facilisis efficitur, eros tortor ullamcorper erat, ac lacinia augue ligula sit amet nibh. Duis consequat nisl eget quam venenatis scelerisque. Aliquam vitae sodales ipsum.
<br/><br/>
Integer est turpis, euismod eu ipsum at, faucibus pretium sapien. Praesent a feugiat mauris. Quisque mattis vel libero quis semper. Vestibulum nec enim sapien. Morbi accumsan pellentesque suscipit. Quisque at dignissim sem. Morbi ullamcorper sagittis mauris eget lobortis.
<br/><br/>
Donec scelerisque tristique magna, sed ultricies ante malesuada in. Duis laoreet congue tellus, at fermentum sem ornare at. Donec consectetur lorem elementum ante gravida elementum. Vestibulum ac ante ac mauris lacinia dictum. Aliquam erat volutpat. Morbi sit amet felis non enim congue ornare sed vitae odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eu nisl odio. In vitae massa nec metus pharetra volutpat.
<br/><br/>
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque sed ligula sagittis, pulvinar neque sit amet, commodo lorem. Sed ac felis quis sapien cursus fringilla. Suspendisse sed ullamcorper ipsum, vel pulvinar sem. Aliquam eu mauris odio. Cras augue justo, pretium eu nibh et, ultricies vehicula ipsum. Nulla congue ullamcorper felis a sodales. Vivamus metus nulla, imperdiet vitae libero at, convallis blandit sem. Integer facilisis a libero eu hendrerit. Donec auctor mauris in scelerisque elementum.

`;

// Hecemos la referencia al body
const body = document.querySelector('body');
// Agregamos el elemento al body
body.append(texto);

// Creamos el progressbar, el cual es un div que esta en una posición fija que va a ir incrementado
// su ancho dependiendo del scroll que vayamos haciendo o bien en base a un procentaje si así lo
// queremos ver

const progressBar = document.createElement('div');
// Lea asignamos una clase
progressBar.setAttribute('class', 'progress-bar');
// Agregamos el elemento al body
body.append(progressBar);

// Función que haga el calculo del porcentaje que tiene que tener le progressbar
const calcularPorcentajeScroll = ( event ) => {

    const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
    // console.log( scrollTop, scrollHeight, clientHeight );

    // Calculamos el porcentaje
    return ( scrollTop / ( scrollHeight - clientHeight ) ) * 100;

}

// Nos suscribimos al scroll del html
// Streams
const scroll$ = fromEvent(document, 'scroll');

// scroll$.subscribe(console.log);

const progress$ = scroll$.pipe(
    /*
    map( event => calcularPorcentajeScroll(event) )
    */
    // Lo siguiente es lo mismo de lo anterior de forma abreviada
    map( calcularPorcentajeScroll ),
    // Colocamos un tap para saber si el calculo esta bien hecho
    tap( console.log )
);

// El siguiente observable debería de emitir cual es el procentaje en el cual
// necesito establecerle al progressBar cual es el ancho que va a tenera
progress$.subscribe( porcentaje => {

    //Tomamos el elemento html para asignar el nuevo percentade del width
    progressBar.style.width = `${ porcentaje }%`;

});