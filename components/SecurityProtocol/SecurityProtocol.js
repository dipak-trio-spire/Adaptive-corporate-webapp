import React from "react";
import Image from "next/image";
import Link from "next/link";

export function SecurityProtocol({title,children,imgsrc}) {
     return (
        <div className="SecurityProtocol">
            <Image src={imgsrc} width="100" height="100"></Image>
            <div className="context">
                <h3 className="sec-head">{title}</h3>
                <p>{children}</p>
            </div>
      </div>
     )
    }
export default SecurityProtocol;