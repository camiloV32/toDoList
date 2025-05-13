
## Pasos para Ejecutar la Aplicación

1. **Clonar el Repositorio**:
   ```sh
   git clone https://github.com/camiloV32/cargo-express.git
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