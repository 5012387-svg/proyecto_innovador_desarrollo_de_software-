// --- FUNCIONES DE UTILIDAD (Manejo de alertas y validaciones) ---
function showAlert(message, type = 'error') {
  const banner = document.getElementById('alertBanner');
  const msgEl = document.getElementById('alertMessage');
  const iconEl = document.getElementById('alertIcon');

  if (!banner || !msgEl) return;

  msgEl.textContent = message;
  banner.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'border-red-300', 'bg-green-100', 'text-green-800', 'border-green-300', 'bg-blue-100', 'text-blue-800', 'border-blue-300');

  if (type === 'error') {
    banner.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
    if (iconEl) iconEl.setAttribute('data-lucide', 'alert-circle');
  } else if (type === 'success') {
    banner.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
    if (iconEl) iconEl.setAttribute('data-lucide', 'check-circle');
  } else {
    banner.classList.add('bg-blue-100', 'text-blue-800', 'border', 'border-blue-300');
    if (iconEl) iconEl.setAttribute('data-lucide', 'info');
  }

  if (window.lucide) window.lucide.createIcons();
}

function hideAlert() {
  const banner = document.getElementById('alertBanner');
  if (banner) banner.classList.add('hidden');
}

function validateTaskInput(title, dueDate) {
  if (!title || title.trim() === '') {
    throw new Error('El título de la tarea es obligatorio.');
  }
  if (title.trim().length < 3) {
    throw new Error('El título debe tener al menos 3 caracteres.');
  }
  if (!dueDate) {
    throw new Error('Por favor selecciona una fecha límite.');
  }
  return true;
}

// --- CLASE GESTORA DE DATOS ---
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks_data')) || [];
  }

  save() {
    localStorage.setItem('tasks_data', JSON.stringify(this.tasks));
  }

  addTask(taskData) {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      category: taskData.category,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      desc: taskData.desc,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    this.save();
    return newTask;
  }

  toggleTaskStatus(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  getFilteredTasks(searchQuery, statusFilter, priorityFilter) {
    return this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            task.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesStatus = true;
      if (statusFilter === 'pendientes') matchesStatus = !task.completed;
      if (statusFilter === 'completadas') matchesStatus = task.completed;

      let matchesPriority = true;
      if (priorityFilter !== 'todas') matchesPriority = task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }
}

// --- EVENTOS E INICIALIZACIÓN DE LA APLICACIÓN ---
const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const taskForm = document.getElementById('taskForm');
  const closeAlertBtn = document.getElementById('closeAlertBtn');
  const searchInput = document.getElementById('searchInput');
  const filterStatus = document.getElementById('filterStatus');
  const filterPriority = document.getElementById('filterPriority');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Modo Oscuro
  themeToggleBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  // Cerrar Alerta
  closeAlertBtn?.addEventListener('click', hideAlert);

  // Guardar Tarea
  taskForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    const title = document.getElementById('taskTitle').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const desc = document.getElementById('taskDesc').value;

    try {
      validateTaskInput(title, dueDate);
      taskManager.addTask({ title, category, priority, dueDate, desc });
      taskForm.reset();
      
      showAlert('¡Tarea agregada con éxito!', 'success');
      renderUI();
    } catch (error) {
      showAlert(error.message, 'error');
    }
  });

  // Filtros
  searchInput?.addEventListener('input', renderUI);
  filterStatus?.addEventListener('change', renderUI);
  filterPriority?.addEventListener('change', renderUI);

  renderUI();
});

// --- RENDERIZADO EN PANTALLA ---
function renderUI() {
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  
  const searchQuery = document.getElementById('searchInput')?.value || '';
  const statusQuery = document.getElementById('filterStatus')?.value || 'todos';
  const priorityQuery = document.getElementById('filterPriority')?.value || 'todas';

  const tasksToDisplay = taskManager.getFilteredTasks(searchQuery, statusQuery, priorityQuery);
  const stats = taskManager.getStats();

  document.getElementById('totalTasksCount').textContent = stats.total;
  document.getElementById('pendingTasksCount').textContent = stats.pending;
  document.getElementById('completedTasksCount').textContent = stats.completed;

  if (tasksToDisplay.length === 0) {
    emptyState.classList.remove('hidden');
    taskList.innerHTML = '';
    taskList.appendChild(emptyState);
  } else {
    emptyState.classList.add('hidden');
    taskList.innerHTML = '';

    tasksToDisplay.forEach(task => {
      const card = document.createElement('div');
      card.className = `task-card p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${task.completed ? 'opacity-75' : ''}`;
      
      const priorityColors = {
        Alta: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
        Media: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
        Baja: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
      };

      card.innerHTML = `
        <div class="flex items-start gap-3 w-full sm:w-auto">
          <input type="checkbox" ${task.completed ? 'checked' : ''} class="mt-1 w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer toggle-btn" data-id="${task.id}">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white ${task.completed ? 'task-title-completed' : ''}">${task.title}</h3>
            ${task.desc ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${task.desc}</p>` : ''}
            <div class="flex flex-wrap gap-2 mt-2 items-center text-xs">
              <span class="px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}">${task.priority}</span>
              <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">${task.category}</span>
              <span class="text-gray-400 text-[11px]">📅 ${task.dueDate}</span>
            </div>
          </div>
        </div>
        <button class="delete-btn p-2 text-gray-400 hover:text-red-600 transition" data-id="${task.id}" title="Eliminar tarea">
          <i data-lucide="trash-2" class="w-4 h-4 pointer-events-none"></i>
        </button>
      `;

      taskList.appendChild(card);
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('change', (e) => {
        taskManager.toggleTaskStatus(e.target.dataset.id);
        renderUI();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.delete-btn').dataset.id;
        taskManager.deleteTask(id);
        showAlert('Tarea eliminada correctamente.', 'info');
        renderUI();
      });
    });
  }

  if (window.lucide) window.lucide.createIcons();
}