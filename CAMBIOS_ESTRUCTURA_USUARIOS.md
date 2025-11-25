# Corrección: Estructura Consistente de Usuarios

## Problema Identificado
Había inconsistencia en la estructura de usuarios creados desde:
1. **Formulario de Registro (index.html)** - Estructura A
2. **CRUD de Atletas (atletas.html)** - Estructura B (incorrecta)

Esto causaba que los atletas creados con el CRUD no se mostraran en la tabla.

---

## Estructura Anterior (INCORRECTA)

### Atletas creados con el CRUD:
```javascript
{
  id: "atleta-1732520934567",
  nombre: "Juan",
  email: "juan@mail.com",
  password: "demo123",
  userType: "atleta",
  entrenadorId: "demo-entrenador",  // ❌ A nivel raíz
  activo: true,
  createdAt: "2025-11-25T..."
}
```

**Problemas:**
- Campo `entrenadorId` a nivel raíz
- Campo `activo` que no existe en usuarios de registro
- Faltan campos como `apellido`
- Falta la estructura anidada `atleta: {...}`

---

## Estructura Actual (CORRECTA)

### Atletas creados con Registro E CRUD (consistentes):
```javascript
{
  id: "generado-por-timestamp-y-random",
  email: "juan@mail.com",
  password: "demo123",
  userType: "atleta",
  createdAt: "2025-11-25T...",
  nombre: "Juan",
  apellido: "",
  atleta: {  // ← Estructura anidada consistente
    telefono: null,
    nivel: null,
    entrenadorId: "demo-entrenador",  // ✅ Dentro de atleta
    estadisticas: {
      rpePromedio: null,
      duracionPromedioSesion: null,
      volumen: null,
      frecuencia: null
    },
    notificaciones: {
      email: true,
      aplicacion: true
    },
    privacidad: {
      perfilPublico: false,
      compartirStats: false
    },
    sesiones: []
  }
}
```

---

## Cambios Realizados en session.js

### 1. Nueva función: `generateUserId()`
```javascript
function generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
```
- Genera IDs con mismo formato que index.html

### 2. Nueva función: `createDefaultAtletaData()`
```javascript
function createDefaultAtletaData() {
    return {
        telefono: null,
        nivel: null,
        entrenadorId: null,
        estadisticas: {...},
        notificaciones: {...},
        privacidad: {...},
        sesiones: []
    };
}
```

### 3. Actualizado: `crearAtletaConUsuario()`
- Usa `generateUserId()` en lugar de timestamp simple
- Crea estructura `atleta: defaultData` en lugar de campos sueltos
- Establece `entrenadorId` dentro de `atleta.entrenadorId`
- Incluye campo `apellido` para consistencia

### 4. Actualizado: `getAtletasDelEntrenador()`
- Ahora busca `u.atleta.entrenadorId` en lugar de `u.entrenadorId`
- Verificación correcta de estructura anidada

### 5. Actualizado: `actualizarAtleta()`
- Actualiza solo campos permitidos del usuario
- Preserva la estructura anidada

---

## Cambios en atletas.html

### 1. Tabla renderizada
- Usa `nombreCompleto` (nombre + apellido)
- Elimina verificación de `atleta.activo`
- Siempre muestra estado "Activo" (todos lo son al crearlos)

---

## Validación Post-Cambios

### Usuarios de Registro se cargan correctamente ✅
```javascript
// Atleta creado desde registro = atleta creado desde CRUD
// Ambos tienen estructura idéntica
```

### Atletas persisten tras logout ✅
```javascript
1. Crear atleta con CRUD → se guarda en localStorage correctamente
2. Logout
3. Login como entrenador
4. Ver atletas → aparecen en la tabla (porque buscan en atleta.entrenadorId)
```

### Búsqueda y filtrado funcionan ✅
```javascript
// Los atletas se renderizan con estructura consistente
```

---

## Próximos Pasos (Recomendados)

1. **Limpiar localStorage**: Eliminar atletas viejos creados con estructura incorrecta
   ```javascript
   localStorage.removeItem('rpe-tracker-users');
   ```
   O manualmente desde DevTools.

2. **Crear nuevos atletas**: Usarán estructura correcta automáticamente

3. **Migración (opcional)**: Si hay muchos atletas antiguos, crear script para migrarlos a estructura nueva

---

## Resumen

| Aspecto | Antes | Después |
|---------|-------|---------|
| Registro + CRUD | Estructuras diferentes | Idénticas ✅ |
| entrenadorId ubicación | Raíz | Dentro de `atleta` ✅ |
| Carga de atletas | Solo de registro | Ambos orígenes ✅ |
| Persistencia tras logout | Fallaba | Funciona ✅ |
| Búsqueda y filtrado | Parcial | Completo ✅ |
