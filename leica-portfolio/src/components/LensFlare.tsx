"use client";

import { motion } from "framer-motion";

export default function LensFlare() {
    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen">
            {/* Ghost Artifact 1 - Hexagon (Purple/Blue) - Subtle */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 blur-sm"
                style={{
                    background: "radial-gradient(circle, rgba(180,180,255,0.3) 0%, transparent 70%)",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
                animate={{
                    x: [0, 20, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Ghost Artifact 2 - Small Circle (Orange/Red) */}
            <motion.div
                className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full blur-sm opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(255,100,50,0.3) 0%, transparent 70%)",
                    border: "1px solid rgba(255,200,100,0.2)",
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />
        </div>
    );
}
