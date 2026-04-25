// app.js - JavaScript puro para Projeto Amor
// Substitui jQuery e AngularJS, mantendo funcionalidades

document.addEventListener('DOMContentLoaded', function() {
    // Contador de tempo
    initCounter();

    // Preloader
    initPreloader();

    // Smooth scroll
    initSmoothScroll();

    // Scroll to top
    initScrollToTop();

    // Navbar sticky
    initStickyNavbar();

    // Scrollspy
    initScrollspy();

    // Quote rotator
    initQuoteRotator();

    // Modal da galeria
    initGalleryModal();

    // Home BG height
    setHomeHeight();

    // WOW animations (se disponível)
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Waypoints (se disponível)
    initWaypoints();
});

// Função para contador de tempo
function initCounter() {
    const finalDate = new Date(2023, 1, 7); // 7 de Fevereiro de 2023
    const counterElement = document.getElementById('days-counter');

    if (!counterElement) return;

    // Configurar labels do countdown
    countdown.setLabels(
        '| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
        '| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
        ' e ', ', ', '',
        function(n) { return n.toString(); }
    );

    function updateCounter() {
        const result = countdown(finalDate, null).toString();
        counterElement.textContent = result;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// Preloader
function initPreloader() {
    const status = document.getElementById('status');
    const preloader = document.getElementById('preloader');

    if (!status || !preloader) return;

    window.addEventListener('load', function() {
        status.style.display = 'none';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    });
}

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href*="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Scroll to top
function initScrollToTop() {
    const scrollUp = document.querySelector('.scroll-up');

    if (!scrollUp) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollUp.style.display = 'block';
        } else {
            scrollUp.style.display = 'none';
        }
    });
}

// Navbar sticky
function initStickyNavbar() {
    const header = document.querySelector('.header');

    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Scrollspy simples
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-custom a[href*="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Quote rotator em JS puro
function initQuoteRotator() {
    const rotator = document.getElementById('cbp-qtrotator');
    if (!rotator) return;

    const contents = rotator.querySelectorAll('.cbp-qtcontent');
    if (contents.length < 2) return;

    let currentIndex = 0;

    function showNext() {
        contents.forEach((content, index) => {
            content.style.display = index === currentIndex ? 'block' : 'none';
        });
        currentIndex = (currentIndex + 1) % contents.length;
    }

    showNext(); // Mostrar primeiro
    setInterval(showNext, 8000); // Intervalo de 8s como no original
}

// Modal da galeria
function initGalleryModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img-expanded');
    const captionText = document.getElementById('caption-text');
    const closeBtn = document.querySelector('.close-btn');

    if (!modal || !modalImg || !captionText) return;

    // Adicionar event listeners às imagens da galeria
    const galleryImages = document.querySelectorAll('.grid figure');

    galleryImages.forEach(figure => {
        figure.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h2');

            if (img && title) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                captionText.textContent = title.textContent;
            }
        });
    });

    // Fechar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Home BG height
function setHomeHeight() {
    const screenHeightElements = document.querySelectorAll('.screen-height');

    screenHeightElements.forEach(el => {
        el.style.height = window.innerHeight + 'px';
    });
}

// Waypoints (fallback se plugin disponível)
function initWaypoints() {
    if (typeof Waypoint === 'undefined') return;

    // Exemplo para skills, se existir
    const skills = document.querySelector('.skills');
    if (skills) {
        new Waypoint({
            element: skills,
            handler: function() {
                const charts = document.querySelectorAll('.chart');
                charts.forEach(chart => {
                    // Assumindo easyPieChart disponível
                    if (typeof $ !== 'undefined' && chart.easyPieChart) {
                        $(chart).easyPieChart({
                            size: 140,
                            animate: 2000,
                            lineCap: 'butt',
                            scaleColor: false,
                            barColor: '#FF5252',
                            trackColor: 'transparent',
                            lineWidth: 10
                        });
                    }
                });
            },
            offset: '80%'
        });
    }
}