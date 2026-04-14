# Taller Práctico: Gestión de Categorías e Integridad de Datos

## Objetivo
Fortalecer el dominio de la **Arquitectura en Capas** mediante la creación de una nueva entidad (**Categorías**) y la implementación de reglas de negocio que aseguren la integridad de la información.

---

## Escenario de Trabajo
Actualmente, nuestra API solo maneja productos. En el mundo real, los productos pertenecen a familias o categorías. Tu misión es construir el sistema de categorías y conectarlo con los productos, asegurándote de que no se cometan errores lógicos al borrar información.

---

## Fase 1: Configuración y Preparación

1.  **Clonar el repositorio:** Descarga el proyecto base desde el enlace proporcionado por tu instructor.
2.  **Instalar dependencias:** Ejecuta `npm install`.
3.  **Verificación:** Inicia el servidor con `npm run dev` y asegúrate de que el CRUD de productos actual responda correctamente en Postman.

---

## Fase 2: Creación del CRUD de Categorías

Debes replicar la estructura de capas para la entidad **Categorías** (`id`, `name`). Sigue este orden de construcción:

1.  **Capa de Datos (`src/data/categories.data.js`):** Crea un arreglo inicial con al menos 3 categorías (ej: *Laptops, Periféricos, Componentes*).
2.  **Capa de Modelo (`src/models/category.model.js`):** Implementa los métodos `findAll`, `findById`, `create`, `update` y `delete`.
3.  **Capa de Controlador (`src/controllers/category.controller.js`):** Gestiona las peticiones. Recuerda usar siempre el formato de respuesta estandarizado:
    ```json
    {
      "success": true,
      "message": "Mensaje descriptivo",
      "data": [...],
      "errors": []
    }
    ```
4.  **Capa de Rutas (`src/routes/category.routes.js`):** Define los endpoints y conéctalos en `src/app.js` bajo el prefijo `/categories`.

---

## 🔗 Fase 3: Vinculación de Productos

Una vez que el CRUD de categorías funcione, debemos relacionar ambas entidades:

1.  **Actualizar la Data:** En `src/data/products.data.js`, agrega a cada producto una propiedad llamada `category_id` que corresponda al ID de una de tus categorías.
2.  **Actualizar el Modelo de Productos:** Modifica el método `create` para que ahora acepte y guarde el `category_id`.

---

## Fase 4: El Reto de Integridad (Regla de Negocio)

**Problema:** Si eliminamos una categoría que todavía tiene productos vinculados, esos productos quedarán "huérfanos" (con un ID de categoría que ya no existe).

**Tu Misión:** Modifica el método `deleteCategory` en el controlador de categorías para que cumpla la siguiente lógica:

1.  **Validación:** Antes de borrar, el controlador debe preguntar al **Modelo de Productos**: *"¿Hay algún producto que use este ID de categoría?"*.
2.  **Respuesta de Error:** Si existen productos vinculados, **NO** se debe borrar la categoría. Debes responder con un código **409 (Conflict)** y el mensaje: `"No se puede eliminar la categoría porque tiene recursos vinculados"`.
3.  **Respuesta de Éxito:** Si la categoría está vacía, procede a eliminarla y responde con un código **200 (OK)**.

---

## Checklist de Entrega

| Tarea | Estado |
| :--- | :--- |
| CRUD de Categorías funcionando al 100%. | [ ] |
| Los productos incluyen la propiedad `categoryId`. | [ ] |
| Las respuestas JSON siguen el formato estandarizado. | [ ] |
| Se impide el borrado de categorías con productos vinculados. | [ ] |
| El código está correctamente organizado en las 4 capas. | [ ] |

---

> **Tip para el éxito:** > Para validar la integridad, podrías crear un método en el `product.model.js` llamado `existsByCategoryId(id)` que devuelva `true` o `false`. ¡Usa las capas a tu favor!