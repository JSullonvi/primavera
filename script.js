document.body.style.cursor = "url('girasol.png') 16 16, auto";

// Touch device optimization: Hide custom cursor on touch
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.style.cursor = 'auto';
}

const starsCanvas = document.getElementById('starsCanvas');
const starsCtx = starsCanvas.getContext('2d');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

// Dynamic star count: Fewer on mobile for performance
const isMobile = window.innerWidth <= 768;
const starCount = isMobile ? 100 : 200;

const stars = [];
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function animateStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  
  starsCtx.fillStyle = 'black';
  starsCtx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);
  
  stars.forEach(star => {
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    starsCtx.fill();
    
    star.y += star.speed;
    
    if (star.y > starsCanvas.height) {
      star.y = 0;
      star.x = Math.random() * starsCanvas.width;
    }
  });
  
  requestAnimationFrame(animateStars);
}

animateStars();

const resizeHandler = () => {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  // Regenerate stars on resize
  stars.forEach(star => {
    star.x = Math.random() * starsCanvas.width;
  });
  // Update firework canvas too
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeHandler);
window.addEventListener('orientationchange', () => {
  setTimeout(resizeHandler, 100); // Delay for orientation change
}); // Added: Handles mobile rotation smoothly

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    // Fewer particles on mobile
    const particleCount = isMobile ? 30 : 50;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles.length === 0) {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.6;
  const colors = ["yellow", "gold", "orange", "white"];
  fireworks.push(new Firework(x, y, colors));
}

// Dynamic interval: Slower on mobile
const fireworkInterval = isMobile ? 1200 : 800;
setInterval(launchFirework, fireworkInterval);

animate();
