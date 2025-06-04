document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-grid-segments-container');

    // Helper to generate a random value within a range
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // --- ADJUSTABLE VALUES ---
    // Base density: Adjust this value to control overall line density across all screen sizes.
    // Higher value = more lines.
    const baseDensity = 0.0003; 
    
    // Variance for number of lines per reload (e.g., 0.15 means +/- 15% of calculated lines)
    const randomLineCountVariance = 0.15; 

    // Max cap for total lines (horizontal + vertical) to prevent overload on very large screens.
    const maxLinesCap = 400; 

    // Minimum number of lines guaranteed, even on very small screens, to maintain visual effect.
    const minGuaranteedLines = 25; // 25 horizontal + 25 vertical = 50 total minimum

    const lineThickness = 1.5; // Thickness of the lines in pixels
    const minLineLength = 40; // Minimum line segment length (percentage of viewport)
    const maxLineLength = 120; // Maximum line segment length (percentage of viewport)
    const minAnimationDuration = 5; // Min seconds for one full loop
    const maxAnimationDuration = 15; // Max seconds for one full loop
    // --- END ADJUSTABLE VALUES ---

    // Calculate a base number of lines responsive to screen area
    let calculatedBaseLines = (window.innerWidth * window.innerHeight) * baseDensity;

    // Apply random variance to the line count
    let numLines = Math.floor(calculatedBaseLines * randomRange(1 - randomLineCountVariance, 1 + randomLineCountVariance));

    // Ensure a minimum number of lines for visual effect even on tiny screens
    numLines = Math.max(numLines, minGuaranteedLines);

    // Ensure we don't exceed the total cap (cap applies to sum of H and V lines, so numLines is for *each* axis)
    numLines = Math.min(numLines, maxLinesCap / 2); // Divide by 2 because loop creates horizontal and vertical pairs


    // Clear any existing lines before creating new ones (good for re-runs during development)
    container.innerHTML = ''; 

    // Create Line Segments
    for (let i = 0; i < numLines; i++) { // Loop 'numLines' times to create a pair of lines (H & V)
        // Horizontal Line
        const hLine = document.createElement('div');
        hLine.classList.add('grid-segment', 'horizontal');
        hLine.style.height = `${lineThickness}px`;
        hLine.style.width = `${randomRange(minLineLength, maxLineLength)}vw`; // Random length in viewport width
        hLine.style.top = `${randomRange(0, 100)}vh`; // Random vertical position in viewport height
        hLine.style.left = `${randomRange(-maxLineLength, 100)}vw`; // Random horizontal start, potentially off-screen left

        // Apply random animation for individual movement
        const hDuration = randomRange(minAnimationDuration, maxAnimationDuration);
        const hDelay = randomRange(0, hDuration); // Random delay to offset starting points
        hLine.style.animation = `moveSegmentX ${hDuration}s linear infinite`;
        hLine.style.animationDelay = `-${hDelay}s`; // Negative delay starts animation in progress
        hLine.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse'; // Some move right, some left

        container.appendChild(hLine);

        // Vertical Line
        const vLine = document.createElement('div');
        vLine.classList.add('grid-segment', 'vertical');
        vLine.style.width = `${lineThickness}px`;
        vLine.style.height = `${randomRange(minLineLength, maxLineLength)}vh`; // Random length in viewport height
        vLine.style.left = `${randomRange(0, 100)}vw`; // Random horizontal position in viewport width
        vLine.style.top = `${randomRange(-maxLineLength, 100)}vh`; // Random vertical start, potentially off-screen top

        // Apply random animation for individual movement
        const vDuration = randomRange(minAnimationDuration, maxAnimationDuration);
        const vDelay = randomRange(0, vDuration);
        vLine.style.animation = `moveSegmentY ${vDuration}s linear infinite`;
        vLine.style.animationDelay = `-${vDelay}s`;
        vLine.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse'; // Some move down, some up

        container.appendChild(vLine);
    }
});