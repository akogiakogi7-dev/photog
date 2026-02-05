"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import galleryData from "@/data/gallery.json";

type Category = "all" | "landscape" | "portrait" | "street";

export default function Gallery() {
    const [filter, setFilter] = useState<Category>("all");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Filter images
    const filteredImages = useMemo(() => {
        if (filter === "all") return galleryData;
        return galleryData.filter((img) => img.category === filter);
    }, [filter]);

    // Handle Lightbox Navigation
    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        const currentImage = filteredImages.find(img => img.id === selectedImageIndex);
        if (!currentImage) return;

        const currentIndex = filteredImages.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImageIndex(filteredImages[nextIndex].id);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        const currentImage = filteredImages.find(img => img.id === selectedImageIndex);
        if (!currentImage) return;

        const currentIndex = filteredImages.indexOf(currentImage);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImageIndex(filteredImages[prevIndex].id);
    };

    const selectedImage = selectedImageIndex !== null ? galleryData.find(img => img.id === selectedImageIndex) : null;

    return (
        <section className="space-luxury space-luxury-x" id="gallery">
            <div className="max-w-7xl mx-auto">
                {/* Header & Filter */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-caption mb-4">Gallery</p>
                        <h2 className="heading-section mb-8">作品集</h2>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {(["all", "landscape", "portrait", "street"] as Category[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${filter === cat
                                        ? "bg-white text-black font-medium"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Masonry Grid */}
                <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
                                onClick={() => setSelectedImageIndex(image.id)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    // Make sure Japanese paths don't break
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white text-lg font-serif italic">{image.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close Button */}
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Container */}
                        <div
                            className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={selectedImage.src}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                                onContextMenu={(e) => e.preventDefault()}
                            />

                            {/* Caption */}
                            <div className="absolute -bottom-10 left-0 w-full text-center">
                                <p className="text-white font-serif text-xl tracking-wide">{selectedImage.title}</p>
                            </div>

                            {/* Nav Buttons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors"
                            >
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors"
                            >
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
