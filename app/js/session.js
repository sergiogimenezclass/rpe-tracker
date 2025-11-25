const SESION_KEY = "rpe-tracker-current-user";

// ==================== FUNCIONES HELPER PARA LOCALSTORAGE ====================

/**
 * Obtiene todos los usuarios desde localStorage
 * @returns {Array} Array de usuarios o array vacío si no existen
 */
function getUsers() {
    const users = localStorage.getItem('rpe-tracker-users');
    return users ? JSON.parse(users) : [];
}

/**
 * Guarda el array de usuarios en localStorage
 * @param {Array} users - Array de usuarios a guardar
 */
function saveUsers(users) {
    localStorage.setItem('rpe-tracker-users', JSON.stringify(users));
}

/**
 * Obtiene el usuario actualmente autenticado desde sessionStorage
 * @returns {Object|null} Usuario actual o null si no hay sesión
 */
function getCurrentUser() {
    const user = sessionStorage.getItem(SESION_KEY);
    return user ? JSON.parse(user) : null;
}

/**
 * Guarda el usuario actual en sessionStorage
 * @param {Object} user - Usuario a guardar como usuario actual
 */
function setCurrentUser(user) {
    sessionStorage.setItem(SESION_KEY, JSON.stringify(user));
}

// ==================== FUNCIÓN DE ACTUALIZACIÓN DE NOMBRE ====================

let updateUserName = function () {

    // Usamos la constante global SESION_KEY definida arriba
    let usuarioLogueado = null; // Variable global para guardar el objeto del usuario

    const datosUsuarioJSON = sessionStorage.getItem(SESION_KEY);
    console.log(datosUsuarioJSON);

    if (!datosUsuarioJSON) {
        // Caso 1: Sesión no encontrada. Redirigir.
        console.warn("Sesión no encontrada. Redirigiendo a login.");
        window.location.href = '../index.html'; 
        // NOTA: Usar 'login.html' como ruta de ejemplo, ajústala si es necesario.
    } else {
        // Caso 2: Sesión encontrada. Intentar PARSEAR el JSON.
        try {
            // Convertimos el string JSON a un objeto JavaScript
            usuarioLogueado = JSON.parse(datosUsuarioJSON);

            // Si el objeto está vacío o no tiene una propiedad clave (ej. id)
            if (!usuarioLogueado || !usuarioLogueado.id) {
                throw new Error("Datos de usuario incompletos o inválidos.");
            }

            // ¡El usuario está logueado y sus datos están en la variable 'usuarioLogueado'!
            console.log("Sesión activa para:", usuarioLogueado.nombre);

             document.querySelector(".myuser").innerHTML = usuarioLogueado.nombre;



        } catch (e) {
            // Caso 3: El JSON es inválido o corrupto. Eliminar y redirigir.
            console.error("Error al leer/parsear datos de sesión:", e);
            //sessionStorage.removeItem(SESION_KEY); // Limpiar datos malos
            window.location.href = '../index.html';
        }
    }

};

/**
 * Cierra la sesión: elimina la key de sessionStorage y redirige al login.
 * @param {string} redirectTo - Ruta de redirección (por defecto '../index.html')
 */
const logoutRpeTracker = (redirectTo = '../index.html') => {
    try {
        console.groupCollapsed('[logoutRpeTracker] Iniciando cierre de sesión');
        const before = sessionStorage.getItem(SESION_KEY);
        console.log('[logoutRpeTracker] valor antes:', before);

        // Intento estándar de eliminación
        sessionStorage.removeItem(SESION_KEY);

        // Comprobar si se eliminó correctamente
        const after = sessionStorage.getItem(SESION_KEY);
        console.log('[logoutRpeTracker] valor después:', after);

        if (after !== null) {
            console.warn('[logoutRpeTracker] La key sigue presente después de removeItem, intentando fallback.');
            try {
                // Intento alternativo: establecer null y luego remover
                sessionStorage.setItem(SESION_KEY, '');
                sessionStorage.removeItem(SESION_KEY);
            } catch (innerErr) {
                console.error('[logoutRpeTracker] Fallback fallo al intentar eliminar la key:', innerErr);
            }
        }

        console.log('[logoutRpeTracker] comprobación final:', sessionStorage.getItem(SESION_KEY));
        console.groupEnd();
    } catch (err) {
        console.error('[logoutRpeTracker] Error inesperado al eliminar sesión:', err);
    }

    // Reemplazar la URL para evitar que el usuario vuelva con el botón atrás
    try {
        window.location.replace(redirectTo);
    } catch (e) {
        window.location.href = redirectTo;
    }
};

// Exponer globalmente para que otros scripts (headers, botones) puedan llamar a logout
window.logoutRpeTracker = logoutRpeTracker;

/**
 * Adjunta el listener del botón de logout si existe en el DOM.
 * Esto es útil cuando el header se inserta dinámicamente y los <script> inline
 * no se ejecutan automáticamente.
 */
function attachLogoutListener() {
    try {
        const logoutEl = document.getElementById('logout-link');
        if (!logoutEl) {
            //console.debug('[attachLogoutListener] logout-link no encontrado');
            return;
        }

        // Evitar añadir múltiples listeners
        if (logoutEl._logoutAttached) return;

        logoutEl.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof window.logoutRpeTracker === 'function') {
                window.logoutRpeTracker('../index.html');
            } else {
                try { sessionStorage.removeItem(SESION_KEY); } catch (err) { console.error(err); }
                window.location.href = '../index.html';
            }
        });
        logoutEl._logoutAttached = true;
        console.debug('[attachLogoutListener] Listener adjuntado al logout-link');
    } catch (err) {
        console.error('[attachLogoutListener] Error al adjuntar listener:', err);
    }
}

