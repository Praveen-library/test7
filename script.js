document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.process-column');

    // Set up an Intersection Observer to detect when the section enters the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when at least 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slight delay before kicking off the cascade animation sequence
                setTimeout(() => {
                    animateSequence();
                }, 150);

                // Unobserve the section after triggering the animation once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe the process section grid container
    const section = document.querySelector('.process-grid');
    if (section) {
        observer.observe(section);
    }

    // Function to handle the sequentially staggered cascading animation
    function animateSequence() {
        columns.forEach((col, index) => {
            const lineProgress = col.querySelector('.line-progress');
            const cardWrapper = col.querySelector('.card-wrapper');

            // Stagger each column's animation by 350ms
            const stepDelay = index * 350;

            setTimeout(() => {
                // 1. Trigger the line progressing to fill up
                if (lineProgress) {
                    lineProgress.style.width = '100%';
                }

                // 2. Trigger the card to slide up and fade in shortly after line starts
                setTimeout(() => {
                    if (cardWrapper) {
                        cardWrapper.classList.add('visible');
                    }
                }, 250); // Small 250ms delay relative to the line drawing

            }, stepDelay);
        });
    }
});
