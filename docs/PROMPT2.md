Continúa el desarrollo del backend para el proyecto “Cochaprecios”, una aplicación móvil multiplataforma para registrar, monitorear y comparar precios de productos en tiendas y supermercados de Cochabamba. El módulo de users ya está implementado y debe servir como referencia para la arquitectura y buenas prácticas.

**Reglas y contexto a respetar:**

1. **Arquitectura Hexagonal:**  
   - Implementa las capas de domain, application e infrastructure para cada módulo.
   - Utiliza Value Objects para atributos relevantes.
   - Aplica el patrón Object Mother en los tests para Value Objects y entidades.

2. **Patrones y buenas prácticas:**  
   - Respeta la estructura y patrones usados en el módulo users.
   - Configura correctamente el contenedor de inyección de dependencias en `src/api/shared/dependency-injection/`.
   - Implementa controladores, validaciones y rutas siguiendo el ejemplo de users.

3. **Contexto del proyecto:**  
   - La app permite a consumidores registrar, monitorear y comparar precios de productos en diferentes tiendas locales y supermercados.
   - Los productos pertenecen a categorías como alimentos, higiene personal, limpieza del hogar y electrónicos.
   - Se debe permitir el seguimiento y visualización de la evolución de precios de cada producto en el tiempo (para mostrar gráficas en el frontend).
   - Existen dos roles de usuario:  
     - admin: CRUD de categories, products y stores.  
     - viewer: Puede ver categories, products y stores, dar like a productos, comentar y guardar favoritos.

4. **Módulos a implementar:**  
   - Products
   - Stores
   - PriceHistory (evolución de precios)
   - Likes
   - Comments
   - Favorites

5. **Endpoints y seguridad:**  
   - Implementa endpoints REST para cada módulo, siguiendo la estructura y validaciones del módulo users.
   - Protege los endpoints de administración con autenticación JWT y verificación de rol “admin”.

6. **Pruebas:**  
   - Implementa pruebas unitarias, de integración y de aceptación para cada módulo.
   - Usa Object Mother y escenarios de Cucumber como en users.

7. **Base de datos:**  
   - Respeta el modelo y las relaciones descritas en `docs/database-diagram.md` y `docs/diagram.svg`.

8. **Documentación y estructura:**  
   - Mantén la estructura de carpetas y archivos igual que users.
   - Documenta los endpoints y casos de uso principales.

**Importante:**  
No implementes el frontend. El enfoque debe ser únicamente en el backend, respetando la arquitectura, patrones y calidad de código del módulo users.

Antes de continuar con nuevos módulos, inicia refactorizando en `src/modules/users/domain/user.ts` las propiedades:

```typescript
readonly createdAt?: Date;
readonly updatedAt?: Date;
```


Estas propiedades deben ser Value Objects, siguiendo la arquitectura y los patrones utilizados en el proyecto. Realiza la refactorización tanto en el código fuente como en los tests, asegurando consistencia y buenas prácticas.

**Nota importante sobre comandos npm:**
No ejecutes comandos de npm automáticamente durante el proceso. Deja la ejecución de comandos (como instalación de dependencias, ejecución de tests, migraciones, etc.) para el final y notifícale al usuario cuándo debe ejecutarlos manualmente.
