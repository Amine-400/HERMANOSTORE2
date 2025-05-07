let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 5000);




const canvas = document.getElementById("energy-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".sections").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let lines = [];
for (let i = 0; i < 60; i++) {
    lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 100,
        speed: Math.random() * 2 + 1,
        angle: Math.PI / 4, // 45°
        width: Math.random() * 2 + 0.5
    });
}

function animateLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FFD700";
    for (let line of lines) {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
            line.x + Math.cos(line.angle) * line.length,
            line.y + Math.sin(line.angle) * line.length
        );
        ctx.lineWidth = line.width;
        ctx.globalAlpha = 0.4;
        ctx.stroke();

        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x > canvas.width || line.y > canvas.height) {
            line.x = Math.random() * canvas.width;
            line.y = -50;
        }
    }
    requestAnimationFrame(animateLines);
}
animateLines();