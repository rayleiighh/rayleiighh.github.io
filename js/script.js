// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hours counter animation
const hoursCounter = document.getElementById('hoursCounter');
const progressFill = document.getElementById('progressFill');
const targetHours = 2; // Heures actuellement complétées
const maxHours = 60;

function animateCounter() {
    let current = 0;
    const increment = targetHours / 60; // Animation sur 60 frames
    const interval = setInterval(() => {
        current += increment;
        if (current >= targetHours) {
            current = targetHours;
            clearInterval(interval);
        }
        hoursCounter.textContent = Math.floor(current);
    }, 20);
}

function animateProgress() {
    const percentage = (targetHours / maxHours) * 100;
    progressFill.style.width = percentage + '%';
}

// Intersection Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Déclencher l'animation du compteur quand la section est visible
            if (entry.target.classList.contains('hours-counter')) {
                animateCounter();
                animateProgress();
            }
        }
    });
}, observerOptions);

// Observer toutes les cartes de compétences
document.querySelectorAll('.competence-card').forEach(card => {
    observer.observe(card);
});

// Observer les items de timeline
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observer le compteur d'heures
const hoursCounterSection = document.querySelector('.hours-counter');
if (hoursCounterSection) {
    observer.observe(hoursCounterSection);
}

// Animation des cartes d'activités au hover
document.querySelectorAll('.activite-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect pour les floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animation du texte glitch au survol
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    glitchText.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'glow 2s ease-in-out infinite, glitchAnimation 0.3s ease';
        }, 10);
    });
}

// Ajouter une animation CSS pour le glitch
const style = document.createElement('style');
style.textContent = `
    @keyframes glitchAnimation {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
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
});

// Ajouter un effet de particules subtil au fond
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: particleFloat ${10 + Math.random() * 20}s linear infinite;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 30000);
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
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Créer des particules périodiquement
setInterval(createParticle, 2000);

// Effet de typing pour le sous-titre
const subtitle = document.querySelector('.description');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Démarrer l'effet après un court délai
    setTimeout(typeWriter, 1000);
}

// Ajouter un effet de hover aux skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.4)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
    });
});

// Ajouter des transitions aux skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.style.transition = 'all 0.3s ease';
});

// Console easter egg
console.log('%c👋 Salut! Tu inspectes mon code?', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cSi tu veux en savoir plus sur mes projets, n\'hésite pas à me contacter!', 'color: #8b5cf6; font-size: 14px;');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio chargé avec succès! 🚀');
    
    // Ajouter une classe pour indiquer que tout est chargé
    document.body.classList.add('loaded');
});

// Gestion du resize pour maintenir les animations fluides
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les positions si nécessaire
        console.log('Fenêtre redimensionnée, animations ajustées');
    }, 250);
});