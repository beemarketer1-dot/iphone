document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Mobile Menu
    initMobileMenu();

    // 2. Initialize Hero Scroll Animation
    initHeroScroll();
    
    // 3. Initialize Design Scroll Animation (Titanium)
    initDesignScroll();

    // 4. Initialize Colors Scroll Animation (Finishes)
    initColorsScroll();
});

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

function initHeroScroll() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const frameCount = 240;
    const currentFrame = index => (
        `images/herosection/ezgif-frame-${index.toString().padStart(3, '0')}.png`
    );

    const images = [];
    let imagesLoaded = 0;
    
    // Set appropriate canvas dimensions
    canvas.width = 1920; 
    canvas.height = 1080;

    // Load images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
        
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) { // Draw the first frame fallback
                context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
            }
        };
    }

    const heroScroll = document.querySelector('.hero-scroll');
    const steps = document.querySelectorAll('.scroll-text');

    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let lastDrawnFrameIndex = -1;

    window.addEventListener('scroll', () => {
        if (!heroScroll) return;
        const rect = heroScroll.getBoundingClientRect();
        const scrollRange = heroScroll.offsetHeight - window.innerHeight;
        let scrollFraction = -rect.top / scrollRange;
        
        if (scrollFraction < 0) scrollFraction = 0;
        if (scrollFraction > 1) scrollFraction = 1;

        targetFrameIndex = Math.floor(scrollFraction * (frameCount - 1));
    }, { passive: true });

    function renderLoop() {
        // LERP for buttery smooth interpolation on mobile
        currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.08;
        
        if (currentFrameIndex < 0) currentFrameIndex = 0;
        if (currentFrameIndex > frameCount - 1) currentFrameIndex = frameCount - 1;

        const frameIndex = Math.round(currentFrameIndex);

        if (frameIndex !== lastDrawnFrameIndex) {
            if (images[frameIndex] && images[frameIndex].complete) {
                context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
                lastDrawnFrameIndex = frameIndex;
            }
        }
        
        steps.forEach((step, index) => {
            let isActive = false;
            let isPast = false;
            
            if (index === 0) {
                if (frameIndex >= 0 && frameIndex < 35) isActive = true;
                else if (frameIndex >= 35) isPast = true;
            } else if (index === 1) {
                if (frameIndex >= 45 && frameIndex < 85) isActive = true;
                else if (frameIndex >= 85) isPast = true;
            } else if (index === 2) {
                if (frameIndex >= 95 && frameIndex < 135) isActive = true;
                else if (frameIndex >= 135) isPast = true;
            } else if (index === 3) {
                if (frameIndex >= 145 && frameIndex < 185) isActive = true;
                else if (frameIndex >= 185) isPast = true;
            } else if (index === 4) {
                if (frameIndex >= 195) isActive = true;
            }
            
            if (isActive) {
                step.classList.add('active');
                step.classList.remove('inactive-up', 'inactive-down');
            } else if (isPast) {
                step.classList.remove('active', 'inactive-down');
                step.classList.add('inactive-up');
            } else {
                step.classList.remove('active', 'inactive-up');
                step.classList.add('inactive-down');
            }
        });
        
        requestAnimationFrame(renderLoop);
    }
    
    requestAnimationFrame(renderLoop);
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
}

