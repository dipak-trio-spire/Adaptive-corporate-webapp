import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { Helmet } from "react-helmet";
import Signup from "@/components/Signup/Sign-up";
import PageLoader from '@/components/PageLoader/PageLoader';
import Productcard from "@/components/Productcard/Productcard"
import HeroSection from "@/components/HeroSection/HeroSection"
import HowItWork from "@/components/HowItWork/HowItWork"
import FeatureCard from "@/components/FeatureCard/FeatureCard"
import CompareTable from "@/components/CompareTable/CompareTable"
import Link from "next/link";
import AddUser from "@/components/AddUser/AddUser"
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AllData } from "@/utils/fetchHelpers";

export default function Enterprises() {
  const router = useRouter();
  const { slug } = router.query;
  const [EnterprisesData, setEnterprisesData] = useState(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) {
      setEnterprisesData(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setEnterprisesData(initialContent.data);
        } else {
          setEnterprisesData(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setEnterprisesData(null); 
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
        <title>{EnterprisesData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={EnterprisesData?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={EnterprisesData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      <HeroSection 
      title={EnterprisesData?.enterprises_banner_sub_title}
      subtitle={EnterprisesData?.enterprises_banner_main_title}
      content={EnterprisesData?.enterprises_banner_content}
      hreflink={EnterprisesData?.enterprises_banner_link && `/tools${EnterprisesData?.enterprises_banner_link.url}`}
      linktext={EnterprisesData?.enterprises_banner_link && EnterprisesData?.enterprises_banner_link.title}
      showSignupForm=""
      >
      {EnterprisesData?.enterprises_banner_image && (
        <Image src={EnterprisesData?.enterprises_banner_image && EnterprisesData?.enterprises_banner_image} alt={EnterprisesData?.enterprises_banner_sub_title} width="630" height="400" />
            )}
        
      </HeroSection>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
          {
            EnterprisesData?.enterprises_what_we_do_sub_title && 
            <p className="subhighlight">{EnterprisesData?.enterprises_what_we_do_sub_title}</p>
          }
            <h2>
            {EnterprisesData?.enterprises_what_we_do_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {EnterprisesData?.enterprises_what_we_do_all_tools &&
            EnterprisesData?.enterprises_what_we_do_all_tools.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.enterprises_what_we_do_all_tools_icon}
                imageAlt={val.enterprises_what_we_do_all_tools_title}
                title={val.enterprises_what_we_do_all_tools_title}
                link=""
              >
                <p dangerouslySetInnerHTML={{ __html: val.enterprises_what_we_do_all_tools_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
        <div className="featureview context">
          <div className="sectiontitle">
          {
            EnterprisesData?.enterprises_changes_sub_title && 
            <p className="subhighlight">{EnterprisesData?.enterprises_changes_sub_title}</p>
          }
            <h2>
            {EnterprisesData?.enterprises_changes_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {EnterprisesData?.enterprises_all_changes &&
            EnterprisesData?.enterprises_all_changes.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.enterprises_all_changes_icon}
                imageAlt={val.enterprises_all_changes_title}
                title={val.enterprises_all_changes_title}
                link=""
              >
                <p dangerouslySetInnerHTML={{ __html: val.enterprises_all_changes_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
      </div>
      <HowItWork         
        title={EnterprisesData?.enterprises_how_work_main_title}
        subheading={EnterprisesData?.enterprises_how_work_sub_title}
        imageUrl={EnterprisesData?.enterprises_how_work_image && EnterprisesData?.enterprises_how_work_image}
      ></HowItWork>
      
      <div className="sectiondivide twocol bgsecondary">
        <div className="leftsection">
          <Image src={EnterprisesData?.enterprises_api_image} alt={EnterprisesData?.growing_main_title} className="fluidimg" width="500" height="500"/>
        </div>
        <div className="rightsection">
          <h2 className="sec-head left">{EnterprisesData?.enterprises_api_main_title}</h2>
          <p className="graycon" dangerouslySetInnerHTML={{ __html: EnterprisesData?.enterprises_api_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }}></p>
          {
           EnterprisesData?.enterprises_api_link &&
          <Link href={`/tools/${EnterprisesData?.enterprises_api_link.url}`} className="button">
          {EnterprisesData?.enterprises_api_link.title}
          </Link>
          }
        </div>
      </div>
      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <h2>{EnterprisesData?.enterprises_benefits_main_title}</h2>
          </div>
          <div className="feturecardcon style2">
            {
              EnterprisesData?.enterprises_all_benefits &&
              EnterprisesData?.enterprises_all_benefits?.map((val,i)=>{
                return (
                  <FeatureCard 
                  key={i}
                  imageUrl={val.retail_investors_all_benefits_icon}
                  imageAlt={val.retail_investors_all_benefits_title}
                  title={val.retail_investors_all_benefits_title}
                  content=""
                  isActive="True"
                  hreflink="javascript:;"
                />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="sectiondivide vcolumn">
      <h2 className="sec-head">{EnterprisesData?.growing_main_title}</h2>
      <CompareTable CompareTableHeadData={EnterprisesData?.growing_table_head} CompareTableBodyData={EnterprisesData?.growing_table_body}/>
      </div>      
      <AddUser showDetailsForm={true} />
    </>
  );
}
