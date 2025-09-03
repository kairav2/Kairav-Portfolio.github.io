document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Header scroll behavior
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    header.style.transform = 'translateY(0)';
    lastScrollTop = scrollTop;
  });
});


// Smooth scroll and active link management
const links = document.querySelectorAll('header nav a, .mobile a');
const sections = document.querySelectorAll('section[id], main[id]');

// Function to update active link based on scroll position
function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active states
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll functionality
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = 80; // Account for fixed header
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after click
            if (window.innerWidth <= 720) {
                mobileMenu.style.display = 'none';
            }
            
            // Update active link immediately
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Section reveal on scroll with enhanced timing
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;
    
    reveals.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            // Add staggered animation delay
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // trigger on load

// Enhanced typing animation setup
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#element', {
            strings: ['Python Programmer', 'Data Enthusiast', 'The Observer', 'Problem Solver'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 720 && 
        mobileMenu.style.display === 'block' && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        mobileMenu.style.display = 'none';
    }
});

// Add year to footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Enhanced hover effects for navigation
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        // Add subtle sound effect class (can be used with CSS transitions)
        this.classList.add('hover-active');
    });
    
    link.addEventListener('mouseleave', function() {
        this.classList.remove('hover-active');
    });
});

// Parallax effect for hero elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const heroArt = document.querySelector('.hero-art');
    if (heroArt) {
        heroArt.style.transform = `translateY(${rate}px)`;
    }
});

// ===== ADVANCED SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal, .reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-scale, .reveal-rotate, .reveal-flip, .reveal-elastic');

// Different animation types for sections
const sectionAnimations = [
    'reveal-fade-up',
    'reveal-fade-left', 
    'reveal-scale',
    'reveal-fade-right',
    'reveal-flip'
];

// Apply different animations to sections
document.querySelectorAll('section').forEach((section, index) => {
    if (!section.classList.contains('reveal')) {
        const animationType = sectionAnimations[index % sectionAnimations.length];
        section.classList.add('reveal', animationType);
    }
});

// Enhanced reveal function with staggered animations
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = revealPoint;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add staggered delay based on element index
            setTimeout(() => {
                el.classList.add('active');
                
                // Add entrance animation class
                if (Math.random() > 0.5) {
                    el.classList.add('entrance-bounce');
                } else {
                    el.classList.add('entrance-slide');
                }
            }, index * 150); // Increased stagger timing
        }
    });
    
    // Animate child elements within sections
    document.querySelectorAll('.active .card, .active .about-item, .active .t').forEach((item, index) => {
        if (!item.classList.contains('stagger-animated')) {
            setTimeout(() => {
                item.classList.add(`stagger-${Math.min(index + 1, 6)}`);
                item.classList.add('stagger-animated');
            }, index * 100);
        }
    });
}

// ===== PAGE TRANSITION ANIMATIONS =====
function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = `
        <div class="page-transition-content">
            <div class="transition-loader"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(transition);
    return transition;
}

// Simulate page transitions for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (Math.random() > 0.7) { // 30% chance for transition effect
            e.preventDefault();
            
            const transition = createPageTransition();
            transition.classList.add('active');
            
            setTimeout(() => {
                // Scroll to target
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Remove transition
                setTimeout(() => {
                    transition.classList.remove('active');
                    setTimeout(() => {
                        transition.remove();
                    }, 500);
                }, 800);
            }, 600);
        }
    });
});

// ===== MICROINTERACTIONS =====
// Button ripple effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple class
        this.classList.add('ripple');
        
        // Remove class after animation
        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600);
    });
});

// Enhanced card interactions
document.querySelectorAll('.card').forEach(card => {
    // Add hover sound effect (visual feedback)
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // Click animation
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Enhanced input interactions
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('input-focused');
    });
    
    // Typing animation effect
    input.addEventListener('input', function() {
        this.style.transform = 'scale(1.01)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Chip click animations
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// ===== LOADING ANIMATIONS =====
// Simulate content loading
function simulateContentLoading() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Add loading state
        card.classList.add('content-loading');
        
        // Add skeleton loading to images
        const images = card.querySelectorAll('img');
        images.forEach(img => {
            img.style.display = 'none';
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton';
            skeleton.style.height = '200px';
            skeleton.style.marginBottom = '10px';
            img.parentNode.insertBefore(skeleton, img);
            
            // Simulate image loading
            setTimeout(() => {
                skeleton.remove();
                img.style.display = 'block';
                img.classList.add('fade-in');
            }, 1000 + (index * 200));
        });
        
        // Remove loading state
        setTimeout(() => {
            card.classList.remove('content-loading');
            card.classList.add('content-loaded');
        }, 800 + (index * 100));
    });
}

// ===== FLOATING ANIMATIONS =====
// Add floating animations to random elements
document.querySelectorAll('.hero-art, .about-card').forEach((element, index) => {
    if (index % 2 === 0) {
        element.classList.add('float');
    } else {
        element.classList.add('float-delayed');
    }
});

// ===== SCROLL-BASED ANIMATIONS =====
let ticking = false;

function updateAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Parallax effects
    const heroArt = document.querySelector('.hero-art');
    if (heroArt) {
        heroArt.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
    }
    
    // Rotate elements based on scroll
    const logoMark = document.querySelector('.logo-mark');
    if (logoMark) {
        logoMark.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// ===== ENHANCED FORM HANDLING =====
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state with animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Add loading dots animation
        submitBtn.innerHTML = 'Sending<span class="loading-dots"></span>';
        submitBtn.disabled = true;
        submitBtn.classList.add('pulse-loader');
        
        // Simulate form submission with success animation
        setTimeout(() => {
            submitBtn.textContent = '✓ Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #29e3a1, #00d084)';
            
            // Success feedback
            form.style.transform = 'scale(0.98)';
            setTimeout(() => {
                form.style.transform = '';
            }, 200);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('pulse-loader');
                submitBtn.style.background = '';
            }, 2000);
        }, 2000);
    });
}

// ===== TIMELINE CLICK INTERACTIONS =====
document.querySelectorAll('.t').forEach(timelineItem => {
    timelineItem.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateX(20px) scale(1.05)';
        this.style.background = 'linear-gradient(135deg, rgba(91, 140, 255, 0.1) 0%, rgba(138, 91, 255, 0.1) 100%)';
        
        // Reset after animation
        setTimeout(() => {
            this.style.transform = '';
            this.style.background = '';
        }, 300);
    });
});

// ===== SKILLS ANIMATION =====
document.querySelectorAll('.skill').forEach((skill, index) => {
    skill.addEventListener('click', function() {
        // Add pulse animation
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.6s ease';
        }, 10);
    });
    
    // Stagger skill appearance
    setTimeout(() => {
        skill.style.opacity = '1';
        skill.style.transform = 'translateY(0)';
    }, index * 100);
});

// Initialize skills as hidden for staggered animation
document.querySelectorAll('.skill').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'all 0.5s ease';
});

// ===== INTERSECTION OBSERVER FOR PERFORMANCE =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`; /* reduced delay for faster effect */
                entry.target.classList.add('in-viewport'); /* Ensure this is here if not already */
                entry.target.style.animation = 'card-entrance-effect 0.8s ease-in-out forwards';
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.card, .about-item, .t, .skill').forEach(el => {
    observer.observe(el);
});

// Initialize content loading simulation
setTimeout(simulateContentLoading, 1000);