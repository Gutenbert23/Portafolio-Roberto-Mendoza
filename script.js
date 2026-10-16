/**
 * Portafolio Roberto Mendoza - JavaScript Vanilla
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initGalleryFilter();
  initContactForm();
  initCurrentYear();
});

/* ==========================================
   1. Cambio de estilo en Navbar con scroll
   ========================================== */
function initNavbarScroll() {
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================
   2. Menú Responsivo (Hamburguesa)
   ========================================== */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  };

  navToggle.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en un enlace de sección
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* ==========================================
   3. Filtrado de Galería
   ========================================== */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

/* ==========================================
   4. Validación y Envío del Formulario
   ========================================== */
function initContactForm() {
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Campos obligatorios a validar
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const parent = input.closest('.form-group');
      
      // Validación especial para email
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          showError(parent);
          isValid = false;
        } else {
          clearError(parent);
        }
      } else {
        // Validación general de campo vacío
        if (!input.value.trim()) {
          showError(parent);
          isValid = false;
        } else {
          clearError(parent);
        }
      }
    });

    if (isValid) {
      // Simulación de envío exitoso
      feedback.textContent = '¡Gracias por tu mensaje! Me pondré en contacto contigo en breve.';
      feedback.className = 'form-feedback success';
      form.reset();

      // Limpiar mensaje tras 5 segundos
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      }, 5000);
    }
  });

  function showError(formGroup) {
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  }

  function clearError(formGroup) {
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
  }
}

/* ==========================================
   5. Año Dinámico en Footer
   ========================================== */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
