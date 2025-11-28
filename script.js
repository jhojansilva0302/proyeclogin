
const safe = {
  byId: id => document.getElementById(id),
  q: sel => document.querySelector(sel),
  qAll: sel => Array.from(document.querySelectorAll(sel))
};

function hide(el) { if (el) el.classList.add("hidden"); }
function show(el) { if (el) el.classList.remove("hidden"); }


(function protectGenericModal() {
  const openModalBtn = safe.q(".btn-open");
  const closeModalBtn = safe.q(".btn-close");
  
  const modal = safe.q(".modal:not(.modal-ubicacion)");
  const overlay = safe.q(".overlay:not(.overlay-ubicacion)");

  if (openModalBtn && closeModalBtn && modal && overlay) {
    const openModal = () => { show(modal); show(overlay); };
    const closeModal = () => { hide(modal); hide(overlay); };

    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
  }
})();



const btnGuardar = safe.byId("btnGuardar");
const btnVer = safe.byId("btnVerDatos");
const btnLimpiar = safe.byId("btnLimpiar");
const btnBorrar = safe.byId("btnBorrarDatos");

function limpiarFormulario() {
  const n = safe.byId("nombre"), e = safe.byId("email"), ed = safe.byId("edad");
  if (n) n.value = "";
  if (e) e.value = "";
  if (ed) ed.value = "";
}

if (btnGuardar) {
  btnGuardar.addEventListener("click", () => {
    const nombreEl = safe.byId("nombre");
    const emailEl = safe.byId("email");
    const edadEl = safe.byId("edad");

    const nombre = nombreEl ? nombreEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const edad = edadEl ? edadEl.value.trim() : "";

    let valido = true;

    const setErr = (id, msg) => { const el = safe.byId(id); if (el) el.textContent = msg; };

    if (nombre === "") { setErr("errorNombre", "El nombre es obligatorio."); valido = false; } else setErr("errorNombre", "");
    if (email === "") { setErr("errorEmail", "El email es obligatorio."); valido = false; } else setErr("errorEmail", "");
    if (edad === "") { setErr("errorEdad", "La edad es obligatoria."); valido = false; } else setErr("errorEdad", "");

    if (!valido) return;

    const usuario = { nombre, email, edad };
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    limpiarFormulario();

    const resultado = safe.byId("resultado");
    if (resultado && resultado.style.display === "block") {
      
      if (btnVer) { btnVer.click(); btnVer.click(); }
    }

    setTimeout(() => alert("Datos guardados correctamente en LocalStorage."), 50);
  });
}

if (btnVer) {
  btnVer.addEventListener("click", () => {
    const resultado = safe.byId("resultado");
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!resultado) {
      alert("Elemento resultado no encontrado en el DOM.");
      return;
    }

    if (usuariosGuardados.length === 0) {
      alert("No hay usuarios guardados.");
      resultado.style.display = "none";
      resultado.innerHTML = "";
      return;
    }

    if (resultado.style.display === "block") {
      resultado.style.display = "none";
      resultado.innerHTML = "";
      btnVer.textContent = "Ver Datos";
      return;
    }

    let html = "<h3>Usuarios Guardados:</h3>";
    usuariosGuardados.forEach((u, i) => {
      html += `
        <div class="usuario" data-index="${i}">
          <p><strong>Usuario #${i + 1}</strong></p>
          <p><strong>Nombre:</strong> ${u.nombre}</p>
          <p><strong>Email:</strong> ${u.email}</p>
          <p><strong>Edad:</strong> ${u.edad}</p>
          <button class="btn-borrar-individual" data-index="${i}">Borrar Usuario</button>
        </div>
        <hr>
      `;
    });

    resultado.innerHTML = html;
    resultado.style.display = "block";
    btnVer.textContent = "Ocultar Datos";

    safe.qAll(".btn-borrar-individual").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        if (btnVer) { btnVer.click(); btnVer.click(); }
        alert("Usuario eliminado.");
      });
    });
  });
}

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", () => {
    const nombre = (safe.byId("nombre") || {}).value || "";
    const email = (safe.byId("email") || {}).value || "";
    const edad = (safe.byId("edad") || {}).value || "";

    const errores = safe.qAll(".error");
    const hayErrores = errores.some(e => e.textContent.trim() !== "");

    if (nombre.trim() === "" && email.trim() === "" && edad.trim() === "" && !hayErrores) {
      alert("No hay nada que limpiar.");
      return;
    }

    limpiarFormulario();
    errores.forEach(e => e.textContent = "");
    alert("Formulario limpiado.");
  });
}

if (btnBorrar) {
  btnBorrar.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios || usuarios.length === 0) {
      alert("No hay datos para borrar.");
      return;
    }

    localStorage.removeItem("usuarios");
    const resultado = safe.byId("resultado");
    if (resultado) {
      resultado.style.display = "none";
      resultado.innerHTML = "";
    }
    if (btnVer) btnVer.textContent = "Ver Datos";
    alert("Datos borrados del LocalStorage.");
  });
}

(function modalUbicacionBlock() {
  const btnUbicacion = safe.q(".btn-ubicacion");
  const modalUbicacion = safe.q(".modal-ubicacion");
  const overlayUbicacion = safe.q(".overlay-ubicacion");
  const closeUbicacion = safe.q(".btn-close-ubicacion");

  if (!modalUbicacion || !overlayUbicacion || !btnUbicacion) {
  
    return;
  }

  btnUbicacion.addEventListener("click", () => {
    show(modalUbicacion);
    show(overlayUbicacion);
  });

  if (closeUbicacion) {
    closeUbicacion.addEventListener("click", () => {
      hide(modalUbicacion);
      hide(overlayUbicacion);
    });
  }

  overlayUbicacion.addEventListener("click", () => {
    hide(modalUbicacion);
    hide(overlayUbicacion);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalUbicacion.classList.contains("hidden")) {
      hide(modalUbicacion);
      hide(overlayUbicacion);
    }
  });
})();
