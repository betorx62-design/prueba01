/* ============================================
   EL TACO FEROZ - JavaScript principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === ELEMENTOS DEL DOM ===
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // === NAVBAR: Cambiar estilo al hacer scroll ===
    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // === NAVBAR: Resaltar link activo según la sección visible ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section, header');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // === MENÚ HAMBURGUESA (Mobile) ===
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // === BOTÓN SCROLL TO TOP ===
    function handleScrollTopButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === FILTROS DEL MENÚ ===
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            menuItems.forEach((item, index) => {
                const category = item.dataset.category;
                const shouldShow = filter === 'todos' || category === filter;

                // Animación de ocultar/mostrar
                if (shouldShow) {
                    item.style.display = 'flex';
                    // Delay escalonado para la animación
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 80);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // === ANIMACIÓN DE ENTRADA: Items del menú al hacer scroll ===
    function animateMenuItemsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        menuItems.forEach(item => {
            observer.observe(item);
        });
    }

    // === ANIMACIÓN DE ENTRADA: Secciones generales ===
    function animateSectionsOnScroll() {
        const animatedElements = document.querySelectorAll(
            '.about-card, .contact-card, .section-header, .promo-content'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // === SMOOTH SCROLL para links con anclas ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === EFECTO PARALLAX SUTIL en el Hero ===
    function handleHeroParallax() {
        const hero = document.getElementById('hero');
        if (hero && window.innerWidth > 768) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }
    }

    // === CONTADOR ANIMADO de precio (efecto hover) ===
    menuItems.forEach(item => {
        const priceEl = item.querySelector('.menu-price');
        if (!priceEl) return;

        item.addEventListener('mouseenter', () => {
            priceEl.style.transform = 'scale(1.1)';
            priceEl.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            priceEl.style.transform = 'scale(1)';
        });
    });

    // === EVENT LISTENERS GLOBALES ===
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleScrollTopButton();
        updateActiveNavLink();
        handleHeroParallax();
    }, { passive: true });

    // === INICIALIZACIÓN ===
    handleNavbarScroll();
    animateMenuItemsOnScroll();
    animateSectionsOnScroll();

    // Log de bienvenida
    console.log('%c🌮 El Taco Feroz', 'font-size: 24px; font-weight: bold; color: #D4380D;');
    console.log('%cSitio web cargado correctamente.', 'font-size: 12px; color: #666;');

});
