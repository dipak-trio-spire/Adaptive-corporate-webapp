import React from "react";
import Image from "next/image";
import Link from "next/link";

export function ComingSoon() {
    return (
        <div className='sectiondivide whitesec p0i'>
            <div className="innercontent content404">
                <Image src="Assets/comingsoon.svg" width={400} height={400} />
                <div className="context">
                    <h1>Stay tuned! The countdown has begun, and soon you’ll witness the dawn of a new era. Excitement awaits!</h1>
                    We’re thrilled to announce that a groundbreaking feature is on the horizon, poised to revolutionize your experience. While we prepare for its grand unveiling, our team of innovators is working tirelessly behind the scenes, meticulously crafting every detail to ensure perfection.
                    Get ready to be captivated by cutting-edge technology, enhanced functionality, and a seamless user interface. We can’t wait to share this game-changing addition with you, designed to elevate your interactions and make your time with us even more extraordinary.
                </div>
            </div>
        </div>
    )
    }
export default ComingSoon;