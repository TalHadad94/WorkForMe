const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🎯 Circle Class with draw and update
class Circle {
  constructor(x, y, radius, color, label = "") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.label = label;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.isHovered = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.isHovered ? "#fff" : this.color;
    ctx.fill();
    ctx.closePath();

    // Optional label
    if (this.label) {
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.label, this.x, this.y + 4);
    }
  }

  update(canvas) {
        // Move
    this.x += this.vx;
    this.y += this.vy;

        // Bounce off walls
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.vx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.vy *= -1;
    }

        // Redraw
    this.draw(ctx);
  }

  isClicked(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
}

// 🌐 Circles data
const circles = [
  new Circle(canvas.width / 2, canvas.height / 2, 40, "#4fc3f7", "Profile"),
  new Circle(canvas.width / 2 - 150, canvas.height / 2 - 100, 25, "#ff7043", "JS"),
  new Circle(canvas.width / 2 + 120, canvas.height / 2 + 60, 25, "#81c784", "CSS"),
  new Circle(canvas.width / 2 - 100, canvas.height / 2 + 130, 25, "#ba68c8", "HTML"),
];

// Freeze profile circle
circles[0].vx = 0;
circles[0].vy = 0;

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  circles.forEach((circle) => {
    if (circle.isClicked(mouseX, mouseY)) {
      console.log(`Clicked on: ${circle.label || "Unnamed Circle"}`);
      // You can add animation or open modal later here
      circle.isHovered = true;
      setTimeout(() => (circle.isHovered = false), 300); // reset highlight
    }
  });
});

function drawConnections() {
  const threshold = 150;
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const c1 = circles[i];
      const c2 = circles[j];
      const dx = c1.x - c2.x;
      const dy = c1.y - c2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) {
        ctx.beginPath();
        ctx.moveTo(c1.x, c1.y);
        ctx.lineTo(c2.x, c2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / threshold})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  circles.forEach((circle) => circle.update(canvas));
  requestAnimationFrame(animate);
}

animate();
