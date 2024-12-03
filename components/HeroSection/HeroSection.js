import React from "react";
import Image from "next/image";
import Link from "next/link";
import Signup from "@/components/Signup/Sign-up";

export function HeroSection({  title,subtitle,content,hreflink,linktext,children,showSignupForm }) {
     return (
        <div className="sectiondivide section1 herosection">
        <div className="context">
          <p className="bannerhigh">
            {subtitle}
          </p>
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}} />
          {hreflink && linktext && 
          <Link className="button" href={hreflink} >
            {linktext}
          </Link>
        }
          {/* <Link className="button" href={hreflink} target="_blank">{linktext}</Link> */}
          {/* {showSignupForm && <Signup />}
          {hreflink && <Link className="button" href={hreflink}>{linktext}</Link>} */}
        </div>
        <div className="image">
          {children}
        </div>
      </div>
     )
    }
export default HeroSection;