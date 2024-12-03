import React from "react";
import Image from "next/image";
import Link from "next/link";

export function FeatureCard({ imageUrl, imageAlt, title, content, hreflink, isActive}) {
    const defaultClass = 'FeatureCard';
    const conditionalClass = isActive ? 'style2' : '';
    
     return (        
        <div className={`${defaultClass} ${conditionalClass}`}>
            <Image src={imageUrl} alt={imageAlt} width={64} height={64} />
            <h3>{title}</h3>
            {content && <p>{content}</p>}
        </div>
     )
    }
export default FeatureCard;

