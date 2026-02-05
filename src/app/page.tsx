import {
    // FluidBackground, // Removed per user request
    Navigation,
    Hero,
    // GallerySlot, // Replaced with actual Gallery
    Gallery,
    Footer,
    GrainOverlay,
    PatternOverlay,
    // LensFlare, // Removed per user request
    GeometricBackground,
} from "@/components";

export default function Home() {
    return (
        <>
            {/* 1. Fluid Background (Base) - z: 0 (inside component style) */}
            {/* <FluidBackground /> Removed per user request */}
            <GeometricBackground />

            {/* 2. Geometric Pattern Overlay - z: 0 (bg pattern) */}
            <PatternOverlay />

            {/* 3. Film Grain Texture - z: 50 (top overlay) */}
            <GrainOverlay />

            {/* 4. Lens Flare & Ghosting - z: 30 (blended light effects) */}
            {/* <LensFlare /> Removed per user request */}

            {/* Navigation - z: 50 */}
            <Navigation />

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero />

                {/* Gallery Section */}
                <Gallery />
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
