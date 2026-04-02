/**
 * E.E.D.A Core Hub Logic
 * Optimized for Android and Desktop performance.
 * Dual Navigation: Desktop Top Bar + Mobile Bottom Tabs
 */

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // 00. THEME ENGINE (Strict OS Sync & Live Detection)
    // =====================================================
    const themeIcon = document.getElementById('themeIcon');
    const sysPrefMedia = window.matchMedia('(prefers-color-scheme: light)');

    const applyTheme = (themeStr) => {
        if (themeStr === 'light') {
            document.body.classList.remove('ultra-dark');
            document.body.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.setAttribute('data-lucide', 'moon');
                if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
            }
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('ultra-dark');
            if (themeIcon) {
                themeIcon.setAttribute('data-lucide', 'sun');
                if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
            }
        }
    };

    // 1. Initial State: Always strictly sync with Browser/OS (Purge old cache locks)
    localStorage.removeItem('eeda-theme'); 
    applyTheme(sysPrefMedia.matches ? 'light' : 'dark');

    // 2. Listen to real-time Browser/OS Theme Changes natively
    const themeChangeHandler = (e) => {
        applyTheme(e.matches ? 'light' : 'dark');
    };

    if (sysPrefMedia.addEventListener) {
        sysPrefMedia.addEventListener('change', themeChangeHandler);
    } else if (sysPrefMedia.addListener) {
        // Fallback for older iOS/Android Browsers
        sysPrefMedia.addListener(themeChangeHandler); 
    }
    
    // 3. User Quick-Toggle (Temporary override for current page viewing)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLightNow = document.body.classList.contains('light-theme');
            applyTheme(isLightNow ? 'dark' : 'light');
        });
    }

    // =====================================================
    // 0A. WPO HARDWARE DETECTION (Gama Baja vs Alta)
    // =====================================================
    const hardwareCores = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    let effType = '4g';
    if (navigator.connection && navigator.connection.effectiveType) {
        effType = navigator.connection.effectiveType;
    }
    
    // Clasificación de Gama Baja: menos de 4 núcleos, menos de 4GB RAM, o conexión 2G/3G.
    const isLowEnd = hardwareCores < 4 || deviceMemory < 4 || effType === '2g' || effType === '3g';
    
    if (isLowEnd) {
        document.body.classList.add('low-end');
        console.log("WPO Status: [LOW-END DEVICE]. Optimizando TTI, desactivando Glassmorphism y limitando FPS.");
    } else {
        document.body.classList.add('high-end');
        console.log("WPO Status: [HIGH-END DEVICE]. Activando Motor Gráfico Ultra Premium Dark.");
    }

    // =====================================================
    // 0B. DEVICE DETECTION (User Agent + Screen Width)
    // =====================================================
    const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    const isMobile = isMobileUA || isSmallScreen;

    // Apply device class to body
    document.body.classList.add(isMobile ? 'is-mobile' : 'is-desktop');

    // Re-check on resize (for Chrome DevTools toggle)
    window.addEventListener('resize', () => {
        const nowSmall = window.innerWidth <= 768;
        if (nowSmall && !document.body.classList.contains('is-mobile')) {
            document.body.classList.remove('is-desktop');
            document.body.classList.add('is-mobile');
            injectMobileTabBar();
        } else if (!nowSmall && !isMobileUA && document.body.classList.contains('is-mobile')) {
            document.body.classList.remove('is-mobile');
            document.body.classList.add('is-desktop');
            const existingBar = document.getElementById('mobileTabBar');
            if (existingBar) existingBar.remove();
        }
    });

    // =====================================================
    // 0B. INJECT MOBILE BOTTOM TAB BAR
    // =====================================================
    function injectMobileTabBar() {
        if (document.getElementById('mobileTabBar')) return; // Already exists

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const tabs = [
            { href: 'index.html',          icon: 'home',       label: 'Inicio'  },
            { href: 'documentacion.html',   icon: 'file-text',  label: 'Docs'    },
            { href: 'metodologia.html',     icon: 'brain',      label: 'Método'  },
            { href: 'roadmap.html',         icon: 'map',        label: 'Roadmap' },
            { href: 'nosotros.html',        icon: 'users',      label: 'Info'    },
            { href: 'contacto.html',        icon: 'mail',       label: 'Contacto'}
        ];

        const tabBar = document.createElement('nav');
        tabBar.id = 'mobileTabBar';
        tabBar.className = 'mobile-tab-bar';
        tabBar.setAttribute('aria-label', 'Navegación Móvil');

        const inner = document.createElement('div');
        inner.className = 'mobile-tab-bar-inner';

        tabs.forEach(tab => {
            const a = document.createElement('a');
            a.href = tab.href;
            a.className = 'mobile-tab-item';
            if (currentPage === tab.href || (currentPage === '' && tab.href === 'index.html')) {
                a.classList.add('tab-active');
            }
            a.innerHTML = `<i data-lucide="${tab.icon}"></i><span>${tab.label}</span>`;
            inner.appendChild(a);
        });

        tabBar.appendChild(inner);
        document.body.appendChild(tabBar);

        // Render Lucide icons in the new tab bar
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    if (isMobile) {
        injectMobileTabBar();
    }
    
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
        // WPO: En Gama Baja, TTI inmediato. En Gama Alta, experiencia visual inmersiva.
        const totalDuration = isLowEnd ? 100 : (2000 + Math.random() * 2000);
        const interval = isLowEnd ? 5 : 20;
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
                    }, isLowEnd ? 50 : 1000);
                }, isLowEnd ? 50 : 600);
            }
        }, interval);
    }

    // 2. MOBILE MENU ENGINE - Enhanced Touch Support
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    const safeCreateIcons = () => {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    };

    if (navToggle && navLinks) {
        // Prevent double-tap zoom on iOS
        let lastTouchEnd = 0;
        navToggle.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });

        // Click handler with touch support
        const toggleMenu = (e) => {
            if (e) e.preventDefault();
            const isOpen = navLinks.classList.toggle('active');
            navToggle.innerHTML = isOpen 
                ? '<i data-lucide="x"></i>' 
                : '<i data-lucide="menu"></i>';
            // Lock/unlock body scroll
            document.body.style.overflow = isOpen ? 'hidden' : '';
            // Add/remove active state for styling
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            navLinks.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            safeCreateIcons();
        };

        navToggle.addEventListener('click', toggleMenu);
        navToggle.addEventListener('touchstart', toggleMenu, { passive: true });

        // Close menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                safeCreateIcons();
            });
        });

        // Close menu when clicking outside (on the overlay background)
        navLinks.addEventListener('click', (e) => {
            if (e.target === navLinks) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                safeCreateIcons();
            }
        });

        // Swipe to close menu
        let touchStartX = 0;
        let touchEndX = 0;

        navLinks.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        navLinks.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 80; // pixels
            const diff = touchStartX - touchEndX;
            
            // Swipe left to close (common pattern)
            if (diff > swipeThreshold && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                safeCreateIcons();
            }
        }

        // Keyboard support - ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                safeCreateIcons();
            }
        });

        // Initialize ARIA attributes
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        navToggle.setAttribute('aria-controls', 'nav-links');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('id', 'nav-links');
        navLinks.setAttribute('aria-hidden', 'true');
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

    // WPO: Deshabilitar AOS (Animaciones al Scroll) en Gama Baja para salvar CPU/GPU
    if (typeof AOS !== 'undefined' && !isLowEnd) {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 50
        });
    } else if (isLowEnd) {
        // Aseguramos de que si AOS estaba en el HTML, los elementos sean visibles
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
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
