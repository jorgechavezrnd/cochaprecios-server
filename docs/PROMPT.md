Desarrolla el backend para la aplicación “Cochaprecios”, una plataforma para registrar, monitorear y comparar precios de productos en tiendas y supermercados de Cochabamba. El módulo de users ya está implementado y debe servir como referencia para la arquitectura y buenas prácticas.

**Requerimientos:**

1. **Arquitectura Hexagonal:**  
   - Implementa las capas de domain, application e infrastructure para cada módulo.
   - Utiliza Value Objects para atributos relevantes.
   - Aplica el patrón Object Mother en los tests para Value Objects y entidades.

2. **Módulos a implementar:**  
   - Categories (ya implementado, solo como referencia)
   - Products
   - Stores
   - PriceHistory (evolución de precios de productos)
   - Likes (usuarios pueden dar like a productos)
   - Comments (usuarios pueden comentar productos)
   - Favorites (usuarios pueden guardar productos favoritos)

3. **Roles y permisos:**  
   - admin: CRUD completo de categories, products y stores.
   - viewer: Puede ver categories, products y stores, dar like, comentar y guardar favoritos.

4. **Endpoints:**  
   - Implementa endpoints REST para cada módulo, siguiendo la estructura y validaciones del módulo users.
   - Protege los endpoints de administración con autenticación JWT y verificación de rol “admin”.

5. **Pruebas:**  
   - Implementa pruebas unitarias, de integración y de aceptación para cada módulo.
   - Usa Object Mother y escenarios de Cucumber como en users.

6. **Inyección de dependencias:**  
   - Configura el contenedor DI en `src/api/shared/dependency-injection/` para todos los servicios y repositorios.
   - Sigue la misma estructura de controladores, validaciones y rutas que users.

7. **Documentación y estructura:**  
   - Mantén la estructura de carpetas y archivos igual que users.
   - Documenta los endpoints y casos de uso principales.

**Referencia:**  
Consulta el diagrama de base de datos en `docs/database-diagram.md` y `docs/diagram.svg` para las relaciones y atributos de cada entidad.

**Importante:**  
No implementes el frontend. El enfoque debe ser únicamente en el backend, respetando la arquitectura, patrones y calidad de código del módulo users.
