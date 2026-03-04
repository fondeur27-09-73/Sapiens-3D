import { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Spotlight({
    className,
    size = 400,
    springOptions = { bounce: 0, stiffness: 400, damping: 30 },
}) {
    const containerRef = useRef(null);

    const mouseX = useSpring(0, springOptions);
    const mouseY = useSpring(0, springOptions);

    const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
    const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

    useEffect(() => {
        // Initial position
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);

        const handleMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("pointermove", handleMove);
        return () => window.removeEventListener("pointermove", handleMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={containerRef}
            className={cn(
                'absolute top-0 left-0 rounded-full pointer-events-none',
                className
            )}
            style={{
                width: size,
                height: size,
                x: spotlightLeft,
                y: spotlightTop,
                zIndex: 10,
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.3) 60%, transparent 80%)',
                filter: 'blur(20px)',
            }}
        />
    );
}
