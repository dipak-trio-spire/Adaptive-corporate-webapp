import React from "react";
import Image from "next/image";
import Link from "next/link";

export function UnderMaintainence() {
    return (
        <div className='sectiondivide whitesec p0i'>
            <div className="innercontent content404">
                <Image src="/Assets/noconnection2.svg" width={500} height={200} />
                <div className="context">
                    <h1>The Protection Calculator Tool is being upgraded, and temporarily unavailable.</h1>
                </div>
            </div>
        </div>
    )
    }
export default UnderMaintainence;