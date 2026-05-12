document.addEventListener('DOMContentLoaded', () => {
    // Intro Screen Logic
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        // Prevent scrolling while intro is active
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            introScreen.classList.add('hidden');
            // Re-enable scrolling
            document.body.style.overflow = '';
            
            // Remove from DOM after transition completes to clean up
            setTimeout(() => {
                introScreen.remove();
            }, 800);
        }, 2800); // 2.8 seconds before starting to hide
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link switching on scroll
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ─── Services Carousel ───────────────────────────────────────────
    const track   = document.getElementById('svc-track');
    const prevBtn = document.getElementById('svc-prev');
    const nextBtn = document.getElementById('svc-next');

    if (track && prevBtn && nextBtn) {
        const cards = Array.from(track.querySelectorAll('.svc-card'));
        const GAP   = 19; // px — matches CSS gap: 1.2rem ≈ 19px
        let idx = 0;

        function visible() {
            if (window.innerWidth <= 600)  return 1;
            if (window.innerWidth <= 992)  return 2;
            return 3;
        }

        function cardW() {
            return cards[0].getBoundingClientRect().width + GAP;
        }

        function maxIdx() {
            return Math.max(0, cards.length - visible());
        }

        function slide() {
            track.style.transform = `translateX(-${idx * cardW()}px)`;
            prevBtn.disabled = idx === 0;
            nextBtn.disabled = idx >= maxIdx();
        }

        prevBtn.addEventListener('click', () => { if (idx > 0)        { idx--; slide(); } });
        nextBtn.addEventListener('click', () => { if (idx < maxIdx()) { idx++; slide(); } });
        window.addEventListener('resize', () => { idx = Math.min(idx, maxIdx()); slide(); });

        // Staggered entrance
        const trackObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                cards.forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 110));
                trackObs.disconnect();
            }
        }, { threshold: 0.15 });
        trackObs.observe(track);

        slide();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
