const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🟡 CIRCLE CLASS WITH MOTION
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2; // random velocity X
        this.vy = (Math.random() - 0.5) * 2; // random velocity Y
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
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
}

// Create animated circles (Profile will be static)
const circles = [
    new Circle(canvas.width / 2, canvas.height / 2, 40, "#4fc3f7"), // Profile (will be frozen)
    new Circle(canvas.width / 2 - 150, canvas.height / 2 - 100, 25, "#ff7043"),
    new Circle(canvas.width / 2 + 120, canvas.height / 2 + 60, 25, "#81c784"),
    new Circle(canvas.width / 2 - 100, canvas.height / 2 + 130, 25, "#ba68c8"),
];

// OPTIONAL: freeze the first circle (profile)
circles[0].vx = 0;
circles[0].vy = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const threshold = 150; // max distance to connect

    // Connect close circles
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            const c1 = circles[i];
            const c2 = circles[j];

            const dx = c1.x - c2.x;
            const dy = c1.y - c2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < threshold) {
                ctx.beginPath();
                ctx.moveTo(c1.x, c1.y);
                ctx.lineTo(c2.x, c2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / threshold})`; // fade by distance
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    // Update all circles
    circles.forEach(circle => circle.update(canvas));

    requestAnimationFrame(animate);
}

animate();