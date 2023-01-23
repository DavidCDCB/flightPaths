# 🛫Rutas de vuelo🛬

![](https://i.imgur.com/loeDS2W.png)

### Descripción del proyecto
Esta es una aplicación web desarrollada en Angular 15.1.2 la cual se encarga de mostrar las rutas de vuelo disponibles de acuerdo a información proveniente de la empresa NEWSHORE AIR según el lugar de origen y destino establecidos por el usuario.

### Proceso de instalación
- Luego de clonar el proyecto desde este repositorio se debe usar `npm install` para agregar todas las dependencias del proyecto. 
- Luego usar `ng serve` para usar el servidor de desarrollo en `http://localhost:4200/`, la aplicación se recargará automáticamente si cambia cualquiera de los archivos de origen.

### Funcionalidades principales
- Cuando el usuario accede a la aplicación, esta obtiene información actualizada de los servicios API Rest de la empresa.
- Para un correcto funcionamiento se verifica que los datos ingresados por el usuario sean correctos con el fin de obtener resultados correctos.
- Cuando no se encuentra una ruta establecida, se le informa al usuario por medio de un mensaje pop up para que elija lugares diferentes.
- Cuando la información de la ruta es encontrada, se muestra el costo total de esta.
- El costo total puede ser representado en diferentes tipos de moneda según sea elegido.
- El resultado de la ruta encontrada también es representado en formato JSON con el fin realizar futuras integraciones con otros sistemas.

### Características adicionales
- Esta aplicación se encuentra dividida por varios componentes que representan las características principales, estos componentes transfieren información entre sí según la jerarquía definida y al flujo de la los datos.
- Para este caso se obtiene la información de un endpoint que posee la representación de un grafo con ciclos y rutas múltiples, para dar solución con estos datos obtenidos se eligió usar un algoritmo de búsqueda recursiva en profundidad con el fin de hallar una ruta adecuada de acuerdo al origen y al destino previamente especificados.

### Detalles técnicos
- Esta aplicación se encuentra dividida por varios componentes que representan las características principales, estos componentes transfieren información entre sí según la jerarquía definida y al flujo de la los datos.
- Para este caso se obtiene la información de un endpoint que posee la representación de un grafo con ciclos y rutas múltiples, para dar solución con estos datos obtenidos se eligió usar un algoritmo de búsqueda recursiva en profundidad con el fin de hallar una ruta adecuada de acuerdo al origen y al destino previamente especificados.

### Aspectos a mejorar
Debido a la arquitectura elegida no se hace posible la comunicación entre componentes hermanos, esto hace que el cambio de moneda no se actualice correctamente cuando se genera una nueva ruta y previamente se había realizado un cambio de moneda, para poder solucionar esto al parecer tendría que implementar un manejador de estados entre componentes.