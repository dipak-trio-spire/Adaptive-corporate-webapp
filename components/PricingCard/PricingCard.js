import React from "react";
import Image from 'next/image'
import Link from "next/link";
const PricingCard = ({
mostPopulerplan,
icon,
title,
BTNlink,
price,
discount,
trialText,
userMonth,
content,
listing,
}) => {
  return (
    <div className={` pricecardshield ${mostPopulerplan === true ? 'Popular' : ''}`}>
    {
        mostPopulerplan === true &&  <div className="popular-tag"><span>Most Popular</span></div>
    }
      <div className={`card-content-investor`}>
        <div className="top-heading-in">
          <div className="in-icon">
            <Image src={icon} alt="investor-icon" role="img" width={30} height={30} />
          </div>

          <h3>{title}</h3>
        </div>
        <div className="price-listing">
          <div className="price-top">
            <p className="price-number">{price}</p>
            <div className="web-tag">
              <span>{discount}</span>
            </div>
          </div>
          <div className="price-btm">
            <p>{userMonth}</p>
          </div>
        </div>
        {/* <div className="cardshield-content">
          <p>
            {content}
          </p>
        </div> */}
        <Link className="button card-btn" target={BTNlink.target} href={BTNlink.url}>
          {BTNlink.title}
        </Link>
      </div>
      <div className="highlight-text">
        <div className="line-left"></div>
        <p>{trialText}</p>
        <div className="line-right"></div>
      </div>
      <div className="marking-list">
      <div dangerouslySetInnerHTML={{ __html: listing}} />
      </div>
    </div>
  );
};

export default PricingCard;
