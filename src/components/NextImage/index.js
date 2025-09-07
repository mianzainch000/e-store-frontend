"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function NextImage({
    src,
    alt = "Image",
    fill = false,
    width,
    height,
    style,
    renderError,
    placeholder,
    priority,
    onLoad,
    ...rest
}) {
    const [error, setError] = useState(false);

    if (error && renderError) {
        return renderError();
    }

    return (
        <div
            style={{
                position: "relative",
                width: fill ? "100%" : (width || 200),   // ✅ auto fallback width
                height: fill ? (style?.height || 200) : (height || 200), // ✅ auto fallback height
            }}
        >
            <Image
                src={src}
                alt={alt}
                {...(fill
                    ? { fill: true }
                    : { width: width || 200, height: height || 200 })} // ✅ fallback sizes
                sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
                style={{
                    ...style,
                    objectFit: style?.objectFit || "cover",
                }}
                onError={() => setError(true)}
                placeholder={placeholder || "empty"}
                onLoad={onLoad}
                loading={priority ? "eager" : "lazy"}
                {...rest}
            />
        </div>
    );
}
