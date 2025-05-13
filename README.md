
## Pasos para Ejecutar la Aplicación

1. **Clonar el Repositorio**:
   ```sh
   git clone https://github.com/camiloV32/toDoList.git
   cd <RUTA_DEL_PROYECTO>
   ```
2. **Construir y levantar el contenedor**:
   ```sh
   docker-compose up --build
   ```
3. **Acceder a la Aplicación**:
   - La aplicación web estará disponible en `http://localhost:3000`



## Rutas

**Endpoint:** `/auth/signIn`

**Método:** `POST`

**Ejemplo body**

```json
{
    "username": "Pepe",
    "email": "prueba@prueba.com",
    "password": "Prueba123"
}
```

**Endpoint:** `/auth/logIn`

**Método:** `POST`

**Ejemplo body**

```json
{
    "email": "prueba@prueba.com",
    "password": "Prueba123"
}
```


**Endpoint:** `/task`

**Método:** `POST`

**Encabezado de la petición:**
* **Headers:** Debe contener el siguiente campo:
	+ **Authorization:** Una cadena de texto (`string`) que representa el token de autenticación obtenido en `/auth/logIn`

**Ejemplo body**

```json
{
  "title": "Completar reporte",
  "description": "Hacer el reporte mensual de ventas",
  "status": "pending"
}

```