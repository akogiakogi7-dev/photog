"use client";

import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/rua_star_gram/?hl=ja",
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/@arurun-Q343",
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="2" y="4" width="20" height="16" rx="4" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "X",
        url: "https://x.com/arurunpaq343",
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center space-luxury-x overflow-hidden">
            {/* Content Container - Ensure high z-index to sit above fluid background */}
            <div className="text-center max-w-5xl mx-auto px-4 relative z-10">

                {/* Main Heading */}
                <motion.h1
                    className="heading-display mb-8 md:mb-12 text-4xl md:text-7xl lg:text-8xl tracking-tighter text-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    SMALL NEGATIVES,
                    <br />
                    LARGE IMAGES.
                </motion.h1>

                {/* Subtitle - Updated Text & Font */}
                <motion.div
                    className="font-shippori text-sm md:text-2xl font-medium text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-16 md:mb-20 tracking-widest text-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                >
                    <span className="block md:inline">ーライカを手に、</span>
                    <span className="block md:inline">日常の余白を切り取るー</span>
                </motion.div>

                {/* SNS Links - Prominent Placement */}
                <motion.div
                    className="flex items-center justify-center gap-6 md:gap-8 mb-20 md:mb-24 scale-90 md:scale-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                            aria-label={link.name}
                        >
                            <div className="p-3 md:p-4 rounded-full border border-light-text-secondary/20 dark:border-dark-text-secondary/20 bg-white/5 backdrop-blur-sm group-hover:bg-leica-red group-hover:border-leica-red group-hover:text-white transition-all duration-300 shadow-sm">
                                {link.icon}
                            </div>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                {link.name}
                            </span>
                        </a>
                    ))}
                </motion.div>

                {/* Scroll Indicator - Updated with Leica Red Accent */}
                <motion.div
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                >
                    <motion.div
                        className="w-px h-16 bg-gradient-to-b from-transparent via-leica-red to-transparent mx-auto"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
