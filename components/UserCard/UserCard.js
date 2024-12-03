import React from "react";
import Image from "next/image";
import Link from "next/link";

export function UserCard({ imageUrl, imageAlt, title, link, children }) {
     return (
        <div className="usercard">
            <Image src={imageUrl} alt={imageAlt} width={300} height={300} />
            <div className="userinfo">
                <div className="designation">
                    <h3>{title}</h3>
                    <p>{children}</p>
                </div>
                {link && <Link href={link} target="_blank"><Image width={40} height={40} src="/Assets/u_linkedin.svg"></Image></Link>}
            </div>
        </div>
     )
    }
export default UserCard;