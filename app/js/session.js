const SESION_KEY = "rpe-tracker-current-user";

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
