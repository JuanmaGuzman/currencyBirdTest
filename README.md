## Configuración

Para configurar y ejecutar el proyecto, sigue estos pasos:

### 1. Clonar el repositorio

git clone https://tu-repositorio.git
cd api

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

- `POST /create-money-transfer`: Permite enviar datos a través de una solicitud POST. Los datos recibidos se registran en la consola.

## Flujo del Programa

El programa sigue un flujo específico al recibir una solicitud para crear una transferencia. A continuación se describe paso a paso:

1. **Configuración de las URLs**:

   - Las URLs de las API externas se definen en las constantes `TOKEN_API_URL` y `TRANSFER_API_URL`.

2. **Definición de la Interfaz de Respuesta**:

   - Se define la interfaz `TransferApiResponse` para representar la estructura esperada de la respuesta de la API externa.

3. **Función `createTransfer`**:

   - La función `createTransfer` se encarga de realizar una solicitud POST a la API de transferencias externa para crear una nueva transferencia.
   - Se proporcionan los datos necesarios, como el `transferCode`, el `amount`, y el `authToken` para la autorización.
   - Se utiliza Axios para realizar la solicitud a la URL `TRANSFER_API_URL` con la autorización proporcionada.
   - La respuesta de la API externa se almacena en `externalApiResponse`.
   - Si la solicitud se realiza con éxito, se devuelve la respuesta, y se imprime un mensaje indicando que la API externa se alcanzó con éxito.
   - Si ocurre algún error, se maneja adecuadamente y se lanza para su posterior manejo.

4. **Función `getToken`**:

   - La función `getToken` se encarga de obtener un token de autorización haciendo una solicitud GET a la URL `TOKEN_API_URL`.
   - Se utiliza Axios para realizar la solicitud.
   - Si la respuesta contiene datos válidos, se registra el token en la consola y se devuelve.
   - Si la respuesta no contiene datos válidos o si ocurre un error, se maneja y se registran mensajes de error.

5. **Manejo de Solicitudes POST en `/create-transfer`**:

   - Cuando se recibe una solicitud POST en la ruta `/create-transfer`, se extraen los datos del cuerpo de la solicitud, incluyendo `transferCode` y `amount`.
   - Se verifica si ya existe una transferencia con el mismo código en la base de datos local (`existingTransfer`).
   - Si ya existe una transferencia, se envía una respuesta de error.
   - Se obtiene un token de autorización utilizando la función `getToken`.
   - Se llama a la función `createTransfer` para realizar la solicitud POST a la API externa con los datos proporcionados y el token de autorización.
   - Si la respuesta de la API externa contiene datos válidos, se crea una nueva transferencia local con la fecha actual.
   - La nueva transferencia se guarda en la base de datos local.
   - Se imprime un mensaje indicando que la transferencia se guardó en la base de datos local y se devuelve la transferencia creada en la respuesta.
   - Si ocurre algún error durante la creación de la transferencia local, se maneja adecuadamente y se envía una respuesta de error.
   - Si la respuesta de la API externa no contiene datos válidos, se envía una respuesta de error indicando que la transferencia no se pudo crear en la API externa.

6. **Manejo de Errores Generales**:
   - En caso de cualquier error general, ya sea durante la verificación de la existencia de la transferencia local o durante la obtención del token, se maneja adecuadamente y se envía una respuesta de error con un mensaje informativo.
