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
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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

  // 4. Modal Interactivo para Servicios y Proyectos
  const modal = document.getElementById('infoModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');

  const serviceData = {
    web: {
      title: '🚀 Desarrollo Web & WebApps',
      content: '<p style="margin-top:1rem; color:#9ca3af;">Construimos aplicaciones web progresivas (PWA) e interfaces dinámicas con Next.js, React y Vue. Optimización de velocidad <strong style="color:#fff;">Lighthouse 100/100</strong>.</p><ul style="margin-top:1rem; margin-left:1.5rem; color:#9ca3af;"><li>Renderizado en servidor (SSR/SSG)</li><li>Arquitectura JAMstack escalable</li><li>Seguridad con estándares OWASP</li></ul>'
    },
    mobile: {
      title: '📱 Aplicaciones Móviles',
      content: '<p style="margin-top:1rem; color:#9ca3af;">Desarrollo multiplataforma nativo utilizando Flutter y React Native con soporte offline y animaciones a 60fps.</p><ul style="margin-top:1rem; margin-left:1.5rem; color:#9ca3af;"><li>Publicación garantizada en App Store & Google Play</li><li>Notificaciones push en tiempo real</li><li>Biometría y autenticación segura</li></ul>'
    },
    ai: {
      title: '🧠 Integración de IA & Cloud',
      content: '<p style="margin-top:1rem; color:#9ca3af;">Integración de LLMs, automatización de flujos de trabajo e infraestructura sin servidor en AWS, Google Cloud y Azure.</p><ul style="margin-top:1rem; margin-left:1.5rem; color:#9ca3af;"><li>Pipelines de datos e Inteligencia Artificial</li><li>Contenedores Docker y Kubernetes</li><li>Cero tiempo de inactividad (Zero Downtime)</li></ul>'
    }
  };

  const projectData = {
    paynexus: {
      title: '💳 PayNexus Platform',
      content: '<p style="margin-top:1rem; color:#9ca3af;">Plataforma de procesamiento de pagos transfronterizos capaz de gestionar más de 50,000 transacciones por segundo con cifrado AES-256.</p><a href="#contacto" onclick="document.getElementById(\'infoModal\').classList.remove(\'active\')" class="btn btn-primary" style="margin-top:1.5rem;">Solicitar una Demo</a>'
    },
    aura: {
      title: '🛍️ Aura Global Store',
      content: '<p style="margin-top:1rem; color:#9ca3af;">E-commerce con arquitectura Headless impulsado por Shopify Plus y algoritmos de personalización en tiempo real que aumentaron la conversión un +42%.</p><a href="#contacto" onclick="document.getElementById(\'infoModal\').classList.remove(\'active\')" class="btn btn-primary" style="margin-top:1.5rem;">Ver Caso Completo</a>'
    }
  };

  // Clics en Servicios
  document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-service');
      const data = serviceData[type];
      if (data) {
        modalBody.innerHTML = `<h2 style="color:#fff; font-size:1.8rem;">${data.title}</h2>${data.content}`;
        modal.classList.add('active');
      }
    });
  });

  // Clics en Proyectos
  document.querySelectorAll('.interactive-project').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-project');
      const data = projectData[type];
      if (data) {
        modalBody.innerHTML = `<h2 style="color:#fff; font-size:1.8rem;">${data.title}</h2>${data.content}`;
        modal.classList.add('active');
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 5. Animación de contadores
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
  checkStatsVisibility();

  // 6. Formulario de contacto
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
        formFeedback.innerText = 'Por favor, llena todos los campos.';
        return;
      }

      formFeedback.style.color = '#10b981';
      formFeedback.innerText = `¡Mensaje enviado con éxito, ${name}! Nos pondremos en contacto pronto.`;

      contactForm.reset();
    });
  }
});