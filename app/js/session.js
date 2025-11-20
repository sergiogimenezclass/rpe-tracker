let updateUserName = function () {


    const SESION_KEY = "rpe-tracker-current-user";
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

window.addEventListener('fragment:ready', () => {
  updateUserName();
});
