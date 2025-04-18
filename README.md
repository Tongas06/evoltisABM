evoltisABM
Este repositorio contiene una aplicación ABM (Alta, Baja, Modificación) completa con un frontend desarrollado en Angular 16.2.0 y un backend desarrollado en .NET 8.
Estructura del Proyecto

/frontend: Proyecto Angular 16.2.0 con PrimeNG, formularios reactivos, NgRx y una tabla con filtros.

/backend: API en .NET 8 con patrón Repository, patrón Service, AutoMapper, Entity Framework Core (MySQL) e inyección de dependencias.

Prerrequisitos

Node.js (v16 o superior) para el frontend
.NET 8 SDK para el backend
MySQL (para la base de datos)
Git (para clonar el repositorio)

Instrucciones de Configuración
Backend

Navega a la carpeta backend:
cd backend


Actualiza la cadena de conexión en backend/API/appsettings.json con tus credenciales de MySQL.

Restaura los paquetes NuGet:
dotnet restore


Aplica las migraciones de la base de datos:
dotnet ef database update --project Infrastructure


Ejecuta la API:
dotnet run --project API


La API estará disponible en https://localhost:5001 (o el puerto configurado). Usa Swagger (/swagger) para probar los endpoints.


Frontend

Navega a la carpeta frontend:
cd frontend


Instala las dependencias:
npm install


Ejecuta la aplicación Angular:
ng serve


El frontend estará disponible en http://localhost:4200.


Características

Frontend:
PrimeNG para componentes de interfaz de usuario.
Formularios reactivos para crear/editar productos.
Tabla con capacidades de filtrado.
NgRx para la gestión del estado.


Backend:
API REST con operaciones CRUD.
Patrones Repository y Service.
Entity Framework Core con MySQL.
AutoMapper para mapeo de DTOs.


Notas
Asegúrate de que la API del backend esté en ejecución antes de iniciar el frontend.
Actualiza la URL de la API en frontend/src/app/services/product.service.ts si el backend se ejecuta en un puerto diferente.

