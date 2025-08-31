# API de Gestión de Órdenes

Este es el backend de una API RESTful para la gestión de ordenes, construida para la prueba técnica. La API permite a los usuarios registrarse, autenticarse y gestionar sus propias órdenes.

### Características Principales

  * **Autenticación segura**: Registro y login de usuarios utilizando **JWT (JSON Web Tokens)** para proteger las rutas de la API.
  * **Gestión de órdenes**: Los usuarios autenticados pueden **crear nuevas órdenes** y **consultar las órdenes** que han creado.
  * **Filtros de búsqueda**: Se pueden aplicar filtros a la hora de buscar órdenes.
  * **Persistencia de datos**: La API se conecta a una base de datos **MongoDB** utilizando el ORM **Prisma**.
  * **Tecnologías**: Desarrollado con el framework **Nest.js** en TypeScript.

-----

### Requisitos del Proyecto

Asegúrate de tener las siguientes herramientas instaladas para poder ejecutar el proyecto:
  * **Node.js** (versión 18.x o superior)
  * **npm**
  * Una base de datos **MongoDB Atlas** configurada con la versión gratuita

-----

### Configuración del Proyecto

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/VictorCortez358/boxful-backend-app.git
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables, usando tus propios valores de conexión y secreto:

    ```env
    DATABASE_URL="mongodb+srv://<usuario>:<contrasena>@<cluster>.mongodb.net/<base-de-datos>?retryWrites=true&w=majority"
    JWT_SECRET="secreto"
    ```

4.  **Generar el cliente de Prisma:**

    ```bash
    npx prisma generate
    ```

-----

### Scripts de Ejecución

Usa el siguiente comando para iniciar la aplicación en modo desarrollo:

```bash
$ npm run start:dev
```
### Ejecutar el Seeder 

Para poblar la base de datos con datos iniciales, puedes ejecutar el siguiente comando:

```bash
$ npm run seed
```

-----

### Endpoints de la API

La API está documentada con **Swagger** y puede ser explorada de forma interactiva en tu navegador.

  * **Documentación de la API**: `http://localhost:3000/api`

A continuación, un resumen de los endpoints principales:

#### Autenticación

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Crea un nuevo usuario. |
| `POST` | `/auth/login` | Inicia sesión y devuelve un token JWT. |

#### Órdenes (Requiere token JWT)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/orders` | Crea una nueva orden con productos anidados. |
| `GET` | `/orders` | Devuelve todas las órdenes del usuario autenticado. Acepta filtros por `status`, `startDate` y `endDate`. |
| `GET` | `/orders/:id` | Devuelve los detalles de una orden específica. |

#### Desarrollado por Víctor Cortez - Software Developer