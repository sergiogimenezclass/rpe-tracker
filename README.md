# 📊 RPE Tracker: Plataforma de Gestión de Entrenamiento para Entrenadores (MVP)


## 🚀 Acerca del Proyecto

**RPE Tracker** es un **Producto Mínimo Viable (MVP)** diseñado para simplificar la creación y gestión de planes de entrenamiento para entrenadores, con un enfoque particular en el seguimiento y la integración del **RPE (Ratio de Esfuerzo Percibido)**. Nuestro objetivo principal es proporcionar una interfaz intuitiva donde los entrenadores puedan cargar atletas, diseñar planes de entrenamiento personalizados con métricas de RPE y asignarlos eficientemente, ayudándolos a optimizar su trabajo y el rendimiento de sus deportistas.

Esta aplicación está construida pensando en la **eficiencia y la claridad**, permitiendo a los entrenadores centrarse en lo que mejor saben hacer: ¡entrenar! Para la gestión de datos, estamos utilizando **Supabase**, una alternativa de código abierto a Firebase que nos proporciona una base de datos potente y funcionalidades de backend en tiempo real.

## ✨ Características (MVP)

* **Creación de Planes de Entrenamiento:** Herramientas para definir ejercicios, series, repeticiones, cargas y **RPE objetivo** para cada plan.
* **Gestión de Atletas:** Capacidad para cargar, almacenar y visualizar la lista de atletas.
* **Asignación de Planes:** Facilidad para asignar planes específicos a diferentes atletas.
* **Interfaz Responsiva:** Diseño adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio).
* **Modo Claro/Oscuro:** Interfaz adaptable a las preferencias del usuario para reducir la fatiga visual.

## 🎨 Diseño y Estética

![RPE Tracker App Screenshot Light Theme](https://placehold.co/800x450/D4C7B4/3A3A3A?text=RPE+Tracker+Dashboard+Light+Theme)
![RPE Tracker App Screenshot Dark Theme](https://placehold.co/800x450/1A1A2E/E0E0E0?text=RPE+Tracker+Dashboard+Dark+Theme)


El diseño de RPE Tracker se basa en el framework **Bootstrap 5.3**, garantizando una interfaz moderna, robusta y adaptable. Hemos trabajado en una paleta de colores que transmite **profesionalismo, energía y confianza**, con soporte completo para **temas claro y oscuro**.

### Paleta de Colores Principal:

* **Azul de Rendimiento:** `#003366` (Claro) / `#0F4C75` (Oscuro) - Para elementos primarios y de branding.
* **Naranja de Energía:** `#FF6600` - Para acciones clave, acentos y elementos interactivos (ideal para destacar el RPE).
* **Fondos y Textos:** Una escala de grises y blancos para el tema claro, y de grises oscuros para el tema oscuro, asegurando siempre la máxima legibilidad.

## 🛠️ Tecnologías Utilizadas

* **Frontend:**
    * **HTML5**
    * **CSS3** (con variables CSS para temas)
    * **JavaScript**
    * **Bootstrap 5.3**
    * **Google Fonts:** Inter (Texto base), Roboto (Encabezados)
* **Backend como Servicio (BaaS):**
    * **Supabase:** Utilizado para la base de datos (PostgreSQL), autenticación, almacenamiento de archivos y funciones en tiempo real. Supabase acelera el desarrollo del backend, permitiéndonos construir una aplicación robusta con menos código.

## ⚙️ Instalación y Uso (Desarrollo)

Para configurar el proyecto localmente:

1.  Clona este repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/rpe-tracker-app.git](https://github.com/tu-usuario/rpe-tracker-app.git)
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd rpe-tracker-app
    ```
3.  **Configura tu proyecto Supabase:**
    * Crea una cuenta en [Supabase](https://supabase.com/).
    * Crea un nuevo proyecto y obtén tus credenciales (`URL` y `Anon Key`).
    * Configura las tablas necesarias (ej. `atletas`, `planes_entrenamiento`, `ejercicios`, `registros_rpe`).
4.  Crea un archivo `.env` o similar para almacenar tus credenciales de Supabase de forma segura (asegúrate de no subirlos a tu repositorio).
5.  Abre el archivo `index.html` en tu navegador web. (Nota: Para funcionalidades que interactúen con Supabase, necesitarás servir el archivo a través de un servidor local simple o configurarlo en tu entorno de desarrollo para evitar problemas de CORS y acceso a la API).

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes sugerencias o quieres mejorar alguna característica:

1.  Haz un "fork" del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3.  Realiza tus cambios y haz commit (`git commit -am 'feat: Añadir nueva característica X'`).
4.  Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5.  Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📧 Contacto


---