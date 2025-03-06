// components/ClientImage.tsx
"use client"; // Mark this as a Client Component

import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

interface ClientImageProps {
    path: string;
    alt: string;
    className?: string;
}

export default function ClientImage({ path, alt, className }: ClientImageProps) {
    return (
        <IKImage
            path={path}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={alt}
            fill
            className={className}
            loading="lazy"
            lqip={{ active: true }}
        />
    );
}