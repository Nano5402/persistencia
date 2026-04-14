-- Usar la base de datos correcta
USE inventario_adso;

-- ==========================================
-- 1. POBLAR CATEGORÍAS (20 Registros)
-- ==========================================
INSERT INTO categories (id, name) VALUES
(1, 'Laptops y Computadoras'),
(2, 'Periféricos (Teclados y Ratones)'),
(3, 'Monitores y Pantallas'),
(4, 'Audio (Audífonos y Parlantes)'),
(5, 'Almacenamiento (HDD, SSD, USB)'),
(6, 'Componentes Internos (CPU, GPU, RAM)'),
(7, 'Redes y Conectividad (Routers, Switches)'),
(8, 'Impresoras y Escáneres'),
(9, 'Smartphones y Celulares'),
(10, 'Tablets y Lectores Electrónicos'),
(11, 'Consolas de Videojuegos'),
(12, 'Cables y Adaptadores'),
(13, 'Energía (UPS, Regletas, Cargadores)'),
(14, 'Software y Licencias'),
(15, 'Cámaras y Fotografía'),
(16, 'Drones y Robótica'),
(17, 'Realidad Virtual y Aumentada'),
(18, 'Herramientas de Mantenimiento PC'),
(19, 'Mobiliario de Oficina y Gaming'),
(20, 'Iluminación Inteligente y Domótica');

-- ==========================================
-- 2. POBLAR PRODUCTOS CON PRECIO (100 Registros)
-- ==========================================
INSERT INTO products (id, name, categori_id, price) VALUES
-- Categoría 1: Laptops y Computadoras
(1, 'Laptop Dell XPS 15', 1, 1499.99),
(2, 'MacBook Pro 16 M2', 1, 2499.00),
(3, 'Lenovo ThinkPad T14', 1, 1250.50),
(4, 'HP Spectre x360', 1, 1350.00),
(5, 'Asus ROG Zephyrus G14', 1, 1600.00),

-- Categoría 2: Periféricos
(6, 'Mouse Logitech MX Master 3S', 2, 99.99),
(7, 'Teclado Mecánico Keychron K2', 2, 85.00),
(8, 'Mouse Gamer Razer DeathAdder', 2, 45.50),
(9, 'Teclado Corsair K95 RGB', 2, 160.00),
(10, 'Mousepad Ergonómico Gel', 2, 15.99),

-- Categoría 3: Monitores y Pantallas
(11, 'Monitor LG UltraGear 27', 3, 350.00),
(12, 'Monitor Dell UltraSharp 32 4K', 3, 850.00),
(13, 'Pantalla Samsung Odyssey G7', 3, 650.00),
(14, 'Monitor BenQ para Diseño 27', 3, 400.00),
(15, 'Monitor Curvo ASUS 34', 3, 500.00),

-- Categoría 4: Audio
(16, 'Audífonos Sony WH-1000XM5', 4, 398.00),
(17, 'AirPods Pro 2da Gen', 4, 249.00),
(18, 'Parlante JBL Flip 6', 4, 129.95),
(19, 'Micrófono Blue Yeti USB', 4, 110.00),
(20, 'Monitores de Estudio KRK Rokit 5', 4, 180.00),

-- Categoría 5: Almacenamiento
(21, 'SSD NVMe Samsung 980 PRO 1TB', 5, 120.00),
(22, 'Disco Duro Externo WD 4TB', 5, 105.50),
(23, 'Memoria USB SanDisk 128GB', 5, 22.00),
(24, 'SSD SATA Kingston A400 480GB', 5, 35.00),
(25, 'MicroSD Samsung EVO Plus 256GB', 5, 28.50),

-- Categoría 6: Componentes Internos
(26, 'Procesador AMD Ryzen 7 5800X', 6, 250.00),
(27, 'Tarjeta de Video NVIDIA RTX 4070', 6, 599.99),
(28, 'Memoria RAM Corsair Vengeance 32GB', 6, 95.00),
(29, 'Placa Base ASUS ROG Strix B550-F', 6, 185.00),
(30, 'Fuente de Poder EVGA 750W 80+ Gold', 6, 110.00),

-- Categoría 7: Redes y Conectividad
(31, 'Router TP-Link Archer AX73 Wi-Fi 6', 7, 135.00),
(32, 'Switch Cisco No Administrable 8 Puertos', 7, 45.00),
(33, 'Repetidor Wi-Fi Xiaomi Pro 300M', 7, 20.00),
(34, 'Sistema Mesh Google Nest Wi-Fi', 7, 250.00),
(35, 'Tarjeta de Red Inalámbrica PCIe', 7, 35.00),

-- Categoría 8: Impresoras y Escáneres
(36, 'Impresora Epson EcoTank L3250', 8, 210.00),
(37, 'Impresora Láser HP LaserJet Pro', 8, 185.50),
(38, 'Escáner Portátil Brother', 8, 140.00),
(39, 'Impresora Fotográfica Canon SELPHY', 8, 125.00),
(40, 'Tóner Original HP 83A Negro', 8, 65.00),

