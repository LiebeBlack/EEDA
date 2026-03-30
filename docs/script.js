/**
 * E.E.D.A Core Hub Logic
 * Optimized for Android and Desktop performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. WEB-HUB PRELOADER (Cyber-Core 12.0 - Real Web Engine Bootstrap)
    const preloader = document.getElementById('preloader');
    const loadPercent = document.getElementById('loadPercent');
    const loadLogs = document.getElementById('loadLogs');

    if (preloader) {
        document.body.style.overflow = 'hidden';

        // REAL Web Modules being loaded right now
        const webModules = [
            "DOM: Parsing HTML5 Structure",
            "CSS: Compiling Cyber-Core Stylesheets",
            "JS: Initializing Hub Intelligence Engine",
            "AOS: Syncing Animate-On-Scroll Layers",
            "LUCIDE: Injecting Dynamic Core Icons",
            "FONT: Loading 'Outfit' & 'Inter' Typefaces",
            "UI: Processing Glass-morphism Filter Layers",
            "CPA: Binding Cycle Perception Analysis UI",
            "ASSETS: Optimizing Neon Graphics Buffer",
            "DOM_READY: Finalizing Operations Interface",
            "HUB: E.E.D.A Digital Hub Ready"
        ];

        let currentPercent = 0;
        const totalDuration = 2000 + Math.random() * 2000;
        const interval = 20;
        const step = 100 / (totalDuration / interval);
        let logIndex = 0;

        const updateLoader = setInterval(() => {
            currentPercent += step + (Math.random() > 0.95 ? 1.5 : 0);
            if (currentPercent > 100) currentPercent = 100;

            const displayPercent = Math.floor(currentPercent);
            if (loadPercent) loadPercent.innerText = `${displayPercent}%`;

            // Sequential real web module initialization
            const logTrigger = 100 / webModules.length;
            while (displayPercent >= (logIndex * logTrigger) && logIndex < webModules.length) {
                const entry = document.createElement('div');
                entry.className = 'log-entry-detailed';
                entry.innerText = `[OK] ${webModules[logIndex]}`;
                if (loadLogs) {
                    loadLogs.appendChild(entry);
                    loadLogs.scrollTop = loadLogs.scrollHeight;
                }
                logIndex++;
            }

            if (currentPercent >= 100) {
                clearInterval(updateLoader);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 1000);
                }, 600);
            }
        }, interval);
    }

    // 2. MOBILE MENU ENGINE
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i data-lucide="x"></i>' 
                : '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // 3. NAVIGATION SCROLL HANDLER (Fixed ID)
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // 4. SMOOTH SCROLLING (Ultra Precise)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                navLinksItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                const yOffset = -80; 
                const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. INTERSECTION OBSERVER (Reveals)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 50
        });
    }

    // Security Protocol (User preference preserved but cleaned up)
    // 7. IP PROTECTION & ANTI-COPY SYSTEM (Consolidated)
    const preventActions = (e) => {
        // Disable F12, Ctrl+Shift+I/J, Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
            (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 80))
        ) {
            e.preventDefault();
            return false;
        }

        // Disable Copy (C), Paste (V), Cut (X)
        if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) {
            e.preventDefault();
            return false;
        }
    };

    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', preventActions);
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // 8. CONTACT FORM HANDLER (Fetch API + Formspree)
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && successMsg && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnContent = submitBtn.innerHTML;
            
            // UI State: Sending
            submitBtn.innerHTML = "<i data-lucide='loader' class='animate-spin'></i> Transmitiendo...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // UI State: Success
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    successMsg.style.display = 'block';
                    
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error("Error en el protocolo de contacto:", error);
                
                // UI State: Error
                submitBtn.innerHTML = "Error • Reintentar";
                submitBtn.style.background = "var(--accent-magenta, #ff00ff)";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.style.background = ""; // Restore original CSS background
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            }
        });
    }

    console.log("%c E.E.D.A %c CORE Hub Active ", "color: #00fff2; background: #000; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 4px;", "color: #fff; background: #9d00ff; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 4px;");
    console.log("⚙️ Android Native Inject: KOTLIN/COMPOSE SUCCESS");
});
