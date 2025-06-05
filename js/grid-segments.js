document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-grid-segments-container');

    // Helper to generate a random value within a range
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // --- ADJUSTABLE VALUES ---
    // Base density: Adjust this value to control overall line density across all screen sizes.
    const baseDensity = 0.0003; 
    
    // Variance for number of lines per reload (e.g., 0.15 means +/- 15% of calculated lines)
    const randomLineCountVariance = 0.15; 

    // Max cap for total lines (horizontal + vertical) to prevent overload on very large screens.
    const maxLinesCap = 400; 

    // Minimum number of lines guaranteed, even on very small screens, to maintain visual effect.
    const minGuaranteedLines = 25; 

    const lineThickness = 1.5; // Thickness of the lines in pixels
    const minLineLength = 40; // Minimum line segment length (percentage of viewport)
    const maxLineLength = 120; // Maximum line segment length (percentage of viewport)
    const minAnimationDuration = 5; // Min seconds for one full loop
    const maxAnimationDuration = 15; // Max seconds for one full loop

    // NEW: Number of unique animation variants to pre-define as CSS classes
    const numAnimationVariants = 50; // Generate 50 different animation styles
    // --- END ADJUSTABLE VALUES ---

    // Calculate a base number of lines responsive to screen area
    let calculatedBaseLines = (window.innerWidth * window.innerHeight) * baseDensity;

    // Apply random variance to the line count
    let numLines = Math.floor(calculatedBaseLines * randomRange(1 - randomLineCountVariance, 1 + randomLineCountVariance));

    // Ensure a minimum number of lines for visual effect even on tiny screens
    numLines = Math.max(numLines, minGuaranteedLines);

    // Ensure we don't exceed the total cap (numLines is for *each* axis, so total lines = numLines * 2)
    numLines = Math.min(numLines, maxLinesCap / 2); 


    // --- DYNAMICALLY GENERATE ANIMATION CSS CLASSES ---
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    
    const animationClassNames = []; // Store the names of generated classes

    for (let i = 0; i < numAnimationVariants; i++) {
        const duration = randomRange(minAnimationDuration, maxAnimationDuration);
        const delay = randomRange(0, duration); // Delay is random within the duration for smooth looping
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        
        // Generate class names for horizontal and vertical variations
        const classH = `anim-h-variant-${i}`;
        const classV = `anim-v-variant-${i}`;
        
        animationClassNames.push({ h: classH, v: classV });

        // Add CSS rules for horizontal movement
        styleSheet.sheet.insertRule(`
            .${classH} {
                animation: moveSegmentX ${duration}s linear infinite;
                animation-delay: -${delay}s;
                animation-direction: ${direction};
            }
        `, styleSheet.sheet.cssRules.length);

        // Add CSS rules for vertical movement
        styleSheet.sheet.insertRule(`
            .${classV} {
                animation: moveSegmentY ${duration}s linear infinite;
                animation-delay: -${delay}s;
                animation-direction: ${direction};
            }
        `, styleSheet.sheet.cssRules.length);

        // If animation-direction is 'reverse', we need to apply the specific reverse keyframes
        // This is done via CSS, the JS just sets the 'animation-direction' property.
        // The reverse keyframes in style.css are already defined.
    }
    // --- END DYNAMIC CSS GENERATION ---


    // Clear any existing lines before creating new ones (good for re-runs during development)
    container.innerHTML = ''; 

    // Create Line Segments
    for (let i = 0; i < numLines; i++) {
        // Randomly pick an animation variant for this pair of lines
        const variantIndex = Math.floor(randomRange(0, numAnimationVariants));
        const selectedVariant = animationClassNames[variantIndex];

        // Horizontal Line
        const hLine = document.createElement('div');
        hLine.classList.add('grid-segment', 'horizontal', selectedVariant.h); // Assign generated animation class
        hLine.style.height = `${lineThickness}px`;
        hLine.style.width = `${randomRange(minLineLength, maxLineLength)}vw`; 
        hLine.style.top = `${randomRange(0, 100)}vh`; 
        hLine.style.left = `${randomRange(-maxLineLength, 100)}vw`; 
        
        // No direct style.animation = ... anymore, it's done via CSS class

        container.appendChild(hLine);

        // Vertical Line
        const vLine = document.createElement('div');
        vLine.classList.add('grid-segment', 'vertical', selectedVariant.v); // Assign generated animation class
        vLine.style.width = `${lineThickness}px`;
        vLine.style.height = `${randomRange(minLineLength, maxLineLength)}vh`; 
        vLine.style.left = `${randomRange(0, 100)}vw`; 
        vLine.style.top = `${randomRange(-maxLineLength, 100)}vh`; 

        // No direct style.animation = ... anymore, it's done via CSS class

        container.appendChild(vLine);
    }
});