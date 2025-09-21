    document.body.style.cursor = "url('girasol.png') 16 16, auto";
    const starsCanvas = document.getElementById('starsCanvas');
    const starsCtx = starsCanvas.getContext('2d');
    
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 200;
    
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
    
    window.addEventListener('resize', () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    });

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
        for (let i = 0; i < 50; i++) {
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

    setInterval(launchFirework, 800);

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });