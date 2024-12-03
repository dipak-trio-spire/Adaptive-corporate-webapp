import React from "react";
import Image from "next/image";

export function ShieldCard({ 
    children, subheading, normaltext , ImageSRC
}) {
    return (
        <div className="sectiondivide ShieldCard">
            <div className="innercontent">
                <div className="ShieldCardhead">
                    <h2 dangerouslySetInnerHTML={{ __html: children}} />
                     {normaltext}
                    <p dangerouslySetInnerHTML={{ __html: subheading}} />
                </div>
                <div className="ShieldCardcon">
                { ImageSRC && 
                    ImageSRC?.map((img,i) => (
                        <div className="cardshield" key={i}>
                        <Image src={img} alt={img.title} width={500} height={500} />
                    </div>
                    ))
                }                    
                </div>
            </div>
        </div>
    );
}

export default ShieldCard;
