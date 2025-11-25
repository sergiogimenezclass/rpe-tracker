# Cambios: Reemplazar alert() por Toasts de Bootstrap

## Qué se cambió

Se eliminaron todos los `alert()` del CRUD de atletas (`app/entrenador/atletas.html`) y se reemplazaron por **Toasts de Bootstrap** para una UX más moderna y no intrusiva.

---

## 1. HTML: Contenedor de Toast

Se agregó al final del body:

```html
<!-- Contenedor para Toasts de Bootstrap -->
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999;">
    <div id="atletasToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" id="toastHeader">
            <strong class="me-auto" id="toastTitle">Notificación</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toastBody">
            Mensaje aquí
        </div>
    </div>
</div>
```

**Ubicación:** Esquina inferior derecha, z-index alto para estar siempre visible.

---

## 2. Función Helper: `showToastAtletas()`

```javascript
/**
 * Muestra un toast de Bootstrap
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo: 'success', 'error', 'warning', 'info'
 * @param {string} titulo - Título opcional
 */
function showToastAtletas(mensaje, tipo = 'info', titulo = null)
```

**Características:**
- ✅ Títulos automáticos según tipo (✓ Éxito, ✗ Error, ⚠ Advertencia, ℹ Información)
- ✅ Colores dinámicos (verde/rojo/amarillo/azul)
- ✅ Duración: 3 segundos (5 segundos para errores)
- ✅ Auto-cierre con opción de cerrar manualmente

---

## 3. Reemplazos Realizados

### Función: `guardarAtleta()`

| Antes | Después |
|-------|---------|
| `alert('Completa todos los campos')` | `showToastAtletas('Completa todos los campos requeridos', 'warning')` |
| `alert(atletaEditandoId ? 'Atleta actualizado' : 'Atleta creado exitosamente')` | `showToastAtletas('...', 'success', 'Atleta creado')` |
| `alert('Error: el email ya existe...')` | `showToastAtletas('Error: el email ya existe...', 'error')` |

### Función: `confirmarEliminar()`

| Antes | Después |
|-------|---------|
| `alert('Atleta eliminado exitosamente')` | `showToastAtletas('${nombre} ha sido eliminado...', 'success')` |
| `alert('Error al eliminar atleta')` | `showToastAtletas('Error al eliminar...', 'error')` |

### Función: `asignarAtleta()`

| Antes | Después |
|-------|---------|
| `alert('Atleta asignado exitosamente')` | `showToastAtletas('${nombreAtleta} ha sido asignado...', 'success')` |
| `alert('Error al asignar atleta...')` | `showToastAtletas('Error al asignar...', 'error')` |

---

## Ejemplos de Toasts que Verás:

### ✓ Éxito (Verde, 3 seg)
```
✓ Éxito
Atleta creado exitosamente
```

### ✗ Error (Rojo, 5 seg)
```
✗ Error
Error: el email ya existe o hubo un problema
```

### ⚠ Advertencia (Amarillo, 3 seg)
```
⚠ Advertencia
Completa todos los campos requeridos
```

---

## Ventajas sobre alert()

| Aspecto | alert() | Toast |
|--------|---------|-------|
| **Intrusividad** | Muy intrusivo | No intrusivo |
| **UX** | Anticuado | Moderno |
| **Ubicación** | Centro (fija) | Esquina (configurable) |
| **Auto-cierre** | No | Sí (3-5 seg) |
| **Styling** | Navegador | Personalizable |
| **No bloquea** | Bloquea ejecución | No bloquea |

---

## Verificación

✅ Sin errores sintácticos  
✅ Toasts se muestran con los colores correctos  
✅ Auto-cierre funciona (3 seg normal, 5 seg errores)  
✅ Bootstrap 5.3.3 ya incluye Toast nativo  

---

## Próximas Mejoras (Opcionales)

- [ ] Agregar sonido a toasts de error
- [ ] Posición configurable (top-left, top-right, etc.)
- [ ] Animaciones personalizadas
- [ ] Contador de acciones completadas
