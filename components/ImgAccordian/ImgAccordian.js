import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";

const ImgAccordian = ({ tabData}) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex === activeTab ? null : tabIndex);
  };

  return (
    <div className="faqcon imgaccod">
      {tabData &&
        tabData.map((tab, index) => (
        <div key={index} className="faq">
        
          <h4 onClick={() => handleTabClick(index)} className={activeTab === index ? 'active' : ''}>
          {index + 1}. {tab.home_all_defense_title} <span>{activeTab === index ? '-' : '+'}</span>
          </h4>
          {activeTab === index && (
            <>
              <div className="content">
              <div dangerouslySetInnerHTML={{__html: tab?.home_all_defense_content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}} />{" "}
                {/* {tab.home_all_defense_image.link && <Link href={tab.home_all_defense_image.link} target="_blank"></Link>} */}
              </div>
              <div className="imgcon"><Image src={tab.home_all_defense_image} width="500" height="500" alt={tab.home_all_defense_title}/></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImgAccordian;