/* ============================================
   WEDDING INVITATION — Santhana kumar & Prithiyanga
   Interactive JavaScript — Enhanced Edition
   ============================================ */
 
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initParticles();
    initFallingStars();
    initNavigation();
    initScrollAnimations();
    initCountdown();
    // initRSVPForm(); // RSVP page removed, initialization disabled
    initParallax();
    initGoldenCursorTrail();
    initClickRipples();
    initCardTilt();
    initMagneticButtons();
    initTextShimmer();
    initGoldenDustOnScroll();
    initGlossySweeps();
    initSectionBorders();
    initMusicPlayer();
});
 
/* === Loading Screen === */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
 
    function hideLoader() {
        loadingScreen.classList.add('hidden');
        document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
        });
    }
 
    // Hide after page load + short delay
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1500);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 1500));
    }
 
    // Hard fallback — always hide after 2.5s no matter what
    setTimeout(hideLoader, 2500);
}
 
/* === Floating Particles === */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 12 : 25;
   
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
       
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 18 + 8;
        const delay = Math.random() * 25;
       
        // Mix of shapes: circles, diamonds, stars, snow
        const shapes = ['circle', 'diamond', 'star', 'snow'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
       
        let borderRadius = '50%';
        let transform = '';
        let content = '';
        let bgStyle = '';
        let shadowStyle = '';
       
        if (shape === 'diamond') {
            borderRadius = '2px';
            transform = 'rotate(45deg)';
        }
       
        if (shape === 'snow') {
            bgStyle = 'transparent';
            shadowStyle = 'none';
            content = `<svg width="${size*1.5}" height="${size*1.5}" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/></svg>`;
        } else {
            bgStyle = Math.random() > 0.6
                ? `rgba(201, 169, 110, ${Math.random() * 0.5 + 0.15})`
                : Math.random() > 0.5
                    ? `rgba(232, 213, 168, ${Math.random() * 0.4 + 0.15})`
                    : `rgba(232, 196, 196, ${Math.random() * 0.3 + 0.1})`;
            shadowStyle = `0 0 ${size * 2}px rgba(201, 169, 110, 0.2)`;
        }
        if (shape === 'diamond') {
            borderRadius = '2px';
            transform = 'rotate(45deg)';
        }
       
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            border-radius: ${borderRadius};
            transform: ${transform};
            background: ${bgStyle};
            box-shadow: ${shadowStyle};
        `;
       
        particle.innerHTML = content;
       
        container.appendChild(particle);
    }
}
 
/* === Navigation === */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
   
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
       
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
       
        lastScroll = currentScroll;
    });
   
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
   
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
   
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;
       
        sections.forEach(section => {
            const id = section.getAttribute('id');
            const offset = section.offsetTop;
            const height = section.offsetHeight;
           
            if (scrollPos >= offset && scrollPos < offset + height) {
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.style.color = '';
                });
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--gold-dark)';
                }
            }
        });
    });
}
 
/* === Scroll Animations === */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
   
    document.querySelectorAll('.animate-on-scroll:not(.hero .animate-on-scroll)').forEach(el => {
        observer.observe(el);
    });
}
 
/* === Countdown Timer === */
function initCountdown() {
    const weddingDate = new Date('July 19, 2026 18:00:00').getTime();
   
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
       
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
           
            animateNumber('days', days.toString().padStart(2, '0'));
            animateNumber('hours', hours.toString().padStart(2, '0'));
            animateNumber('minutes', minutes.toString().padStart(2, '0'));
            animateNumber('seconds', seconds.toString().padStart(2, '0'));
        }
    }
   
    function animateNumber(id, newValue) {
        const el = document.getElementById(id);
        if (el && el.textContent !== newValue) {
            el.style.transform = 'translateY(-8px)';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = newValue;
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 150);
        }
    }
   
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
 
/* === RSVP Form === */
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const successMsg = document.getElementById('rsvpSuccess');
    if (!form || !successMsg) {
        // RSVP form not present on this page – skip initialization
        return;
    }
   
    form.addEventListener('submit', (e) => {
        e.preventDefault();
       
        const submitBtn = document.getElementById('submitRsvp');
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
       
        setTimeout(() => {
            form.style.display = 'none';
            successMsg.classList.add('show');
            createCelebration();
        }, 1500);
    });
   
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
       
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });
    });
}
 
/* === Celebration Effect === */
function createCelebration() {
    const colors = ['#c9a96e', '#e8c4c4', '#6b2d3e', '#dfc598', '#e8d5a8', '#f0e6d0'];
    const container = document.body;
   
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            z-index: 9999;
            pointer-events: none;
            border-radius: ${Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '0' : '2px'};
            box-shadow: 0 0 6px ${colors[Math.floor(Math.random() * colors.length)]};
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            animation-delay: ${Math.random() * 1}s;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
   
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
                50% { opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}
 
 
 
 
 
/* ============================================
   ✨ GOLDEN CURSOR TRAIL — Enhanced Sparkle
   ============================================ */
function initGoldenCursorTrail() {
    let mouseX = -999, mouseY = -999;
    let lastSparkle = 0;
   
    // Inject sparkle styles
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0%   { transform: translate(0,0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(var(--dx), var(--dy)) scale(0) rotate(240deg); opacity: 0; }
        }
        @keyframes ringExpand {
            0%   { transform: scale(0); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0; }
        }
        .sparkle-particle {
            position: fixed;
            pointer-events: none;
            z-index: 99999;
        }
        .golden-glow-spot {
            position: fixed;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transition: left 0.3s ease, top 0.3s ease;
        }
    `;
    document.head.appendChild(sparkleStyle);
   
    // Golden glow that follows mouse
    const glowSpot = document.createElement('div');
    glowSpot.className = 'golden-glow-spot';
    document.body.appendChild(glowSpot);
   
    function createCracker(x, y) {
        const numRays = 3;
        // Golden, ivory, white palette only
        const colors = [
            'rgba(255,215,0,0.95)',
            'rgba(201,169,110,0.95)',
            'rgba(255,248,220,0.95)',
            'rgba(255,255,255,0.9)',
            'rgba(232,213,168,0.95)',
            'rgba(240,220,130,0.9)',
        ];
       
        // Cracker starburst rays
        for (let i = 0; i < numRays; i++) {
            const el = document.createElement('div');
            el.className = 'sparkle-particle';
            const angle = (i / numRays) * Math.PI * 2;
            const speed = Math.random() * 80 + 40;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 2;
            el.style.cssText = `
                left: ${x}px; top: ${y}px;
                width: ${size}px; height: ${size}px;
                border-radius: 50%;
                background: ${color};
                box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size}px rgba(255,215,0,0.8);
                --dx: ${Math.cos(angle) * speed}px;
                --dy: ${Math.sin(angle) * speed}px;
                animation: sparkleFloat 0.8s ease-out forwards;
            `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 800);
        }
       
        // SVG filled star — golden/ivory only (throttled to 40% of moves)
        if (Math.random() > 0.6) {
            const starCols = ['#FFD700', '#c8a84b', '#FFF8DC', '#F0DC82', '#E8D5A0'];
            const starSvg = document.createElement('div');
            starSvg.className = 'sparkle-particle';
            const sz = Math.random() * 14 + 10;
            const col = starCols[Math.floor(Math.random() * starCols.length)];
            starSvg.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="rgba(255,215,0,0.5)" stroke-width="0.5"/></svg>`;
            const starAngle = Math.random() * Math.PI * 2;
            const starSpeed = Math.random() * 60 + 30;
            starSvg.style.cssText = `
                left: ${x - sz/2}px; top: ${y - sz/2}px;
                filter: drop-shadow(0 0 6px rgba(255,215,0,0.9));
                --dx: ${Math.cos(starAngle) * starSpeed}px;
                --dy: ${Math.sin(starAngle) * starSpeed}px;
                animation: sparkleFloat 1s ease-out forwards;
            `;
            document.body.appendChild(starSvg);
            setTimeout(() => starSvg.remove(), 1000);
        }
       
        // SVG ring expanding outward — golden only
        if (Math.random() > 0.85) {
            const ring = document.createElement('div');
            ring.className = 'sparkle-particle';
            const rSize = Math.random() * 40 + 25;
            const rCol = Math.random() > 0.5 ? 'rgba(255,215,0,0.7)' : 'rgba(201,169,110,0.7)';
            ring.innerHTML = `<svg width="${rSize}" height="${rSize}" viewBox="0 0 24 24" fill="none" stroke="${rCol}" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>`;
            ring.style.cssText = `
                left: ${x - rSize/2}px; top: ${y - rSize/2}px;
                filter: drop-shadow(0 0 4px rgba(255,215,0,0.6));
                animation: ringExpand 0.9s ease-out forwards;
                transform-origin: center;
            `;
            document.body.appendChild(ring);
            setTimeout(() => ring.remove(), 900);
        }
    }
   
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glowSpot.style.left = (mouseX - 100) + 'px';
        glowSpot.style.top  = (mouseY - 100) + 'px';
        const now = Date.now();
        if (now - lastSparkle < 160) return;  // Throttled for subtlety
        lastSparkle = now;
        createCracker(mouseX, mouseY);
    });
   
    document.addEventListener('scroll', () => {
        if (mouseX === -999) return;
        const now = Date.now();
        if (now - lastSparkle < 120) return;
        lastSparkle = now;
        createCracker(mouseX, mouseY);
    });
   
}
 
 
 
 
/* ============================================
   💫 CLICK RIPPLE — Golden ring bursts
   ============================================ */
function initClickRipples() {
    // Inject click ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes clickRippleExpand {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes clickBurst {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--bx), var(--by)) scale(0); opacity: 0; }
        }
        .click-ripple {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            animation: clickRippleExpand 0.7s ease-out forwards;
        }
        .click-burst-particle {
            position: fixed;
            pointer-events: none;
            z-index: 9997;
            border-radius: 50%;
            animation: clickBurst 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(rippleStyle);
   
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
       
        // Create expanding rings
        for (let i = 0; i < 1; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            const size = 60;
            const isMaroon = Math.random() > 0.5;
            const ringColor = isMaroon ? `rgba(107, 21, 34, 0.4)` : `rgba(200, 168, 75, 0.45)`;
            ripple.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border: 1.5px solid ${ringColor};
                animation-duration: 0.6s;
            `;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        }
       
        // Create burst particles (Cracker scatter)
        const burstCount = 6;
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-burst-particle';
            const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.2;
            const dist = Math.random() * 60 + 30; // Shoot out less distance
            const size = Math.random() * 3 + 1.5;
           
            const isMaroon = Math.random() > 0.5;
            const color = isMaroon ? `rgba(107, 21, 34, ${Math.random() * 0.4 + 0.4})` : `rgba(200, 168, 75, ${Math.random() * 0.4 + 0.4})`;
            const shadow = isMaroon ? `rgba(107, 21, 34, 0.4)` : `rgba(200, 168, 75, 0.45)`;
           
            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                box-shadow: 0 0 ${size * 2}px ${shadow};
                --bx: ${Math.cos(angle) * dist}px;
                --by: ${Math.sin(angle) * dist}px;
                animation-delay: ${Math.random() * 0.05}s;
                animation-duration: 0.8s;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
       
        // Star emoji burst (Cracker stars)
        const starChars = ['✦', '✧', '◆', '❋', '✶'];
        for (let i = 0; i < 2; i++) {
            const star = document.createElement('div');
            star.className = 'click-burst-particle';
            const angle = (Math.PI * 2 * i) / 2 + Math.random() * 0.5;
            const dist = Math.random() * 70 + 40; // Closer range
            star.innerHTML = starChars[i % starChars.length];
           
            const isMaroon = Math.random() > 0.5;
            const starColor = isMaroon ? `rgba(107, 21, 34, 0.85)` : `rgba(200, 168, 75, 0.85)`;
            const starShadow = isMaroon ? `rgba(107, 21, 34, 0.4)` : `rgba(200, 168, 75, 0.45)`;
           
            star.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                font-size: ${Math.random() * 8 + 8}px;
                color: ${starColor};
                text-shadow: 0 0 8px ${starShadow};
                --bx: ${Math.cos(angle) * dist}px;
                --by: ${Math.sin(angle) * dist}px;
                animation-delay: ${Math.random() * 0.1}s;
                animation-duration: 0.9s;
            `;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 900);
        }
    });
}
 
 
/* ============================================
   🃏 CARD TILT — 3D Perspective on hover
   ============================================ */
function initCardTilt() {
    if (window.innerWidth <= 768) return;
   
    const tiltElements = document.querySelectorAll('.event-card, .timeline-card, .countdown-item, .couple-card, .gallery-item');
   
    tiltElements.forEach(el => {
        el.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease';
        el.style.transformStyle = 'preserve-3d';
       
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
           
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
           
            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.boxShadow = `
                ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(201, 169, 110, 0.1),
                0 10px 40px rgba(0, 0, 0, 0.06)
            `;
           
            // Inner golden glow that follows mouse
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            el.style.background = `
                radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201, 169, 110, 0.08) 0%, transparent 50%),
                rgba(255, 255, 255, 0.7)
            `;
        });
       
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.boxShadow = '';
            el.style.background = '';
        });
    });
}
 
 
/* ============================================
   🧲 MAGNETIC BUTTONS — Hover attraction
   ============================================ */
function initMagneticButtons() {
    if (window.innerWidth <= 768) return;
   
    const magneticElements = document.querySelectorAll('.btn-rsvp, .btn-submit, .social-link, .map-link, .nav-links a');
   
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
           
            const strength = 0.3;
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
       
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                el.style.transition = '';
            }, 400);
        });
    });
}
 
 
/* ============================================
   ✨ TEXT SHIMMER — Golden sweep on section titles
   ============================================ */
function initTextShimmer() {
    // Add shimmer class to all section titles
    document.querySelectorAll('.section-title, .groom-name, .bride-name, .footer-monogram').forEach(el => {
        el.classList.add('golden-shimmer-text');
    });
}
 
 
/* ============================================
   🌟 GOLDEN DUST ON SCROLL — Sparkle bursts
   ============================================ */
function initGoldenDustOnScroll() {
    let lastScrollY = window.scrollY;
    let scrollTimeout;
   
    window.addEventListener('scroll', () => {
        const scrollDelta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
       
        if (scrollDelta > 10) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Create golden dust particles at random positions on screen
                for (let i = 0; i < Math.min(scrollDelta / 15, 3); i++) {
                    const dust = document.createElement('div');
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    const size = Math.random() * 2 + 1;
                   
                    dust.style.cssText = `
                        position: fixed;
                        left: ${x}px;
                        top: ${y}px;
                        width: ${size}px;
                        height: ${size}px;
                        background: rgba(201, 169, 110, ${Math.random() * 0.4 + 0.15});
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9996;
                        box-shadow: 0 0 ${size * 2}px rgba(201, 169, 110, 0.2);
                        transition: all 1s ease;
                    `;
                    document.body.appendChild(dust);
                   
                    requestAnimationFrame(() => {
                        dust.style.transform = `translateY(${(Math.random() - 0.5) * 40}px) scale(0)`;
                        dust.style.opacity = '0';
                    });
                   
                    setTimeout(() => dust.remove(), 1000);
                }
            }, 50);
        }
    });
}
 
 
/* === Parallax Effect === */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
   
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
       
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
       
        if (scrollIndicator && scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    });
   
    // Mouse parallax on hero section
    if (window.innerWidth > 768) {
        const hero = document.querySelector('.hero');
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
           
            if (heroContent && window.scrollY < window.innerHeight) {
                heroContent.style.transform = `translateY(${window.scrollY * 0.3}px) translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
        });
    }
}
 
