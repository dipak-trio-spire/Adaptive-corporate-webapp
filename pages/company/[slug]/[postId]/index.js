import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";
import axios from "axios";

const PostSlug = () => {
  const router = useRouter();
  const { slug, postId } = router.query;

  const [singleBlogData, setSingleBlogData] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filteredRelatedPosts, setFilteredRelatedPosts] = useState([]); // State for filtered related posts

  const getSingleBlogData = useCallback(async () => {
    if (postId) {
      const response = await axios.get(
        `https://adaptive.rocket-wp.com/wp-json/wp/v2/posts/${postId}`
      );
      setSingleBlogData(response.data);
      setFilteredRelatedPosts(response.data.related_posts || []); // Initialize filtered posts
    }
  }, [postId]);

  useEffect(() => {
    getSingleBlogData();
  }, [getSingleBlogData]);

  const date = dayjs(singleBlogData?.date);
  const formattedDate = date.format("MMMM D, YYYY");

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);

    // Filter related posts based on search input
    const filtered = singleBlogData?.related_posts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
    setFilteredRelatedPosts(filtered || []);
  };

  return (
    <>
      <div className="blog-post-content single">
        <div className="sectionhead subpage blog-subpage">
          <h1 className="WhiteH1">{singleBlogData?.title?.rendered}</h1>
        </div>
        <div className="sectiondivide vcolumn post-search-py">
          <ul className="news-meta-wrapper">
            <li className="news-meta-pudate">{singleBlogData?.author_name}</li>
            <li className="news-meta-ludate">{formattedDate}</li>
          </ul>
          <div
            className="demi-dec"
            dangerouslySetInnerHTML={{
              __html: singleBlogData?.content?.rendered,
            }}
          />
          <div className="sec-pnews">
            <div className="sec-pnews-wrapper">
              <div className="sec-pnews-con">
                <h2 className="sec-title">Related Posts</h2>
              </div>
              <div className="sec-pnews-serch">
                <div className="news-search-form">
                  <form
                    role="search"
                    method="get"
                    id="searchform-magazin"
                    className="search-form"
                    action="/"
                  >
                    <label>
                      <span className="screen-reader-text">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g strokeWidth="0"></g>
                            <g strokeLinecap="round" strokeLinejoin="round"></g>
                            <g>
                                <path d="M15 15L21 21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" strokeWidth="2"></path>
                            </g>
                        </svg>
                      </span>
                      <input
                        type="search"
                        className="search-field"
                        placeholder="Search articles"
                        value={searchInput}
                        onChange={handleSearchChange}
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="blog-boxs">
              {filteredRelatedPosts &&
                filteredRelatedPosts.map((val) => {
                  const date = dayjs(val?.date);
                  const formattedDate = date.format("MMMM D, YYYY");
                  return (
                    <div className="blog-box" key={val.id}>
                      <div className="blog-img">
                        {/* Image for the blog post */}
                      </div>
                      <div className="blog-text">
                        <div className="blog-title">
                          <Link href={`/company/${slug}/${val.id}`}>
                            <h3>{val.title}</h3>
                          </Link>
                        </div>
                        <div className="news-card-date">
                          <span>{val.author_name}</span>
                          <span>{formattedDate}</span>
                        </div>
                        <p>{val.excerpt}</p>
                        <Link href={`/company/${slug}/${val.id}`} className="button">
                          Read More
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSlug;
