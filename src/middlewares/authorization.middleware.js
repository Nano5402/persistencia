/**
 * --- SOLUCIÓN RETO 2: MIDDLEWARE DE AUTORIZACIÓN ---
 * Implemento una closure (función de orden superior) para poder recibir el permiso requerido 
 * como parámetro dinámico, retornando al final la firma estándar (req, res, next) 
 * que requiere la cadena de ejecución de Express.
 */
export const authorize = (requiredPermission) => {
  
  return (req, res, next) => {
    
    // Extraigo el arreglo de permisos inyectado previamente en el objeto req.user por el middleware de autenticación
    const userPermissions = req.user.permissions || [];

    // Evalúo si el permiso exigido por la ruta existe dentro de la matriz de permisos del usuario
    const hasPermission = userPermissions.includes(requiredPermission);

    // Si el usuario carece del permiso, interrumpo el flujo devolviendo un error HTTP 403 (Forbidden)
    if (!hasPermission) {
      const error = new Error(`Acceso denegado. Se requiere el permiso: '${requiredPermission}'`);
      error.statusCode = 403; 
      return next(error); // Propago la excepción hacia el manejador global de errores
    }

    // Si la validación es exitosa, cedo el control al siguiente middleware o controlador
    next();
  };
};