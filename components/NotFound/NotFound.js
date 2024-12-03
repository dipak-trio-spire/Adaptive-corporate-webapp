import React from "react";
import Image from "next/image";
import Link from "next/link";

export function NotFound() {
    return (
        <div className='sectiondivide whitesec p0i'>
            <div className="innercontent content404">
                <Image src="Assets/noconnection2.svg" width={880} height={300} />
                <div className="context">
                    <h1>We are very sorry for the inconvenience.</h1>
                    Oops! It looks like you’re trying to access a page that does not exist.
                </div>
            </div>
        </div>
    )
    }
export default NotFound;