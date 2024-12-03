import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { Helmet } from "react-helmet";
import Signup from "@/components/Signup/Sign-up";
import PageLoader from '@/components/PageLoader/PageLoader';
import Productcard from "@/components/Productcard/Productcard"
import ShieldCard from "@/components/ShieldCard/ShieldCard"
import HeroSection from "@/components/HeroSection/HeroSection"
import HowItWork from "@/components/HowItWork/HowItWork"
import FeatureCard from "@/components/FeatureCard/FeatureCard"
import CompareTable from "@/components/CompareTable/CompareTable"
import Head from 'next/head';
import AddUser from "@/components/AddUser/AddUser"
import { AllData} from "@/utils/fetchHelpers"
import { useRouter } from "next/router";

export default function WhatWeDo() {
  const router = useRouter();
  const { slug } = router.query;
  const [WhatWeDoPageData, setWhatWeDoPageData] = useState(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) {
      setWhatWeDoPageData(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setWhatWeDoPageData(initialContent.data);
        } else {
          setWhatWeDoPageData(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setWhatWeDoPageData(null); 
      }finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug]);
  
  return (
    <>
     {
        loading &&  <PageLoader /> 
      }
      <Head>
        <title>{WhatWeDoPageData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={WhatWeDoPageData?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={WhatWeDoPageData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      <HeroSection
        title={WhatWeDoPageData?.what_we_do_banner_sub_title}
        subtitle={WhatWeDoPageData?.what_we_do_banner_main_title}
        content={WhatWeDoPageData?.what_we_do_banner_content}
        hreflink={WhatWeDoPageData?.what_we_do_banner_link?.url}
        linktext={WhatWeDoPageData?.what_we_do_banner_link?.title}
        showSignupForm="True"
      >
     {WhatWeDoPageData?.what_we_do_banner_image && (
      <Image src={WhatWeDoPageData?.what_we_do_banner_image} width="630" height="400" alt="Banner Image" />
            )}
        
      </HeroSection>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
          {
            WhatWeDoPageData?.what_we_do_about_sub_title &&
          <p className="subhighlight">{WhatWeDoPageData?.what_we_do_about_sub_title}</p>
          }
          <h2>{WhatWeDoPageData?.what_we_do_about_main_title}</h2>
          </div>
          <div className="productcardsec">
          {WhatWeDoPageData?.what_we_do_about_all_portfolios &&
            WhatWeDoPageData?.what_we_do_about_all_portfolios.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.what_we_do_about_all_portfolios_icon}
                imageAlt={val.what_we_do_about_all_portfolios_title}
                title={val.what_we_do_about_all_portfolios_title}
                link={val.what_we_do_about_all_portfolios_link.url}
              >
                <p dangerouslySetInnerHTML={{ __html: val.what_we_do_about_all_portfolios_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
        <div className="featureview context">
          <div className="sectiontitle">
          {
            WhatWeDoPageData?.what_we_do_changes_sub_title && 
          <p className="subhighlight">{WhatWeDoPageData?.what_we_do_changes_sub_title}</p>
          }
          <h2>{WhatWeDoPageData?.what_we_do_changes_main_title}</h2>
          </div>
          <div className="productcardsec">
          {WhatWeDoPageData?.what_we_do_about_all_adaptive.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.what_we_do_about_all_adaptive_icon}
                imageAlt={val.what_we_do_about_all_adaptive_title}
                title={val.what_we_do_about_all_adaptive_title}
                link={""}
              >
                <p dangerouslySetInnerHTML={{ __html: val.what_we_do_about_all_adaptive_content }} />
              </Productcard>
            ))}
          </div>
        </div>
      </div>
      <ShieldCard
        ImageSRC={WhatWeDoPageData?.what_we_do_downturns_images}
        normaltext={WhatWeDoPageData?.what_we_do_downturns_content?.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&amp;/g, '&')}
      >
        {WhatWeDoPageData?.what_we_do_downturns_main_title}
      </ShieldCard>
      <HowItWork         
        title={WhatWeDoPageData?.what_we_do_how_it_works_main_title}
        subheading={WhatWeDoPageData?.what_we_do_how_it_works_sub_title}
        imageUrl={WhatWeDoPageData?.what_we_do_how_it_works_image} 
      ></HowItWork>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <h2>{WhatWeDoPageData?.what_we_do_benefits_main_title}</h2>
            <p className="text-center" dangerouslySetInnerHTML={{ __html: WhatWeDoPageData?.what_we_do_benefits_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
          </div>
          <div className="feturecardcon">
          {
            WhatWeDoPageData?.what_we_do_all_benefits && 
            WhatWeDoPageData?.what_we_do_all_benefits?.map((val,i)=> {
              return (
              <FeatureCard
              key={i}
              imageUrl={val?.what_we_do_all_benefits_icon}
              imageAlt={val?.what_we_do_all_benefits_title}
              title={val?.what_we_do_all_benefits_title}
              content={val?.what_we_do_all_benefits_content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}
            />
            )
            })
          }
          </div>
        </div>
      </div>
      <div className="sectiondivide vcolumn">
        <h2 className="sec-head">{WhatWeDoPageData?.growing_main_title}</h2>
        <CompareTable CompareTableHeadData={WhatWeDoPageData?.growing_table_head} CompareTableBodyData={WhatWeDoPageData?.growing_table_body}/>
      </div>      
      <AddUser showDetailsForm={true} />
    </>
  );
}
