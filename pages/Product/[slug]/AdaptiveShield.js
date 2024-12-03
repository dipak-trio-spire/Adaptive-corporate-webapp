import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { Helmet } from "react-helmet";
import Signup from "@/components/Signup/Sign-up";
import PageLoader from '@/components/PageLoader/PageLoader';
import Productcard from "@/components/Productcard/Productcard"
import ShieldCard from "@/components/ShieldCard/ShieldCard"
import HeroSection from "@/components/HeroSection/HeroSection"
import ImgAccordian from "@/components/ImgAccordian/ImgAccordian"
import SecurityProtocol from "@/components/SecurityProtocol/SecurityProtocol"
import FeatureCard from "@/components/FeatureCard/FeatureCard"
import CompareTable from "@/components/CompareTable/CompareTable"
import Collapsible from "@/components/Collapsible/Collapsible"
import Link from "next/link";
import Head from 'next/head';
import AddUser from "@/components/AddUser/AddUser"
import { useRouter } from "next/router";
import { AllData } from "@/utils/fetchHelpers";

export default function AdaptiveShield() {
  const router = useRouter();
  const { slug } = router.query;
  const [AdaptiveShield, setAdaptiveShield] = useState(null)
  const [loading, setLoading] = useState(true); // Track loading state
  useEffect(() => {
    if (!slug) {
      console.warn("No 'home' slug parameter found.");
      setAdaptiveShield(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setAdaptiveShield(initialContent.data);
        } else {
          setAdaptiveShield(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAdaptiveShield(null); 
      }finally {
        setLoading(false); // Stop loader after fetching is complete
      }
    };
  
    fetchData();
  }, [slug]);

  const tabData = [
    { title: '1. Protection Calculator', content: 'Adaptive lists publicly-traded options for a portfolio based on desired protection period & level.', imgsrc:'../Assets/risktools/diy_shopping_list.svg', link:'/tools/ppc', linkText: 'Click to Try!' },
    { title: '2. Risk Contribution', content: 'Adaptive can flag concentrations of risk within a portfolio, for example identifying the stocks with outsized contributions to a portfolio’s overall volatility.', imgsrc:'../Assets/risktools/risk_contribution.svg', link:'/tools/riskcontribution', linkText: 'Sample Here!' },
    { title: '3. Backtest & Monte Carlo', content: 'Quantify downside protection benefit scenarios in which downside protection makes the most of market downturns—not only reducing a portfolio’s risk, but also potentially producing superior long-term growth thanks to the power of compounding growth & reinvestment of downside protection payoffs at lower prices during episodes of market decline.', imgsrc:'../Assets/risktools/backtest_monte_carlo.svg', link:'/tools/mc', linkText: 'Sample Here!' },
    { title: '4. Factor Analysis', content: 'Measure a portfolio’s fit compared to various market indexes in pursuit of cost-effective, right-sized market hedges.', imgsrc:'../Assets/risktools/factor_analysis.svg', link:'/tools/factor_analysis', linkText: 'Sample Here!' },
  ];
  return (
    <>
      {
      loading && <PageLoader/>
    }
      <Head>
        <title>Stay invested for long-term growth with Adaptive one-click downside protection</title>
        <meta property="og:title" content="Stay invested for long-term growth with Adaptive one-click downside protection" />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content="Hedging doesn’t have to be hard or hideously expensive. Adaptive makes portfolio protection accessible for investors of all sizes to limit losses & make the most of all-to-common market downturns" />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      <HeroSection 
      title={AdaptiveShield?.adaptive_shield_banner_main_title}
      subtitle={AdaptiveShield?.adaptive_shield_banner_sub_title}
      content={AdaptiveShield?.adaptive_shield_banner_content}
      hreflink={AdaptiveShield?.adaptive_shield_banner_link && AdaptiveShield?.adaptive_shield_banner_link.url}
      linktext={AdaptiveShield?.adaptive_shield_banner_link && AdaptiveShield?.adaptive_shield_banner_link.title}
      showSignupForm="True"
      >
      {AdaptiveShield?.adaptive_shield_banner_image && (
        <Image src={AdaptiveShield?.adaptive_shield_banner_image && AdaptiveShield?.adaptive_shield_banner_image} alt={AdaptiveShield?.adaptive_shield_banner_main_title} width="630" height="400" />
            )}
       
      </HeroSection>
      <div className="sectiondivide vcolumn gap100" >
        <div className="featureview context">
          <div className="sectiontitle">
          {
            AdaptiveShield?.adaptive_shield_what_we_do_sub_title && 
            <p className="subhighlight">{AdaptiveShield?.adaptive_shield_what_we_do_sub_title}</p>
          }
            <h2>
              {AdaptiveShield?.adaptive_shield_what_we_do_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {AdaptiveShield?.adaptive_shield_what_we_do_all_portfolios &&
            AdaptiveShield?.adaptive_shield_what_we_do_all_portfolios.map((val, i) => (
              <Productcard
                key={i}
                imageUrl={val.adaptive_shield_what_we_do_all_portfolios_icon}
                imageAlt={val.adaptive_shield_what_we_do_all_portfolios_title}
                title={val.adaptive_shield_what_we_do_all_portfolios_title}
                link=""
              >
                <p dangerouslySetInnerHTML={{ __html: val.adaptive_shield_what_we_do_all_portfolios_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Productcard>
            ))}
          </div>
        </div>
        <div className="featureview context">
          <div className="sectiontitle">
          {
            AdaptiveShield?.adaptive_shield_changes_sub_title && 
            <p className="subhighlight">{AdaptiveShield?.adaptive_shield_changes_sub_title}</p>
          }
            <h2>
              {AdaptiveShield?.adaptive_shield_changes_main_title}
            </h2>
          </div>
          <div className="productcardsec">
          {AdaptiveShield?.adaptive_shield_all_changes &&
            AdaptiveShield?.adaptive_shield_all_changes.map((val, i) => (
              <Productcard
              key={i}
              imageUrl={val.adaptive_shield_all_changes_icon}
              imageAlt={val.adaptive_shield_all_changes_title}
              title={val.adaptive_shield_all_changes_title}
              link=""
            >
             <p dangerouslySetInnerHTML={{ __html: val.adaptive_shield_all_changes_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
            </Productcard>
            ))}
          </div>
        </div>
      </div>
      <ShieldCard
        ImageSRC={AdaptiveShield?.adaptive_shield_downturns_images}
        normaltext={AdaptiveShield?.adaptive_shield_downturns_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }
      >
        {AdaptiveShield?.adaptive_shield_downturns_main_title}
      </ShieldCard>

      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <h2>{AdaptiveShield?.adaptive_shield_benefits_main_title}</h2>
            <p className="text-center" >{AdaptiveShield?.adaptive_shield_benefits_content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}</p>
          </div>
          <div className="feturecardcon">
          {
            AdaptiveShield?.adaptive_shield_all_benefits && 
            AdaptiveShield?.adaptive_shield_all_benefits.map((val,i)=> {
              return (
              <FeatureCard 
              key={i}
              imageUrl={val?.adaptive_shield_all_benefits_icon}
              imageAlt={val?.adaptive_shield_all_benefits_title}
              title={val?.adaptive_shield_all_benefits_title}
              content={val?.adaptive_shield_all_benefits_content?.replace(/<p>/g, '').replace(/<\/p>/g, '')}
              hreflink="javascript:;"
            />
            )
            })
          }
          </div>
        </div>
      </div>
      <div className="sectiondivide vcolumn">
        <h2 className="sec-head">{AdaptiveShield?.growing_main_title}</h2>
        <CompareTable  CompareTableHeadData={AdaptiveShield?.growing_table_head} CompareTableBodyData={AdaptiveShield?.growing_table_body}/>
      </div>
      <div className="sectiondivide whitesec p0i">
        <div className="innercontent">
          <div className="ShieldCardhead">
            <h2 dangerouslySetInnerHTML={{ __html: AdaptiveShield?.home_defense_main_title?.replace(/<h2>/g, '').replace(/<\/h2>/g, '') }} />
            <div dangerouslySetInnerHTML={{ __html: AdaptiveShield?.home_defense_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
          </div>
          <div className="risktools">
            <ImgAccordian tabData={AdaptiveShield?.home_all_defense}></ImgAccordian>
          </div>
        </div>
      </div>
      <div className="sectiondivide jcenter">
        <SecurityProtocol
          title={AdaptiveShield?.adaptive_shield_security_main_title}
          imgsrc={AdaptiveShield?.adaptive_shield_security_image}
        >
         <div dangerouslySetInnerHTML={{ __html: AdaptiveShield?.adaptive_shield_security_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
        </SecurityProtocol>
      </div>
      <div className="sectiondivide sectioncol sectiondividenopad">
        <div className="innercontentleft">
          <h3 className="sec-head">{AdaptiveShield?.adaptive_shield_use_cases_main_title}</h3>
          <div className="faqcon">
          {AdaptiveShield?.adaptive_shield_all_use_cases.map((val, i) => (
              <Collapsible key={i} title={val.adaptive_shield_all_use_cases_label}>
                <p dangerouslySetInnerHTML={{ __html: val.adaptive_shield_all_use_cases_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
      <AddUser showDetailsForm={true} />
    </>
  );
}
