import React, { useRef, useEffect } from "react";

export const BlueprintParticles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let width, height;
        const mouse = { x: -1000, y: -1000 };
        const lerpMouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        class Particle {
            constructor(type) {
                this.type = type;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * 2;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = type === "bokeh" ? Math.random() * 6 + 3 : Math.random() * 2 + 1;
                this.baseAlpha = type === "bokeh" ? 0.15 : 0.4;
            }

            update() {
                this.x += this.vx + Math.sin(Date.now() * 0.0008 + this.z) * 0.15;
                this.y += this.vy + Math.cos(Date.now() * 0.0008 + this.z) * 0.15;

                const dx = this.x - lerpMouse.x;
                const dy = this.y - lerpMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const force = (250 - dist) / 250;
                    this.x += dx * force * 0.05;
                    this.y += dy * force * 0.05;
                }

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                const dx = this.x - lerpMouse.x;
                const dy = this.y - lerpMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const alphaBonus = dist < 200 ? (200 - dist) / 200 : 0;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * (1 + alphaBonus * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, " + (this.baseAlpha + alphaBonus * 0.4) + ")";
                ctx.fill();

                if (alphaBonus > 0.5) {
                    ctx.strokeStyle = "rgba(255, 255, 255, " + (alphaBonus * 0.15) + ")";
                    ctx.lineWidth = 0.5;
                    ctx.strokeRect(this.x - 5, this.y - 5, 10, 10);
                }
            }
        }

        const particles = [];
        for (let i = 0; i < 120; i++) {
            var type = "dust";
            if (i % 5 === 0) type = "bokeh";
            else if (i % 8 === 0) type = "spark";
            particles.push(new Particle(type));
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            lerpMouse.x += (mouse.x - lerpMouse.x) * 0.08;
            lerpMouse.y += (mouse.y - lerpMouse.y) * 0.08;

            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
            style={{ zIndex: 5 }}
        />
    );
};