/* === Smooth Scroll Enhancement === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
 
/* ============================================
   🌌 FALLING GOLDEN STARS / DUST
   ============================================ */
function initFallingStars() {
    // Inject styles
    const style = document.createElement('style');
    style.id = 'fallingStarsStyle';
    style.textContent = `
        .falling-star-elem {
            position: fixed;
            pointer-events: none;
            z-index: 99998;
            animation: fallingStarAnim linear forwards;
        }
        @keyframes fallingStarAnim {
            0%   { transform: translateY(-80px) rotate(0deg);   opacity: 0; }
            8%   { opacity: 1; }
            90%  { opacity: 0.8; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
   
    const starSVGs = [
        (col, sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
        (col, sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
        (col, sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>`,
        (col, sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}"><circle cx="12" cy="12" r="3"/></svg>`,
    ];
   
    function spawnStar() {
        const el = document.createElement('div');
        el.className = 'falling-star-elem';
        const sz = Math.random() * 10 + 5;
        const colors = ['#FFD700', '#c8a84b', '#FFF8DC', '#F0DC82', '#FFFACD', '#E8D5A0'];
        const col = colors[Math.floor(Math.random() * colors.length)];
        const svgFn = starSVGs[Math.floor(Math.random() * starSVGs.length)];
        el.innerHTML = svgFn(col, sz);
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        el.style.cssText = `
            left: ${left}vw;
            top: 0;
            animation-duration: ${duration}s;
            filter: drop-shadow(0 0 ${sz/3}px ${col});
            opacity: 0.8;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), (duration + 0.5) * 1000);
    }
   
    // Spawn continuously every 1200ms
    setInterval(spawnStar, 1200);
    // Initial burst
    for (let i = 0; i < 4; i++) {
        setTimeout(spawnStar, i * 400);
    }
}
 
/* ============================================
   ✨ GLOSSY MOVEMENTS — Sweeping glass reflection
   ============================================ */
function initGlossySweeps() {
    const cards = document.querySelectorAll('.event-card, .timeline-card, .countdown-item, .couple-card, .gallery-item, .btn-rsvp, .date-block');
   
    // Inject styles
    if (!document.getElementById('glossyStyle')) {
        const style = document.createElement('style');
        style.id = 'glossyStyle';
        style.textContent = `
            .glossy-element {
                position: relative;
                overflow: hidden;
            }
            .glossy-sweep {
                position: absolute;
                top: -150%;
                left: -150%;
                width: 400%;
                height: 400%;
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.4) 40%,
                    rgba(255, 255, 255, 0.8) 50%,
                    rgba(255, 255, 255, 0.4) 60%,
                    rgba(255, 255, 255, 0) 100%
                );
                transform: rotate(35deg) translateX(-100%);
                animation: glossAnim 5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
                pointer-events: none;
                z-index: 5;
                mix-blend-mode: overlay;
            }
            @keyframes glossAnim {
                0% { transform: rotate(35deg) translateX(-100%); }
                15% { transform: rotate(35deg) translateX(100%); }
                100% { transform: rotate(35deg) translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
 
    cards.forEach(card => {
        card.classList.add('glossy-element');
        const sweep = document.createElement('div');
        sweep.className = 'glossy-sweep';
        // Add random staggered delay so they don't all sweep at once
        sweep.style.animationDelay = (Math.random() * 5) + 's';
        card.appendChild(sweep);
    });
}
 
/* ============================================
   ✦ SECTION BORDERS — Corner ornaments
   ============================================ */
function initSectionBorders() {
    const cornerSVG = (color) => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2 L12 2 L2 12 Z" fill="${color}" opacity="0.8"/>
        <path d="M2 2 L2 14" stroke="${color}" stroke-width="1.5" opacity="0.9"/>
        <path d="M2 2 L14 2" stroke="${color}" stroke-width="1.5" opacity="0.9"/>
        <circle cx="2" cy="2" r="2.5" fill="${color}"/>
        <circle cx="14" cy="2" r="1.2" fill="${color}" opacity="0.7"/>
        <circle cx="2" cy="14" r="1.2" fill="${color}" opacity="0.7"/>
    </svg>`;
 
    const sections = document.querySelectorAll('.couple-section, .timeline-section, .events-section, .countdown-section, .rsvp-section, .hero');
    const gold = '#c8a84b';
    const ruby = '#6b1522';
 
    sections.forEach(section => {
        const corners = [
            { cls: 'section-corner-tl', color: gold },
            { cls: 'section-corner-tr', color: ruby },
            { cls: 'section-corner-bl', color: ruby },
            { cls: 'section-corner-br', color: gold },
        ];
        corners.forEach(({ cls, color }) => {
            const div = document.createElement('div');
            div.className = cls;
            div.innerHTML = cornerSVG(color);
            section.appendChild(div);
        });
    });
}
 
/* ============================================
   🎵 YOUTUBE MUSIC PLAYER + BEAT GLITTER
   ============================================ */
 
// Local audio setup
// Add more songs here (files placed in the "music" folder)
const musicPlaylist = [
    'music/Song 1.mp3',
     'music/Song 2.mp3',
     'music/Song 3.mp3',
];
let currentTrack = -1;
 
function pickRandomTrack() {
    if (musicPlaylist.length === 1) return 0;
    let next;
    do {
        next = Math.floor(Math.random() * musicPlaylist.length);
    } while (next === currentTrack);
    return next;
}
 
let bgMusic = new Audio();
bgMusic.loop = musicPlaylist.length === 1;
currentTrack = pickRandomTrack();
bgMusic.src = encodeURI(musicPlaylist[currentTrack]);
 
// When a song ends, pick another one randomly
bgMusic.addEventListener('ended', () => {
    currentTrack = pickRandomTrack();
    bgMusic.src = encodeURI(musicPlaylist[currentTrack]);
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
});
 
// If a song file is missing/unplayable, skip to another
bgMusic.addEventListener('error', () => {
    if (musicPlaylist.length > 1) {
        currentTrack = pickRandomTrack();
        bgMusic.src = encodeURI(musicPlaylist[currentTrack]);
        if (musicIsPlaying) bgMusic.play().catch(() => {});
    }
});
 
let musicIsPlaying = false;
let beatInterval = null;
 
function setMusicPlaying(state) {
    musicIsPlaying = state;
    if (state) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        startBeatGlitter();
        let btn = document.getElementById('floatingMusicBtn');
        if (btn) btn.classList.add('playing');
    } else {
        bgMusic.pause();
        stopBeatGlitter();
        let btn = document.getElementById('floatingMusicBtn');
        if (btn) btn.classList.remove('playing');
    }
}
 
function initMusicPlayer() {
    let started = false;
 
    function startMusic() {
        if (started) return;
       
        bgMusic.play()
            .then(() => {
                started = true;
                setMusicPlaying(true);
                removeListeners();
            })
            .catch(e => {
                console.log('Audio playback failed or blocked:', e);
            });
    }
 
    const events = ['click', 'touchstart', 'touchend', 'mousedown', 'pointerdown', 'keydown'];
 
    function removeListeners() {
        events.forEach(evt => {
            document.removeEventListener(evt, startMusic);
        });
    }
 
    // Register listeners for initial user interaction
    events.forEach(evt => {
        document.addEventListener(evt, startMusic, { once: true, passive: true });
    });
 
    // Try playing immediately (will resolve if allowed, or fail silently waiting for user gesture)
    bgMusic.play()
        .then(() => {
            started = true;
            setMusicPlaying(true);
            removeListeners();
        })
        .catch(() => {
            // Silently wait for user gesture as browsers block auto-play initially
        });
 
    // Inject small music symbol button at bottom right
    const btn = document.createElement('div');
    btn.id = 'floatingMusicBtn';
    btn.className = 'music-player';
    btn.innerHTML = `
        <div class="music-player-inner" style="width: 44px; height: 44px; padding: 0; display: flex; justify-content: center; align-items: center; border-radius: 50%;">
            <div class="music-note-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            </div>
            <div class="music-ripple"></div>
            <div class="music-ripple music-ripple-2"></div>
        </div>
    `;
    document.body.appendChild(btn);
 
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        started = true; // Mark interaction
        removeListeners(); // stop attempting auto-play once user manually toggles
        setMusicPlaying(!musicIsPlaying);
    });
}
 
 
/* ── Beat-synced glitter ── */
function spawnBeatGlitter() {
    // Spawn 1-2 tiny golden glitters at random positions
    const count = Math.floor(Math.random() * 2) + 1;
    const cols = ['rgba(255,215,0,0.8)', 'rgba(255,248,220,0.8)', 'rgba(201,169,110,0.8)', 'rgba(255,255,255,0.75)'];
 
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'sparkle-particle';
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const sz = Math.random() * 6 + 3;
            const col = cols[Math.floor(Math.random() * cols.length)];
 
            // Alternate between tiny dot and tiny 5-pt star
            if (Math.random() > 0.6) {
                el.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
            } else {
                el.style.width  = sz + 'px';
                el.style.height = sz + 'px';
                el.style.borderRadius = '50%';
                el.style.background = col;
                el.style.boxShadow  = `0 0 ${sz*2}px ${col}`;
            }
 
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 60 + 20;
            el.style.cssText += `
                position: fixed;
                left: ${x}px; top: ${y}px;
                pointer-events: none;
                z-index: 99998;
                --dx: ${Math.cos(angle) * speed}px;
                --dy: ${Math.sin(angle) * speed}px;
                animation: sparkleFloat 1.2s ease-out forwards;
                filter: drop-shadow(0 0 4px ${col});
            `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 1200);
        }, i * 60);
    }
}
 
function startBeatGlitter() {
    stopBeatGlitter(); // clear any existing
    // Fire on a rhythm — approx 90 BPM (667ms per beat)
    spawnBeatGlitter();
    beatInterval = setInterval(spawnBeatGlitter, 667);
}
 
function stopBeatGlitter() {
    if (beatInterval) {
        clearInterval(beatInterval);
        beatInterval = null;
    }
}
 
 
 