const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🔵 CIRCLE CLASS
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// ✅ CREATE CIRCLES
const circles = [
    new Circle(canvas.width / 2, canvas.height / 2, 40, "#4fc3f7"), // Profile (center)
    new Circle(canvas.width / 2 - 150, canvas.height / 2 - 100, 25, "#ff7043"), // Skill 1
    new Circle(canvas.width / 2 + 120, canvas.height / 2 + 60, 25, "#81c784"), // Skill 2
    new Circle(canvas.width / 2 - 100, canvas.height / 2 + 130, 25, "#ba68c8"), // Skill 3
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all circles
    circles.forEach(circle => circle.draw(ctx));

    requestAnimationFrame(animate);
}

animate();