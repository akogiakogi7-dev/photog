"use client";

import { motion } from "framer-motion";
import PhotoMetadata from "./PhotoMetadata";

interface FeaturedPhotoProps {
    src: string;
    alt: string;
    title?: string;
    metadata?: {
        aperture?: string;
        lens?: string;
        shutterSpeed?: string;
        iso?: string;
        camera?: string;
    };
}

export default function FeaturedPhoto({
    src,
    alt,
    title,
    metadata,
}: FeaturedPhotoProps) {
    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-sm">
                {/* Image */}
                <motion.div
                    className="aspect-[3/2] md:aspect-[16/9]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Leica Red accent on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-leica-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Photo Info */}
            <div className="mt-6">
                {title && (
                    <h3 className="font-serif text-lg md:text-xl tracking-wide mb-3">
                        {title}
                    </h3>
                )}
                {metadata && <PhotoMetadata {...metadata} />}
            </div>
        </motion.div>
    );
}

// Featured Photos Section
export function FeaturedPhotosSection() {
    const featuredPhotos = [
        {
            src: "/images/sample-1.jpg",
            alt: "静寂の森",
            title: "静寂の森",
            metadata: {
                aperture: "f/2.8",
                lens: "Summicron-M 35mm",
                shutterSpeed: "1/125s",
                iso: "ISO 200",
            },
        },
        {
            src: "/images/sample-2.jpg",
            alt: "朝霧の道",
            title: "朝霧の道",
            metadata: {
                aperture: "f/4",
                lens: "Summilux-M 50mm",
                shutterSpeed: "1/60s",
                iso: "ISO 400",
            },
        },
    ];

    return (
        <section className="space-luxury space-luxury-x">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-caption mb-4">Featured</p>
                    <h2 className="heading-section">厳選された作品</h2>
                </motion.div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {featuredPhotos.map((photo, index) => (
                        <FeaturedPhoto key={index} {...photo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
