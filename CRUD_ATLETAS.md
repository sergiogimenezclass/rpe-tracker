# CRUD de Atletas - Guía de Uso y Prueba

## Cambios Realizados

### 1. **app/js/session.js**
Agregadas funciones de CRUD para atletas:
- `crearAtletaConUsuario(nombre, email, contrasena, entrenadorId)` - Crea atleta y usuario
- `getAtletasDelEntrenador(entrenadorId)` - Obtiene atletas de un entrenador
- `actualizarAtleta(atletaId, updates)` - Actualiza datos del atleta
- `eliminarAtleta(atletaId)` - Elimina atleta y usuario
- `getAtletaById(atletaId)` - Obtiene atleta por ID

### 2. **app/entrenador/atletas.html**
Actualizaciones implementadas:
- **Modal**: Formulario para crear/editar atleta con campos: nombre, email, contraseña
- **Tabla**: Mostrar atletas con nombre, email, estado, fecha de creación y acciones
- **Búsqueda**: Input para filtrar atletas por nombre o email en tiempo real
- **Botones**: "Nuevo Atleta" (desktop y móvil), editar, eliminar
- **Scripts**: Lógica CRUD completa con validaciones

## Estructura de Datos (localStorage)

### Formato del Atleta en `rpe-tracker-users`:
```json
{
  "id": "atleta-1732520934567",
  "nombre": "Juan Pérez",
  "email": "juan@mail.com",
  "password": "demo123",
  "userType": "atleta",
  "entrenadorId": "demo-entrenador",
  "activo": true,
  "createdAt": "2025-11-25T10:30:00.000Z"
}
```

## Pasos para Probar

### 1. **Iniciar sesión como entrenador**
```
Email: entrenador@test.com
Contraseña: demo123
```

### 2. **Navegar a Atletas**
- Desde el menú lateral, ir a "Atletas"
- Debería cargar la lista vacía (o con atletas existentes)

### 3. **Crear un nuevo atleta**
- Click en "+ Nuevo Atleta" (botón desktop o móvil)
- Llenar formulario:
  - Nombre: `Carlos López`
  - Email: `carlos@mail.com`
  - Contraseña: `pass123`
- Click en "Guardar Atleta"
- Verificar que aparece en la tabla

### 4. **Editar atleta**
- Click en icono lápiz del atleta creado
- Cambiar nombre a `Carlos Alberto López`
- Cambiar contraseña si lo deseas
- Click en "Guardar Atleta"
- Verificar cambios en tabla

### 5. **Buscar atleta**
- En el input "Buscar por nombre o email..."
- Escribir "carlos" o "carlos@mail.com"
- Tabla debe filtrar en tiempo real

### 6. **Eliminar atleta**
- Click en icono papelera
- Confirmar en diálogo
- Atleta debe desaparecer de la tabla

### 7. **Verificar en localStorage**
Abrir consola del navegador (F12) y ejecutar:
```javascript
JSON.parse(localStorage.getItem('rpe-tracker-users'))
```

Deberías ver los atletas creados con estructura correcta.

## Funcionalidades Incluidas

✅ Crear atleta con usuario automático  
✅ Listar atletas del entrenador logueado  
✅ Editar nombre, email y contraseña  
✅ Eliminar atleta  
✅ Buscar/filtrar en tiempo real  
✅ Validación de email único  
✅ Confirmación antes de eliminar  
✅ Responsivo (desktop y móvil)  
✅ Integración con sistema de sesión existente  

## Próximas Mejoras (Sugeridas)

- [ ] Encriptar contraseñas con bcrypt.js
- [ ] Agregar validación de email en servidor
- [ ] Agregar rol/nivel deportivo del atleta
- [ ] Estadísticas del atleta (planes asignados, sesiones completadas)
- [ ] Exportar lista de atletas (CSV/PDF)
- [ ] Paginación si hay muchos atletas
- [ ] Cambiar estado (activo/inactivo) sin eliminar

## Notas Técnicas

- **Relación**: Cada atleta tiene `entrenadorId` que apunta al ID del entrenador
- **Aislamiento**: Cada entrenador solo ve sus propios atletas
- **Almacenamiento**: Todo en localStorage bajo clave `rpe-tracker-users`
- **Validación**: Email único en todo el sistema
- **Respaldo**: Aún no hay backup automático (considerar en producción)
