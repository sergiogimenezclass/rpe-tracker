let header = function() {
    fetch("../components/header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector(".top-navbar").innerHTML = data;
  });

};



let sidebarEntrenador = function() {
    fetch("../components/sidebar-entrenador.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector(".sidebar").innerHTML = data;
  });
};


let sidebarAtleta = function() {
    fetch("../components/sidebar-atleta.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector(".sidebar").innerHTML = data;
  });
};



let menu = function() {
 // Manejador del menú móvil
        document.addEventListener('DOMContentLoaded', function() {
            const backdrop = document.querySelector('.sidebar-backdrop');
            const sidebar = document.getElementById('sidebarMenu');
            
            if (!sidebar) return;
            
            // Mostrar/ocultar backdrop cuando el menú se abre/cierra
            sidebar.addEventListener('show.bs.collapse', function () {
                if (backdrop) backdrop.classList.add('show');
            });
            
            sidebar.addEventListener('hide.bs.collapse', function () {
                if (backdrop) backdrop.classList.remove('show');
            });
            
            // Cerrar menú al hacer click en un enlace (en móvil)
            const navLinks = sidebar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        const collapseInstance = bootstrap.Collapse.getInstance(sidebar);
                        if (collapseInstance) {
                            collapseInstance.hide();
                        }
                    }
                });
            });
        });
}

menu();
header();
sidebarEntrenador();
sidebarAtleta();