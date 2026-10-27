// --- FUNCIONES DE ALERTA Y VALIDACIÓN ---
function showAlert(message, type = 'error') {
  const banner = document.getElementById('alertBanner');
  const msgEl = document.getElementById('alertMessage');
  const iconEl = document.getElementById('alertIcon');

  if (!banner || !msgEl) return;

  msgEl.textContent = message;
  banner.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'border-red-300', 'bg-green-100', 'text-green-800', 'border-green-300');

  if (type === 'error') {
    banner.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
    if (iconEl) iconEl.setAttribute('data-lucide', 'alert-circle');
  } else {
    banner.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
    if (iconEl) iconEl.setAttribute('data-lucide', 'check-circle');
  }

  if (window.lucide) window.lucide.createIcons();
}

function hideAlert() {
  const banner = document.getElementById('alertBanner');
  if (banner) banner.classList.add('hidden');
}

function validateInput(concept, price, qty) {
  if (!concept || concept.trim() === '') {
    throw new Error('Ingresa un concepto o descripción para el ítem.');
  }
  if (isNaN(price) || price <= 0) {
    throw new Error('El precio unitario debe ser un número mayor a 0.');
  }
  if (isNaN(qty) || qty <= 0) {
    throw new Error('La cantidad debe ser al menos 1.');
  }
  return true;
}

// --- GESTIÓN DE DATOS EN LOCALSTORAGE ---
let items = JSON.parse(localStorage.getItem('quote_items')) || [];

function saveItems() {
  localStorage.setItem('quote_items', JSON.stringify(items));
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const itemForm = document.getElementById('itemForm');
  const closeAlertBtn = document.getElementById('closeAlertBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Modo Oscuro
  themeToggleBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  closeAlertBtn?.addEventListener('click', hideAlert);

  // Agregar Ítem
  itemForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    const concept = document.getElementById('itemConcept').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const qty = parseInt(document.getElementById('itemQty').value, 10);

    try {
      validateInput(concept, price, qty);

      const newItem = {
        id: Date.now().toString(),
        concept: concept.trim(),
        price: price,
        qty: qty,
        subtotal: price * qty
      };

      items.push(newItem);
      saveItems();
      itemForm.reset();
      document.getElementById('itemQty').value = 1;

      showAlert('Ítem añadido correctamente.', 'success');
      renderUI();
    } catch (error) {
      showAlert(error.message, 'error');
    }
  });

  renderUI();
});

// --- RENDERIZADO EN PANTALLA ---
function renderUI() {
  const itemsList = document.getElementById('itemsList');
  const emptyState = document.getElementById('emptyState');
  const totalAmountEl = document.getElementById('totalAmount');

  itemsList.innerHTML = '';
  let total = 0;

  if (items.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    items.forEach(item => {
      total += item.subtotal;
      const row = document.createElement('tr');
      row.className = 'item-row border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/30';

      row.innerHTML = `
        <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">${item.concept}</td>
        <td class="py-3 px-4 text-center">${item.qty}</td>
        <td class="py-3 px-4 text-right">$${item.price.toFixed(2)}</td>
        <td class="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">$${item.subtotal.toFixed(2)}</td>
        <td class="py-3 px-4 text-center">
          <button class="delete-btn text-gray-400 hover:text-red-600 transition p-1" data-id="${item.id}" title="Eliminar">
            <i data-lucide="trash-2" class="w-4 h-4 pointer-events-none"></i>
          </button>
        </td>
      `;

      itemsList.appendChild(row);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.delete-btn').dataset.id;
        items = items.filter(i => i.id !== id);
        saveItems();
        showAlert('Ítem eliminado.', 'success');
        renderUI();
      });
    });
  }

  totalAmountEl.textContent = `$${total.toFixed(2)}`;
  if (window.lucide) window.lucide.createIcons();
}