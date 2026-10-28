document.addEventListener('DOMContentLoaded', () => {
  // 1. Navegación con desplazamiento suave para TODOS los enlaces del menú y botones
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Cerrar el menú móvil si está abierto
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // 2. Efecto de barra de navegación activa al hacer scroll
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sombra en navbar al bajar
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Resaltar sección activa en el menú
    let currentScroll = window.pageYOffset + 150;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navItem) {
        if (currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          navItem.classList.add('active');
        }
      }
    });
  });

  // 3. Menú hamburguesa responsivo
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 4. Animación de contadores de estadísticas
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = Math.max(1, target / 40);

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = Math.ceil(count);
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Iniciar animación al llegar a la sección
  const checkStatsVisibility = () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && !animated) {
      const pos = heroStats.getBoundingClientRect().top;
      if (pos < window.innerHeight - 50) {
        animateStats();
        animated = true;
      }
    }
  };

  window.addEventListener('scroll', checkStatsVisibility);
  checkStatsVisibility(); // Ejecución inicial

  // 5. Formulario de contacto funcional con validación y respuesta
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formFeedback.style.color = '#ef4444';
        formFeedback.innerText = 'Por favor, completa todos los campos del formulario.';
        return;
      }

      // Mensaje de éxito interactivo
      formFeedback.style.color = '#10b981';
      formFeedback.innerText = `¡Mensaje enviado con éxito, ${name}! Te responderemos pronto a ${email}.`;

      contactForm.reset();
    });
  }
});