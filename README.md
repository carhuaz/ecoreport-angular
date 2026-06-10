# ecoreport-angular
# EcoReport Huancayo

EcoReport Huancayo es una aplicación web desarrollada en Angular para el registro, visualización y gestión de reportes ambientales en la ciudad de Huancayo.

El proyecto busca promover la participación ciudadana mediante una plataforma donde los usuarios puedan reportar incidencias ambientales, consultar reportes públicos y permitir que un administrador valide, organice y gestione la información registrada.

## Demo del proyecto

Puedes visualizar el proyecto desplegado en Vercel:

[Ver EcoReport Huancayo](https://ecoreport-angular.vercel.app/)

## Objetivo del proyecto

Desarrollar una aplicación web que facilite el reporte de problemas ambientales en Huancayo, permitiendo mejorar la comunicación entre ciudadanos y responsables de la gestión ambiental.

## Funcionalidades principales

* Registro e inicio de sesión de usuarios.
* Reporte de incidencias ambientales.
* Visualización de reportes públicos.
* Consulta de reportes realizados por el ciudadano.
* Panel administrativo.
* Validación de reportes ambientales.
* Gestión de usuarios.
* Gestión de cuadrillas.
* Visualización de estadísticas.
* Mapa ambiental.
* Página de contacto.

## Módulos del sistema

### Módulo ciudadano

Permite que los usuarios puedan registrar reportes ambientales, revisar sus propios reportes y consultar los reportes públicos disponibles en la plataforma.

Páginas principales:

* `reportar`
* `mis-reportes`
* `reportes-publicos`
* `contacto`

### Módulo administrativo

Permite que el administrador pueda revisar reportes, validar incidencias, gestionar usuarios, visualizar estadísticas y dar seguimiento a los casos registrados.

Páginas principales:

* `dashboard`
* `admin-usuarios`
* `validacion`
* `estadisticas`
* `cuadrillas`
* `mapa-ambiental`

### Módulo de acceso

Incluye las páginas principales para ingresar al sistema, registrarse y controlar el acceso según el tipo de usuario.

Páginas principales:

* `home`
* `login`
* `register`
* `acceso-denegado`

## Tecnologías utilizadas

* Angular
* TypeScript
* HTML
* CSS
* Git
* GitHub
* GitHub Desktop
* Vercel

## Estructura general del proyecto

```bash
ecoreport-angular/
│
├── public/
├── src/
│   └── app/
│       ├── guards/
│       ├── models/
│       ├── pages/
│       │   ├── acceso-denegado/
│       │   ├── admin-usuarios/
│       │   ├── contacto/
│       │   ├── cuadrillas/
│       │   ├── dashboard/
│       │   ├── estadisticas/
│       │   ├── home/
│       │   ├── login/
│       │   ├── mapa-ambiental/
│       │   ├── mis-reportes/
│       │   ├── register/
│       │   ├── reportar/
│       │   ├── reportes-publicos/
│       │   └── validacion/
│       ├── services/
│       ├── shared/
│       ├── app.component.css
│       ├── app.component.html
│       ├── app.component.ts
│       ├── app.config.ts
│       └── app.routes.ts
│
├── angular.json
├── package.json
└── README.md
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/carhuaz/ecoreport-angular.git
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd ecoreport-angular
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
ng serve
```

### 5. Abrir en el navegador

```bash
http://localhost:4200
```

## Organización del trabajo colaborativo

El desarrollo del proyecto se organizó mediante GitHub Desktop, dividiendo el trabajo por módulos para evidenciar la participación de cada integrante.

| Integrante                    | Responsabilidad                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Carhuaz Barzola Juan Abel     | Estructura inicial del proyecto Angular, configuración base, navegación, páginas principales, login, registro y acceso denegado. |
| Huaraca Huaraca Jhafeth Frank | Módulo ciudadano: registro de reportes ambientales, mis reportes, reportes públicos y página de contacto.                        |
| Enrique Ricce Angela Ariana   | Módulo administrativo: dashboard, gestión de usuarios, validación de reportes, estadísticas, cuadrillas y mapa ambiental.        |

## Commits principales sugeridos

### Juan Abel

```txt
Crear estructura inicial del proyecto EcoReport
```

### Frank

```txt
Agregar módulo ciudadano de reportes ambientales
```

### Angela

```txt
Agregar módulo administrativo de EcoReport
```

## Estado del proyecto

Proyecto académico en desarrollo, orientado a la gestión de reportes ambientales mediante una aplicación web con enfoque social y ciudadano.

## Autoría

Proyecto desarrollado por estudiantes como parte de una actividad académica de desarrollo web.

Integrantes:

* Carhuaz Barzola Juan Abel
* Huaraca Huaraca Jhafeth Frank
* Enrique Ricce Angela Ariana

