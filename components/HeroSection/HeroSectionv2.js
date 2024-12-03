import React from "react";
import Image from "next/image";
import Link from "next/link";
import Signup from "@/components/Signup/Sign-up";

export function HeroSectionv2({ title, content, pricing_banner_sub_text}) {
     return (
      <div class="sectiondivide section1 herosection HeroSectionv2 hero-sectionpricing">
            <div class="context">
                <h1>{title}</h1>
                <p>{content}</p>
                <h4 dangerouslySetInnerHTML={{__html : pricing_banner_sub_text}}></h4>
            </div>
        </div>
     )
    }
export default HeroSectionv2;