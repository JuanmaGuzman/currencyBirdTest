## Configuración

Para configurar y ejecutar el proyecto, sigue estos pasos:

### 1. Clonar el repositorio y después entrar a la api

git clone "repo"

`cd api`

### 2. Instalar las dependencias

Asegúrate de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando para instalar las dependencias del proyecto:

`npm install`

### 3. Iniciar el servidor

Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor con el siguiente comando:

`npm start`

- Esto utilizará nodemon para ejecutar el servidor TypeScript en modo de desarrollo. Cualquier cambio que hagas en los archivos se reflejará automáticamente sin necesidad de reiniciar el servidor.
- El servidor estará disponible en `http://localhost:3000`. Puedes acceder al servidor en tu navegador web o utilizar herramientas como Postman para probar los puntos finales definidos en el servidor.

1. **Configuración y archivos**:

   Carpetas y archivos principales:

   - Models: Contiene el modelo de transferencias que será almacenado en la base de datos.
   - Routes: Contiene los endpoints de la API. Acá esta la lógica del programa.
   - app.ts: Levanta el servido.
   - database: Levanta la bd. Se define una base de datos local en mongodb, las credenciales estan en el archivo .env.

   Otros:

   - .env: Se creó un archivo .env por buenas prácticas, pero obviamente se sube este archivo para que se pueda corregir el programa.

2. **Documentación endpoint**:

# Documentación del Endpoint:

`POST /create-money-transfer`

El programa corre en local, pudes probar el endpoint con una solicitud POST a:

- http://localhost:3001/create-money-transfer

Este endpoint permite crear una transferencia de dinero. Los datos de la transferencia, como el código de transferencia y la cantidad, se envían en el cuerpo de la solicitud. El endpoint realiza las siguientes acciones:

1. Verifica si la transferencia ya existe en la base de datos local.

   - Si la transferencia ya existe, devuelve un error con un código de estado 400 y un mensaje indicando que la transferencia ya se ha completado.

2. Obtiene un token de autorización llamando a un servicio externo mediante la función `getToken`.

   - Si no se puede obtener el token, maneja el error y responde con un código de estado 500.

3. Crea una nueva transferencia llamando a un servicio externo mediante la función `createTransfer`.

   - Si la respuesta del servicio externo es válida, procede a los siguientes pasos; de lo contrario, responde con un error y un código de estado 400.

4. Crea una nueva entrada de transferencia en la base de datos local con la fecha actual.

   - Si se produce un error al guardar la transferencia en la base de datos local, responde con un código de estado 500.

5. Responde con un código de estado 201 y los detalles de la transferencia creada en caso de éxito.

## Parámetros de entrada (en el cuerpo de la solicitud):

- `transferCode` (string): El código de la transferencia.
- `amount` (int): La cantidad de dinero a transferir.

## Respuestas:

- Código de estado 201 (Created): La transferencia se creó con éxito. La respuesta incluye los detalles de la transferencia.
- Código de estado 400 (Bad Request): Se produjo un error al crear la transferencia debido a una respuesta no válida del servicio externo o porque la transferencia ya existía.
- Código de estado 500 (Internal Server Error): Se produjo un error interno del servidor al guardar la transferencia en la base de datos local o al obtener el token de autorización.

## Ejemplo de solicitud:

Poner en el body:
{
"transferCode": "jmguzman1@uc.cl",
"amount": 100
}

\*\* No se requiere token de autentificación.
