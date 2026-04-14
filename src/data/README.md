### **Capa de Datos (`products.data.js`)**

Esta capa representa nuestra **Fuente de Datos**. En un desarrollo profesional, aquí es donde conectaríamos con una base de datos real (como MySQL o PostgreSQL). Para este ejercicio, utilizamos un **arreglo de objetos en memoria** que actúa como nuestro almacén temporal.

---

#### **Estructura del Objeto "Producto"**

Para que el sistema funcione correctamente, cada producto dentro del arreglo debe seguir la misma estructura (esquema). Esto permite que el Modelo y el Controlador puedan procesar la información sin errores:

* **`id` (Número):** Es el identificador único. Funciona como la "cédula" del producto; no puede haber dos iguales. Es fundamental para las operaciones de búsqueda y eliminación.
* **`name` (Texto):** El nombre descriptivo del artículo tecnológico.
* **`price` (Número):** El costo del producto. Se maneja como número para poder realizar operaciones matemáticas (como sumas de totales o filtros de precios).

