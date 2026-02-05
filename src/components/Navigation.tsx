"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/rua_star_gram/?hl=ja",
        icon: (
            <svg
                className="w-5 h-5"
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
                className="w-5 h-5"
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
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="flex items-center justify-between px-6 md:px-12 py-6">
                {/* Logo */}
                <motion.a
                    href="/"
                    className="font-serif text-xl tracking-extra-wide hover-leica"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Aru
                    <span className="text-leica-red ml-1">.</span>
                </motion.a>

                {/* Desktop Social Links - REMOVED per user request */}
                {/* 
                <motion.div
                    className="hidden md:flex items-center gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link group"
                            aria-label={link.name}
                        >
                            <span className="transition-transform duration-300 group-hover:scale-110">
                                {link.icon}
                            </span>
                            <span className="text-sm tracking-wide font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {link.name}
                            </span>
                        </a>
                    ))}
                </motion.div>
                */}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover-leica"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        {isMenuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="4" y1="17" x2="20" y2="17" />
                            </>
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    className="md:hidden glass mx-4 rounded-lg p-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <div className="flex flex-col gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link justify-start"
                            >
                                {link.icon}
                                <span className="text-sm tracking-wide">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    );
}
