document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';

    htmlElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    const rtlToggle = document.getElementById('rtl-toggle');
    const mobileRtlToggle = document.getElementById('mobile-rtl-toggle');
    
    const handleRtl = () => {
        const currentDir = htmlElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', newDir);
    };

    if (rtlToggle) rtlToggle.addEventListener('click', handleRtl);
    if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', handleRtl);

    // Theme Toggle Logic
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    const handleTheme = () => {
        const theme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) themeToggle.addEventListener('click', handleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', handleTheme);

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            // Change icon to X when open
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('reveal-visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Form Validation (Generic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
                form.reset();
            }
        });
    });

    // Password Visibility Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePassword.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
});
