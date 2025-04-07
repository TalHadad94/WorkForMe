const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sample drawing: background grid or placeholder circle
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();