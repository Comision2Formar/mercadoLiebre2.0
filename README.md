# Trabajo Práctico Integrador "MERCADO LIEBRE" by Eric
## Guía para comenzar un nuevo proyecto - (Práctica #6 HTML+CSS)

1.- Si se elige trabajar con **express-generator** chequear que esté instalado en el sistema, de lo contrario instalarlo de forma global tecleando en la **terminal** la siguiente linea:
~~~
npm install express-generator -g
~~~
_en el caso de tener linux o macOS añadir **sudo** previamente_

2.- Iniciar un nuevo proyecto de express-generator: 
~~~
express mercadoliebre -ejs 
~~~
_considerando **-ejs** como el motor de vistas a usar en nuestro proyecto_

3.- Posicionándo la **terminal** en la carpeta recién creada, instalar las dependencias:
~~~
npm install
~~~
4.- Utilizar el index.js para el proyecto, reemplazando el código existente con una nueva estructura usando el atajo del **emmet**
~~~
html:5 
~~~
5.- Cambiar el lenguaje para evitar que chrome sugiera a cada momento traducir la página
~~~
<html lang="es">
~~~
6.- linkear con **fontawesome** añadiendo la siguiente línea de código en el <**head**>:
~~~
<script src="https://kit.fontawesome.com/3f21023fe6.js" crossorigin="anonymous"></script>
~~~
_se sugiere crear su propia cuenta en la página de_ [Font Awesome](https://fontawesome.com/start)

7.- Linkear con **bootstrap** añadiendo la siguiente línea en el <**head**>:
~~~
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
~~~
8.- Agregar antes del cierre de la etiqueta <**body**> los script que proporciona **boostrap**
~~~
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
~~~
_Pueden copiar estas las lineas del sitio ofical de_ [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

8.- Usar el archivo **style.css** que se encuentra en la carpeta **/public/stylesheets** y linkearlo al archivo **index.ejs** añadiendo la siguiente linea antes del cierre de la etiqueta <**head**>
~~~
<link rel='stylesheet' href='/stylesheets/style.css' />
~~~
_Considerar que express-generator viene configurado por defecto para acceder a la carpeta **public** por lo tanto no es necesario añadirla en la ruta_

9.- A codear...

## Guía de la práctica #7 - TEMPLATE ENGINES - EJS
https://github.com/EricM76/mercadoLiebre/pull/1#issue-464350790
