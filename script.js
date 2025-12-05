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

// ======= REGISTRO =======
$("#btnRegister").addEventListener("click", () => {
    const nombre = $("#regNombre").value.trim();
    const email = $("#regEmail").value.trim();
    const pass = $("#regPassword").value.trim();
    const edad = $("#regEdad").value.trim();

    let ok = true;

    if (!nombre) { $("#regNombreError").textContent = "Debe ingresar un nombre"; ok = false; }
    else $("#regNombreError").textContent = "";

    if (!email) { $("#regEmailError").textContent = "Debe ingresar un email"; ok = false; }
    else $("#regEmailError").textContent = "";

    if (!pass) { $("#regPassError").textContent = "Debe ingresar una contraseña"; ok = false; }
    else $("#regPassError").textContent = "";

    if (!edad) { $("#regEdadError").textContent = "Debe ingresar la edad"; ok = false; }
    else $("#regEdadError").textContent = "";

    if (!ok) return;

    const users = getUsers();

    if (users.some(u => u.email === email)) {
        $("#regEmailError").textContent = "Este email ya está registrado";
        return;
    }

    users.push({ nombre, email, pass, edad });
    saveUsers(users);

    alert("Cuenta creada correctamente.");

    // Cambiar al tab de login
    tabs[0].click();
});

// ======= LOGIN =======
$("#btnLogin").addEventListener("click", () => {
    const email = $("#loginEmail").value.trim();
    const pass = $("#loginPassword").value.trim();

    const users = getUsers();
    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
        $("#loginPassError").textContent = "Email o contraseña incorrectos";
        return;
    }

    // Guardar sesión
    localStorage.setItem("usuarioActivo", JSON.stringify(user));

    window.location.href = "dashboard.html";
});

  if (valido) {
    // Guarda usuario
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    
    // MARCAR COMO AUTENTICADO
    localStorage.setItem('usuarioAutenticado', 'true');

    limpiarFormulario();
    
// ======= RECUPERAR CONTRASEÑA =======
$("#btnRecover").addEventListener("click", () => {
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
}
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('usuarioAutenticado');
    window.location.href = 'index.html'; // Redirige al login o inicio
  });
}

