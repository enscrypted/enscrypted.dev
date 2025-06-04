const glitchTargets = document.querySelectorAll('.glitch-target');
let activeGlitchTimeout = null;

function triggerRandomGlitch() {
  glitchTargets.forEach(el => {
    el.classList.remove('is-glitching');
  });
            
  if (activeGlitchTimeout) {
    clearTimeout(activeGlitchTimeout);
  }

  const randomTarget = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
  randomTarget.classList.add('is-glitching');

  const glitchDuration = Math.random() * 300 + 200; // Random duration between 0.4s and 0.9s

  activeGlitchTimeout = setTimeout(() => {
    randomTarget.classList.remove('is-glitching');
  }, glitchDuration);
}

const startRandomInterval = () => {
  const interval = Math.random() * 5000 + 3000; // Every 3-8 seconds
  setInterval(triggerRandomGlitch, interval);
};

triggerRandomGlitch(); // Initial glitch
startRandomInterval();