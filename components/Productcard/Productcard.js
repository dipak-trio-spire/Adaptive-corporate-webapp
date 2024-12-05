'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export function Productcard({ imageUrl, imageAlt, title, link, children }) {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className="productcard">
            {/* Optimized Image with Fallback */}
            <Image
                src={imageUrl || "/placeholder.jpg"}
                alt={imageAlt || "Product image"}
                width={500}
                height={500}
                priority={true} // Add if it's above-the-fold
            />

            {/* Title with Fallback */}
            <h3>{title || "Untitled"}</h3>

            {/* Children with Fallback */}
            <p>{children || "Description coming soon..."}</p>

            {/* Conditional Link Rendering */}
            {link && (
                <Link href={`/what-we-serve${link}`} className="ai-link">
                    Read More
                </Link>
            )}
        </div>
    );
}

export default Productcard;
