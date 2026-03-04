import React, { useRef, useState, useEffect } from "react";

export const XRayText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const numParticles = 350;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 2 + 1
      });
    }

    let lastMousePos = { x: mousePosRef.current.x, y: mousePosRef.current.y };
    let mouseVelocity = { x: 0, y: 0 };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetMouseX = mousePosRef.current.x;
      const targetMouseY = mousePosRef.current.y;
      const hovered = isHoveredRef.current;

      mouseVelocity.x = targetMouseX - lastMousePos.x;
      mouseVelocity.y = targetMouseY - lastMousePos.y;
      lastMousePos = { x: targetMouseX, y: targetMouseY };

      const innerRadius = window.innerWidth < 768 ? 60 : 125;
      const outerFadeRadius = innerRadius + 60;

      particles.forEach((p) => {
        if (hovered && (Math.abs(mouseVelocity.x) > 0 || Math.abs(mouseVelocity.y) > 0)) {
          const dist = Math.hypot(p.x - targetMouseX, p.y - targetMouseY);
          if (dist < outerFadeRadius) {
            p.x += mouseVelocity.x * 0.05 * p.z;
            p.y += mouseVelocity.y * 0.05 * p.z;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        let opacity = 0;
        if (hovered) {
          const distFromMouse = Math.hypot(p.x - targetMouseX, p.y - targetMouseY);
          if (distFromMouse < innerRadius) {
            opacity = 1;
          } else if (distFromMouse < outerFadeRadius) {
            opacity = 1 - ((distFromMouse - innerRadius) / (outerFadeRadius - innerRadius));
          }
        }

        p.currentOpacity = opacity;

        if (opacity > 0.01) {
          ctx.beginPath();
          const particleRadius = p.baseRadius * (1 + p.z * 0.5);
          ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, " + (opacity * p.z) + ")";
          ctx.fill();
        }
      });

      const visibleParticles = particles.filter(p => p.currentOpacity > 0.01);

      for (let i = 0; i < visibleParticles.length; i++) {
        const p1 = visibleParticles[i];
        for (let j = i + 1; j < visibleParticles.length; j++) {
          const p2 = visibleParticles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 40) {
            const avgOpacity = (p1.currentOpacity + p2.currentOpacity) / 2;
            const lineOpacity = avgOpacity * (1 - dist / 40);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(255, 255, 255, " + lineOpacity + ")";
            ctx.lineWidth = 0.5 + (p1.z * 0.5);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setMousePos(newPos);
      mousePosRef.current = newPos;

      setIsHovered(true);
      isHoveredRef.current = true;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const radius = isHovered ? (window.innerWidth < 768 ? 60 : 125) : 0;

  const maskStyle = {
    maskImage: "radial-gradient(circle " + radius + "px at " + mousePos.x + "px " + mousePos.y + "px, transparent 100%, black 100%)",
    WebkitMaskImage: "radial-gradient(circle " + radius + "px at " + mousePos.x + "px " + mousePos.y + "px, transparent 100%, black 100%)"
  };

  const maskStyleHover = {
    maskImage: "radial-gradient(circle " + radius + "px at " + mousePos.x + "px " + mousePos.y + "px, black 100%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(circle " + radius + "px at " + mousePos.x + "px " + mousePos.y + "px, black 100%, transparent 100%)"
  };

  return (
    <div
      className={"relative inline-block " + className}
      ref={containerRef}
    >
      <div
        className="pointer-events-none transition-all duration-75 relative z-10"
        style={maskStyle}
      >
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-75 z-20 flex items-center justify-center overflow-visible"
        style={maskStyleHover}
      >
        <span
          className="text-transparent font-black tracking-tighter block relative z-10"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-30 pointer-events-none"
      />
    </div>
  );
};
