document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    // Increased threshold to 0.25 so elements wait a moment longer before revealing
    const observerOptions = {
        root: null,
        threshold: 0.25, 
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the bottom edge
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered vinyl delay
                if(entry.target.classList.contains('stat-vinyl')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.12}s`;
                }
                
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Unobserve to keep it visible once loaded
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
});