# Plan: Implementar localStorage Extensible para Login y Registro

## Objetivo
Agregar funcionalidad de almacenamiento local con estructura de datos extensible que permita almacenar información completa de atletas y entrenadores (perfiles, preferencias, estadísticas, relaciones) sin necesidad de modificar el código en el futuro.

## Archivo a modificar
- `/home/ser/Documents/programador/entrenamiento/app/index.html`

## Implementación

### 1. Funciones helper para gestionar usuarios en localStorage
- Crear función `getUsers()` que retorna array de usuarios desde localStorage (o array vacío si no existe)
- Crear función `saveUsers(users)` que guarda array de usuarios en localStorage
- Crear función `findUserByEmail(email)` que busca usuario por email en localStorage
- Crear función `getCurrentUser()` que obtiene el usuario actualmente autenticado desde sessionStorage
- Crear función `setCurrentUser(user)` que guarda el usuario actual en sessionStorage para acceso en otras páginas
- Crear función `updateUser(userId, updates)` para actualizar información de usuario existente (futuro)
- Crear función `getUserById(userId)` para buscar usuario por ID (futuro)

### 2. Estructura de datos extensible
- Guardar array de usuarios en localStorage con clave `'rpe-tracker-users'`
- Estructura completa del objeto usuario:

```javascript
{
  // Datos de autenticación (requeridos)
  id: string, // UUID generado: timestamp + random
  email: string,
  password: string,
  userType: 'atleta' | 'entrenador',
  createdAt: string, // ISO date string
  
  // Datos personales básicos (del formulario de registro)
  nombre: string,
  apellido: string,
  
  // Campos específicos de ATLETA (inicializados con valores por defecto)
  atleta: {
    telefono: null,
    nivel: null, // Ej: "Crossfit Avanzado"
    entrenadorId: null, // ID del entrenador asignado
    estadisticas: {
      rpePromedio: null,
      duracionPromedioSesion: null, // en minutos
      volumen: null, // en kg
      frecuencia: null // sesiones por semana
    },
    notificaciones: {
      email: true,
      aplicacion: true
    },
    privacidad: {
      perfilPublico: false,
      compartirStats: false
    },
    sesiones: [] // Array de sesiones de entrenamiento (futuro)
  },
  
  // Campos específicos de ENTRENADOR (inicializados con valores por defecto)
  entrenador: {
    emailProfesional: null,
    especialidad: null, // Ej: "CrossFit", "Fuerza"
    certificaciones: null, // Ej: "CF-L1, CSCS"
    atletasAsignados: [], // Array de IDs de atletas (futuro)
    notificaciones: {
      alertasSesionesCompletadas: true,
      alertasRPEFueraRango: true,
      resumenDiario: false
    },
    preferenciasPlanes: {
      vistaPredeterminadaCalendario: "semanal", // "semanal" | "mensual" | "diaria"
      rangoRPEDefecto: "6-8", // "6-8" | "7-9" | "5-7"
      autoAsignarPlanes: false
    }
  }
}
```

### 3. Modificar formulario de registro
- En el evento `submit` de `register-form` (línea 473):
  - Validar que las contraseñas coincidan
  - Validar que se haya seleccionado tipo de usuario
  - Verificar si el email ya existe en localStorage
  - Si existe, mostrar error: "Este email ya está registrado"
  - Si no existe:
    - Generar ID único usando `Date.now() + Math.random().toString(36)`
    - Crear objeto usuario con estructura completa:
      - Datos básicos del formulario (nombre, apellido, email, password, userType)
      - Inicializar objeto `atleta` o `entrenador` según userType con valores por defecto
      - El objeto no utilizado (atleta o entrenador) se puede omitir o inicializar vacío
    - Agregar usuario al array de usuarios
    - Guardar en localStorage
    - Mostrar mensaje: "Registro exitoso! Por favor inicie sesión."
    - Cambiar a vista de login

### 4. Modificar formulario de login
- En el evento `submit` de `login-form` (línea 446):
  - Obtener email y password del formulario
  - Buscar usuario en localStorage usando `findUserByEmail(email)`
  - Si no se encuentra en localStorage:
    - Verificar usuarios demo hardcodeados (atleta@test.com, entrenador@test.com con password 'demo123')
    - Si es usuario demo, crear objeto temporal y redirigir
  - Si se encuentra en localStorage:
    - Verificar que la contraseña coincida
    - Si las credenciales son correctas:
      - Guardar usuario completo en sessionStorage usando `setCurrentUser(user)`
      - Redirigir según userType:
        - `userType === 'atleta'` → `atletas/index.html`
        - `userType === 'entrenador'` → `entrenador/index.html`
    - Si la contraseña es incorrecta, mostrar error: "Email o contraseña incorrectos"
  - Si no se encuentra usuario, mostrar error: "Email o contraseña incorrectos"

### 5. Inicialización de datos por defecto
- Crear función `createDefaultUserData(userType)` que retorna el objeto de datos por defecto según el tipo:
  - Para 'atleta': retorna objeto `atleta` con valores por defecto
  - Para 'entrenador': retorna objeto `entrenador` con valores por defecto
- Esta función facilita la extensión futura agregando nuevos campos por defecto

## Consideraciones importantes
- Las contraseñas se guardan en texto plano (aceptable para entrenamiento/demo, NO para producción)
- Los usuarios demo (atleta@test.com, entrenador@test.com) mantienen compatibilidad
- La estructura permite agregar nuevos campos sin modificar código de registro/login
- Los campos opcionales se inicializan con valores null o por defecto apropiados
- El usuario actual se guarda en sessionStorage para acceso rápido en otras páginas
- Validaciones: email único, contraseñas coinciden, campos requeridos
- La estructura separa datos de autenticación de datos específicos del tipo de usuario
- Los objetos `atleta` y `entrenador` siempre se inicializan para facilitar acceso futuro, aunque solo uno será usado

## Tareas de implementación

1. Crear funciones helper para gestionar usuarios en localStorage (getUsers, saveUsers, findUserByEmail, getCurrentUser, setCurrentUser)
2. Crear función createDefaultUserData para inicializar datos por defecto según userType (atleta/entrenador)
3. Modificar evento submit del formulario de registro para crear usuario con estructura completa y guardar en localStorage
4. Modificar evento submit del formulario de login para leer desde localStorage, validar credenciales y guardar usuario actual en sessionStorage

