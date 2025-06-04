tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        'brand-bg': '#F0F4F8', // Very light cool gray (almost white)
        'brand-surface': '#FFFFFF', // White for card surfaces
        'brand-text': '#1E293B', // Dark slate blue for primary text
        'brand-subtle-text': '#475569', // Medium slate blue
        'brand-border': '#CBD5E1', // Light gray border
        'brand-accent1': '#0891B2', // Vibrant Cyan
        'brand-accent2': '#EC4899', // Vibrant Pink/Magenta
        'brand-accent3': '#F59E0B', // Amber/Bright Yellow
        'brand-glitch-shadow1': '#EC4899', // Pink/Magenta for glitch
        'brand-glitch-shadow2': '#0891B2', // Cyan for glitch
      },
    }
  }
}