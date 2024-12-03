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
import Link from "next/link";
import Head from 'next/head';
import AddUser from "@/components/AddUser/AddUser"
import { AllData} from "@/utils/fetchHelpers"
import { useRouter } from 'next/router';

export default function AdvisorsWealthManagers() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [AdvisorsWealthManagersData, setAdvisorsWealthManagersData] = useState(null)
  const [loading, setLoading] = useState(true);
useEffect(() => {
    if (!slug) {
      setAdvisorsWealthManagersData(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setAdvisorsWealthManagersData(initialContent.data);
        } else {
          setAdvisorsWealthManagersData(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAdvisorsWealthManagersData(null); 
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
        <title>{AdvisorsWealthManagersData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={AdvisorsWealthManagersData?.seo_meta.meta_title.replace(/&amp;/g, '&')}/>
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={AdvisorsWealthManagersData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      <HeroSection 
      title={AdvisorsWealthManagersData && AdvisorsWealthManagersData?.what_we_serve_banner_main_title}
      subtitle={AdvisorsWealthManagersData && AdvisorsWealthManagersData?.what_we_serve_banner_sub_title}
      content={AdvisorsWealthManagersData && AdvisorsWealthManagersData?.what_we_serve_banner_content}
      hreflink={AdvisorsWealthManagersData?.what_we_serve_banner_link && AdvisorsWealthManagersData?.what_we_serve_banner_link.url}
      linktext={AdvisorsWealthManagersData?.what_we_serve_banner_link && AdvisorsWealthManagersData?.what_we_serve_banner_link.title}
      showSignupForm=""
      >
      {AdvisorsWealthManagersData?.what_we_serve_banner_image && (
        <Image src={AdvisorsWealthManagersData?.what_we_serve_banner_image && AdvisorsWealthManagersData?.what_we_serve_banner_image} alt={AdvisorsWealthManagersData?.what_we_serve_banner_main_title} width="630" height="400" />
            )}
      
      </HeroSection>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
          {
            AdvisorsWealthManagersData?.what_we_serve_buy_hold_sub_title && 
            <p className="subhighlight">{AdvisorsWealthManagersData?.what_we_serve_buy_hold_sub_title}</p>
          }
            <h2>
            {AdvisorsWealthManagersData?.what_we_serve_buy_hold_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {AdvisorsWealthManagersData?.what_we_serve_all_portfolios &&
            AdvisorsWealthManagersData?.what_we_serve_all_portfolios.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.what_we_serve_all_portfolios_icon}
                imageAlt={val.what_we_serve_all_portfolios_title}
                title={val.what_we_serve_all_portfolios_title}
                link=""
              >
                <p dangerouslySetInnerHTML={{ __html: val.what_we_serve_all_portfolios_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
        <div className="featureview context">
          <div className="sectiontitle">
          {
            AdvisorsWealthManagersData?.what_we_serve_changes_sub_title && 
            <p className="subhighlight">{AdvisorsWealthManagersData?.what_we_serve_changes_sub_title}</p>
          }
            <h2>
            {AdvisorsWealthManagersData?.what_we_serve_changes_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {AdvisorsWealthManagersData?.what_we_serve_all_changes &&
            AdvisorsWealthManagersData?.what_we_serve_all_changes.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.what_we_serve_all_changes_icon}
                imageAlt={val.what_we_serve_all_changes_title}
                title={val.what_we_serve_all_changes_title}
                link=""
              >
                <p dangerouslySetInnerHTML={{ __html: val.what_we_serve_all_changes_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
      </div>
      <ShieldCard
        ImageSRC={AdvisorsWealthManagersData?.what_we_serve_downturns_images}
        normaltext={AdvisorsWealthManagersData?.what_we_serve_downturns_content?.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&amp;/g, '&')}
      >
        {AdvisorsWealthManagersData?.what_we_serve_downturns_main_title}
      </ShieldCard>
      
      <HowItWork         
        title={AdvisorsWealthManagersData?.what_we_serve_how_work_main_title}
        subheading={AdvisorsWealthManagersData?.what_we_serve_how_work_sub_title}
        imageUrl={AdvisorsWealthManagersData?.what_we_serve_how_work_image && AdvisorsWealthManagersData?.what_we_serve_how_work_image}
      ></HowItWork>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <h2>{AdvisorsWealthManagersData?.what_we_serve_benefit_main_title}</h2>
            <p className="text-center" dangerouslySetInnerHTML={{ __html: AdvisorsWealthManagersData?.what_we_serve_benefit_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }}></p>
          </div>
          <div className="feturecardcon">
          {
            AdvisorsWealthManagersData?.what_we_serve_all_benefits && 
            AdvisorsWealthManagersData?.what_we_serve_all_benefits.map((val,i)=> {
              return (
              <FeatureCard 
              key={i}
              imageUrl={val?.what_we_serve_all_benefits_icon}
              imageAlt={val?.what_we_serve_all_benefits_title}
              title={val?.what_we_serve_all_benefits_title}
              content={val?.what_we_serve_all_benefits_content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}
              hreflink="/"
            />
            )
            })
          }
          </div>
        </div>
      </div>
      <div className="sectiondivide vcolumn">
        <h2 className="sec-head">{AdvisorsWealthManagersData?.growing_main_title}</h2>
        <CompareTable CompareTableHeadData={AdvisorsWealthManagersData?.growing_table_head} CompareTableBodyData={AdvisorsWealthManagersData?.growing_table_body}/>
      </div>      
      <AddUser showDetailsForm={true} />
    </>
  );
}
