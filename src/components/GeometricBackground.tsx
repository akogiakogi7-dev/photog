"use client";

import { motion } from "framer-motion";

export default function GeometricBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* 1. Large Rotating Lens Circle (Top Right) - Increased Visibility */}
            <motion.div
                className="absolute -top-[10%] -right-[10%] w-[80vh] h-[80vh] rounded-full border border-white/10"
                style={{ borderWidth: "1.5px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner dashed circle - Increased Visibility */}
            <motion.div
                className="absolute -top-[5%] -right-[5%] w-[70vh] h-[70vh] rounded-full border border-dashed border-white/10"
                style={{ borderWidth: "1.5px" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            />

            {/* 2. Floating Frame (Bottom Left) - Increased Visibility */}
            <motion.div
                className="absolute bottom-[10%] left-[5%] w-[300px] h-[400px] border border-white/10"
                style={{ borderWidth: "1.5px" }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            {/* Inner frame detail */}
            <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[400px] border-l border-b border-t border-white/10 translate-x-4 translate-y-4" style={{ borderWidth: "1.5px" }} />


            {/* 3. Central Crosshairs/Grid Marks - More Distinct */}
            {/* Crosshair 1 */}
            <motion.div
                className="absolute top-1/3 left-1/4 w-8 h-8 flex items-center justify-center opacity-30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
            >
                <div className="absolute w-full h-[1.5px] bg-white" />
                <div className="absolute h-full w-[1.5px] bg-white" />
            </motion.div>

            {/* Crosshair 2 */}
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 flex items-center justify-center opacity-30"
                animate={{ opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            >
                <div className="absolute w-full h-[1.5px] bg-white" />
                <div className="absolute h-full w-[1.5px] bg-white" />
            </motion.div>

            {/* 4. Subtle Drifting Line - Brighter */}
            <motion.div
                className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
