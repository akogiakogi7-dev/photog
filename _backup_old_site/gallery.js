/**
 * Photo Gallery - JavaScript
 * Features: Lightbox, Filtering, Lazy Loading, Keyboard Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const gallery = document.getElementById('gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const filterBtns = document.querySelectorAll('.nav-btn');

    let currentIndex = 0;
    let visibleItems = [...galleryItems];

    // ========================================
    // Image Lazy Loading with Intersection Observer
    // ========================================
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Create a new image to preload
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.classList.add('loaded');
                };
                tempImg.src = img.src;

                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    // Observe all gallery images
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            imageObserver.observe(img);
        }
    });

    // ========================================
    // Filter Functionality
    // ========================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden', 'fade-out');
                } else {
                    item.classList.add('fade-out');
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });

            // Update visible items array
            setTimeout(() => {
                visibleItems = [...galleryItems].filter(item => !item.classList.contains('hidden'));
            }, 350);
        });
    });

    // ========================================
    // Lightbox Functionality
    // ========================================
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const item = visibleItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.photo-title');

        // Use high-res version if available
        const fullSrc = img.dataset.full || img.src;

        // Add loading state
        lightboxImg.style.opacity = '0';

        // Preload image
        const tempImg = new Image();
        tempImg.onload = () => {
            lightboxImg.src = fullSrc;
            lightboxImg.alt = img.alt;
            lightboxImg.style.opacity = '1';
        };
        tempImg.src = fullSrc;

        lightboxCaption.textContent = title ? title.textContent : '';
        lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxContent();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxContent();
    }

    // Click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });

    // ========================================
    // Touch/Swipe Support for Mobile
    // ========================================
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }

    // ========================================
    // Image Protection (Basic Deterrent)
    // ========================================

    // Disable right-click context menu on images
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' ||
            e.target.closest('.gallery-item') ||
            e.target.closest('.lightbox')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable keyboard shortcuts for saving
    document.addEventListener('keydown', (e) => {
        // Disable Ctrl+S / Cmd+S
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I / Cmd+Option+I (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag on images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
});