-- Categoría 9: Smartphones y Celulares
(41, 'iPhone 14 Pro Max 256GB', 9, 1199.00),
(42, 'Samsung Galaxy S23 Ultra', 9, 1150.00),
(43, 'Google Pixel 7 Pro', 9, 899.00),
(44, 'Xiaomi 13 Pro 5G', 9, 850.00),
(45, 'Motorola Edge 40', 9, 600.00),

-- Categoría 10: Tablets y Lectores
(46, 'iPad Air 5ta Generación', 10, 599.00),
(47, 'Samsung Galaxy Tab S8', 10, 650.00),
(48, 'Amazon Kindle Paperwhite 16GB', 10, 149.99),
(49, 'Lenovo Tab P11 Pro', 10, 420.00),
(50, 'Microsoft Surface Pro 9', 10, 999.00),

-- Categoría 11: Consolas de Videojuegos
(51, 'PlayStation 5 Edición Disco', 11, 499.99),
(52, 'Xbox Series X 1TB', 11, 499.99),
(53, 'Nintendo Switch OLED', 11, 349.99),
(54, 'Steam Deck 512GB', 11, 649.00),
(55, 'Control Inalámbrico DualSense', 11, 69.00),

-- Categoría 12: Cables y Adaptadores
(56, 'Cable HDMI 2.1 Ultra HD 2M', 12, 18.50),
(57, 'Cable USB-C a USB-C 100W', 12, 15.00),
(58, 'Adaptador Hub USB-C 7 en 1', 12, 45.00),
(59, 'Cable de Red Ethernet Cat 6 5M', 12, 10.00),
(60, 'Conversor DisplayPort a HDMI', 12, 12.50),

-- Categoría 13: Energía
(61, 'UPS APC Back-UPS 600VA', 13, 75.00),
(62, 'Regleta Protectora de Picos Belkin', 13, 25.00),
(63, 'Cargador de Pared Anker 65W GaN', 13, 40.00),
(64, 'Power Bank Xiaomi 20000mAh', 13, 35.00),
(65, 'Batería de Reemplazo para Laptop HP', 13, 50.00),

-- Categoría 14: Software y Licencias
(66, 'Licencia Microsoft Windows 11 Pro', 14, 199.99),
(67, 'Suscripción Microsoft 365 Personal', 14, 69.99),
(68, 'Antivirus Kaspersky Total Security 1 Año', 14, 39.99),
(69, 'Suscripción Adobe Creative Cloud', 14, 599.88),
(70, 'Licencia WinRAR (Solo para puristas)', 14, 29.00),

-- Categoría 15: Cá ক্যামেরas y Fotografía
(71, 'Cámara Mirrorless Sony Alpha a7 IV', 15, 2498.00),
(72, 'Cámara de Acción GoPro HERO 11', 15, 399.00),
(73, 'Lente Canon EF 50mm f/1.8 STM', 15, 125.00),
(74, 'Trípode Profesional Manfrotto', 15, 180.00),
(75, 'Aro de Luz LED de 18 Pulgadas', 15, 45.00),

-- Categoría 16: Drones y Robótica
(76, 'Drone DJI Mini 3 Pro', 16, 759.00),
(77, 'Drone DJI Mavic 3 Classic', 16, 1599.00),
(78, 'Kit Educativo Arduino Uno R3', 16, 45.00),
(79, 'Robot Aspirador Roborock S7', 16, 649.00),
(80, 'Hélices de Repuesto DJI Mini 2', 16, 15.00),

-- Categoría 17: Realidad Virtual y Aumentada
(81, 'Gafas VR Meta Quest 2 128GB', 17, 299.99),
(82, 'Gafas VR Meta Quest 3 512GB', 17, 649.99),
(83, 'PlayStation VR2', 17, 549.99),
(84, 'Estuche Rígido para Meta Quest', 17, 45.00),
(85, 'Cable Link para PC VR 5M', 17, 79.00),

-- Categoría 18: Herramientas de Mantenimiento PC
(86, 'Kit de Destornilladores iFixit Pro Tech', 18, 74.99),
(87, 'Pasta Térmica Arctic MX-4 4g', 18, 9.50),
(88, 'Aire Comprimido en Lata 400ml', 18, 12.00),
(89, 'Pulsera Antiestática Inalámbrica', 18, 8.50),
(90, 'Tester de Fuentes de Poder ATX', 18, 18.00),

-- Categoría 19: Mobiliario de Oficina y Gaming
(91, 'Silla Ergonómica Herman Miller Aeron', 19, 1200.00),
(92, 'Silla Gamer Secretlab Titan Evo', 19, 549.00),
(93, 'Escritorio Elevable Automático', 19, 350.00),
(94, 'Soporte de Monitor Doble Brazo', 19, 85.00),
(95, 'Reposapiés Ergonómico Ajustable', 19, 35.00),

-- Categoría 20: Iluminación Inteligente y Domótica
(96, 'Foco Inteligente Philips Hue RGB', 20, 49.99),
(97, 'Cinta LED Govee RGBIC 5M', 20, 35.00),
(98, 'Asistente Amazon Echo Dot 5ta Gen', 20, 49.99),
(99, 'Enchufe Inteligente TP-Link Tapo', 20, 15.00),
(100, 'Cámara de Seguridad Wyze Cam v3', 20, 35.98);