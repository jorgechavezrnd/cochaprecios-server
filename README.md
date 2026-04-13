# Cochaprecios - Server

![Node CI](https://github.com/jorgechavezrnd/cochaprecios-server/actions/workflows/nodejs.yml/badge.svg?branch=main)

## Descripción

**Cochaprecios** es una aplicación Full Stack para comparación de precios de productos en el mercado local de Cochabamba, Bolivia. Este repositorio contiene el **backend** del sistema, que proporciona una API REST para gestionar productos, precios, tiendas, categorías y funcionalidades sociales (likes, comentarios, favoritos).

El sistema resuelve el problema de la falta de transparencia en los precios del mercado local, permitiendo a los consumidores tomar decisiones de compra informadas al comparar precios históricos entre diferentes establecimientos comerciales.

## Objetivo general

Desarrollar un backend robusto y escalable que permita la gestión y consulta eficiente de información de precios de productos en múltiples tiendas, facilitando la comparación de precios y el análisis de tendencias para consumidores del mercado local.

## Objetivos específicos (medibles)

- ✅ Implementar una API REST con 20+ endpoints funcionales para gestión de usuarios, productos, precios, tiendas, categorías y funcionalidades sociales.
- ✅ Persistir datos en PostgreSQL con TypeORM, incluyendo historial completo de precios con timestamps.
- ✅ Implementar autenticación JWT con bcrypt para seguridad de contraseñas y control de acceso basado en roles (admin/viewer).
- ✅ Desarrollar arquitectura hexagonal (Ports & Adapters) con separación clara de capas: Dominio, Aplicación e Infraestructura.
- ✅ Alcanzar >80% de cobertura de código con testing multinivel: unitario (Jest), integración y aceptación (Cucumber BDD).
- ✅ Configurar CI/CD con GitHub Actions para ejecución automática de tests en cada push/PR.

## Alcance

### Incluye:
- ✅ CRUD completo de usuarios con autenticación JWT
- ✅ CRUD de productos, categorías y tiendas
- ✅ Gestión de precios con historial temporal
- ✅ Funcionalidades sociales: likes, comentarios y favoritos
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Búsqueda y filtrado de productos y precios
- ✅ Endpoints de agregación para análisis de precios
- ✅ Testing unitario, de integración y aceptación
- ✅ Documentación de API
- ✅ Configuración Docker

### No incluye (por ahora):
- ❌ Web scraping automatizado de precios
- ❌ Sistema de notificaciones push
- ❌ API pública con rate limiting
- ❌ Dashboard de administración web
- ❌ Geolocalización de tiendas
- ❌ Sistema de recomendaciones con ML

## Stack tecnológico

- **Backend**: Node.js 22+ con TypeScript 5.9
- **Framework Web**: Express.js 5.1
- **Base de datos**: PostgreSQL 15+
- **ORM**: TypeORM 0.3
- **Autenticación**: JWT (jsonwebtoken) + bcrypt
- **Validación**: express-validator
- **Dependency Injection**: node-dependency-injection
- **Testing**:
  - Jest (unitario e integración)
  - Cucumber (BDD/aceptación)
  - Supertest (HTTP testing)
- **CI/CD**: GitHub Actions
- **Containerización**: Docker
- **Control de versiones**: Git + GitHub

## Arquitectura (resumen simple)

```
Cliente Flutter (Mobile)
        ↓
   API REST (Express)
        ↓
   Capa de Aplicación (Use Cases)
        ↓
   Capa de Dominio (Entities + Value Objects)
        ↓
   Capa de Infraestructura (TypeORM Repositories)
        ↓
   Base de datos PostgreSQL
```

**Patrón arquitectónico**: Hexagonal Architecture (Ports & Adapters) + Domain-Driven Design (DDD)

## Endpoints core (priorizados)

### Autenticación
1. `POST /api/users/:id` - Registrar usuario
2. `POST /api/auth/login` - Autenticar usuario (obtener JWT)

### Productos
3. `PUT /api/products/:id` - Crear/actualizar producto (admin)
4. `GET /api/products/:id` - Obtener producto por ID
5. `GET /api/products?name=query` - Buscar productos

### Precios
6. `PUT /api/prices/:id` - Crear/actualizar precio (admin)
7. `GET /api/prices?productId=X&storeId=Y` - Buscar precios con filtros
8. `GET /api/prices/aggregate?productId=X` - Obtener datos agregados para gráficos

### Categorías y Tiendas
9. `GET /api/categories` - Listar categorías
10. `GET /api/stores` - Listar tiendas

### Funcionalidades Sociales
11. `PUT /api/likes/:id` - Dar like a producto
12. `DELETE /api/likes/:id` - Quitar like
13. `PUT /api/favorites/:id` - Agregar a favoritos
14. `GET /api/favorites?userId=X` - Listar favoritos de usuario

**Ver documentación completa de endpoints en**: `docs/MONOGRAFIA.md` (Anexo H)

## Cómo ejecutar el proyecto (local)

### 1. Clonar repositorio
```bash
git clone https://github.com/jorgechavezrnd/cochaprecios-server.git
cd cochaprecios-server
```

### 2. Instalar dependencias
```bash
npm install
```

**Requisitos**:
- Node.js >= 22.17.0
- npm >= 11.6.1
- PostgreSQL >= 15

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto (ver `.env.example`):

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de base de datos.

### 4. Levantar base de datos con Docker
```bash
# Levantar PostgreSQL en Docker
docker compose up -d

# Las tablas se crean automáticamente al iniciar el servidor (TypeORM synchronize)
```

### 5. Ejecutar servidor en modo desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 6. Ejecutar tests
```bash
# Tests unitarios
npm run test:unit

# Tests de aceptación (Cucumber)
npm run test:acceptance

# Todos los tests
npm test
```

### 7. Compilar para producción
```bash
npm run build
npm start
```

## Variables de entorno (ejemplo)

```bash
# Server Configuration
PORT=3000
PUBLIC_PATH=public
NODE_ENV=development

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=cochapreciosdb

# TypeORM Configuration
TYPEORM_SHOW_LOGS=true

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=24h
```

**⚠️ IMPORTANTE**: Cambiar `JWT_SECRET` en producción por una clave segura generada aleatoriamente.

## Estructura del proyecto

```
src/
├── api/                    # Capa de presentación (Controllers, Routes, Middleware)
├── modules/                # Módulos de dominio
│   ├── users/
│   ├── products/
│   ├── prices/
│   ├── categories/
│   ├── stores/
│   ├── likes/
│   ├── comments/
│   └── favorites/
├── shared/                 # Código compartido (Value Objects, Exceptions)
└── app.ts                  # Punto de entrada

tests/
├── unit/                   # Tests unitarios (Jest)
├── integration/            # Tests de integración
└── acceptance/             # Tests de aceptación (Cucumber)
```

## Equipo y roles

- **Jorge Carlos Chávez Ruiz**: Full Stack Developer (Backend + Frontend Flutter)
  - Arquitectura y diseño del sistema
  - Implementación de backend (Node.js/TypeScript)
  - Implementación de cliente móvil (Flutter)
  - Testing y CI/CD

## TODOs técnicos pendientes

- **Investigar solución para Jest con módulos ESM**: Actualmente `uuid` está en v8.3.2 en lugar de v13+ debido a que Jest no puede procesar módulos ESM. Investigar configuración con `extensionsToTreatAsEsm` y `transform` de ts-jest para soportar versiones modernas.

- **Actualizar @faker-js/faker a versión reciente**: Similar al problema con `uuid`, `@faker-js/faker` está en v8.4.1 en lugar de v10+ por incompatibilidad con Jest y ESM. Evaluar migración a Jest con soporte ESM experimental o configuración de `transformIgnorePatterns`.
