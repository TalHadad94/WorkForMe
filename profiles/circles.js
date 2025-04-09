// 🎨 Setup canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 🖼️ Resize canvas to fill the browser window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🔵 OrbitCircle class for orbiting behavior
class OrbitCircle {
  constructor(centerX, centerY, radius, orbitRadius, angle, speed, color, label = "") {
    this.centerX = centerX;       // Center of orbit (initially profile center)
    this.centerY = centerY;
    this.radius = radius;         // Size of the orbiting circle
    this.orbitRadius = orbitRadius; // Distance from the center circle
    this.angle = angle;           // Current angle in orbit (in radians)
    this.speed = speed;           // Orbit speed (radians per frame)
    this.color = color;           // Circle color
    this.label = label;           // Optional text label
    this.isHovered = false;       // For hover effect
  }

  update() {
    // Move in a circular path
    this.angle += this.speed;
    this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;
    this.draw(ctx);
  }

  draw(ctx) {
    // Draw circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.isHovered ? "#fff" : this.color;
    ctx.fill();
    ctx.closePath();

    // Label inside the circle
    if (this.label) {
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.label, this.x, this.y + 4);
    }

    // Optional hover text above the circle
    if (this.isHovered) {
      ctx.fillStyle = "#333";
      ctx.font = "bold 13px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`🟠 ${this.label}`, this.x, this.y - this.radius - 10);
    }
  }

  isHoveredOver(mx, my) {
    // Basic hit detection
    const dx = this.x - mx;
    const dy = this.y - my;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
}

// 🔵 Central static profile circle
const profile = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 48,
  color: "#4fc3f7",
  label: "Tal Hadad"
};

// 🟣 Orbiting skill circles
const orbitCircles = [
  new OrbitCircle(profile.x, profile.y, 25, 160, 0, 0.0003, "#ff7043", "JS"),
  new OrbitCircle(profile.x, profile.y, 25, 160, Math.PI * 0.66, 0.0003, "#81c784", "CSS"),
  new OrbitCircle(profile.x, profile.y, 25, 160, Math.PI * 1.33, 0.0003, "#ba68c8", "HTML"),
];

// 🖱️ Mouse hover detection
let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  orbitCircles.forEach(circle => {
    circle.isHovered = circle.isHoveredOver(mouse.x, mouse.y);
  });
});

// 👆 Click interactions
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Check if clicked on orbiting circle
  orbitCircles.forEach(circle => {
    if (circle.isHoveredOver(mouseX, mouseY)) {
      console.log(`Clicked on: ${circle.label}`);
    }
  });

  // Check if clicked on profile circle
  const dx = profile.x - mouseX;
  const dy = profile.y - mouseY;
  if (Math.sqrt(dx * dx + dy * dy) <= profile.radius) {
    window.location.href = "./users/tal_hadad/tal_hadad.html";
  }
});

// 🔗 Draw fading line connections between profile and orbiting circles
let frameCount = 0;
function drawConnections() {
    frameCount++;
    const alpha = 0.5 + Math.sin(frameCount * 0.01) * 0.5; // ⏳ Slower flicker
  
    orbitCircles.forEach(c => {
        const dx = c.x - profile.x;
        const dy = c.y - profile.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
    
        // Normalize direction
        const nx = dx / dist;
        const ny = dy / dist;

        // Trim ends to avoid overlap
        const startX = profile.x + nx * profile.radius;
        const startY = profile.y + ny * profile.radius;
        const endX = c.x - nx * c.radius;
        const endY = c.y - ny * c.radius;

        // Draw the connecting line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    });
}  

// 🔵 Draw the central profile circle
function drawProfileCircle() {
  ctx.beginPath();
  ctx.arc(profile.x, profile.y, profile.radius, 0, Math.PI * 2);
  ctx.fillStyle = profile.color;
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(profile.label, profile.x, profile.y + 4);
}

// 🎞️ Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear frame
  drawProfileCircle();
  drawConnections();
  orbitCircles.forEach(c => c.update());
  requestAnimationFrame(animate); // Repeat
}

animate();
