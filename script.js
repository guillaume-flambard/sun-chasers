document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].classList.toggle('transform');
        spans[0].classList.toggle('rotate-45');
        spans[0].classList.toggle('translate-y-2');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('transform');
        spans[2].classList.toggle('-rotate-45');
        spans[2].classList.toggle('-translate-y-2');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].classList.remove('transform', 'rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('transform', '-rotate-45', '-translate-y-2');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.classList.remove('shadow-lg');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8', 'translate-y-4', 'translate-y-12');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.menu-item, .feature, .about-text, .contact-form, .contact-text, .hero-content');
    animateElements.forEach(el => {
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75');
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ☀️';
            submitBtn.classList.remove('bg-coral', 'hover:bg-sunset-orange');
            submitBtn.classList.add('bg-palm-green');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-palm-green', 'opacity-75');
                submitBtn.classList.add('bg-coral', 'hover:bg-sunset-orange');
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1000);
    });

    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        heroContent.classList.remove('opacity-0', 'translate-y-12');
        heroContent.classList.add('opacity-100', 'translate-y-0');
    }, 500);

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.beach-scene, .coffee-cup');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    const createBubble = () => {
        const bubble = document.createElement('div');
        bubble.className = 'absolute rounded-full pointer-events-none animate-pulse';
        bubble.style.cssText = `
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, 0.3);
            bottom: -10px;
            left: ${Math.random() * 100}%;
            animation: bubble-rise ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        return bubble;
    };

    const addBubbleAnimation = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bubble-rise {
                to {
                    transform: translateY(-100vh);
                    opacity: 0;
                }
            }
            .animate-spin-slow {
                animation: spin 10s linear infinite;
            }
        `;
        document.head.appendChild(style);
    };

    addBubbleAnimation();

    const hero = document.querySelector('#home');
    setInterval(() => {
        if (window.scrollY < window.innerHeight) {
            const bubble = createBubble();
            hero.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, 5000);
        }
    }, 2000);

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.classList.add('scale-95');
            setTimeout(() => {
                this.classList.remove('scale-95');
            }, 150);
            
            const platform = this.textContent.toLowerCase();
            alert(`Connect with Sun Chasers on ${platform}! 🌊☕`);
        });
    });

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('scale-105');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105');
        });
    });
});