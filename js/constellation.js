(function() {
    const container = document.getElementById('constellation-bg');
    let generated = false;

    // base colors from which to generate a random palette
    const baseColors = {
        light: '#0891B2', // --brand-accent1
        dark: '#00FF41'   // --brand-text (in dark mode)
    };

    // helper function to convert a hex color to an HSL array
    function hexToHsl(hex) {
        let r = parseInt(hex.substring(1, 3), 16) / 255;
        let g = parseInt(hex.substring(3, 5), 16) / 255;
        let b = parseInt(hex.substring(5, 7), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) { h = s = 0; } 
        else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    // this function can be called anytime to update glyph colors
    function recolorGlyphs() {
        if (!container) return;
        const isDarkMode = document.documentElement.classList.contains('dark');
        const baseHex = isDarkMode ? baseColors.dark : baseColors.light;
        const baseHsl = hexToHsl(baseHex);
        
        const glyphs = container.querySelectorAll('.tech-glyph');
        glyphs.forEach(glyph => {
            let [h, s, l] = baseHsl;
            h = h + (Math.random() * 0.1 - 0.05); // shift hue slightly
            l = l * (1 + (Math.random() * 0.4 - 0.2)); // shift lightness
            glyph.style.color = `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`;
        });
    }

    // main function to create the background
    function createConstellation() {
        if (!container || generated) return;
        generated = true;

        const iconClasses = [
            'fa-solid fa-robot', 'fa-solid fa-wrench', 'fa-solid fa-lightbulb',
            'fa-solid fa-gears', 'fa-solid fa-flask-vial', 'fa-solid fa-code'
        ];

        const density = 0.00008;
        const area = window.innerWidth * window.innerHeight;
        const iconCount = Math.floor(area * density);
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < iconCount; i++) {
            const glyph = document.createElement('i');
            const randomClasses = iconClasses[Math.floor(Math.random() * iconClasses.length)];
            glyph.className = `tech-glyph ${randomClasses}`;
            
            glyph.style.top = `${Math.random() * 100}%`;
            glyph.style.left = `${Math.random() * 100}%`;
            glyph.style.fontSize = `${Math.random() * 26 + 10}px`;
            glyph.style.opacity = Math.random() * 0.25 + 0.05;
            const rotation = Math.random() * 90 - 45;
            glyph.style.transform = `rotate(${rotation}deg)`;
            fragment.appendChild(glyph);
        }

        container.appendChild(fragment);
        recolorGlyphs(); // color the glyphs on initial creation

        if (window.FontAwesome) {
            FontAwesome.dom.i2svg();
        }
    }

    // Expose the recolor function globally so theme.js can call it
    window.recolorConstellation = recolorGlyphs;

    // run the creation logic on page load
    document.addEventListener('DOMContentLoaded', createConstellation);
})();