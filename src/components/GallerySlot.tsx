"use client";

import { motion } from "framer-motion";

export default function GallerySlot() {
    return (
        <section className="space-luxury space-luxury-x">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-caption mb-4">Gallery</p>
                    <h2 className="heading-section">作品集</h2>
                </motion.div>

                {/* Gallery Placeholder - Ready for iframe embed */}
                <motion.div
                    className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* 
            ================================================
            FUTURE GALLERY EMBED SLOT
            ================================================
            Replace this placeholder with your gallery iframe:
            
            <iframe 
              src="YOUR_GALLERY_URL" 
              className="w-full h-full border-0"
              title="Photo Gallery"
              loading="lazy"
            />
            ================================================
          */}

                    {/* Placeholder UI */}
                    <div className="absolute inset-0 glass flex flex-col items-center justify-center">
                        <div className="text-center">
                            <motion.div
                                className="w-16 h-16 mx-auto mb-6 rounded-sm border border-dark-text-secondary/20 flex items-center justify-center"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <svg
                                    className="w-8 h-8 text-dark-text-secondary/40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                            </motion.div>
                            <p className="text-caption">ギャラリー準備中</p>
                            <p className="text-xs text-dark-text-secondary/50 mt-2 tracking-wide">
                                Coming Soon
                            </p>
                        </div>
                    </div>

                    {/* Subtle corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-dark-text-secondary/10" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-dark-text-secondary/10" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-dark-text-secondary/10" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-dark-text-secondary/10" />
                </motion.div>
            </div>
        </section>
    );
}
