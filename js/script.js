// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

// Scroll effect pour la navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    lastScroll = currentScroll;
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Hours counter animation
const completedHours = 2;
const totalHours = 60;
const percentage = Math.round((completedHours / totalHours) * 100);

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate circular progress
function animateCircularProgress() {
    const circularProgress = document.getElementById('circularProgress');
    const percentageElement = document.getElementById('percentage');
    
    if (circularProgress && percentageElement) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (percentage / 100) * circumference;
        
        // Ajouter le gradient SVG
        const svg = circularProgress.closest('svg');
        if (svg && !svg.querySelector('defs')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#6366f1;stop-opacity:1');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#8b5cf6;stop-opacity:1');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);
        }
        
        circularProgress.style.strokeDasharray = circumference;
        circularProgress.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circularProgress.style.strokeDashoffset = offset;
        }, 100);
        
        percentageElement.textContent = percentage + '%';
    }
}

// Animate remaining hours
function animateRemainingHours() {
    const remainingElement = document.getElementById('remainingHours');
    if (remainingElement) {
        animateCounter(remainingElement, totalHours - completedHours);
    }
}

// Intersection Observer pour les animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animer le compteur d'heures
            if (entry.target.classList.contains('hours-tracker')) {
                const completedElement = document.getElementById('completedHours');
                if (completedElement) {
                    animateCounter(completedElement, completedHours);
                }
                animateRemainingHours();
                animateCircularProgress();
            }
            
            // Animer les barres de compétences
            if (entry.target.classList.contains('competence-card')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width || '0%';
                    }, index * 100);
                });
            }
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments
document.querySelectorAll('.competence-card, .projet-card, .timeline-item, .activite-card, .hours-tracker, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Parallax effect pour les shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.15);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Code window typing effect
function typeCodeEffect() {
    const codeContent = document.querySelector('.window-content pre code');
    if (!codeContent) return;
    
    const originalText = codeContent.innerHTML;
    codeContent.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < originalText.length) {
            codeContent.innerHTML = originalText.substring(0, index + 1);
            index++;
            setTimeout(type, 20);
        }
    }
    
    setTimeout(type, 500);
}

// Lancer l'effet de typing au chargement
window.addEventListener('load', typeCodeEffect);

// Hover effect sur les cartes
document.querySelectorAll('.competence-card, .projet-card, .activite-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animer les tech badges au hover
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Effet de particules légères
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(99, 102, 241, 0.4)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    const duration = 15 + Math.random() * 15;
    const xMovement = (Math.random() - 0.5) * 200;
    const yMovement = (Math.random() - 0.5) * 200;
    
    particle.style.animation = `particleFloat ${duration}s linear forwards`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Ajouter l'animation des particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Créer des particules périodiquement
setInterval(createParticle, 3000);

// Gestion du scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Effet de cursor personnalisé (optionnel)
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Agrandir le curseur sur les éléments interactifs
document.querySelectorAll('a, button, .competence-card, .projet-card, .activite-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
    });
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le throttle aux événements scroll
const throttledScroll = throttle(() => {
    // Scroll logic here
}, 100);

window.addEventListener('scroll', throttledScroll);

// Lazy loading pour les images (si ajoutées plus tard)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Easter egg console
console.log('%c👋 Salut!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cTu explores le code? Bravo pour ta curiosité!', 'color: #8b5cf6; font-size: 16px;');
console.log('%cSi tu as des questions ou des suggestions, n\'hésite pas à me contacter!', 'color: #94a3b8; font-size: 14px;');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio chargé avec succès!');
    
    // Ajouter une classe pour indiquer que tout est chargé
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Précharger certaines animations
    if (window.innerWidth > 768) {
        createParticle();
    }
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Temps de chargement:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}