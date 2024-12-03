// tools/[slug]/index.js
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Helmet } from "react-helmet";
import PageLoader from '@/components/PageLoader/PageLoader';
import AddUser from "@/components/AddUser/AddUser";
import HeroSectionv2 from "@/components/HeroSection/HeroSectionv2";
import UserCard from "@/components/UserCard/UserCard";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AllData } from "@/utils/fetchHelpers";

export default function AboutAdaptive() {
  const router = useRouter();
  const { slug } = router.query;
  const [AboutAdaptive, setAboutAdaptive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setAboutAdaptive(null); 
      return;
    }

    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setAboutAdaptive(initialContent.data);
        } else {
          setAboutAdaptive(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAboutAdaptive(null); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug]);

  return (
    <>
      {loading && <PageLoader />}
      <Head>
        <title>{AboutAdaptive?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={AboutAdaptive?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={AboutAdaptive?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
        <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
      </Head>
      <HeroSectionv2 
        title={AboutAdaptive?.about_adaptive_banner_main_title}
        hreflink=""
        linktext=""
        showSignupForm=""
        pagetitle={AboutAdaptive?.about_adaptive_banner_sub_title}
      />
      <div className="sectiondivide whitesec p0i">
        <div className="innercontent">
          <div className="ShieldCardhead">
            <h2><span>{AboutAdaptive?.about_adaptive_team_main_title}</span></h2>
            <div
              dangerouslySetInnerHTML={{
                __html: AboutAdaptive?.about_adaptive_team_content || '',
              }}
            />
            <br />
            <br />
          </div>
          <div className="usercardcontainer">
            {AboutAdaptive?.about_adaptive_all_team_members.map((val, i) => (
              <UserCard
                key={i} // Added key prop here
                imageUrl={val.about_adaptive_all_team_members_image}
                imageAlt={val.about_adaptive_all_team_members_name}
                title={val.about_adaptive_all_team_members_name}
                link={val.about_adaptive_all_team_members_linkedin_url.url}
              >
                {val.about_adaptive_all_team_members_designation}
              </UserCard>
            ))}
          </div>
        </div>
      </div>
      <AddUser showDetailsForm={true} />
    </>
  );
}
