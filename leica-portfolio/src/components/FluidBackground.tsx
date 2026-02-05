"use client";

import { useEffect, useRef } from "react";

interface Blob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
}

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let blobs: Blob[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initBlobs = () => {
            blobs = [];
            const numBlobs = 3; // Reduced for cleaner look (1 red + 2 blue-gray)

            for (let i = 0; i < numBlobs; i++) {
                // One distinctive Leica red blob, others blue-gray
                const isRed = i === 0;
                blobs.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.15, // Slower movement
                    vy: (Math.random() - 0.5) * 0.15,
                    radius: Math.random() * 300 + 400, // Much larger radius (400-700px)
                    hue: isRed ? 355 : 220 + Math.random() * 40,
                });
            }
        };

        const draw = () => {
            // Very transparent clear for trailing effect
            ctx.fillStyle = "rgba(13, 13, 13, 0.1)"; // Slightly more opaque to fade trails faster
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            blobs.forEach((blob) => {
                // Update position
                blob.x += blob.vx;
                blob.y += blob.vy;

                // Bounce off edges gently
                if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
                if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
                if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
                if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

                // Subtle hue shift
                if (blob.hue >= 350 || blob.hue <= 10) {
                    // Keep red blobs red
                    blob.hue += 0.05;
                    if (blob.hue > 360) blob.hue = 0;
                } else {
                    // Shift blue blobs
                    blob.hue += 0.01;
                    if (blob.hue > 260) blob.hue = 220;
                }

                // Draw blob with radial gradient
                const gradient = ctx.createRadialGradient(
                    blob.x,
                    blob.y,
                    0,
                    blob.x,
                    blob.y,
                    blob.radius
                );

                // Adjust saturation/lightness for red vs blue
                const isRed = blob.hue >= 350 || blob.hue <= 10;
                const saturation = isRed ? "80%" : "15%";
                const lightness = isRed ? "40%" : "20%";
                const opacity = isRed ? 0.06 : 0.08;

                gradient.addColorStop(0, `hsla(${blob.hue}, ${saturation}, ${lightness}, ${opacity})`);
                gradient.addColorStop(0.5, `hsla(${blob.hue}, ${isRed ? "70%" : "10%"}, ${isRed ? "30%" : "15%"}, ${opacity / 2})`);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        };

        resize();
        initBlobs();

        // Initial background fill
        ctx.fillStyle = "rgb(13, 13, 13)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        draw();

        window.addEventListener("resize", () => {
            resize();
            initBlobs();
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="fluid-bg-container fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    opacity: 0.8, // Slightly more visible since they are soft
                    filter: 'blur(100px)', // Heavy blur for "aurora" effect
                }}
            />
        </div>
    );
}
