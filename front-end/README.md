# Route Maps Front End - Spike 0
## Pasos previos
1. **Instalar Yarn**: Yarn es un gestor de paquetes que también sirve como gestor de proyectos. Es rápido, seguro y confiable. Para instalarlo, necesitarás Node.js en tu máquina. Puedes descargar Node.js desde su página oficial. Una vez que hayas instalado Node.js, puedes instalar Yarn utilizando el comando `npm install -g yarn` en tu terminal.
2. **Clonar el repositorio de Git**: Necesitarás tener Git instalado en tu máquina. Una vez instalado, puedes clonar el repositorio utilizando el comando `git clone [url_del_repositorio]` en la terminal. Si prefieres utilizar la interfaz gráfica, puedes hacerlo abriendo Git GUI, seleccionando 'Clonar repositorio existente' e introduciendo la URL del repositorio y la ruta donde deseas clonarlo.

## Arrancando el spike
1. **Abrir el proyecto en VSCode**: Puedes hacer esto desde la terminal utilizando el comando `code [ruta_del_proyecto]`, o puedes abrir VSCode y seleccionar 'Abrir...' desde el menú 'Archivo'.
2. **Abrir la terminal de VSCode**: Puedes hacer esto seleccionando 'Nueva Terminal' desde el menú 'Terminal', o utilizando el atajo de teclado `Ctrl + ``.
3. **Ejecutar Yarn**: En la terminal, ejecuta el comando `yarn` para instalar las dependencias del proyecto.
4. **Instalar Axios usando Yarn**: Axios es una biblioteca de JavaScript muy popular que se utiliza para realizar solicitudes HTTP. Puedes instalarla con el comando `yarn add axios`.
5. **Instalar Redux usando Yarn**: Redux es una biblioteca de JavaScript para administrar y actualizar el estado de tu aplicación. Puedes instalarla con el comando `yarn add @reduxjs/toolkit react-redux`.
6. **Instalar React Router Dom usando Yarn**: React Router Dom es una biblioteca que te permite manejar rutas en tus aplicaciones React. Puedes instalarla con el comando `yarn add react-router-dom`.

## Dibujando el mapa
1. **Instalar Mapbox GL usando Yarn**: Mapbox GL es una biblioteca para incrustar mapas interactivos en tu aplicación web. Puedes instalarla con el comando `yarn add mapbox-gl`.

## Posibles warnings o errores
Si te encuentras con alguna advertencia o error, es posible que TypeScript no reconozca los tipos de alguna biblioteca. Colocando el cursor sobre el error, generalmente se muestra un mensaje con el comando que debes ejecutar para instalar los tipos desconocidos. Si no es así, puedes buscar en línea o preguntarme a mí, estaré encantado de ayudarte.

## APIs y conexiones externas
Este es un esquema de los campos del fichero .env que necesitarás para poder conectarte a las APIs. Tendrás que poner tus API keys:
VITE_API_URL=
VITE_ROUTES_API_KEY=
VITE_MAP_API_KEY=
