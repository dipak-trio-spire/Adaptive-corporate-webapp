import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";
import PageLoader from "@/components/PageLoader/PageLoader";

const Blog = () => {
  const [BlogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const router = useRouter();
  const { slug } = router.query;

  const getBlogData = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`https://adaptive.rocket-wp.com/wp-json/wp/v2/posts`);
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const formatDate = (dateString) => {
    return dayjs(dateString).format("D. MMMM YYYY"); 
  };

  const filteredBlogs = BlogData.filter((blog) =>
    blog.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading && <PageLoader />}
      <div className="blog-post-content">
        <div className="sectionhead subpage blog-subpage">
          <h1 className="WhiteH1">Blog</h1>
        </div>
        <div className="sectiondivide vcolumn gap100">
          <div className="sec-pnews">
            <div className="sec-pnews-wrapper">
              <div className="sec-pnews-con">
                <h2 className="sec-title">Blogs</h2>
              </div>
              <div className="sec-pnews-serch">
                <div className="news-search-form">
                  <form className="search-form">
                    <label>
                      <span className="screen-reader-text">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 15L21 21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path
                            d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="#323232"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="search"
                        className="search-field"
                        placeholder="Search articles"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="blog-boxs">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((val, i) => (
                  <div className="blog-box" key={i}>
                    <div className="blog-img">
                      {/* Image can be added here */}
                    </div>
                    <div className="blog-text">
                      <div className="blog-title">
                        <Link href={`/company/${slug}/${val.id}`}>
                          <h3>{val.title.rendered}</h3>
                        </Link>
                      </div>
                      <div className="news-card-date">
                        <span>{val.author_name}</span>
                        <span>{formatDate(val.date)}</span>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: val.excerpt.rendered?.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                        }}
                      />
                      <Link className="button" href={`/company/${slug}/${val.id}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No blogs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
