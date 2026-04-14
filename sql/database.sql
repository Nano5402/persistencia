-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS inventario_adso;

-- 2. Crear el usuario restringido a localhost
CREATE USER 'app_user'@'localhost' IDENTIFIED BY '#ADSO_node';

-- 3. Asignar todos los privilegios de ESA base de datos a ESTE usuario
GRANT ALL PRIVILEGES ON inventario_adso.* TO 'app_user'@'localhost';

-- 4. Aplicar los cambios de privilegios inmediatamente
FLUSH PRIVILEGES;

-- 5. Seleccionar la base de datos para empezar a crear las tablas
USE inventario_adso;

-- 6. Crear la tabla de Categorías (Debe ir primero porque no depende de nadie)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_ud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Crear la tabla de Productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    categori_id INT NOT NULL,
    created_ud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Definición de la Llave Foránea con restricción de eliminación
    CONSTRAINT fk_product_category 
    FOREIGN KEY (categori_id) 
    REFERENCES categories(id)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

-- 8. Modificamos la tabla productos para poder almacenar los precios
ALTER TABLE products ADD COLUMN price DECIMAL(10, 2) AFTER name;