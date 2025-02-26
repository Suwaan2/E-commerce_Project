// script.js
window.addEventListener('scroll', function() {
    const productsSection = document.querySelector('#products');
    const position = productsSection.getBoundingClientRect();

    // Check if the section is in the viewport
    if (position.top < window.innerHeight && position.bottom >= 0) {
        productsSection.classList.add('animate');
    }
});