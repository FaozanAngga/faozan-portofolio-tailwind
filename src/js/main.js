// ================= TOGGLE MENU MOBILE =================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('max-h-96');

    if (isOpen) {
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        burgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-96', 'opacity-100');
        burgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

// Menutup menu mobile otomatis saat link diklik
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('max-h-96')) {
            toggleMenu();
        }
    });
});

// ================= HIGHLIGHT ACTIVE MENU ON SCROLL =================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('bg-indigo-600/20', 'text-indigo-400', 'border-indigo-500/30');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('bg-indigo-600/20', 'text-indigo-400', 'border-indigo-500/30');
        }
    });
});

// ================= ANIMASI TYPING NAMA =================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const name = "Faozan";

    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingElement) return;

        if (isDeleting) {
            typingElement.textContent = name.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = name.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === name.length) {
            typingSpeed = 5000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        typeEffect();
    }
});

// ================= ANIMASI TYPING PROFESI =================
document.addEventListener('DOMContentLoaded', () => {
    const roleElementDesktop = document.getElementById('typing-role');
    const roleElementMobile = document.getElementById('typing-role-mobile');

    const roles = ["Web Developer", "Frontend Developer", "Backend Developer", "Fullstack Developer"];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRoleEffect() {
        const currentRole = roles[roleIndex];
        const textToShow = isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        if (roleElementDesktop) roleElementDesktop.textContent = textToShow;
        if (roleElementMobile) roleElementMobile.textContent = textToShow;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 3000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeRoleEffect, speed);
    }

    if (roleElementDesktop || roleElementMobile) {
        typeRoleEffect();
    }
});

// ================= BACK TO TOP =================
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}