// Verificar sesión activa
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
    // Si no hay sesión, redirigir al inicio
    window.location.href = "index.html";
}

document.getElementById("userNombre").textContent =
    "Hola " + usuarioActivo.nombre + ", gracias por ingresar.";

// Botón cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
});
