import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, Element } from "react-scroll";
import PageLoader from "../PageLoader/PageLoader";

const slideDown = (element) => {
  if (!element) return;

  element.style.display = "block"; // Show the element
  element.style.maxHeight = "0"; // Start from zero height
  element.style.overflow = "hidden";
  element.style.transition = "max-height 0.5s ease";

  setTimeout(() => {
    element.style.maxHeight = element.scrollHeight + "px"; // Expand to full height
  }, 10); // Allow time for the CSS change to be recognized
};

const slideUp = (element) => {
  if (!element) return;

  element.style.maxHeight = element.scrollHeight + "px"; // Set current height before collapsing
  element.style.overflow = "hidden";
  element.style.transition = "max-height 0.5s ease";

  setTimeout(() => {
    element.style.maxHeight = "0px"; // Collapse to zero height
  }, 10);

  setTimeout(() => {
    element.style.display = "none"; // Hide the element after the transition
  }, 500); // Time matches transition duration
};

const FaqDetail = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [activeIndexes, setActiveIndexes] = useState({
    "getting-started": -1,
    "public-tools": -1,
  });

  const accordionRefs = useRef({});
  const sidebarRef = useRef(null);
  const [FaqData, setFaqData] = useState([]);

  const toggleAccordion = (category, index) => {
    setActiveIndexes((prevIndexes) => {
      const newIndexes = { ...prevIndexes };

      if (prevIndexes[category] === index) {
        slideUp(accordionRefs.current[`${category}-${index}`]);
        newIndexes[category] = -1; // Close the currently open item
      } else {
        if (prevIndexes[category] !== -1) {
          slideUp(accordionRefs.current[`${category}-${prevIndexes[category]}`]);
        }
        slideDown(accordionRefs.current[`${category}-${index}`]);
        newIndexes[category] = index; // Open the clicked item
      }

      return newIndexes;
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveIndexes({ "getting-started": -1, "public-tools": -1 });
    if (category === "getting-started") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }if (category === "public-tools") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } 
  };
  

  const getFaqData = async () => {
    try {
      setLoading(true); // Show loader before fetching data
      const response = await axios.get('https://adaptive.rocket-wp.com/wp-json/custom/v1/combined-faq-categories-with-posts');
      setFaqData(response.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    } finally {
      setLoading(false); // Hide loader after data is fetched
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  return (
    <>
    {
        loading &&  <PageLoader /> 
      }
  <div class="sectionhead subpage">
          <h1 className="WhiteH1">Adaptive Support</h1>
      </div>
    <div className="corporate-wrapper">
    <div className="corporate-sidebar" ref={sidebarRef}>
      <div className="tab">
        <input className="input-gray input-search" placeholder="Search" id="myInput" />
        <ul className="tab-header" id="categoryFilter">
          {FaqData.map((val) => (
            <li className="uniq-menu" key={val.term_id}>
              <div className="u-menu-name uniq_filter active" onClick={() => handleCategoryChange(val.slug)}>
                {val.name}
              </div>
              <ul className="sub-menu uniq-submenu list-unstyled mb-0" style={{ display: activeCategory === val.slug ? "block" : "none" }}>
                {val.children?.map((valChildren) => (
                  <li className="sub-item" key={valChildren.term_id}>
                    <Link
                      to={valChildren.slug}
                      smooth={true}
                      duration={500}
                      className="u-sub-menu-name"
                      style={{ cursor: "pointer" }}
                    >
                      {valChildren.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="corporate-content">
      <div className="adaptive-wrapper">
        {FaqData.map((val) => (
          <Element name={val.slug} key={val.term_id}> {/* Use Element here */}
            <div className="adaptive-main" style={{ display: activeCategory === val.slug ? "block" : "none" }}>
              <div className="accordion">
                {val.posts?.map((postdata, index) => (
                  <div className={`accordion__item ${activeIndexes[val.slug] === index ? "active" : ""}`} key={postdata.ID}>
                    <div className="accordion__header" onClick={() => toggleAccordion(val.slug, index)}>
                      <div className="accordion__title">{postdata.title}</div>
                      <div className="accordion__toggle"></div>
                    </div>
                    <div
                      ref={(el) => (accordionRefs.current[`${val.slug}-${index}`] = el)}
                      className={`accordion__content ${activeIndexes[val.slug] === index ? "active" : ""}`}
                    >
                      <p dangerouslySetInnerHTML={{ __html: postdata.content?.replace(/<p>/g, "").replace(/<\/p>/g, "") }} />
                    </div>
                  </div>
                ))}
              </div>
              
              {val.children?.map((children) => (
                <div id={children.slug} className="adaptive-child" key={children.term_id}>
                  <h2 className="adaptive-child-name">{children.name}</h2>
                  <div className="accordion">
                    {children.posts?.map((post) => (
                      <div className={`accordion__item ${activeIndexes[children.slug] === post.ID ? "active" : ""}`} key={post.ID}>
                        <div className="accordion__header" onClick={() => toggleAccordion(children.slug, post.ID)}>
                          <div className="accordion__title" dangerouslySetInnerHTML={{__html: post.title}}></div>
                          <div className="accordion__toggle"></div>
                        </div>
                        <div
                          ref={(el) => (accordionRefs.current[`${children.slug}-${post.ID}`] = el)}
                          className={`accordion__content ${activeIndexes[children.slug] === post.ID ? "active" : ""}`}
                        >
                          <p dangerouslySetInnerHTML={{ __html: post.content?.replace(/<p>/g, "").replace(/<\/p>/g, "") }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Element> // Close Element here
        ))}
      </div>
    </div>
  </div>
    </>
  );
};

export default FaqDetail;
