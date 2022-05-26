
# App challenge

Esta es una aplicación basada en un test, la cual permite a un administrador subir publicaciones para que todo su equipo lo vea, con ciertos *Tags* para que las personas de diferentes equipos reciban una notificación.
La aplicación se basa en conceptos de **Node.js**, usando **MongoDB** como base de datos y el motor de plantillas **EJS** para generar las vistas.

El enlace de la demo en vivo es:

https://cl-challenge.herokuapp.com/


# Guía

Para instalar de manera local el repositorio es necesario contar con

 - Node.JS
 - Gestor de paquetes NPM
 - MongoDB

Una vez clonado;

    npm install
    npm start
   
## .env
Crear un archivo **.env** donde almacenar las variables de entorno siguiendo el archivo **.env.template**

- **PORT**=XXXX // puerto donde se desea correr el servidor (defecto 3000)
- **SECRET_SESSION**=XXXX // password cualquiera para la express-session
- **MONGO_DB**=XXXXXXX // URI de la DB en mongo
- **ADMIN_NAME**=XXXXX
- **ADMIN_EMAIL**=XXXXXX
- **ADMIN_PASSWORD**=XXXX

Las variables de **ADMIN** son los datos con los que la app loguea al administrador, el cual tiene permisos especiales para poder crear las notas.

## Uso
El usuario solo tendrá acceso al inicio si no está logueado. Para eso debe ir a **sign Up** para crear una cuenta y luego a **Log In** para autenticarse.

Una vez logueado el usuario puede acceder a la pestaña ***news*** donde están las notas creadas por el admin, siendo para todos los usuarios.

También podrá acceder a la pestaña **profile** donde puede seleccionar en que equipo forma parte para recibir notificaciones personalizadas.

En la pestaña de las notificaciones, al usuario le llegaran actualizaciones sobre su sector, teniendo la posibilidad de **marcar como leido** o **eliminar** la notificación.

Por ultimo se encuentra la pestaña de **log out** para cerrar la sesión

## Rutas

 - **/**
   - GET - **/** - *renderiza home*
   
 -  **/users**
    - GET - **/signin**  - *renderiza Log In*
    - POST - **/signin** - *autentica al usuario mediante passport*
    - GET - **/signup**  - *renderiza Sign Up*
    - POST - **/signup** - *verifica los datos del usuario en la DB y lo crea*
    - GET - **/logout**  - *renderiza Log Out*
    - GET - **/profile**  - *renderiza profile*
    - POST - **/profile/:id** - *edita la suscripción del usuario*

- **/publications**
    - GET - **/**  - *devuelve las publicaciones y renderiza la vista*
    - POST - **/**  - *crea una publicación (solo el admin)*

- **/notifications**
    - GET - **/**  - *devuelve las notificaciones y renderiza la vista*
    - GET - **/edit/:id**  - *marca una notificación como "leida"*
    - GET - **/delete/:id**  - *elimina una notificación"*



## Tecnologías

- **Node.JS**
Elegí NodeJS por ser mi tecnología mas fuerte, llevo casi dos años enfocándome en servidores web con este entorno de ejecución.

- **MongoDB**
La diferencia en rendimiento y velocidad de escritura entre SQL y NoSQL en este tipo de aplicaciones es imperceptible. La elección de mongo para la base de datos es por su flexibilidad a la hora de generar registros, ya que la app es bastante sencilla y no necesita gran rigurosidad en su estructura como la que brinda una SQL. Esto fue clave al no tener definido detalladamente el flujo de datos de antemano. 
 
 - **EJS**
  La elección de EJS como motor de plantillas para generar las vistas fue por una optimización de tiempo. Si bien React es la librería con la que normalmente hago mis aplicaciones combinado con MUI, los motores de plantillas como EJS me parecen una gran herramienta cuando necesito una vista simple del lado del cliente, ya que al manejar directamente las vistas con el servidor me permite tener la aplicación en un único entorno.
