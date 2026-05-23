document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Sticky State
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }
    });

    // 2. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                const nav = document.querySelector('nav ul');
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            }
        });
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    if (mobileBtn && navUl) {
        mobileBtn.addEventListener('click', () => {
            const isShowing = navUl.classList.contains('show');
            
            if (isShowing) {
                navUl.style.display = 'none';
                navUl.classList.remove('show');
            } else {
                navUl.style.display = 'flex';
                navUl.style.flexDirection = 'column';
                navUl.style.position = 'absolute';
                navUl.style.top = '100%';
                navUl.style.left = '0';
                navUl.style.width = '100%';
                navUl.style.background = 'rgba(255, 255, 255, 0.98)';
                navUl.style.padding = '2rem';
                navUl.style.borderBottom = '1px solid var(--border)';
                navUl.style.boxShadow = 'var(--shadow-md)';
                navUl.classList.add('show');
            }
        });
    }

    // 4. ScrollSpy - Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    // 5. Lightbox functionality for gallery images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox when a gallery image is clicked
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
            lightbox.classList.add('show');
        });
    });

    // Close lightbox on close button click
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Close when clicking outside the image (on overlay)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // End of DOMContentLoaded
    });
