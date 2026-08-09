// Ultra-Fast 60FPS Heart & Sparkle Explosion Engine
class FireworkSystem {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "fireworksCanvas";
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "999"; // Crisp layer
        this.canvas.style.opacity = "0.9";
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.rings = [];
        this.resize();
        window.addEventListener("resize", () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    explode(x, y) {
        const colors = ["#ff2a8d", "#ff007f", "#ffd700", "#ff65a3", "#e024c3", "#ffffff", "#a855f7"];
        const particleCount = 65;

        // Add expanding shockwave ring
        this.rings.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 90 + Math.random() * 40,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 5; // Initial explosive burst
            const shapeType = Math.random();

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - Math.random() * 3,
                size: Math.random() * 14 + 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.005 + 0.003, // Lingers gracefully for 4-5 seconds
                shape: shapeType > 0.35 ? "heart" : shapeType > 0.15 ? "star" : "dot",
                sway: Math.random() * 0.05 - 0.025
            });
        }
    }

    drawHeart(x, y, size) {
        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(x, y + topCurveHeight);
        this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        this.ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
        this.ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawStar(x, y, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            this.ctx.lineTo(0, -size);
            this.ctx.rotate(Math.PI / 4);
            this.ctx.lineTo(0, -size * 0.3);
            this.ctx.rotate(Math.PI / 4);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render expanding shockwave rings
        for (let i = this.rings.length - 1; i >= 0; i--) {
            const r = this.rings[i];
            r.radius += 4;
            r.alpha -= 0.03;

            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                this.rings.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = r.alpha * 0.7;
            this.ctx.strokeStyle = r.color;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }

        // Render particles (zero-lag native canvas vector rendering)
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx + Math.sin(p.y * 0.02) * 0.5; // Soft gentle flutter sway
            p.y += p.vy;
            p.vx *= 0.94; // Decelerate initial burst
            p.vy *= 0.94;
            p.vy += 0.06; // Soft gentle gravity drop
            p.alpha -= p.decay;
            p.size *= 0.997; // Stay clearly visible for a few seconds

            if (p.alpha <= 0 || p.size <= 1) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;

            if (p.shape === "heart") {
                this.drawHeart(p.x, p.y, p.size);
            } else if (p.shape === "star") {
                this.drawStar(p.x, p.y, p.size * 0.7);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        requestAnimationFrame(() => this.animate());
    }
}

window.fireworks = new FireworkSystem();

// Global helper for triggering instant, lag-free heart bursts
function triggerFireworks(x, y) {
    const posX = x || window.innerWidth / 2;
    const posY = y || window.innerHeight / 3;
    if (window.fireworks) {
        window.fireworks.explode(posX, posY);
    }
}

// Global click listener to trigger burst on interactive buttons
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.closest(".nextBtn") || target.closest(".flip-card") || target.closest(".redeem-btn") || target.closest("#giftBox") || target.closest("#waxSeal") || target.closest(".flame") || target.closest("#blowBtn") || target.closest("#pulseBtn")) {
            triggerFireworks(e.clientX, e.clientY);
        }
    });
});
