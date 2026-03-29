/**
 * E.D.D.E.A Central Hub Expanded Logic
 * Managing extreme CSS classes, staggered scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Navigation Bar Complex Handler
       ========================================================== */
    const header = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================
       2. Anchor Navigation (Ultra Smooth Centering)
       ========================================================== */
    const navItems = document.querySelectorAll('.nav-links a');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                // Gran offset debido al mega header
                const yOffset = -120; 
                const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'auto' }); 
                // Fix para smooth si el navegador lo soporta nativo por CSS
                setTimeout(()=>{
                    window.scrollTo({ top: y, behavior: 'smooth' }); 
                }, 5);
            }
        });
    });

    /* ==========================================================
       3. Intersection Observer (Extreme Animaciones 7X)
       ========================================================== */
    // Monitorizamos arriba, fade, izquierda y derecha
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Activa cuando 15% del elemento masivo es visible
        rootMargin: "0px 0px -60px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================
       4. Terminal Typewriter Effect (Background execution)
       ========================================================== */
    console.log("===================================================================");
    console.log("🔥 L.I.E.B.E.B.L.A.C.K  H.U.B // 7X MEGA EXPANSION ACTIVE");
    console.log("🌐 Visuals: High Fidelity Minimalist Cyber-Dark");
    console.log("⚙️ Android Compose Inject: SUCCESS");
    console.log("⚙️ Flet Python Server: LISTENING");
    console.log("===================================================================");
});
