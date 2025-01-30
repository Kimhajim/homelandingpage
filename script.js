let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const chevronLeft = document.querySelector('.chevron-left');
const chevronRight = document.querySelector('.chevron-right');

// Debounce optimization for handling frequent events like resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateSlider();
    }, 200); // Adjust delay as needed
});

// Function to update the slider position
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Function to change the slide
function changeSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Function to go to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Chevron Button Click Event
chevronLeft.addEventListener('click', prevSlide);
chevronRight.addEventListener('click', changeSlide);

// Auto-change slide every 3 seconds
let lastExecution = 0;
setInterval(() => {
    let now = Date.now();
    if (now - lastExecution > 1000) { // Ensure the slide change isn't too frequent
        changeSlide();
        lastExecution = now;
    }
}, 3000);

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    if (touchStartX - touchEndX > 100) {
        changeSlide(); // Swipe left
    }
    if (touchEndX - touchStartX > 100) {
        prevSlide(); // Swipe right
    }
}

document.querySelector('.banner-slider').addEventListener('touchstart', handleTouchStart);
document.querySelector('.banner-slider').addEventListener('touchend', handleTouchEnd);

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookie');

    // Check if the user already accepted cookies
    if (!localStorage.getItem('cookieAccepted')) {
        cookieBanner.style.display = 'block'; // Show the banner if not accepted yet
    }

    acceptButton.addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', 'true'); // Store in localStorage to remember the user
        cookieBanner.style.display = 'none'; // Hide the banner when accepted
    });
});

document.querySelector('#menuToggle').addEventListener('click', function() {
    const menu = document.querySelector('#menuContent');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    menu.style.display = isExpanded ? 'none' : 'block';
});

