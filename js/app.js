// ========================================
// NOVA STUDIO — FUNCIONES INTERACTIVAS
// ========================================


// 1. MENÚ PARA TELÉFONOS

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// 2. AÑO AUTOMÁTICO DEL PIE DE PÁGINA

document.getElementById("year").textContent =
    new Date().getFullYear();


// 3. FORMULARIO DE CONTACTO

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// IMPORTANTE:
// Cambia este correo por el correo real de tu negocio.
const CONTACT_EMAIL = "tu-correo@ejemplo.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const asunto = encodeURIComponent(
        `Nueva consulta de ${nombre} - ${servicio}`
    );

    const cuerpo = encodeURIComponent(
        `Nombre: ${nombre}\n` +
        `Correo del cliente: ${email}\n` +
        `Servicio solicitado: ${servicio}\n\n` +
        `Mensaje:\n${mensaje}`
    );

    const correoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);

    if (!correoValido || CONTACT_EMAIL === "tu-correo@ejemplo.com") {
        formMessage.textContent =
            "El formulario funciona, pero debes configurar el correo de destino en script.js.";

        return;
    }

    const mailtoLink =
        `mailto:${CONTACT_EMAIL}?subject=${asunto}&body=${cuerpo}`;

    formMessage.textContent =
        "Preparando tu correo. Si no se abre, revisa tu aplicación de correo.";

    window.location.href = mailtoLink;
});