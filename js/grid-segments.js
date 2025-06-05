document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-grid-segments-container');

    // Helper to generate a random value within a range
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // --- Configurable Parameters ---
    const baseDensity = 0.0001; 
    const randomLineCountVariance = 0.15; 
    const maxLinesCap = 200; 
    const minGuaranteedLines = 30; 
    
    const lineThickness = 1.75;
    
    const minLineLength = 40;
    const maxLineLength = 120;
    const minAnimationDuration = 5;
    const maxAnimationDuration = 15;
    // --- End Configurable Parameters ---

    let calculatedBaseLines = (window.innerWidth * window.innerHeight) * baseDensity;
    let numLines = Math.floor(calculatedBaseLines * randomRange(1 - randomLineCountVariance, 1 + randomLineCountVariance));

    numLines = Math.max(numLines, minGuaranteedLines);
    numLines = Math.min(numLines, maxLinesCap / 2);

    container.innerHTML = ''; 

    for (let i = 0; i < numLines; i++) {
        const hLine = document.createElement('div');
        hLine.classList.add('grid-segment', 'horizontal');
        hLine.style.height = `${lineThickness}px`;
        hLine.style.width = `${randomRange(minLineLength, maxLineLength)}vw`;
        hLine.style.top = `${randomRange(0, 100)}vh`;
        hLine.style.left = `${randomRange(-maxLineLength, 100)}vw`;

        const hDuration = randomRange(minAnimationDuration, maxAnimationDuration);
        const hDelay = randomRange(0, hDuration);
        hLine.style.animation = `moveSegmentX ${hDuration}s linear infinite`;
        hLine.style.animationDelay = `-${hDelay}s`; 
        hLine.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';

        container.appendChild(hLine);

        const vLine = document.createElement('div');
        vLine.classList.add('grid-segment', 'vertical');
        vLine.style.width = `${lineThickness}px`;
        vLine.style.height = `${randomRange(minLineLength, maxLineLength)}vh`;
        vLine.style.left = `${randomRange(0, 100)}vw`;
        vLine.style.top = `${randomRange(-maxLineLength, 100)}vh`;

        const vDuration = randomRange(minAnimationDuration, maxAnimationDuration);
        const vDelay = randomRange(0, vDuration);
        vLine.style.animation = `moveSegmentY ${vDuration}s linear infinite`;
        vLine.style.animationDelay = `-${vDelay}s`; 
        vLine.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';

        container.appendChild(vLine);
    }
});