function initDesignScroll() {
    const canvas = document.getElementById('design-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const frameCount = 240;
    const currentFrame = index => (
        `images/Design Section/ezgif-frame-${index.toString().padStart(3, '0')}.png`
    );

    const images = [];
    let imagesLoaded = 0;
    
    canvas.width = 1920; 
    canvas.height = 1080;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
        
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) { 
                context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
            }
        };
    }

    const designScroll = document.querySelector('#design');
    const steps = designScroll.querySelectorAll('.scroll-text');

    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let lastDrawnFrameIndex = -1;

    window.addEventListener('scroll', () => {
        if (!designScroll) return;
        const rect = designScroll.getBoundingClientRect();
        const scrollRange = designScroll.offsetHeight - window.innerHeight;
        let scrollFraction = -rect.top / scrollRange;
        
        if (scrollFraction < 0) scrollFraction = 0;
        if (scrollFraction > 1) scrollFraction = 1;

        targetFrameIndex = Math.floor(scrollFraction * (frameCount - 1));
    }, { passive: true });

    function renderLoop() {
        currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.08;
        
        if (currentFrameIndex < 0) currentFrameIndex = 0;
        if (currentFrameIndex > frameCount - 1) currentFrameIndex = frameCount - 1;

        const frameIndex = Math.round(currentFrameIndex);

        if (frameIndex !== lastDrawnFrameIndex) {
            if (images[frameIndex] && images[frameIndex].complete) {
                context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
                lastDrawnFrameIndex = frameIndex;
            }
        }
        
        steps.forEach((step, index) => {
            let isActive = false;
            let isPast = false;
            
            if (index === 0) {
                if (frameIndex >= 0 && frameIndex < 50) isActive = true;
                else if (frameIndex >= 50) isPast = true;
            } else if (index === 1) {
                if (frameIndex >= 65 && frameIndex < 115) isActive = true;
                else if (frameIndex >= 115) isPast = true;
            } else if (index === 2) {
                if (frameIndex >= 130 && frameIndex < 180) isActive = true;
                else if (frameIndex >= 180) isPast = true;
            } else if (index === 3) {
                if (frameIndex >= 195) isActive = true;
            }
            
            if (isActive) {
                step.classList.add('active');
                step.classList.remove('inactive-up', 'inactive-down');
            } else if (isPast) {
                step.classList.remove('active', 'inactive-down');
                step.classList.add('inactive-up');
            } else {
                step.classList.remove('active', 'inactive-up');
                step.classList.add('inactive-down');
            }
        });

        requestAnimationFrame(renderLoop);
    }
    
    requestAnimationFrame(renderLoop);
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
}

function initColorsScroll() {
    const canvas = document.getElementById('colors-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const frameCount = 240;
    const currentFrame = index => (
        `images/Colors section/ezgif-frame-${index.toString().padStart(3, '0')}.png`
    );

    const images = [];
    let imagesLoaded = 0;
    
    canvas.width = 1920; 
    canvas.height = 1080;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
        
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) { 
                context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
            }
        };
    }

    const colorsScroll = document.querySelector('#colors');
    const steps = colorsScroll.querySelectorAll('.scroll-text');

    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let lastDrawnFrameIndex = -1;

    window.addEventListener('scroll', () => {
        if (!colorsScroll) return;
        const rect = colorsScroll.getBoundingClientRect();
        const scrollRange = colorsScroll.offsetHeight - window.innerHeight;
        let scrollFraction = -rect.top / scrollRange;
        
        if (scrollFraction < 0) scrollFraction = 0;
        if (scrollFraction > 1) scrollFraction = 1;

        targetFrameIndex = Math.floor(scrollFraction * (frameCount - 1));
    }, { passive: true });

    function renderLoop() {
        // LERP for absolute silky smooth mobile scrubbing performance
        currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.08;
        
        if (currentFrameIndex < 0) currentFrameIndex = 0;
        if (currentFrameIndex > frameCount - 1) currentFrameIndex = frameCount - 1;

        const frameIndex = Math.round(currentFrameIndex);

        if (frameIndex !== lastDrawnFrameIndex) {
            if (images[frameIndex] && images[frameIndex].complete) {
                context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
                lastDrawnFrameIndex = frameIndex;
            }
        }
        
        steps.forEach((step, index) => {
            let isActive = false;
            let isPast = false;
            
            if (index === 0) {
                if (frameIndex >= 0 && frameIndex < 50) isActive = true;
                else if (frameIndex >= 50) isPast = true;
            } else if (index === 1) {
                if (frameIndex >= 65 && frameIndex < 115) isActive = true;
                else if (frameIndex >= 115) isPast = true;
            } else if (index === 2) {
                if (frameIndex >= 130 && frameIndex < 180) isActive = true;
                else if (frameIndex >= 180) isPast = true;
            } else if (index === 3) {
                if (frameIndex >= 195) isActive = true;
            }
            
            if (isActive) {
                step.classList.add('active');
                step.classList.remove('inactive-up', 'inactive-down');
            } else if (isPast) {
                step.classList.remove('active', 'inactive-down');
                step.classList.add('inactive-up');
            } else {
                step.classList.remove('active', 'inactive-up');
                step.classList.add('inactive-down');
            }
        });

        requestAnimationFrame(renderLoop);
    }
    
    requestAnimationFrame(renderLoop);
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
}
