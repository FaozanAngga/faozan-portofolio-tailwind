// <!-- ================= JAVASCRIPT TOGGLE BURGER NAV ================= -->
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu saat tombol burger diklik
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    burgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Otomatis menutup menu mobile saat salah satu link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) { // 768px = breakpoint 'md' Tailwind
            sidebar.classList.add('hidden');
            burgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
});

// Tambahkan di dalam main.js
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('bg-indigo-600', 'text-white', 'border-slate-700/50');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('bg-indigo-600', 'text-white');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const name = "Faozan";

    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            // Menghapus karakter satu per satu
            typingElement.textContent = name.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Mengetik karakter satu per satu
            typingElement.textContent = name.substring(0, charIndex + 1);
            charIndex++;
        }

        // Kecepatan standar mengetik (120ms) & menghapus (60ms)
        let typingSpeed = isDeleting ? 60 : 120;

        // 1. Jika nama "Faozan" sudah selesai diketik penuh
        if (!isDeleting && charIndex === name.length) {
            typingSpeed = 5000; // JEDA 5 DETIK sebelum mulai menghapus kembali
            isDeleting = true;
        }
        // 2. Jika nama sudah selesai dihapus total
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingSpeed = 500; // Jeda singkat (0.5 detik) sebelum mulai mengetik lagi
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        typeEffect();
    }
});

document.getElementById('back-to-top').addEventListener('click', function (e) {
    e.preventDefault(); // Mencegah loncatan instan bawaan browser

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Membuat scroll meluncur secara halus
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen desktop dan mobile
    const roleElementDesktop = document.getElementById('typing-role');
    const roleElementMobile = document.getElementById('typing-role-mobile');

    // Daftar profesi yang akan berganti-ganti
    const roles = ["Web Developer", "Frontend Developer", "Backend Developer", "Fullstack Developer"];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRoleEffect() {
        const currentRole = roles[roleIndex];
        const textToShow = isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        // Update teks di kedua elemen (jika ada)
        if (roleElementDesktop) roleElementDesktop.textContent = textToShow;
        if (roleElementMobile) roleElementMobile.textContent = textToShow;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // Kecepatan mengetik (100ms) & menghapus (50ms)
        let speed = isDeleting ? 50 : 100;

        // Jika kata sudah selesai diketik penuh
        if (!isDeleting && charIndex === currentRole.length) {
            speed = 3000; // JEDA 3 DETIK sebelum mulai menghapus
            isDeleting = true;
        }
        // Jika kata sudah selesai dihapus total
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Lanjut ke profesi berikutnya
            speed = 400; // Jeda sebentar sebelum mengetik kata baru
        }

        setTimeout(typeRoleEffect, speed);
    }

    if (roleElementDesktop || roleElementMobile) {
        typeRoleEffect();
    }
});

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            }
        }
    }
}