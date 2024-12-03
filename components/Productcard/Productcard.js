'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export function Productcard({ imageUrl, imageAlt, title, link, children }) {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <div className="productcard">
            <Image src={imageUrl} alt={imageAlt} width={500} height={500} />
            <h3>{title}</h3>
            <p>{children}</p>
            {
                link !== '' ? 
                <Link href={`/what-we-serve${link}`} className="ai-link">Read More</Link>
               : ""
            }
        </div>
    )
    }
export default Productcard;