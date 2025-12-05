// ======== PROTECCIÓN DE SESIÓN Y CARGA DE USUARIO ========
window.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");

    // Si no está autenticado, redirige
    if (!usuarioActivo || usuarioAutenticado !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Mostrar nombre del usuario
    const userNombreElem = document.getElementById("userNombre");
    if (userNombreElem) {
        userNombreElem.textContent = "Hola " + usuarioActivo.nombre + ", gracias por ingresar.";
    }

    // Botón cerrar sesión
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            // Elimina datos de sesión
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("usuarioAutenticado");

            // Redirige al login
            window.location.href = "index.html";
        });
    }
});
