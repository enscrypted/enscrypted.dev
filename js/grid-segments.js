document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-grid-segments-container');
    
    // --- Helper function (MUST be defined before its first use) ---
    const randomRange = (min, max) => Math.random() * (max - min) + min;
    // --- END Helper function ---

    // --- ADJUSTABLE VALUES ---
    // Number of lines: Randomize between 125 and 200 each load
    const minTotalLines = 125;
    const maxTotalLines = 200;
    const numLines = Math.floor(randomRange(minTotalLines, maxTotalLines)); // This will be the number of horizontal AND vertical lines

    const lineThickness = 1.5; // Thickness of the lines in pixels (unchanged, for visual clarity)

    // Line Lengths: Make them longer on average, allowing some to exceed viewport
    const minLineLength = 40; // Minimum line segment length (e.g., 40% of viewport)
    const maxLineLength = 120; // Maximum line segment length (e.g., 120% of viewport, so lines can be longer than the screen)

    // Animation Speed: Already set to faster in previous step, keep it this way
    const minAnimationDuration = 5; // Min seconds for one full loop
    const maxAnimationDuration = 15; // Max seconds for one full loop
    // --- END ADJUSTABLE VALUES ---

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