# Sistema de Gestión de Estacionamiento

Aplicación desarrollada en Vue.js como parte del **Módulo 6 - Desarrollo Frontend con Vue.js y Vuex** del Diplomado **Fullstack Developer**.

La aplicación permite gestionar el estacionamiento de una empresa mediante el registro de empleados y sus movilidades (automóviles o motocicletas), además de administrar parámetros como áreas y tipos de vehículo.

---

# Tecnologías Utilizadas

- Vue.js 3
- Vue Router
- Pinia
- Axios
- Vite
- JSON Server Auth

---

# Funcionalidades

## Autenticación

- Inicio de sesión
- Registro de usuarios
- Protección de rutas mediante autenticación JWT

---

## Gestión de Movilidades

La aplicación permite:

- Registrar movilidades
- Editar movilidades
- Eliminar movilidades
- Buscar por nombre de empleado
- Filtrar por tipo de vehículo

Cada movilidad almacena:

- Nombre del empleado
- Área
- Tipo de vehículo
- Número de placa
- Color del vehículo

---

## Gestión Paramétrica

### Áreas

Administración de áreas de trabajo:

- Producción
- Finanzas
- Contabilidad
- Nuevas áreas personalizadas

### Tipos de Vehículo

Administración de tipos de movilidad:

- Automóvil
- Moto
- Nuevos tipos personalizados

---

# Estructura del Proyecto

```bash
src/
│
├── assets/
├── components/
├── router/
├── services/
├── stores/
├── views/
│
├── App.vue
└── main.js
```

---

# Instalación y Puesta en Marcha

## 1. Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Ingresar a la carpeta del proyecto

```bash
cd gestion-estacionamiento
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar la aplicación

```bash
npm run dev:full
```

Este comando iniciará:

- Frontend Vue.js
- Backend Fake API con JSON Server

---

# URLs del Sistema

## Frontend

```bash
http://localhost:5173
```

## Backend Fake API

```bash
http://localhost:3000
```

---

# Usuario de Prueba

```text
Email: adolfo@test.net
Password: 123456
```

> Nota: la contraseña almacenada en db.json se encuentra encriptada mediante bcrypt.

---

# Scripts Disponibles

## Ejecutar frontend

```bash
npm run dev
```

## Ejecutar backend fake API

```bash
npm run server
```

## Ejecutar frontend y backend simultáneamente

```bash
npm run dev:full
```

## Generar build de producción

```bash
npm run build
```

---

# Arquitectura Implementada

La aplicación utiliza:

- Arquitectura SPA
- Componentes reutilizables
- Composition API
- Manejo de estado con Pinia
- Rutas protegidas
- Axios con interceptores JWT
- CRUD modular por vistas

---

# Objetivo Académico

El presente proyecto fue desarrollado con fines académicos para reforzar conocimientos de:

- Desarrollo Frontend moderno
- Vue.js 3
- Gestión de estado
- Consumo de APIs REST
- Arquitectura SPA
- Manejo de autenticación
- Componentización

correspondientes al Diplomado Fullstack Developer.

---

# Autor

Adolfo Jarsun