// Llamar a updateUserName y adjuntar listener cuando el fragmento esté listo
window.addEventListener('fragment:ready', () => {
    updateUserName();
    attachLogoutListener();
});

// También intentar adjuntar en DOMContentLoaded (cuando el header esté incluido estáticamente)
document.addEventListener('DOMContentLoaded', () => {
    attachLogoutListener();
});

// ==================== FUNCIONES CRUD DE ATLETAS ====================

/**
 * Genera un ID único para el usuario
 * @returns {string} ID único generado
 */
function generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Crea los datos por defecto para un atleta
 * @returns {Object} Objeto con los datos por defecto de atleta
 */
function createDefaultAtletaData() {
    return {
        telefono: null,
        nivel: null,
        entrenadorId: null,
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
    };
}

/**
 * Crea un atleta y su usuario asociado en localStorage
 * Estructura IGUAL a la que usa el registro en index.html
 * @param {string} nombre - Nombre del atleta
 * @param {string} email - Email único
 * @param {string} contrasena - Contraseña del atleta
 * @param {string} entrenadorId - ID del entrenador propietario
 * @returns {Object|null} Atleta creado o null si hay error
 */
function crearAtletaConUsuario(nombre, email, contrasena, entrenadorId) {
    const users = getUsers();
    
    // Validar email único
    if (users.find(u => u.email === email.toLowerCase())) {
        console.error('Email ya existe:', email);
        return null;
    }
    
    // Crear usuario del atleta con ESTRUCTURA CONSISTENTE
    const userId = generateUserId();
    const defaultData = createDefaultAtletaData();
    defaultData.entrenadorId = entrenadorId; // Establecer el entrenador propietario
    
    const nuevoAtleta = {
        id: userId,
        email: email.toLowerCase(),
        password: contrasena,
        userType: 'atleta',
        createdAt: new Date().toISOString(),
        nombre: nombre,
        apellido: '', // campo consistente con estructura de registro
        atleta: defaultData // datos específicos de atleta
    };
    
    users.push(nuevoAtleta);
    saveUsers(users);
    
    console.log('Atleta creado:', nuevoAtleta.nombre);
    return nuevoAtleta;
}

/**
 * Obtener atletas del entrenador actual
 * Incluye: atletas asignados + atletas sin asignar (entrenadorId === null)
 * @param {string} entrenadorId - ID del entrenador
 * @returns {Array} Lista de atletas
 */
function getAtletasDelEntrenador(entrenadorId) {
    const users = getUsers();
    return users.filter(u => {
        // Buscar usuarios que sean atletas
        if (u.userType !== 'atleta') return false;
        
        if (!u.atleta) return false;
        
        // Incluir: atletas ya asignados a este entrenador O atletas sin asignar
        return (u.atleta.entrenadorId === entrenadorId) || 
               (u.atleta.entrenadorId === null);
    });
}

/**
 * Actualizar atleta existente
 * @param {string} atletaId - ID del atleta
 * @param {Object} updates - Campos a actualizar (nombre, email, password)
 * @returns {boolean} true si se actualizó, false si no se encontró
 */
function actualizarAtleta(atletaId, updates) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === atletaId);
    
    if (userIndex === -1) {
        console.error('Atleta no encontrado:', atletaId);
        return false;
    }
    
    // Actualizar solo campos permitidos del usuario
    if (updates.nombre) users[userIndex].nombre = updates.nombre;
    if (updates.email) users[userIndex].email = updates.email.toLowerCase();
    if (updates.password) users[userIndex].password = updates.password;
    
    saveUsers(users);
    console.log('Atleta actualizado:', atletaId);
    return true;
}

/**
 * Eliminar atleta (y su usuario)
 * @param {string} atletaId - ID del atleta
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
function eliminarAtleta(atletaId) {
    const users = getUsers();
    const initialLength = users.length;
    const filtered = users.filter(u => u.id !== atletaId);
    
    if (filtered.length === initialLength) {
        console.error('Atleta no encontrado para eliminar:', atletaId);
        return false;
    }
    
    saveUsers(filtered);
    console.log('Atleta eliminado:', atletaId);
    return true;
}

/**
 * Obtener un atleta por ID
 * @param {string} atletaId - ID del atleta
 * @returns {Object|null} Atleta encontrado o null
 */
function getAtletaById(atletaId) {
    const users = getUsers();
    return users.find(u => u.id === atletaId) || null;
}

/**
 * Asignar un atleta sin entrenador a un entrenador específico
 * @param {string} atletaId - ID del atleta
 * @param {string} entrenadorId - ID del entrenador
 * @returns {boolean} true si se asignó correctamente, false si ya tiene entrenador o no existe
 */
function asignarAtletaAEntrenador(atletaId, entrenadorId) {
    const users = getUsers();
    const atletaIndex = users.findIndex(u => u.id === atletaId);
    
    if (atletaIndex === -1) {
        console.error('Atleta no encontrado:', atletaId);
        return false;
    }
    
    const atleta = users[atletaIndex];
    
    if (atleta.userType !== 'atleta') {
        console.error('El usuario no es un atleta:', atletaId);
        return false;
    }
    
    if (!atleta.atleta) {
        console.error('Estructura de atleta incompleta:', atletaId);
        return false;
    }
    
    // Verificar que el atleta no tenga entrenador asignado
    if (atleta.atleta.entrenadorId !== null) {
        console.warn('Atleta ya tiene entrenador asignado:', atletaId);
        return false;
    }
    
    // Asignar el entrenador
    atleta.atleta.entrenadorId = entrenadorId;
    saveUsers(users);
    
    console.log('Atleta asignado al entrenador:', { atletaId, entrenadorId });
    return true;
}
