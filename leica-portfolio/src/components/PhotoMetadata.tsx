"use client";

interface PhotoMetadataProps {
    aperture?: string;     // e.g., "f/2.8"
    lens?: string;         // e.g., "Summicron-M 35mm"
    shutterSpeed?: string; // e.g., "1/125s"
    iso?: string;          // e.g., "ISO 400"
    camera?: string;       // e.g., "Leica M11"
}

export default function PhotoMetadata({
    aperture,
    lens,
    shutterSpeed,
    iso,
    camera,
}: PhotoMetadataProps) {
    const items = [
        aperture && { label: "ƒ", value: aperture.replace("f/", "") },
        lens && { label: "", value: lens },
        shutterSpeed && { label: "", value: shutterSpeed },
        iso && { label: "ISO", value: iso.replace("ISO ", "") },
        camera && { label: "", value: camera },
    ].filter(Boolean) as { label: string; value: string }[];

    if (items.length === 0) return null;

    return (
        <div className="photo-meta">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                    {index > 0 && <span className="photo-meta-divider" />}
                    <span className="photo-meta-item">
                        {item.label && (
                            <span className="opacity-60">{item.label}</span>
                        )}
                        <span>{item.value}</span>
                    </span>
                </div>
            ))}
        </div>
    );
}

// Example usage component for demonstration
export function PhotoMetadataExample() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <p className="text-caption mb-4">Full Metadata</p>
                <PhotoMetadata
                    aperture="f/2.8"
                    lens="Summicron-M 35mm"
                    shutterSpeed="1/125s"
                    iso="ISO 400"
                    camera="Leica M11"
                />
            </div>

            <div>
                <p className="text-caption mb-4">Minimal</p>
                <PhotoMetadata
                    aperture="f/1.4"
                    lens="Noctilux 50mm"
                />
            </div>
        </div>
    );
}
