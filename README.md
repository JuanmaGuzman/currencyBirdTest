# My TypeScript Server

Este es un proyecto de ejemplo que muestra cómo configurar y ejecutar un servidor TypeScript con Express.

## Configuración

Para configurar y ejecutar el proyecto, sigue estos pasos:

### 1. Clonar el repositorio

git clone https://tu-repositorio.git
cd my-typescript-server

### 2. Instalar las dependencias

Asegúrate de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando para instalar las dependencias del proyecto:

`npm install`

### 3. Iniciar el servidor

Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor con el siguiente comando:

`npm start`

Esto utilizará nodemon para ejecutar el servidor TypeScript en modo de desarrollo. Cualquier cambio que hagas en los archivos se reflejará automáticamente sin necesidad de reiniciar el servidor.

### 4. Acceder al servidor

El servidor estará disponible en `http://localhost:3000`. Puedes acceder al servidor en tu navegador web o utilizar herramientas como Postman para probar los puntos finales definidos en el servidor.

## Puntos finales

El servidor tiene dos puntos finales configurados:

- `GET /api`: Retorna un mensaje de éxito cuando se realiza una solicitud GET a la raíz del servidor.
- `POST /api/create-money-transfer`: Permite enviar datos a través de una solicitud POST. Los datos recibidos se registran en la consola.

¡Eso es todo! Ahora tienes un servidor TypeScript en funcionamiento y puedes comenzar a desarrollar tu aplicación web. Diviértete programando!
