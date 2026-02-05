"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-16 space-luxury-x border-t border-dark-text-secondary/10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <motion.div
                        className="font-serif text-xl tracking-extra-wide"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Aru
                        <span className="text-leica-red ml-1">.</span>
                    </motion.div>

                    {/* Credits */}
                    <motion.div
                        className="text-caption text-center md:text-right"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p>© {currentYear} Aru Photography</p>
                        <p className="mt-1 opacity-60">Shot with Leica</p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
