/* ============================================
   ESTUDIO JURÍDICO - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initHeroSlideshow();
    initScrollAnimations();
    initContactForm();
    initTestimonioForm();
    initBackToTop();
    initSmoothScroll();
});

/* ----- Header scroll effect ----- */
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ----- Mobile menu toggle ----- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = menu.querySelectorAll('a');

    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ----- Hero background slideshow ----- */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;

    let current = 0;

    setInterval(function() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 6000);
}

/* ----- Scroll reveal animations ----- */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.area-card, .equipo-card, .testimonio-card');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/* ----- Contact form handler ----- */
function initContactForm() {
    const form = document.getElementById('contactoForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const alert = document.getElementById('contactoAlert');
        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const spinner = btn.querySelector('.spinner');

        var nombre = document.getElementById('nombre').value.trim();
        var email = document.getElementById('email').value.trim();
        var mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email || !mensaje) {
            e.preventDefault();
            alert.className = 'alert alert-error show';
            alert.textContent = 'Por favor complete todos los campos obligatorios.';
            return;
        }

        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        btn.disabled = true;
    });
}

/* ----- Testimonio form handler ----- */
function initTestimonioForm() {
    const form = document.getElementById('testimonioForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const alert = document.getElementById('testimonioAlert');
        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const spinner = btn.querySelector('.spinner');

        var nombre = document.getElementById('testNombre').value.trim();
        var testimonio = document.getElementById('testMensaje').value.trim();

        if (!nombre || !testimonio) {
            e.preventDefault();
            alert.className = 'alert alert-error show';
            alert.textContent = 'Por favor complete todos los campos.';
            return;
        }

        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        btn.disabled = true;
    });
}

/* ----- Back to top button ----- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ----- Smooth scroll for anchor links ----- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
