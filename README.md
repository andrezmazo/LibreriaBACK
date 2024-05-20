# Autor

Andres Zapata Mazo
contacto: andrez.mazo@gmail.com

# Libreria

## Descripción

Este repositorio contiene el código fuente de una página web diseñada para gestionar el inventario de libros de una biblioteca o librería. La aplicación permite a los usuarios registrados ingresar con un login autorizado y ofrece funcionalidades para crear, editar o eliminar registros de libros.

## Objetivo

El objetivo de este proyecto es desarrollar una aplicación web que gestione la autenticación de usuarios y la administración de un inventario de productos, implementando tanto el backend como el frontend. La solución garantiza los sigueintes puntos:

### Backend

**Autenticación:** Implementar la autenticación de usuarios utilizando JWT, asegurando que solo usuarios autenticados puedan acceder a las rutas protegidas.
**Tecnología:** Utilizar Node.js, Express y Sequelize.
**Base de Datos:** Utilizar una base de datos relacional MySQL con dos tablas principales: Usuarios y Productos.
**ORM:** Utilizar Sequelize ORM para la gestión eficiente de los datos.
**Validación de Acceso:** Validar que solo usuarios autenticados puedan acceder a las rutas de productos.
**Documentación:** documentación de la API utilizando herramientas Swagger.

### Frontend

**Tecnología:** Utilizar Angular con TypeScript y Angular Material para una interfaz moderna y responsiva.
**Inicio de Sesión:** Implementación de una pantalla de login que valide la autenticación del usuario.
**Lista de Productos:** Creación de una ventana que permita ver, crear, modificar y eliminar productos de la base de datos.
**Validación de Acceso:** Asegurar que solo los usuarios autenticados puedan acceder a las ventanas privadas, redirigiendo a la pantalla de login en caso contrario.
**Aplicación Responsiva:** Garantizar que la aplicación funcione correctamente en diferentes tamaños de pantalla y dispositivos.

# LibreriaBACK

## Pre requisitos

Para el funcionamiento correcto del Back de la aplicación es necesario el haber configurado, instalado dependencias y estar corriendo la base de datos.

XAMPP

MYSQL

Adicionalmente se recomienda tener la versión más actual de npm

- ```sh
  npm install npm@latest -g
  ```

## Instalación

1. Clona el repositorio LibreriaBACK

   ```sh
   git clone https://github.com/andrezmazo/LibreriaBACK.git
   ```
2. Ingresa a la carpeta LibreriaBACK (o abre una terminal en la carpeta LibreriaBACK)

   ```sh
   cd LibreriaBACK
   ```
3. Instala los paquetes NPM

   ```sh
   npm install
   ```
4. La aplicación se ejecutará por medio de puerto `localhost:3000`. En caso tal se tenga otro elemento ejecutándose en este puerto, se detentrá su ejecucción.  

5. Configurar la base de datos
   En un software de administracion de bases de datos de SQL, debemos crear un nuevo Database llamado `libreria` e importamos el script nombrado `dump-libreria.sql` el cual se encuentra en la ruta `LibreriaBACK/database/`

   IMPORTANTE: Las credenciales de la conexión de la base de datos es usuario: `root` y contraseña:"" (sin contraseña). Si se desea configurar las credenciales de la base de datos, modificaralas en el archivo `sequelize.js` el cual se encuentra en la ruta `LibreriaBACK/models/`

## Ejecución

1. Abre XAMPP e inicia el servicio de MySQL dado clic en "Start"
2. En la raiz de LibreriaBACK abre una terminal e inicia la aplicación

```sh
npm start
```

# LibreriaFRONT

## Instalación

1. Clona el repositorio LibreriaFRONT

   ```sh
   git clone https://github.com/andrezmazo/LibreriaFRONT.git
   ```
2. Ingresa a la carpeta LibreriaFRONT (o abre una terminal en la carpeta LibreriaFRONT)

   ```sh
   cd LibreriaFRONT
   ```
3. Instala los paquetes NPM

   ```sh
   npm install
   ```

La aplicación se ejecutará por medio de puerto `localhost:4200`. En caso tal se tenga otro elemento ejecutándose en este puerto, automáticamente tomará otro puerto.

## Ejecución

1. En la raiz de LibreriaFRONT abre una terminal e inicia la aplicación

```sh
npm start
```

# Modo Uso

Una vez ejecutada la aplicación realizar login por medio de las credenciales 
Nombre de usuario: `admin` 
contraseña: `admin`
Esto te redirigirá a la ruta `/main`. en esta ruta se visualiza todos los productos, creación, edición y eliminación de estos. Adicionalmente se puede filtrar por titulo

# Documentación

Adicionalmente se encuentra la documentación de los endpoints donde se pueden ejecutar los endpoints con en alchivo `documentation.yaml`, en un editor de swagger en linea como `https://editor-next.swagger.io` o en Postman.
