# RouteMaps
Repositorio para el desarrollo de la aplicación de las asignaturas EI1049/1050

## Tabla de contenidos 

* [Objetivo](#objetivo)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Prueba Spike Iteración 0](#prueba-spike-iteración-0)
* [Los desarrolladores](#los-desarrolladores)
* [Licencia](#licencia)
 
## Objetivo

El objetivo del proyecto consiste en el desarrollo de una aplicación de movilidad que permita calcular rutas entre dos lugares de interés, teniendo en cuenta el método de movilidad seleccionado por el usuario (p.ej., vehículo,
bicicleta, a pie).

Sobre cada ruta interesa conocer el trayecto, duración, tipo (p.ej., más rápida, más corta, etc.) y el coste asociado (C de combustible/electricidad para rutas realizadas mediante vehículos de combustión/eléctricos,
calorías para rutas en bicicleta/a pie).

En este repositorio encontramos tanto el front-end cmo el back-end.

## Tecnologías 

Se van a utilizar: 
* NodeJs
* Express
* Firebase
* ReactJS
* GitHub Actions
  
## Instalación 

Para que funcione el backend correctamente es necesario el archivo `.env`, que contiene las claves de las API utilizadas en el proyecto. Puedes pedirla a cualquiera de los [desarrolladores](#los-desarrolladores).  

Se trata de una aplicación web, se podrá acceder al servidor una vez esté lanzada desde cualquier navegador. Para desplegar el servidor se necesita utilizar nodeJs.

Una vez se tenga nodeJs instalado, se deberá realizar el comando `npm i` dentro de los directorios `back-end` y `front-end`. Cuando termine la instalación de las dependencias, se puede realizar el comando `npm start` dentro de la carpeta `back-end` para iniciar el servidor en el puerto 8080.

## Prueba Spike Iteración 0

El Spike cuenta con solamente la parte del servidor, por lo que para hacer pruebas, una vez esté inicializado el servidor, se puede escribir en el navegador las siguientes pruebas:

### Obtener coordenadas mediante el topónimo
`http://localhost:8080/getGeocode?location={localidad}`

Donde:
* {localidad} es el topónimo al que e quiere obtener las coordenadas.

Ejemplos para probar el Spike:

`http://localhost:8080/get-geocode?location=Vinaros`

`http://localhost:8080/get-geocode?location=Castellón de la Plana`

### Obtener la ruta entre dos puntos teniendo las coordenadas y dando un método de viajar.
`http://localhost:8080/get-directions?{metodo}-car&start={coordenadasInicio}&end={coordenadasFin}`

Donde:
* {metodo} es el método de viaje. (PE: driving-car, cycling-road, foot-walking).
* {coordenadasInicio} son las coordenadas del lugar de inicio según nomenclatura inglesa, sin espacios y separando las longitud y latitud por una coma.
* {coordenadasFin} son las coordenadas del lugar de fin según nomenclatura inglesa, sin espacios y separando las longitud y latitud por una coma.

Ejemplo para probar el Spike:

`http://localhost:8080/getDirections?mode=driving-car&start=-0.05202140449041774,39.988126910927626&end=-0.05682265874338428,39.986597808112535`

### Obtener precio de la luz
`http://localhost:8080/get-light-price`


### Obtener el precio del combustible
`http://localhost:8080/get-fuel-price`


## Los desarrolladores 

* Raúl Espinosa Pablo
* Alejandro Saura Iglesias
* Adrián Adell Cantavella
* Diego Solsona Ostal
 
## Licencia 

Esta aplicación es Software Propietario.
