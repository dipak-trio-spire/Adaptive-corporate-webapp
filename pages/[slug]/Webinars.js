import React, { useEffect, useState } from "react";
import { AllData } from "@/utils/fetchHelpers";
import { useRouter } from "next/router";
import Link from "next/link";
import PageLoader from "@/components/PageLoader/PageLoader";
import Head from "next/head";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const Webinars = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [WebinarsData, setWebinarsData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!slug) {
          setWebinarsData(null);
          return;
        }
        const fetchData = async () => {
          try {
            const initialContent = await AllData(slug);
            if (initialContent && initialContent.code !== "no_page") {
              setWebinarsData(initialContent.data);
            } else {
              setWebinarsData(null);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setWebinarsData(null);
          }finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [slug]);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York', // Convert to Eastern Time (ET)
          day: '2-digit', // 2-digit day
          month: 'short', // Short month (e.g., 'Nov')
          year: 'numeric', // Full year
          hour: '2-digit', // 2-digit hour
          minute: '2-digit', // 2-digit minute
          hour12: true, // 12-hour format with AM/PM
        }).format(date);
      };

  return (
    <>
    {
        loading &&  <PageLoader /> 
      }
      <Head>
        <title>{WebinarsData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={WebinarsData?.seo_meta.meta_title.replace(/&amp;/g, '&')}/>
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta
          property="og:description"
          content={WebinarsData?.seo_meta.meta_description.replace(/&amp;/g, '&')}
        />
        <meta
          property="og:image"
          content={
            process.env.NEXT_PUBLIC_WEBSITE_URL +
            "/Assets/Adaptive-Platform-Illustration.png"
          }
        />
        <meta
          name="keywords"
          content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
        />
      </Head>
         <div class="sectionhead subpage webinar-subhead">
            <h1>{WebinarsData?.banner_tilte}</h1>
        </div>
        <div class="webcontent">
            <div class="container ">
            {
                WebinarsData?.webinars_contents?.slice() 
                .reverse()?.map((val,i)=>  {
                    return (
                    <div class="web-main-content" key={i}>
                    <div class="title-web">
                        <p>
                            {val.webinars_title}
                        </p>
                        <div class="web-status">
                            <span class="color-Upcoming">{val.web_select_stauts}</span>
                        </div>
                    </div>
                    <div class="web-block-content">
                    <div
                        className="web-desc"
                        dangerouslySetInnerHTML={{
                            __html: val.webinars_descriptions
                        }}
                        />  
                        <div class="formPopup" id="formPopup-">
                            <div class="popupform-main">
                                <button class="closePopup">×</button>
                                
                                <h3>Kindly share your details</h3>
                                <p class="form-desc">We develop technologies to make high-end investment tools easy-to-use and cost-effective for advisors and clients, including tax-smart rebalancing and downside protection.</p>
                                <div
                                    class="wpcf7 js"
                                    id="wpcf7-f2937-o1"
                                    lang="en-US"
                                    dir="ltr"
                                >
                                    <div class="screen-reader-response">
                                        <p role="status" aria-live="polite" aria-atomic="true"></p>
                                        <ul></ul>
                                    </div>
                                    <form
                                        action="/webinars/#wpcf7-f2937-o1"
                                        method="post"
                                        class="wpcf7-form init"
                                        aria-label="Contact form"
                                        novalidate="novalidate"
                                        data-status="init"
                                    >
                                        <div >
                                            <input type="hidden" name="_wpcf7" value="2937"/>
                                            <input type="hidden" name="_wpcf7_version" value="5.9.8"/>
                                            <input type="hidden" name="_wpcf7_locale" value="en_US"/>
                                            <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f2937-o1"/>
                                            <input type="hidden" name="_wpcf7_container_post" value="0" />
                                            <input type="hidden" name="_wpcf7_posted_data_hash" value=""/>
                                        </div>
                                        <div class="popup-form">
                                            <p>
                                                <span class="wpcf7-form-control-wrap" data-name="text-212">
                                                    <input
                                                        size="40"
                                                        maxlength="400"
                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                                        aria-required="true"
                                                        aria-invalid="false"
                                                        placeholder="Your name*"
                                                        value=""
                                                        type="text"
                                                        name="text-212"
                                                    />
                                                </span>
                                                <br/>
                                                <span class="wpcf7-form-control-wrap" data-name="email-769">
                                                    <input
                                                        size="40"
                                                        maxlength="400"
                                                        class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                                                        aria-required="true"
                                                        aria-invalid="false"
                                                        placeholder="Email*"
                                                        value=""
                                                        type="email"
                                                        name="email-769"
                                                    />
                                                </span>
                                            </p>
                                            <div class="sub-btn">
                                                <p>
                                                    <input class="wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Submit"/>
                                                    <span class="wpcf7-spinner"></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="wpcf7-response-output" aria-hidden="true"></div>
                                    </form>
                                </div>
                             
                                <div class="youtubeContainer" >
                                    <p>Click on the link below to watch the video</p>
                                    <a href="" class="youtubeLink" target="_blank">Watch The Video</a>
                                </div>
                            </div>
                        </div>
                        <div class="web-buttton">
                            <Link href={val.webinars_button.url} target="_black" >{val.webinars_button.title}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_8_3096)">
                                        <path d="M10 0.5C4.7532 0.5 0.5 4.7646 0.5 10.0252C1.0004 22.6602 19.0014 22.6566 19.5 10.0252C19.5 4.7646 15.2466 0.5 10 0.5Z" stroke="#F1F1F1"></path>
                                        <path d="M15.657 12.7114C15.6468 13.2126 15.2452 13.3818 14.856 13.1044C14.1302 12.5964 13.4094 12.0814 12.6858 11.5706C12.6876 11.807 12.6844 12.3638 12.6856 12.606C12.6854 13.0552 12.4622 13.2738 12.0036 13.274L8.09639 13.2744C7.43439 13.2746 6.77259 13.2748 6.11059 13.274C4.85919 13.2726 4.01819 12.4528 4.01779 11.2338V7.39279C4.01779 6.93719 4.23399 6.72479 4.69779 6.72479C6.28799 6.75499 9.06639 6.72819 10.6254 6.72539C11.7304 6.72659 12.5298 7.41379 12.6634 8.42939C13.3946 7.91339 14.1228 7.39319 14.856 6.87979C15.1942 6.63439 15.6394 6.71319 15.657 7.27299C15.6618 9.03019 15.6676 10.9508 15.657 12.7114Z" fill="#F1F1F1"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8_3096">
                                            <rect width="20" height="20" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                            
                            <div class="web-date-time">
                        {/* {formatDate(val?.web_date_time) + '/ ET'}  */}
                                {dayjs(val?.web_date_time).format("DD MMM YYYY hh:mm A")} / ET
                            </div>
                        </div>
                    </div>
                </div>
                )
                } )
            }
            </div>
        </div>
    </>
  )
}

export default Webinars