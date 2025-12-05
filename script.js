// ======== SELECTOR SEGURO ========
const $ = (sel) => document.querySelector(sel);

// ======== MODAL OPEN / CLOSE ========
const modal = $("#authModal");
const overlay = $(".overlay");
const openBtn = $(".btn-open");
const closeBtn = $("#closeAuth");

openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// ======= TABS =======
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        $("#tab-" + tab.dataset.tab).classList.add("active");
    });
});

// ======= LOCALSTORAGE USER SYSTEM =======
function getUsers() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function saveUsers(users) {
    localStorage.setItem("usuarios", JSON.stringify(users));
}

function setUsuarioActivo(user) {
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
}

function setUsuarioAutenticado(valor) {
    localStorage.setItem("usuarioAutenticado", valor ? "true" : "false");
}

// ======= LIMPIEZA DE FORMULARIOS Y ERRORES =======
function limpiarFormularioRegistro() {
    $("#regNombre").value = "";
    $("#regEmail").value = "";
    $("#regPassword").value = "";
    $("#regEdad").value = "";
    limpiarErroresRegistro();
}

function limpiarErroresRegistro() {
    $("#regNombreError").textContent = "";
    $("#regEmailError").textContent = "";
    $("#regPassError").textContent = "";
    $("#regEdadError").textContent = "";
}

function limpiarFormularioLogin() {
    $("#loginEmail").value = "";
    $("#loginPassword").value = "";
    $("#loginPassError").textContent = "";
}

function limpiarFormularioRecuperar() {
    $("#recEmail").value = "";
    $("#recEmailError").textContent = "";
}

// ======= REGISTRO =======
$("#btnRegister").addEventListener("click", () => {
    limpiarErroresRegistro();

    const nombre = $("#regNombre").value.trim();
    const email = $("#regEmail").value.trim().toLowerCase();
    const pass = $("#regPassword").value.trim();

    const edad = $("#regEdad").value.trim();

    let valido = true;

    if (!nombre) { $("#regNombreError").textContent = "Debe ingresar un nombre"; valido = false; }
    if (!email) { $("#regEmailError").textContent = "Debe ingresar un email"; valido = false; }
    if (!pass) { $("#regPassError").textContent = "Debe ingresar una contraseña"; valido = false; }
    if (!edad) { $("#regEdadError").textContent = "Debe ingresar la edad"; valido = false; }

    if (!valido) return;

    const users = getUsers();

    if (users.some(u => u.email === email)) {
        $("#regEmailError").textContent = "Este email ya está registrado";
        return;
    }

    const usuario = { nombre, email, pass, edad };
    users.push(usuario);
    saveUsers(users);

    setUsuarioAutenticado(true);

    alert("Cuenta creada correctamente.");

    limpiarFormularioRegistro();

    // Cambiar al tab de login
    tabs[0].click();
});

// ======= LOGIN =======
$("#btnLogin").addEventListener("click", () => {
    const email = $("#loginEmail").value.trim().toLowerCase();
    const pass = $("#loginPassword").value.trim();

    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email && u.pass === pass);

    if (!user) {
        $("#loginPassError").textContent = "Email o contraseña incorrectos";
        return;
    }

    setUsuarioActivo(user);
    setUsuarioAutenticado(true);

    limpiarFormularioLogin(); // <-- Limpiar después de login exitoso

    window.location.href = "dashboard.html";
});


// ======= RECUPERAR CONTRASEÑA =======
$("#btnRecover").addEventListener("click", () => {
    limpiarFormularioRecuperar();

    const email = $("#recEmail").value.trim();

    if (!email) {
        $("#recEmailError").textContent = "Debe ingresar un email";
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        $("#recEmailError").textContent = "No existe una cuenta con este email";
        return;
    }

    alert("Enlace enviado (simulado). Revisa tu bandeja de entrada.");
});

// ======= LOGOUT =======
const btnLogout = $("#btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioAutenticado");
        localStorage.removeItem("usuarioActivo");
        window.location.href = "index.html";
    });
}
