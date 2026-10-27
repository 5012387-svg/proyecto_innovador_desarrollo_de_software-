// Manejo de Alertas y Mensajes de Error (UI/UX)
export function showAlert(message, type = 'error') {
  const banner = document.getElementById('alertBanner');
  const msgEl = document.getElementById('alertMessage');
  const iconEl = document.getElementById('alertIcon');

  if (!banner || !msgEl) return;

  msgEl.textContent = message;
  banner.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'border-red-300', 'bg-green-100', 'text-green-800', 'border-green-300', 'bg-blue-100', 'text-blue-800', 'border-blue-300');

  if (type === 'error') {
    banner.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
    iconEl.setAttribute('data-lucide', 'alert-circle');
  } else if (type === 'success') {
    banner.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
    iconEl.setAttribute('data-lucide', 'check-circle');
  } else {
    banner.classList.add('bg-blue-100', 'text-blue-800', 'border', 'border-blue-300');
    iconEl.setAttribute('data-lucide', 'info');
  }

  if (window.lucide) window.lucide.createIcons();
}

export function hideAlert() {
  const banner = document.getElementById('alertBanner');
  if (banner) banner.classList.add('hidden');
}

// Validación de Requerimientos y Manejo de Entradas Inesperadas
export function validateTaskInput(title, dueDate) {
  if (!title || title.trim() === '') {
    throw new Error('El título de la tarea es obligatorio.');
  }
  if (title.trim().length < 3) {
    throw new Error('El título debe tener al menos 3 caracteres.');
  }
  if (!dueDate) {
    throw new Error('Por favor asigna una fecha límite para la tarea.');
  }
  return true;
}