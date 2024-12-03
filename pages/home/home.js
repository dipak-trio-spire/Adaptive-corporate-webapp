import React, { useState, useEffect } from "react";
import Image from 'next/image';
import AddUser from "@/components/AddUser/AddUser";
import PageLoader from '@/components/PageLoader/PageLoader'; // Assuming this is the loader component
import Productcard from "@/components/Productcard/Productcard";
import ShieldCard from "@/components/ShieldCard/ShieldCard";
import HeroSection from "@/components/HeroSection/HeroSection";
import Collapsible from "@/components/Collapsible/Collapsible";
import ImgAccordian from "@/components/ImgAccordian/ImgAccordian";
import SecurityProtocol from "@/components/SecurityProtocol/SecurityProtocol";
import Link from "next/link";
import Head from 'next/head';
import axios from "axios";
import { html } from "d3";
import { BackupOutlined } from "@mui/icons-material";

export default function Home() {
  const [HomePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const fetchHomeData = async () => {
    try {
      const response = await axios.get('https://adaptive.rocket-wp.com/wp-json/custom/v1/page-acf-data?slug=home');
      
      setHomePageData(response.data); // The result is in response.data with Axios
    } catch (error) {
      console.error('Error fetching content data', error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <>
      <Head>
        <title>{HomePageData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={HomePageData?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={HomePageData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      {
        loading &&  <PageLoader /> 
      }
      <HeroSection
        title={HomePageData?.home_banner_sub_title}
        subtitle={HomePageData?.home_banner_main_title}
        content={HomePageData?.home_banner_content}
        hreflink={HomePageData?.home_banner_button?.url}
        linktext={HomePageData?.home_banner_button?.title}
        showSignupForm="True"
      >
      {HomePageData?.home_banner_image && (
        <Image src={HomePageData?.home_banner_image} width="630" height="400" alt="Banner Image" />
            )}
      </HeroSection>

      {/* What We Do Section */}
      <div className="sectiondivide vcolumn gap100" id="section1">
        <div className="featureview context">
          <div className="sectiontitle">
          {
            HomePageData?.home_what_we_do_sub_title &&
            <p className="subhighlight">{HomePageData?.home_what_we_do_sub_title}</p>
          }
            <h2>{HomePageData?.home_what_we_do_main_title}</h2>
          </div>
          <div className="productcardsec">
            {HomePageData?.home_what_we_do_all_portfolios.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.home_what_we_do_all_portfolios_icon}
                imageAlt={val.home_what_we_do_all_portfolios_title}
                title={val.home_what_we_do_all_portfolios_title}
                link={val.home_what_we_do_all_portfolios_link.url}
              >
                <p dangerouslySetInnerHTML={{ __html: val.home_what_we_do_all_portfolios_content }} />
              </Productcard>
            ))}
          </div>
        </div>

        {/* Easy Changes Section */}
        <div className="featureview context">
          <div className="sectiontitle">
          {
            HomePageData?.home_easy_changes_sub_title &&
            <p className="subhighlight">{HomePageData?.home_easy_changes_sub_title}</p>
          }
            <h2>{HomePageData?.home_easy_changes_main_title}</h2>
          </div>
          <div className="productcardsec">
            {HomePageData?.home_easy_all_changes.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.home_easy_all_changes_icon}
                imageAlt={val.home_easy_all_changes_title}
                title={val.home_easy_all_changes_title}
                link={""}
              >
                <p dangerouslySetInnerHTML={{ __html: val.home_easy_all_changes_content }}/>  
              </Productcard>
            ))}
          </div>
        </div>
      </div>

      {/* Shield Card Section */}
      <ShieldCard
        ImageSRC={HomePageData?.home_downturns_images}
        normaltext={HomePageData?.home_downturns_content?.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&amp;/g, '&') }
      >
        {HomePageData?.home_downturns_main_title}
      </ShieldCard>

      {/* Use Cases Section */}
      <div className="sectiondivide sectioncol sectiondividenopad">
        <div className="innercontentleft">
          <h3 className="sec-head">{HomePageData?.home_use_cases_main_title}</h3>
          <div className="faqcon">
            {HomePageData?.home_all_use_cases.map((val, i) => (
              <Collapsible key={i} title={val.home_all_use_cases_title}>
                <p dangerouslySetInnerHTML={{ __html: val.home_all_use_cases_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Section */}
      <div className="sectiondivide twocol bgsecondary">
        <div className="leftsection">
          <Image src={HomePageData?.home_enterprise_image} className="fluidimg" width="500" height="500" alt="Enterprise Image" />
        </div>
        <div className="rightsection">
          <h2 className="sec-head left">{HomePageData?.home_enterprise_main_title}</h2>
          <p className="graycon" dangerouslySetInnerHTML={{ __html: HomePageData?.home_enterprise_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }}></p>
          {HomePageData?.home_enterprise_link?.url && (
            <Link href={`/tools/${HomePageData.home_enterprise_link.url}`} target="_blank" className="button">
              {HomePageData.home_enterprise_link.title}
            </Link>
          )}
        </div>
      </div>

      {/* Defense Section */}
      <div className="sectiondivide whitesec p0i">
        <div className="innercontent">
          <div className="ShieldCardhead">
            <h2 dangerouslySetInnerHTML={{ __html: HomePageData?.home_defense_main_title?.replace(/<h2>/g, '').replace(/<\/h2>/g, '') }} />
            <div dangerouslySetInnerHTML={{ __html: HomePageData?.home_defense_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
          </div>
          <div className="risktools">
            <ImgAccordian tabData={HomePageData?.home_all_defense}></ImgAccordian>
          </div>
        </div>
      </div>

      {/* Security Protocol Section */}
      <div className="sectiondivide jcenter">
        <SecurityProtocol
          title={HomePageData?.home_protocols_main_title}
          imgsrc={HomePageData?.home_protocols_icon}
        >
          <div dangerouslySetInnerHTML={{ __html: HomePageData?.home_protocols_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
        </SecurityProtocol>
      </div>

      <AddUser showDetailsForm={true}/>
    </>
  );
}
