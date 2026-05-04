# 🔐 Sistema de Autenticación Híbrido - Backend II

## 📌 Descripción

Este proyecto consiste en la implementación de un sistema de autenticación híbrido desarrollado con Node.js, que combina múltiples estrategias de autenticación para garantizar seguridad, escalabilidad y flexibilidad.

El sistema permite:

* Registro de usuarios
* Login con credenciales (email + password)
* Login con Passport (estrategia local)
* Autenticación mediante OAuth con Google
* Manejo de sesiones en servidor
* Autenticación basada en JWT almacenado en cookies
* Protección de rutas mediante roles (RBAC)

---

## 🧠 Objetivo

Desarrollar un backend estructurado por capas que implemente un sistema de autenticación seguro, aplicando buenas prácticas de arquitectura, manejo de sesiones y control de acceso.

---

## ⚙️ Tecnologías utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* Passport.js
* Passport Local
* OAuth 2.0 (Google)
* JSON Web Tokens (JWT)
* Bcrypt
* Express-session
* Cookie-parser
* Handlebars

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura por capas:

```
src/
│
├── config/        → Configuración (DB, estrategias)
├── controllers/   → Lógica de negocio
├── middlewares/   → Autenticación y autorización
├── models/        → Esquemas de base de datos
├── routes/        → Definición de endpoints
├── strategies/    → Estrategias de Passport
├── utils/         → Funciones auxiliares (hash, JWT)
├── views/         → Vistas con Handlebars
└── public/        → Archivos estáticos
```

---

## 🔐 Estrategias de Autenticación

El sistema implementa un enfoque híbrido:

### 1. Login Manual

* Validación con bcrypt
* Generación de JWT
* Almacenamiento en cookie httpOnly

### 2. Passport Local

* Estrategia desacoplada
* Validación centralizada
* Integración con JWT

### 3. OAuth Google

* Autenticación externa
* Creación automática de usuario si no existe
* Generación de JWT posterior

### 4. Sesiones

* Uso de express-session
* Persistencia temporal en servidor
* Alternativa a JWT

---

## 🔒 Seguridad

* Contraseñas encriptadas con bcrypt
* Tokens JWT con expiración (1h)
* Cookies httpOnly (protección XSS)
* sameSite (protección CSRF)
* Control de acceso por roles (user / admin)
* Middleware de autorización

---

## 🔑 Rutas principales

### Auth

* `POST /api/session/register`
* `POST /api/session/login`
* `POST /api/session/login-passport`

### OAuth

* `GET /api/session/google`
* `GET /api/session/googlecallback`

### Sesión

* `GET /api/session/session-user`

### Protegidas

* `/profile` → requiere autenticación
* `/admin` → requiere rol admin

### Logout

* `POST /api/session/logout`

---

## 🚀 Instalación

1. Clonar repositorio:

```
git clone <repo-url>
```

2. Instalar dependencias:

```
npm install
```

3. Crear archivo `.env`:

```
PORT=3000
MONGO_URI=tu_uri_mongo
JWT_SECRET=tu_secret
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/session/googlecallback
SESSION_SECRET=secretSessionKey
```

4. Ejecutar servidor:

```
npm run dev
```

---

## 📸 Estado del Proyecto

✔ Registro funcionando
✔ Login manual
✔ Login con Passport
✔ OAuth Google
✔ JWT + Cookies
✔ Sesiones
✔ Rutas protegidas
✔ Control de roles
✔ Logout completo

---

## 👩‍💻 Autor

Proyecto desarrollado como entrega final del curso **Backend II**.
