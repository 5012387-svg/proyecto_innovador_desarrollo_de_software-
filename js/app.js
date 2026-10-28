/**
 * Presupuesto Express — Core Logic
 */

// Formateador estándar de moneda (USD)
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

// --- SISTEMA DE ALERTAS Y NOTIFICACIONES ---
function showAlert(message, type = 'error') {
  const banner = document.getElementById('alertBanner');
  const msgEl = document.getElementById('alertMessage');
  const iconEl = document.getElementById('alertIcon');

  if (!banner || !msgEl) return;

  msgEl.textContent = message;
  
  // Limpiar estilos previos
  banner.className = 'max-w-6xl mx-auto p-4 rounded-xl border flex items-center justify-between transition-all duration-200';

  if (type === 'error') {
    banner.classList.add('bg-red-500/10', 'text-red-400', 'border-red-500/20');
    if (iconEl) iconEl.setAttribute('data-lucide', 'alert-circle');
  } else {
    banner.classList.add('bg-brand-500/10', 'text-brand-400', 'border-brand-500/20');
    if (iconEl) iconEl.setAttribute('data-lucide', 'check-circle-2');
  }

  banner.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function hideAlert() {
  const banner = document.getElementById('alertBanner');
  if (banner) banner.classList.add('hidden');
}

// --- VALIDACIÓN DE DATOS ---
function validateInput(concept, price, qty) {
  if (!concept || concept.trim() === '') {
    throw new Error('Ingrese un concepto o descripción para el ítem.');
  }
  if (isNaN(price) || price <= 0) {
    throw new Error('El precio unitario debe ser mayor a $0.00.');
  }
  if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
    throw new Error('La cantidad debe ser un número entero mayor a 0.');
  }
  return true;
}

// --- PERSISTENCIA (LOCALSTORAGE) ---
let items = JSON.parse(localStorage.getItem('quote_items_v2')) || [];

function saveItems() {
  localStorage.setItem('quote_items_v2', JSON.stringify(items));
}

// --- RENDERIZADO DE INTERFAZ ---
function renderUI() {
  const itemsList = document.getElementById('itemsList');
  const emptyState = document.getElementById('emptyState');
  const totalAmountEl = document.getElementById('totalAmount');
  const clearAllBtn = document.getElementById('clearAllBtn');

  if (!itemsList) return;

  itemsList.innerHTML = '';
  let total = 0;

  if (items.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (clearAllBtn) clearAllBtn.classList.add('hidden');
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    if (clearAllBtn) clearAllBtn.classList.remove('hidden');

    items.forEach(item => {
      total += item.subtotal;
      const row = document.createElement('tr');
      row.className = 'hover:bg-slate-700/20 transition-colors group';

      row.innerHTML = `
        <td class="py-3.5 px-4 font-medium text-slate-100">${escapeHtml(item.concept)}</td>
        <td class="py-3.5 px-4 text-center font-mono text-slate-300">${item.qty}</td>
        <td class="py-3.5 px-4 text-right font-mono text-slate-300">${currencyFormatter.format(item.price)}</td>
        <td class="py-3.5 px-4 text-right font-mono font-semibold text-slate-100">${currencyFormatter.format(item.subtotal)}</td>
        <td class="py-3.5 px-4 text-center">
          <button class="delete-btn p-1 text-slate-500 hover:text-red-400 transition rounded-lg" data-id="${item.id}" title="Eliminar ítem">
            <i data-lucide="trash-2" class="w-4 h-4 pointer-events-none"></i>
          </button>
        </td>
      `;

      itemsList.appendChild(row);
    });

    // Eventos de eliminación por fila
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.delete-btn').dataset.id;
        items = items.filter(i => i.id !== id);
        saveItems();
        showAlert('Item eliminado correctamente.', 'success');
        renderUI();
      });
    });
  }

  if (totalAmountEl) totalAmountEl.textContent = currencyFormatter.format(total);
  if (window.lucide) window.lucide.createIcons();
}

// Sanitización contra inyección HTML
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const itemForm = document.getElementById('itemForm');
  const closeAlertBtn = document.getElementById('closeAlertBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');

  // Alternar tema oscuro/claro
  themeToggleBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  closeAlertBtn?.addEventListener('click', hideAlert);

  // Vaciar lista completa
  clearAllBtn?.addEventListener('click', () => {
    items = [];
    saveItems();
    showAlert('Presupuesto vaciado correctamente.', 'success');
    renderUI();
  });

  // Envío del formulario
  itemForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    const conceptInput = document.getElementById('itemConcept');
    const priceInput = document.getElementById('itemPrice');
    const qtyInput = document.getElementById('itemQty');

    const concept = conceptInput ? conceptInput.value : '';
    const price = priceInput ? parseFloat(priceInput.value) : 0;
    const qty = qtyInput ? parseInt(qtyInput.value, 10) : 0;

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
      if (qtyInput) qtyInput.value = 1;

      showAlert('Item agregado correctamente.', 'success');
      renderUI();
    } catch (error) {
      showAlert(error.message, 'error');
    }
  });

  renderUI();
});