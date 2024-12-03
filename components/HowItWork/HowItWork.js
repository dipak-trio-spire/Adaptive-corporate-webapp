import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HowItWork({ imageUrl, title, subheading }) {
     return (
        <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <p className="subhighlight">{subheading}</p>
            <h2>{title}</h2>
          </div>
          <div className="demoimg">
            <Image src={imageUrl} width="1920" height="600"></Image>
          </div>
        </div>
      </div>        
     )
    }
export default HowItWork;

