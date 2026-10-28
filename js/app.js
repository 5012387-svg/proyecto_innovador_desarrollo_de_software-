// Función para desplazarse suavemente al formulario de contacto
function scrollToContact() {
  document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

// Manejo interactivo del formulario
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita recargar la página

  const nombre = document.getElementById('nombre').value;
  const responseDiv = document.getElementById('formResponse');

  // Simulación de envío de datos
  responseDiv.style.color = '#16a34a';
  responseDiv.textContent = `¡Gracias, ${nombre}! Hemos recibido tu mensaje con éxito. Nos pondremos en contacto contigo pronto.`;

  // Limpiar campos
  this.reset();
});