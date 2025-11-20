# Cochaprecios - Server

![Node CI](https://github.com/jorgechavezrnd/cochaprecios-server/workflows/Node%20CI/badge.svg?branch=master)

##  TODOs que se deben resolver cuando se pueda

- **Investigar solución para Jest con módulos ESM**: Actualmente `uuid` está en v8.3.2 en lugar de v13+ debido a que Jest no puede procesar módulos ESM. Investigar configuración con `extensionsToTreatAsEsm` y `transform` de ts-jest para soportar versiones modernas. Nota: Se tuvo que instalar `@types/uuid` porque la v8 no incluye tipos TypeScript integrados (las versiones v9+ sí los incluyen).

- **Actualizar @faker-js/faker a versión reciente**: Similar al problema con `uuid`, `@faker-js/faker` está en v8.4.1 en lugar de v10+ por incompatibilidad con Jest y ESM. Evaluar migración a Jest con soporte ESM experimental o configuración de `transformIgnorePatterns`.

##  Comandos para inicializar el proyecto ([Guía Original](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b))

##  Comandos para configurar el entorno de testing ([Guía Original](https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007))
