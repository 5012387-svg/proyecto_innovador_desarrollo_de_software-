document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Efecto en la barra de navegación al hacer scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Menú desplegable móvil
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 3. Contadores numéricos animados
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = target;
        }
      };

      updateCount();
    });
  };

  // Activar contadores cuando la sección sea visible
  window.addEventListener('scroll', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const pos = heroStats.getBoundingClientRect().top;
      if (pos < window.innerHeight && !animated) {
        animateStats();
        animated = true;
      }
    }
  });

  // 4. Formulario de contacto interactivo
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;

      formFeedback.style.color = '#34d399';
      formFeedback.innerText = `¡Gracias, ${name}! Hemos recibido tu mensaje. Nos comunicaremos contigo en breve.`;

      contactForm.reset();
    });
  }
});